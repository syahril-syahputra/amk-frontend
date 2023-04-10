import Action from '@/components/common/Action'
import { Button } from '@/components/common/Button'
import Container from '@/components/common/Container'
import { api } from '@/services/axios'
import {
    DeleteFilled,
    EditFilled,
    MoreOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import { Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'
import AddCustomer from './AddCustomer'

interface ICustomer {
    id: number
    name: string
    address: string
    phone: string
    transaction?: number
}
const columns: ColumnsType<ICustomer> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) => a.name.localeCompare(b.name),
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) =>
            a.address.localeCompare(b.address),
        responsive: ['md'],
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) => a.phone.localeCompare(b.phone),
        responsive: ['md'],
    },
    {
        title: 'Transaction',
        dataIndex: 'transaction',
        key: 'transaction',
        align: 'right',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) =>
            (a.transaction || 0) - (b.transaction || 0),
        render(value, record, index) {
            return value || 0
        },
    },
    {
        title: 'Action',
        key: 'action',
        align: 'right',
        className: 'bg-white',
        render: (_, record) => (
            <Space size="small">
                <Action
                    small
                    leftIcon={<DeleteFilled />}
                    label="Delete"
                    className="text-red-700 hidden md:flex"
                />
                <Action
                    small
                    leftIcon={<EditFilled />}
                    label="Edit"
                    className="text-primary-700 hidden md:flex"
                />
                <Action
                    small
                    leftIcon={<DeleteFilled />}
                    label="Detail"
                    className="text-green-700"
                />
            </Space>
        ),
    },
]
export default function DigitalAsset() {
    const [data, setdata] = useState<ICustomer[]>([])
    useEffect(() => {
        const newData: any = []
        const fetchData = async () => {
            const data = await api.get('/customer')
            if (data) setdata(data.data as any)
        }

        fetchData().catch(console.error)
    }, [])

    const [addNewModal, setaddNewModal] = useState(false)
    const handleAddNew = (value: any) => {
        const newData: any = [...data, value]
        setdata(newData)
    }
    return (
        <Container>
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 justify-between items-center">
                <h1
                    className="font-bold text-lg
                "
                >
                    List Customer
                </h1>
                <div className=" flex space-x-2 md:items-center">
                    <div className="flex  items-center">
                        <div className="date-picker-with-icon">
                            <SearchOutlined />
                            <Input
                                size="large"
                                placeholder="Search by date"
                                className="text-newtral-500"
                                bordered={false}
                            />
                        </div>
                    </div>
                    <Button onClick={() => setaddNewModal(true)}>
                        Add New
                    </Button>
                </div>
            </div>

            <Table columns={columns} dataSource={data} />
            <AddCustomer
                isOpen={addNewModal}
                setIsOpen={setaddNewModal}
                isSuccess={handleAddNew}
            />
        </Container>
    )
}
