import { Button, Form, Input, InputNumber, Modal, Space } from 'antd'
import { Button as MyButton } from '@/components/common/Button'
import React, { useEffect, useState } from 'react'
import { api } from '@/services/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer } from 'store/slices/customerSlices'
import { RootState } from 'store/store'

interface Props {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
    isSuccess: (val: any) => void
}

function AddCustomer(props: Props) {
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const dispatch = useDispatch()
    const customerState = useSelector((state: RootState) => state.customer)
    const handleOk = async () => {
        try {
            dispatch(
                addCustomer({
                    name,
                    address,
                    phone,
                }) as any,
            )
            setname('')
            setaddress('')
            setphone('')
        } catch (handleOk) {}
        props.setIsOpen(false)
    }

    const handleCancel = () => {
        props.setIsOpen(false)
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                open={props.isOpen}
                onOk={handleOk}
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
                        isLoading={customerState.status === 'loading'}
                        onClick={handleOk}
                    >
                        Submit
                    </MyButton>,
                ]}
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Name">
                        <Input
                            className="w-full"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="address">
                        <Input
                            className="w-full"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Phone">
                        <Input
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddCustomer
