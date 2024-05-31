import React from 'react';
import { Table, Button, Drawer, Descriptions } from 'antd';
import { format } from 'date-fns';
import { ImportInvoice, ImportDetail, UserProps } from '@/src/types';

interface ManageImportProps {
    imports: ImportInvoice[];
    users: { [key: string]: UserProps };
    loading: boolean;
    onAddNewImport: () => void;
    onViewImport: (importId: string) => void;
    drawerVisible: boolean;
    selectedImportDetail: ImportDetail | null;
    onCloseDrawer: () => void;
}

const ManageImport: React.FC<ManageImportProps> = ({
    imports,
    users,
    loading,
    onAddNewImport,
    onViewImport,
    drawerVisible,
    selectedImportDetail,
    onCloseDrawer
}) => {
    const columns = [
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => format(new Date(text), 'dd/MM/yyyy HH:mm:ss')
        },
        {
            title: 'Ngày chỉnh sửa',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => format(new Date(text), 'dd/MM/yyyy HH:mm:ss')
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (text: string) => {
                const user = users[text];
                return user ? (
                    <div className="flex items-center">
                        <img src={user.image || '/nextjs-logo.jpg'} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                        {user.fullName}
                    </div>
                ) : 'Loading...';
            }
        },
        {
            title: 'Người chỉnh sửa',
            dataIndex: 'updateBy',
            key: 'updateBy',
            render: (text: string) => {
                const user = users[text];
                return user ? (
                    <div className="flex items-center">
                        <img src={user.image || '/nextjs-logo.jpg'} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                        {user.fullName}
                    </div>
                ) : 'Loading...';
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: { id: string; }) => (
                <Button onClick={() => onViewImport(record.id)}>View</Button>
            )
        }
    ];

    return (
        <div className="container mx-auto my-10">
            <Button type="primary" onClick={onAddNewImport} className="mb-4">
                Add New Import
            </Button>
            <Table
                columns={columns}
                dataSource={imports}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 6 }}
                className="min-w-full rounded-lg shadow-sm border border-gray-400"
                bordered
            />
            <Drawer
                title="Import Detail"
                placement="left"
                closable={true}
                onClose={onCloseDrawer}
                visible={drawerVisible}
                width={640}
            >
                {selectedImportDetail && (
                    <Descriptions column={1}>
                        <Descriptions.Item label="Ngày tạo">
                            {format(new Date(selectedImportDetail.importInvoice.createdAt), 'dd/MM/yyyy HH:mm:ss')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày chỉnh sửa">
                            {format(new Date(selectedImportDetail.importInvoice.updatedAt), 'dd/MM/yyyy HH:mm:ss')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người tạo">
                            {users[selectedImportDetail.importInvoice.createdBy]?.fullName || 'Loading...'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Người chỉnh sửa">
                            {users[selectedImportDetail.importInvoice.updatedBy]?.fullName || 'Loading...'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {selectedImportDetail.importInvoice.total}
                        </Descriptions.Item>
                        <Descriptions.Item label="Chi tiết sản phẩm">
                            {selectedImportDetail.productItem.map(item => (
                                <div key={item.id} className="border p-2 my-2 rounded">
                                    <div>Size: {item.sizeName}</div>
                                    <div>Color: {item.colorName}</div>
                                    <div>Quantity: {item.quantity}</div>
                                </div>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Drawer>
        </div>
    );
};

export default ManageImport;
