import { LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React from 'react'

export default function Back() {
    const router = useRouter()
    return (
        <div
            onClick={() => router.back()}
            className="flex flex-row items-center space-x-2 cursor-pointer my-8"
        >
            <LeftOutlined className="bg-white p-2 rounded-sm" />
            <span className="font-bold font-prompt text-lg">Back</span>
        </div>
    )
}
