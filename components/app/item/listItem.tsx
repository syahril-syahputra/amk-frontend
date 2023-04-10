import Action from '@/components/common/Action'
import { Button } from '@/components/common/Button'
import Container from '@/components/common/Container'
import { api } from '@/services/axios'
import { DeleteFilled, EditFilled, SearchOutlined } from '@ant-design/icons'
import { Input, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { ReactNode, useEffect, useState } from 'react'
import AddItem from './AddItem'

interface IItem {
    uuid: string
    name: string
    price: number
    description: string
}

const columns: ColumnsType<IItem> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'bg-white',
        sorter: (a: IItem, b: IItem) => a.name.localeCompare(b.name),
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'proce',
        align: 'right',
        className: 'bg-white',
        sorter: (a: IItem, b: IItem) => a.price - b.price,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        className: 'bg-white',
        sorter: (a: IItem, b: IItem) =>
            a.description.localeCompare(b.description),
        responsive: ['md'],
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
export default function ListItem() {
    const [data, setdata] = useState([])
    const [addNewModal, setaddNewModal] = useState(false)
    const handleAddNew = (value: any) => {
        const newData: any = [...data, value]
        setdata(newData)
    }
    useEffect(() => {
        const newData: any = []
        const fetchData = async () => {
            const data = await api.get('/items')
            if (data) setdata(data.data as any)
        }

        fetchData().catch(console.error)
    }, [])
    return (
        <Container>
            <div className="flex md:flex-row flex-col md:space-y-0 space-y-4 justify-between items-center">
                <h1
                    className="font-bold text-lg
                "
                >
                    List Item
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
            <AddItem
                isOpen={addNewModal}
                setIsOpen={setaddNewModal}
                isSuccess={handleAddNew}
            />
        </Container>
    )
}
