import { Button, Form, Input, InputNumber, Modal, Space } from 'antd'
import { Button as MyButton } from '@/components/common/Button'
import React, { useEffect, useState } from 'react'
import { api } from '@/services/axios'
import { RootState } from 'store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from 'store/slices/itemSlices'

interface Props {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
    isSuccess: (val: any) => void
}

function footer() {}
function AddItem(props: Props) {
    const [name, setname] = useState('')
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState('')
    const dispatch = useDispatch()
    const itemState = useSelector((state: RootState) => state.item)
    const handleOk = async () => {
        try {
            dispatch(
                addItem({
                    name,
                    price,
                    description: desc,
                }) as any,
            )

            setname('')
            setprice(0)
            setdesc('')
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
                        isLoading={itemState.status === 'loading'}
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
                    <Form.Item label="Price">
                        <InputNumber
                            value={price}
                            onChange={(e: number | null) => setprice(e || 0)}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddItem
