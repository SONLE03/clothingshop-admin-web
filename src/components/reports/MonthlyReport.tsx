"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, Button, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { Line } from '@ant-design/plots';

import { GetMonthlyExpense } from '@/src/api/reports/monthly-report/GetMonthlyExpense';
import { GetMonthlyRevenue } from '@/src/api/reports/monthly-report/GetMonthlyRevenue';
import { BaggageClaim, Coins, LineChart, ListChecks, ListOrdered, Package, PackageCheck } from 'lucide-react';


const { TabPane } = Tabs;

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthlyReport: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [monthlyExpense, setMonthlyExpense] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('revenue');

  const fetchMonthlyRevenue = async () => {
    try {
      setLoading(true);
      const data = await GetMonthlyRevenue(year);
      setMonthlyRevenue(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to fetch monthly revenue');
    }
  };

  const fetchMonthlyExpense = async () => {
    try {
      setLoading(true);
      const data = await GetMonthlyExpense(year);
      setMonthlyExpense(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to fetch monthly expense');
    }
  };

  const handleFetchData = () => {
    if (activeTab === 'revenue') {
      fetchMonthlyRevenue();
    } else {
      fetchMonthlyExpense();
    }
  };

  const getTotal = (data: any[], field: string) => {
    return data.reduce((acc, item) => acc + item[field], 0);
  };

  const getChartData = (data: any[], valueField: string) => {
    return months.map((month, index) => {
      const report = data.find(item => item.month === index + 1);
      return {
        month,
        [valueField]: report ? report[valueField] : 0,
      };
    });
  };

  useEffect(() => {
    handleFetchData();
  }, [year, activeTab]);

  const renderChart = (data: any[], valueField: string) => {
    const config = {
      data: getChartData(data, valueField),
      xField: 'month',
      yField: valueField,
      xAxis: {
        type: 'cat',
        tickCount: 12,
      },
      smooth: true,
      lineStyle: {
        stroke: '#FFA500',
        lineWidth: 4,
      },
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
      <Row justify="space-between" align="middle">
        <div className="flex flex-row justify-start items-center space-x-6 w-full mb-4">
          <DatePicker className='border border-gray-500 rounded-lg hover:border-blue-500 h-10'
            picker="year"
            defaultValue={moment()}
            onChange={(date) => setYear(date ? date.year() : new Date().getFullYear())}
          />
          <Button className='flex justify-center items-center space-x-1 h-10 font-semibold' icon={<LineChart/>} type="primary" onClick={handleFetchData}>
            Create Monthly Report
          </Button>
        </div>
      </Row>
      <Tabs className='font-semibold' activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane tab="Monthly Revenue" key="revenue">
          <Row gutter={16} className="mt-4">
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl mb-4' 
                title={
                    <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                        <ListOrdered color='blue' /> 
                        <span>Total Orders</span>
                    </div>
                }
                bordered={false}>
                <h1 className=' text-3xl'>{getTotal(monthlyRevenue, 'totalOrders')}</h1>
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
                <h1 className=' text-3xl'>{getTotal(monthlyRevenue, 'totalProductsSold')}</h1>
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
                <h1 className=' text-3xl'>{getTotal(monthlyRevenue, 'totalRevenue')}</h1>
              </Card>
            </Col>
          </Row>
          {renderChart(monthlyRevenue, 'totalRevenue')}
        </TabPane>
        <TabPane tab="Monthly Expense" key="expense">
          <Row gutter={16} className="mt-4">
            <Col span={8}>
              <Card className='border border-gray-500 rounded-lg shadow-xl mb-4' 
                title={
                    <div className="flex justify-start items-center text-xl font-semibold mb-4 space-x-2">
                        <ListChecks color='blue' /> 
                        <span>Total Invoices</span>
                    </div>
                } 
                bordered={false}>
                <h1 className=' text-3xl'>{getTotal(monthlyExpense, 'totalInvoices')}</h1>
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
                <h1 className=' text-3xl'>{getTotal(monthlyExpense, 'totalProducts')}</h1>
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
                <h1 className=' text-3xl'>{getTotal(monthlyExpense, 'totalExpense')}</h1>
              </Card>
            </Col>
          </Row>
          {renderChart(monthlyExpense, 'totalExpense')}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MonthlyReport;
