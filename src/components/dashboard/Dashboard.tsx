"use client";

import React, { useState, useEffect } from 'react';
import { DatePicker, Card, Row, Col, Table, message } from 'antd';
import moment, { Moment } from 'moment';
import { Column } from '@ant-design/plots';
import { GetAllOrders } from '@/src/api/orders/GetAllOrders';
import { GetDailyRevenue } from '@/src/api/reports/daily-report/GetDailyRevenue';
import { GetAllCustomers } from '@/src/api/customers/GetAllCustomers';
import { GetAllStaffs } from '@/src/api/users/GetAllStaffs';
import { Orders, DailyRevenueResponse, UserProps } from '@/src/types';

const { RangePicker } = DatePicker;

const Dashboard: React.FC = () => {
    const [startDate, setStartDate] = useState<Moment | null>(null);
    const [endDate, setEndDate] = useState<Moment | null>(null);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [totalStaff, setTotalStaff] = useState<number>(0);
    const [dailyRevenue, setDailyRevenue] = useState<DailyRevenueResponse[]>([]);
    const [orders, setOrders] = useState<Orders[]>([]);
    const [customers, setCustomers] = useState<UserProps[]>([]);
    const [staffs, setStaffs] = useState<UserProps[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await GetAllOrders();
                setOrders(data || []);
            } catch (error) {
                message.error('Failed to fetch orders');
            }
        };

        const fetchDailyRevenue = async () => {
            try {
                const firstDayOfMonth = moment().startOf('month').format('YYYY-MM-DD');
                const lastDayOfMonth = moment().endOf('month').format('YYYY-MM-DD');
                const data = await GetDailyRevenue(firstDayOfMonth, lastDayOfMonth);
                setDailyRevenue(data);
            } catch (error) {
                message.error('Failed to fetch daily revenue');
            }
        };

        const fetchCustomers = async () => {
            try {
                const data = await GetAllCustomers();
                setCustomers(data);
            } catch (error) {
                message.error('Failed to fetch customers');
            }
        };

        const fetchStaffs = async () => {
            try {
                const data = await GetAllStaffs();
                setStaffs(data);
            } catch (error) {
                message.error('Failed to fetch staffs');
            }
        };

        fetchOrders();
        fetchDailyRevenue();
        fetchCustomers();
        fetchStaffs();
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const filteredOrders = orders?.filter(order =>
                moment(order.orderDate).isBetween(startDate, endDate, 'days', '[]')
            ) || [];
            setTotalOrders(filteredOrders.length);

            const filteredCustomers = customers?.filter(customer =>
                moment(customer.createdAt).isBetween(startDate, endDate, 'days', '[]')
            ) || [];
            setTotalCustomers(filteredCustomers.length);

            const filteredStaffs = staffs?.filter(staff =>
                moment(staff.createdAt).isBetween(startDate, endDate, 'days', '[]')
            ) || [];
            setTotalStaff(filteredStaffs.length);

            const filteredRevenue = dailyRevenue.filter(revenue =>
                moment(revenue.date).isBetween(startDate, endDate, 'days', '[]')
            );
            setTotalRevenue(filteredRevenue.reduce((acc, curr) => acc + curr.totalRevenue, 0));
        }
    }, [startDate, endDate, orders, customers, staffs, dailyRevenue]);

    const handleDateChange = (dates: [Moment, Moment] | null) => {
        if (dates) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Customer Phone',
            dataIndex: 'customerPhone',
            key: 'customerPhone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <div>
            <RangePicker onChange={handleDateChange} />

            <Row gutter={16} className="mt-4">
                <Col span={6}>
                    <Card title="Total Orders" bordered={false}>
                        {totalOrders}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Revenue" bordered={false}>
                        {totalRevenue}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Customers" bordered={false}>
                        {totalCustomers}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Staff" bordered={false}>
                        {totalStaff}
                    </Card>
                </Col>
            </Row>

            <Column
                data={dailyRevenue}
                xField="date"
                yField="totalRevenue"
                xAxis={{
                    label: {
                        formatter: (val: string) => moment(val).format('DD/MM/YYYY'),
                        rotate: 45,
                    },
                }}
                columnStyle={{
                    fill: 'blue',
                }}
            />

            <Table
                dataSource={orders.slice(0, 6)}
                columns={columns}
                rowKey="orderId"
                className="mt-4"
            />
        </div>
    );
};

export default Dashboard;
