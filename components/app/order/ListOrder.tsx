import Action from '@/components/common/Action'
import { Button } from '@/components/common/Button'
import Container from '@/components/common/Container'
import { api } from '@/services/axios'
import { DeleteFilled, EditFilled, SearchOutlined } from '@ant-design/icons'
import { Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder } from 'store/slices/orderSlices'
import { RootState } from 'store/store'
import DetailOrder from './DetailOrder'
import AddOrder from './AddOrder'
import clsx from 'clsx'

interface IOrder {
    code: string
    date: string
    address: string
    customer: any
    order_items: any
}

export default function ListOrder() {
    const [data, setdata] = useState([])
    const [selected, setselected] = useState<any>()
    const [DetailModal, setDetailModal] = useState(false)
    const [addNewModal, setaddNewModal] = useState(false)
    const handleAddNew = (value: any) => {
        const newData: any = [...data, value]
        setdata(newData)
    }
    const dispatch = useDispatch()
    const orderState = useSelector((state: RootState) => state.order)
    const userState = useSelector((state: RootState) => state.user)
    useEffect(() => {
        dispatch(fetchOrder() as any)
    }, [])

    const columns: ColumnsType<IOrder> = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            className: 'bg-white',
            sorter: (a: IOrder, b: IOrder) => a.code.localeCompare(b.code),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align: 'right',
            className: 'bg-white',
            sorter: (a: IOrder, b: IOrder) => a.date.localeCompare(b.date),
            render(value, record, index) {
                return value.substring(0, 10)
            },
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            className: 'bg-white',
            sorter: (a: IOrder, b: IOrder) =>
                a.address.localeCompare(b.address),
            responsive: ['md'],
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
            className: 'bg-white',
            sorter: (a: IOrder, b: IOrder) =>
                a.customer?.name.localeCompare(b.customer?.name),
            responsive: ['md'],
            render(value, record, index) {
                return <a>{value?.name}</a>
            },
        },
        {
            title: 'Transaction',
            key: 'transaction',
            align: 'right',
            className: 'bg-white',
            sorter: (a: IOrder, b: IOrder) =>
                a.customer?.name.localeCompare(b.customer?.name),
            responsive: ['md'],
            render(value, record, index) {
                const a = record.order_items.reduce(function (
                    acc: any,
                    obj: any,
                ) {
                    return acc + (obj.qty * obj.price - obj.discount)
                },
                0)
                return <a>{a.toLocaleString('en')}</a>
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
                        onClick={() => {
                            setselected({ ...record })
                            setDetailModal(true)
                        }}
                        className="text-green-700"
                    />
                </Space>
            ),
        },
    ]

    return (
        <Container>
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 justify-between orders-center">
                <h1
                    className="font-bold text-lg
                "
                >
                    List Order
                </h1>
                <div className=" flex space-x-2 md:orders-center">
                    <div className="flex  orders-center">
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

            <Table columns={columns} dataSource={orderState.data} />
            <DetailOrder
                data={selected}
                isOpen={DetailModal}
                setIsOpen={setDetailModal}
            />
            <AddOrder
                isOpen={addNewModal}
                setIsOpen={setaddNewModal}
                isSuccess={handleAddNew}
            />
        </Container>
    )
}
