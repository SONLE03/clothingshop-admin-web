"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, Button, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { GetYearlyExpense } from '@/src/api/reports/yearly-report/GetYearlyExpense';
import { GetYearlyRevenue } from '@/src/api/reports/yearly-report/GetYearlyRevenue';
import { ParseJSON } from '@/src/api/auth/ParseJSON';
import { Line } from '@ant-design/plots';
import { useRouter } from 'next/navigation';

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
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Yearly Revenue" key="revenue">
          <Row gutter={16}>
            <Col span={8}>
              <DatePicker
                picker="year"
                value={moment(startYear.toString(), 'YYYY')}
                onChange={(date) => setStartYear(date?.year() || new Date().getFullYear())}
              />
            </Col>
            <Col span={8}>
              <DatePicker
                picker="year"
                value={moment(endYear.toString(), 'YYYY')}
                onChange={(date) => setEndYear(date?.year() || new Date().getFullYear())}
              />
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={handleFetchData} loading={loading}>
                Create Yearly Report
              </Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card title="Total Orders">
                {calculateTotals(yearlyRevenue, 'totalOrders')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Products Sold">
                {calculateTotals(yearlyRevenue, 'totalProductsSold')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Revenue">
                {calculateTotals(yearlyRevenue, 'totalRevenue')}
              </Card>
            </Col>
          </Row>
          {renderLineChart(yearlyRevenue, 'totalRevenue')}
        </TabPane>
        <TabPane tab="Yearly Expense" key="expense">
          <Row gutter={16}>
            <Col span={8}>
              <DatePicker
                picker="year"
                value={moment(startYear.toString(), 'YYYY')}
                onChange={(date) => setStartYear(date?.year() || new Date().getFullYear())}
              />
            </Col>
            <Col span={8}>
              <DatePicker
                picker="year"
                value={moment(endYear.toString(), 'YYYY')}
                onChange={(date) => setEndYear(date?.year() || new Date().getFullYear())}
              />
            </Col>
            <Col span={8}>
              <Button type="primary" onClick={handleFetchData} loading={loading}>
                Create Yearly Report
              </Button>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Card title="Total Invoices">
                {calculateTotals(yearlyExpense, 'totalInvoices')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Products">
                {calculateTotals(yearlyExpense, 'totalProducts')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Expense">
                {calculateTotals(yearlyExpense, 'totalExpense')}
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
