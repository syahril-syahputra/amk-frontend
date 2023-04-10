import { Button, Form, Input, InputNumber, Modal, Select, Space } from 'antd'
import { Button as MyButton } from '@/components/common/Button'
import React, { useEffect, useState } from 'react'
import { api } from '@/services/axios'
import { RootState } from 'store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from 'store/slices/itemSlices'
import { addOrder } from 'store/slices/orderSlices'

interface Props {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
    isSuccess: (val: any) => void
}

function footer() {}
function AddOrder(props: Props) {
    const [customerid, setcustomerid] = useState('')
    const [code, setcode] = useState('')
    const [address, setaddress] = useState('')

    const [item, setitem] = useState('')
    const [itemName, setItemName] = useState('')
    const [qty, setqty] = useState(0)
    const [price, setprice] = useState(0)
    const [discount, setdiscount] = useState(0)
    const [note, setnote] = useState('')
    const [order_item, setorder_item] = useState<any>([])
    const [total, settotal] = useState(0)

    const dispatch = useDispatch()
    const customerState = useSelector((state: RootState) => state.customer)
    const itemState = useSelector((state: RootState) => state.item)
    const handleOk = async () => {
        const data = {
            customer_id: customerid,
            code,
            address,
            items: order_item,
        }
        dispatch(addOrder(data) as any)
        props.setIsOpen(false)
    }

    const addHandler = () => {
        const data = {
            itemName,
            item_id: item,
            qty,
            price,
            discount,
            note: note || 'Catatan',
        }
        setorder_item([...order_item, data])
        setitem('')
        setqty(0)
        setprice(0)
        setdiscount(0)
        setnote('')
        settotal(total + (qty * price - discount))
    }
    const handleCancel = () => {
        props.setIsOpen(false)
    }

    return (
        <>
            <Modal
                title="Add Order"
                open={props.isOpen}
                onOk={handleOk}
                width={1000}
                onCancel={handleCancel}
                footer={[
                    <MyButton
                        onClick={handleCancel}
                        type="ghost"
                        size="sm"
                        key="back"
                    >
                        Cancel
                    </MyButton>,
                    <a key="separator" className="mx-2">
                        |
                    </a>,
                    <MyButton
                        key="submit"
                        type="primary"
                        size="sm"
                        // isLoading={itemState.status === 'loading'}
                        onClick={handleOk}
                    >
                        Submit
                    </MyButton>,
                ]}
            >
                <div className="space-y-4">
                    <table className="desctable w-full text-left flex-1">
                        <tr>
                            <td className="w-[20%]">Customer</td>
                            <td>
                                <Select
                                    showSearch
                                    className="w-full bg-neutral-100"
                                    filterOption={(
                                        input: string,
                                        option: any,
                                    ) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    onChange={(val: string) =>
                                        setcustomerid(val)
                                    }
                                    options={customerState.data?.map(
                                        (data: any) => {
                                            return {
                                                value: data.uuid,
                                                label: data.name,
                                            }
                                        },
                                    )}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="w-[20%]">Code</td>
                            <td>
                                <Input
                                    className="w-full"
                                    value={code}
                                    onChange={(e) => setcode(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="w-[20%]">Address</td>
                            <td>
                                <Input
                                    className="w-full"
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                />
                            </td>
                        </tr>
                    </table>

                    <h1 className="border-b border-primary-base text-primary-base text-lg p-2 font-bold">
                        List Item
                    </h1>
                    <div className="flex-1 flex">
                        <table className="desctable w-[30%] text-left">
                            <tr>
                                <td className="w-[20%]">Item</td>
                                <td>
                                    <Select
                                        showSearch
                                        className="w-full bg-neutral-100"
                                        filterOption={(
                                            input: string,
                                            option: any,
                                        ) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        onChange={(
                                            val: string,
                                            iption: any,
                                        ) => {
                                            setitem(val)
                                            setItemName(iption.label)
                                        }}
                                        options={itemState.data?.map(
                                            (data: any) => {
                                                return {
                                                    value: data.uuid,
                                                    label: data.name,
                                                }
                                            },
                                        )}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-[20%]">Quantity</td>
                                <td>
                                    <InputNumber
                                        value={qty}
                                        className="w-full"
                                        onChange={(e: number | null) =>
                                            setqty(e || 0)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-[20%]">Price</td>
                                <td>
                                    <InputNumber
                                        value={price}
                                        className="w-full"
                                        onChange={(e: number | null) =>
                                            setprice(e || 0)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-[20%]">Discount</td>
                                <td>
                                    <InputNumber
                                        value={discount}
                                        className="w-full"
                                        onChange={(e: number | null) =>
                                            setdiscount(e || 0)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-[20%]">Note</td>
                                <td>
                                    <Input
                                        className="w-full"
                                        value={note}
                                        onChange={(e) =>
                                            setnote(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-right">
                                    <MyButton size="sm" onClick={addHandler}>
                                        Add Item
                                    </MyButton>
                                </td>
                            </tr>
                        </table>
                        <div className=" flex-1 bg-newtral-50">
                            <table className="tablelist bg-white">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Note</th>
                                        <th>quantity</th>
                                        <th>price</th>
                                        <th>discount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order_item.map(function (
                                        object: any,
                                        i: number,
                                    ) {
                                        return (
                                            <tr key={i} className="text-center">
                                                <td>{object.itemName}</td>
                                                <td>{object.note}</td>
                                                <td>{object.qty}</td>
                                                <td align="right">
                                                    {parseInt(
                                                        object.price,
                                                    ).toLocaleString('en')}
                                                </td>
                                                <td align="right">
                                                    {' '}
                                                    {parseInt(
                                                        object.discount,
                                                    ).toLocaleString('en')}
                                                </td>
                                                <td align="right">
                                                    {(
                                                        object.qty *
                                                            object.price -
                                                        object.discount
                                                    ).toLocaleString('en')}
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    <tr className="font-bold text-right">
                                        <td colSpan={5}>Total</td>
                                        <td align="right">
                                            {total.toLocaleString('en')}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddOrder
