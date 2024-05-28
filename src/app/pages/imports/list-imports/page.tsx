"use client";
import React, { useEffect, useState } from 'react';
import { GetAllImport } from '@/src/api/import/GetAllImport';
import { GetUserById } from '@/src/api/users/GetUserById';
import { GetImportById } from '@/src/api/import/GetImportById';
import { GetDetailProduct } from '@/src/api/products/GetDetailProduct';

import ManageImport from '@/src/components/ManageImport';

import { ImportInvoice, ImportDetail, UserProps } from '@/src/types';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { Import } from 'lucide-react';


const ManageImportPage = () => {
    const [imports, setImports] = useState<ImportInvoice[]>([]);
    const [users, setUsers] = useState<{ [key: string]: UserProps }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedImportDetail, setSelectedImportDetail] = useState<ImportDetail | null>(null);
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const importsData = await GetAllImport();
                const usersData: { [key: string]: UserProps } = {};
                console.log(importsData)

                for (let importInvoice of importsData) {
                    if (!usersData[importInvoice.createdBy]) {
                        const user = await GetUserById(importInvoice.createdBy);
                        if (user) {
                            usersData[importInvoice.createdBy] = user;
                        }
                    }
                    if (!usersData[importInvoice.updatedBy]) {
                        const user = await GetUserById(importInvoice.updatedBy);
                        if (user) {
                            usersData[importInvoice.updatedBy] = user;
                        }
                    }
                }

                setImports(importsData);
                setUsers(usersData);
            } catch (error) {
                message.error('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewImport = async (importId: string) => {
        setLoading(true);
        try {
            const response = await GetImportById(importId);
            if (response) {
                const importDetail: ImportDetail = response.data;
                const productItems = [];

                for (let item of importDetail.productItem) {
                    const productItemDetail = await GetDetailProduct(item.id);
                    productItems.push(productItemDetail);
                }

                importDetail.productItem = productItems;
                setSelectedImportDetail(importDetail);
                setDrawerVisible(true);
            }
        } catch (error) {
            message.error('Failed to fetch import detail');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-2xl border border-gray-200 h-full w-full rounded-3xl">
        
        <div className="flex space-y-0 mb-6 ml-0 border border-gray-300 space-x-2 items-center bg-white rounded-xl shadow-xl w-1/4 h-12"> 
            <Import className="ml-5 flex text-lg font-bold text-center text-indigo-600" />
            <h3 className="space-y-0 font-semibold">Manage invoice</h3>
        </div>
            <ManageImport
                imports={imports}
                users={users}
                loading={loading}
                onAddNewImport={() => router.push('/pages/add-import')}
                onViewImport={handleViewImport}
                drawerVisible={drawerVisible}
                selectedImportDetail={selectedImportDetail}
                onCloseDrawer={() => setDrawerVisible(false)}
            />
        </div>
    );
};

export default ManageImportPage;
