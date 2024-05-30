"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, Button, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { Line } from '@ant-design/plots';

import { GetMonthlyExpense } from '@/src/api/reports/monthly-report/GetMonthlyExpense';
import { GetMonthlyRevenue } from '@/src/api/reports/monthly-report/GetMonthlyRevenue';


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
        stroke: '#000',
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
        <DatePicker
          picker="year"
          defaultValue={moment()}
          onChange={(date) => setYear(date ? date.year() : new Date().getFullYear())}
        />
        <Button type="primary" onClick={handleFetchData}>
          Create Monthly Report
        </Button>
      </Row>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <TabPane tab="Monthly Revenue" key="revenue">
          <Row gutter={16} className="mt-4">
            <Col span={8}>
              <Card title="Total Orders" bordered={false}>
                {getTotal(monthlyRevenue, 'totalOrders')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Products Sold" bordered={false}>
                {getTotal(monthlyRevenue, 'totalProductsSold')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Revenue" bordered={false}>
                {getTotal(monthlyRevenue, 'totalRevenue')}
              </Card>
            </Col>
          </Row>
          {renderChart(monthlyRevenue, 'totalRevenue')}
        </TabPane>
        <TabPane tab="Monthly Expense" key="expense">
          <Row gutter={16} className="mt-4">
            <Col span={8}>
              <Card title="Total Invoices" bordered={false}>
                {getTotal(monthlyExpense, 'totalInvoices')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Products" bordered={false}>
                {getTotal(monthlyExpense, 'totalProducts')}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Expense" bordered={false}>
                {getTotal(monthlyExpense, 'totalExpense')}
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
