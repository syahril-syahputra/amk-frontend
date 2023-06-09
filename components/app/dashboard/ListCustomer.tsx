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
import React, { ReactNode, useEffect, useState } from 'react'
import AddCustomer from './AddCustomer'
import { useDispatch, useSelector } from 'react-redux'
import { CustomerState, fetchData } from 'store/slices/customerSlices'
import { RootState } from 'store/store'
import clsx from 'clsx'

interface ICustomer {
    id: number
    name: string
    address: string
    phone: string
    transaction?: number
}
export default function DigitalAsset() {
    const dispatch = useDispatch()
    const [data, setdata] = useState<ICustomer[]>([])
    const customerState = useSelector((state: RootState) => state.customer)
    const userState = useSelector((state: RootState) => state.user)
    useEffect(() => {
        dispatch(fetchData() as any)
    }, [])

    const [addNewModal, setaddNewModal] = useState(false)
    const handleAddNew = (value: any) => {
        const newData: any = [...data, value]
        setdata(newData)
    }

    const columns: ColumnsType<ICustomer> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            className: 'bg-white',
            sorter: (a: ICustomer, b: ICustomer) =>
                a.name.localeCompare(b.name),
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
            sorter: (a: ICustomer, b: ICustomer) =>
                a.phone.localeCompare(b.phone),
            responsive: ['md'],
        },
        // {
        //     title: 'Transaction',
        //     dataIndex: 'transaction',
        //     key: 'transaction',
        //     align: 'right',
        //     className: 'bg-white',
        //     sorter: (a: ICustomer, b: ICustomer) =>
        //         (a.transaction || 0) - (b.transaction || 0),
        //     render(value, record, index) {
        //         return value || 0
        //     },
        // },
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
                        className={clsx('text-red-700 hidden md:flex', [
                            userState.data?.level === 'user'
                                ? 'md:hidden'
                                : 'md:flex',
                        ])}
                    />
                    <Action
                        small
                        leftIcon={<EditFilled />}
                        label="Edit"
                        className={clsx('text-primary-700 hidden md:flex', [
                            userState.data?.level === 'user'
                                ? 'md:hidden'
                                : 'md:flex',
                        ])}
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
                    {userState.data?.level === 'admin' && (
                        <Button onClick={() => setaddNewModal(true)}>
                            Add New
                        </Button>
                    )}
                </div>
            </div>

            <Table columns={columns} dataSource={customerState.data} />
            <AddCustomer
                isOpen={addNewModal}
                setIsOpen={setaddNewModal}
                isSuccess={handleAddNew}
            />
        </Container>
    )
}
