import { Button, Form, Input, InputNumber, Modal, Space } from 'antd'
import { Button as MyButton } from '@/components/common/Button'
import React, { useEffect, useState } from 'react'
import { api } from '@/services/axios'
import { RootState } from 'store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from 'store/slices/itemSlices'

interface Props {
    isOpen: boolean
    data: any
    setIsOpen: (val: boolean) => void
}
function DetailOrder(props: Props) {
    const handleCancel = () => {
        props.setIsOpen(false)
    }

    const total = props.data
        ? props.data.order_items.reduce(function (acc: any, obj: any) {
              return acc + (obj.qty * obj.price - obj.discount)
          }, 0)
        : 0
    return (
        <>
            <Modal
                title="Detail Order"
                open={props.isOpen}
                width={1000}
                onCancel={handleCancel}
                footer={[
                    <MyButton
                        onClick={handleCancel}
                        type="ghost"
                        size="sm"
                        key="back"
                    >
                        close
                    </MyButton>,
                ]}
            >
                {props.data && (
                    <div className="space-y-4">
                        <table className="desctable">
                            <tr>
                                <td>Customer</td>
                                <td>{props.data.customer.name}</td>
                            </tr>
                            <tr>
                                <td>Code</td>
                                <td>{props.data.code}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{props.data.date}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{props.data.address}</td>
                            </tr>
                        </table>
                        <h1 className="border-b border-primary-base text-primary-base text-lg p-2 font-bold">
                            List Item
                        </h1>
                        <table className="tablelist">
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
                                {props.data.order_items.map(function (
                                    object: any,
                                    i: number,
                                ) {
                                    return (
                                        <tr
                                            key={object.uuid}
                                            className="text-center"
                                        >
                                            <td>{object.item.name}</td>
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
                                                    object.qty * object.price -
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
                )}
            </Modal>
        </>
    )
}

export default DetailOrder
