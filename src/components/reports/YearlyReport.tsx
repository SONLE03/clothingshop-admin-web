"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, Button, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { GetYearlyExpense } from '@/src/api/reports/yearly-report/GetYearlyExpense';
import { GetYearlyRevenue } from '@/src/api/reports/yearly-report/GetYearlyRevenue';
import { ParseJSON } from '@/src/api/auth/ParseJSON';
import { Line } from '@ant-design/plots';
import { useRouter } from 'next/navigation';
import { BaggageClaim, Coins, LineChart, ListChecks, ListOrdered, Package, PackageCheck } from 'lucide-react';

const { TabPane } = Tabs;

const YearlyReport: React.FC = () => {
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [yearlyRevenue, setYearlyRevenue] = useState<any[]>([]);
  const [yearlyExpense, setYearlyExpense] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('revenue');
  const history = useRouter();

  // Role-based access control
  useEffect(() => {
        const storedRole = localStorage.getItem('role');
        console.log(storedRole);
        if (storedRole) {
            const role = ParseJSON(storedRole);
            if (role !== 'ADMIN') {
                history.push('/access-deny');
            }
        }

    }, [history]);

  const fetchYearlyRevenue = async () => {
    try {
      setLoading(true);
      const data = await GetYearlyRevenue(startYear, endYear);
      setYearlyRevenue(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to fetch yearly revenue');
    }
  };

  const fetchYearlyExpense = async () => {
    try {
      setLoading(true);
      const data = await GetYearlyExpense(startYear, endYear);
      setYearlyExpense(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to fetch yearly expense');
    }
  };

  const handleFetchData = () => {
    if (activeTab === 'revenue') {
      fetchYearlyRevenue();
    } else {
      fetchYearlyExpense();
    }
  };

  const calculateTotals = (data: any[], key: string) => {
    return data.reduce((total, item) => total + item[key], 0);
  };

  const renderLineChart = (data: any[], yKey: string) => {
    const chartData = data.map(item => ({
      year: item.year.toString(),
      value: item[yKey],
    }));

    const config = {
      data: chartData,
      xField: 'year',
      yField: 'value',
      point: { size: 5, shape: 'diamond' },
      label: {
        style: {
          fill: '#000',
        },
      },
    };

    return <Line {...config} />;
  };

  return (
    <div>
      <Tabs className='font-semibold' activeKey={activeTab} onChange={setActiveTab}>
        <TabPane className='mt-3 mb-4' tab="Yearly Revenue" key="revenue">
          <Row gutter={16}>
            <div className="flex flex-row justify-start items-center space-x-1 w-full mb-3">
              <Col span={4}>
                <DatePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-10'
                  picker="year"
                  value={moment(startYear.toString(), 'YYYY')}
                  onChange={(date) => setStartYear(date?.year() || new Date().getFullYear())}
                />
              </Col>
              <Col span={6}>
                <DatePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-10'
                  picker="year"
                  value={moment(endYear.toString(), 'YYYY')}
                  onChange={(date) => setEndYear(date?.year() || new Date().getFullYear())}
                />
              </Col>
              <Col span={8}>
                <Button className='flex justify-center items-center space-x-1 h-10 font-semibold' icon={<LineChart/>}
                  type="primary" onClick={handleFetchData} loading={loading}>
                  Create Yearly Report
                </Button>
              </Col>
              </div>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl mb-4' 
                  title={
                      <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                          <ListOrdered color='blue' /> 
                          <span>Total Orders</span>
                      </div>
                  }
                  bordered={false}>

                  <h1 className=' text-3xl'>{calculateTotals(yearlyRevenue, 'totalOrders')}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl mb-4'  
                title={
                  <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                      <PackageCheck color='green' /> 
                      <span>Total Products sold</span>
                  </div>
                } 
                bordered={false}>
                <h1 className=' text-3xl'>{calculateTotals(yearlyRevenue, 'totalProductsSold')}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-2xl mb-4' 
                title={
                  <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                    <Coins color='#FFA500' /> 
                    <span>Total Revenue</span>
                  </div>
                } 
                bordered={false}>
                <h1 className=' text-3xl'>{calculateTotals(yearlyRevenue, 'totalRevenue')}</h1>
              </Card>
            </Col>
          </Row>
          {renderLineChart(yearlyRevenue, 'totalRevenue')}
        </TabPane>
        <TabPane className='mt-3 mb-4' tab="Yearly Expense" key="expense">
          <Row gutter={16}>
            <div className="flex flex-row justify-start items-center space-x-1 w-full mb-3">
              <Col span={4}>
                <DatePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-10'
                  picker="year"
                  value={moment(startYear.toString(), 'YYYY')}
                  onChange={(date) => setStartYear(date?.year() || new Date().getFullYear())}
                />
              </Col>
              <Col span={6}>
                <DatePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-10'
                  picker="year"
                  value={moment(endYear.toString(), 'YYYY')}
                  onChange={(date) => setEndYear(date?.year() || new Date().getFullYear())}
                />
              </Col>
              <Col span={8}>
                <Button className='flex justify-center items-center space-x-1 h-10 font-semibold' icon={<LineChart/>}
                type="primary" onClick={handleFetchData} loading={loading}>
                  Create Yearly Report
                </Button>
              </Col>
            </div>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl mb-4' 
                title={
                    <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                        <ListChecks color='blue' /> 
                        <span>Total Invoices</span>
                    </div>
                } 
                bordered={false}>
                <h1 className=' text-3xl'>{calculateTotals(yearlyExpense, 'totalInvoices')}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl' 
                title={
                    <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                        <Package color='green' /> 
                        <span>Total Products</span>
                    </div>
                }

                bordered={false}>
                <h1 className=' text-3xl'>{calculateTotals(yearlyExpense, 'totalProducts')}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl' 
                title={
                     <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                         <BaggageClaim color='#FFA500' /> 
                         <span>Total Expense</span>
                     </div>
                }
                bordered={false}>
                <h1 className=' text-3xl'>{calculateTotals(yearlyExpense, 'totalExpense')}</h1>
              </Card>
            </Col>
          </Row>
          {renderLineChart(yearlyExpense, 'totalExpense')}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default YearlyReport;
