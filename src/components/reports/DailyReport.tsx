"use client";

import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Tabs, Card, Row, Col, message } from 'antd';
import moment from 'moment';
import { GetDailyRevenue } from '@/src/api/reports/daily-report/GetDailyRevenue';
import { GetDailyExpense } from '@/src/api/reports/daily-report/GetDailyExpense';
import { DailyRevenueResponse, DailyExpenseResponse } from '@/src/types';
import { Line } from '@ant-design/charts';
import { MailOutlined } from '@ant-design/icons';
import { ClipboardPen } from 'lucide-react';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const DailyReport: React.FC = () => {
    const [form] = Form.useForm();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [revenueData, setRevenueData] = useState<DailyRevenueResponse[]>([]);
    const [expenseData, setExpenseData] = useState<DailyExpenseResponse[]>([]);
    const [activeTab, setActiveTab] = useState<string>('1');

    console.log(startDate, endDate);

    const handleGenerateReport = async () => {
        if (!startDate || !endDate) {
            message.error('Please select a valid date range');
            return;
        }
        try {
            if (activeTab === '1') {
                const data = await GetDailyRevenue(startDate, endDate);
                setRevenueData(data);
            } else if (activeTab === '2') {
                const data = await GetDailyExpense(startDate, endDate);
                setExpenseData(data);
            }
        } catch (error : any) {
            message.error(`Failed to fetch report data: ${error.response?.data || error.message}`);
        }
    };

    const calculateSummary = (data: any[], key: string) => {
        if (!Array.isArray(data)) {
            return 0;
        }
        return data.reduce((acc, item) => acc + item[key], 0);
    };

    const lineConfig = (data: any[], yKey: string, yLabel: string) => ({
        data,
        height: 400,
        xField: 'date',
        yField: yKey,
        xAxis: { title: { text: 'Date' }, type: 'timeCat', tickCount: 10 },
        yAxis: { title: { text: yLabel } },
        smooth: true,
        meta: {
            date: { alias: 'Date', formatter: (val: string) => moment(val).format('DD/MM/YY') },
            [yKey]: { alias: yLabel },
        },
    });


    return (
        <Form form={form} layout="vertical">
            <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
                <TabPane tab="Daily Revenue" key="1">
                    <Form.Item label="Select Date Range">
                        <RangePicker
                            onChange={(dates) => {
                                if (dates) {
                                    setStartDate(dates[0]?.format('YYYY-MM-DD') || null);
                                    setEndDate(dates[1]?.format('YYYY-MM-DD') || null);
                                }
                            }}
                        />
                    </Form.Item>
                    <Button type="primary" onClick={handleGenerateReport}>Generate Report</Button>
                    <Row gutter={16} style={{ marginTop: 20 }}>
                        <Col span={8}>
                            <Card title="Total Orders" bordered={false}>
                                {calculateSummary(revenueData, 'totalOrders')}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Products Sold" bordered={false}>
                                {calculateSummary(revenueData, 'totalProductsSold')}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Revenue" bordered={false}>
                                {calculateSummary(revenueData, 'totalRevenue')}
                            </Card>
                        </Col>
                    </Row>
                    <Line {...lineConfig(revenueData, 'totalRevenue', 'Total Revenue')} />
                </TabPane>
                <TabPane tab="Daily Expense" key="2">
                    <Form.Item label="Select Date Range">
                        <RangePicker
                            onChange={(dates) => {
                                if (dates) {
                                    setStartDate(dates[0]?.format('YYYY-MM-DD') || null);
                                    setEndDate(dates[1]?.format('YYYY-MM-DD') || null);
                                }
                            }}
                        />
                    </Form.Item>
                    <Button type="primary" onClick={handleGenerateReport}>Generate Report</Button>
                    <Row gutter={16} style={{ marginTop: 20 }}>
                        <Col span={8}>
                            <Card title="Total Invoices" bordered={false}>
                                {calculateSummary(expenseData, 'totalInvoices')}
                                \
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Products" bordered={false}>
                                {calculateSummary(expenseData, 'totalProducts')}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Expense" bordered={false}>
                                {calculateSummary(expenseData, 'totalExpense')}
                            </Card>
                        </Col>
                    </Row>
                    <Line {...lineConfig(expenseData, 'totalExpense', 'Total Expense')} />
                </TabPane>
            </Tabs>
        </Form>
    );
};

export default DailyReport;
