import React, { ChangeEvent, ReactNode, useState } from 'react'
import clsx from 'clsx'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import useToggle from '@/hooks/useToggle'
import { Select } from 'antd'
import Image from 'next/image'

interface InputProps {
    type:
        | 'text'
        | 'password'
        | 'number'
        | 'tel'
        | 'email'
        | 'date'
        | 'hidden'
        | 'area'
        | 'coin'
    placeholder?: string
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    error?: string
    block?: Boolean
    iconLeft?: ReactNode
    value?: string | number
    rightIcon?: ReactNode
    readOnly?: boolean
}

export const InputForm = ({
    type,
    placeholder,
    block,
    iconLeft,
    onChange,
    error,
    value,
    readOnly,
    rightIcon,
}: InputProps) => {
    const [showPass, setShowPass] = useToggle()
    return (
        <div>
            <div
                className={clsx(
                    'flex  focus-within:bg-white flex-row space-x-2 items-center justify-center rounded-lg border-solid border-[1px] focus-within:border-primary-700  py-[14px] px-[16px] relative',
                    [
                        error
                            ? 'border-warning-300 bg-warning-50'
                            : 'border-neutral-300',
                    ],
                    [block ? 'block' : 'inline-block'],
                    [readOnly ? 'bg-newtral-50' : 'bg-white'],
                )}
            >
                {iconLeft && iconLeft}
                {type === 'area' ? (
                    <textarea />
                ) : (
                    <input
                        type={showPass ? 'text' : type}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                        readOnly={readOnly}
                        disabled={readOnly}
                        className={clsx(
                            'box-border border-0 bg-inherit  outline-none text-[16px] flex-1 placeholder:text-newtral-500',
                        )}
                    />
                )}

                {type === 'password' && (
                    <div className="cursor-pointer" onClick={setShowPass}>
                        {showPass ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                )}
                {rightIcon && rightIcon}
            </div>
            {error && (
                <div
                    className={clsx(
                        'mx-[17px] mt-[8px]',
                        'text-[12px] text-newtral-800',
                    )}
                >
                    {error}
                </div>
            )}
        </div>
    )
}
