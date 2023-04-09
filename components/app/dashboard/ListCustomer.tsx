import Action from '@/components/common/Action'
import { Button } from '@/components/common/Button'
import Container from '@/components/common/Container'
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

interface ICustomer {
    id: number
    name: string
    address: string
    phone: string
    transaction: number
}
export const TabBarExtraContent = () => {
    const handleChange = () => {}
    return (
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
            <Button>Add New</Button>
        </div>
    )
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
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) => a.phone.localeCompare(b.phone),
    },
    {
        title: 'Phone Number',
        dataIndex: 'transaction',
        key: 'transaction',
        align: 'right',
        className: 'bg-white',
        sorter: (a: ICustomer, b: ICustomer) => a.transaction - b.transaction,
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
                    className="text-red-700"
                />
                <Action
                    small
                    leftIcon={<EditFilled />}
                    label="Edit"
                    className="text-primary-700"
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
        const newData: ICustomer[] = []

        newData.push({
            id: 1,
            name: 'Syahril',
            address: 'Perm',
            phone: '085255251881',
            transaction: 2,
        })
        newData.push({
            id: 2,
            name: 'azka',
            address: 'lkkjmkljasd',
            phone: '9812378923',
            transaction: 4,
        })
        for (let i = 1; i <= 400; i++) {
            newData.push({
                id: i,
                name: 'arsya',
                address: 'akjsdhjaksd',
                phone: '082371',
                transaction: 0,
            })
        }
        setdata(newData)
    }, [])
    return (
        <Container>
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 justify-between items-center">
                <h1
                    className="font-bold text-lg
                "
                >
                    List Customer
                </h1>
                <TabBarExtraContent />
            </div>

            <Table columns={columns} dataSource={data} />
        </Container>
    )
}
