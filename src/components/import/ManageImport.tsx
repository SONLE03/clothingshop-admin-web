"use client";

import React, { useEffect, useState } from 'react';
import { Table, Avatar, Drawer, Button } from 'antd';

import { ImportInvoice, ImportDetailResponse, UserProps } from '@/src/types';
import { GetAllImport } from '@/src/api/import/GetAllImport';
import { GetUserById } from '@/src/api/users/GetUserById';
import { GetImportById } from '@/src/api/import/GetImportById';

const ManageImport: React.FC = () => {
    const [imports, setImports] = useState<ImportInvoice[]>([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedImport, setSelectedImport] = useState<ImportInvoice | null>(null);
    const [importDetails, setImportDetails] = useState<ImportDetailResponse | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        const fetchImports = async () => {
            try {
                const data = await GetAllImport();
                setImports(data);
            } catch (error) {
                console.error('Failed to fetch imports:', error);
            }
        };
        fetchImports();
    }, []);

    const handleViewDetails = async (record: ImportInvoice) => {
        try {
            const userData = await GetUserById(record.createdBy);
            setUser(userData);
            const importData = await GetImportById(record.id);
            setImportDetails(importData.data);
            setSelectedImport(record);
            setDrawerVisible(true);
        } catch (error) {
            console.error('Failed to fetch import details:', error);
        }
    };

    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (createdBy: string) => (
                user && user.id === createdBy ? (
                    <div>
                        <Avatar src={user.image || '/nextjs-logo.jpg'} />
                        <span>{user.fullName}</span>
                    </div>
                ) : null
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ImportInvoice) => (
                <Button onClick={() => handleViewDetails(record)}>View</Button>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={imports} rowKey="id" />
            <Drawer
                title="Import Details"
                placement="right"
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={640}
            >
                {selectedImport && (
                    <div>
                        <p><strong>Import ID:</strong> {selectedImport.id}</p>
                        <p><strong>Created At:</strong> {selectedImport.createdAt}</p>
                        <p><strong>Created By:</strong> {user ? user.fullName : selectedImport.createdBy}</p>
                        <p><strong>Total:</strong> {selectedImport.total}</p>
                        <Table
                            columns={[
                                { title: 'Product Item', dataIndex: 'productItem', key: 'productItem' },
                                { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
                                { title: 'Price', dataIndex: 'price', key: 'price' },
                                { title: 'Total', dataIndex: 'total', key: 'total' },
                            ]}
                            dataSource={importDetails?.importItemResponseList || []}
                            rowKey="productItem"
                            pagination={false}
                        />
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default ManageImport;
