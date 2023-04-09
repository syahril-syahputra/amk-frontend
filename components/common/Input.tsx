import React, { ChangeEvent, ReactNode, useState } from 'react'
import clsx from 'clsx'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import useToggle from '@/hooks/useToggle'
import { Select } from 'antd'
import Image from 'next/image'

interface OptionProps {
    label: string
    icon: ReactNode
}
const OptionItem = (props: OptionProps) => {
    return (
        <span className="flex flex-row space-x-2 items-center">
            {props.icon && props.icon}
            <label className="cursor-pointer">{props.label}</label>
        </span>
    )
}
interface SelectProps {
    value?: string
}
const SelectCoin = (props: SelectProps) => {
    const handleChange = () => {}
    return (
        <Select
            defaultValue={props.value || 'bsud'}
            onChange={handleChange}
            bordered={false}
            options={[
                {
                    value: 'bsud',
                    label: (
                        <OptionItem
                            label="BSUD"
                            icon={
                                <Image
                                    alt=""
                                    width={20}
                                    height={20}
                                    src="/sample/coin-1.png"
                                    className="aspect-square w-6"
                                />
                            }
                        />
                    ),
                },
                {
                    value: 'usdc',
                    label: (
                        <OptionItem
                            label="USDC"
                            icon={
                                <Image
                                    alt=""
                                    width={20}
                                    height={20}
                                    src="/sample/coin-2.png"
                                    className="aspect-square w-6"
                                />
                            }
                        />
                    ),
                },
                {
                    value: 'usdt',
                    label: (
                        <OptionItem
                            label="USDT"
                            icon={
                                <Image
                                    alt=""
                                    width={20}
                                    height={20}
                                    src="/sample/coin-3.png"
                                    className="aspect-square w-6"
                                />
                            }
                        />
                    ),
                },
                {
                    value: 'twd',
                    label: (
                        <OptionItem
                            label="TWD"
                            icon={
                                <Image
                                    alt=""
                                    width={20}
                                    height={20}
                                    src="/sample/coin-4.png"
                                    className="aspect-square w-6"
                                />
                            }
                        />
                    ),
                },
            ]}
        />
    )
}

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
    selectedCoin?: string
    bgGray?: boolean
    rightIcon?: ReactNode
    disabled?: boolean
}

export const Input = ({
    type,
    placeholder,
    block,
    iconLeft,
    onChange,
    error,
    selectedCoin,
    bgGray,
    rightIcon,
    disabled,
    value,
}: InputProps) => {
    const [showPass, setShowPass] = useToggle()
    return (
        <div>
            <div
                className={clsx(
                    'flex  flex-row space-x-2 items-center justify-center rounded-lg border-solid border-[1px] focus-within:border-primary-700  py-[14px] px-[16px] relative',
                    [bgGray && 'bg-white'],
                    [type === 'coin' && ' focus-within:bg-white'],
                    [error ? 'border-warning-600' : 'border-neutral-300'],
                    [block ? 'block' : 'inline-block'],
                )}
            >
                {iconLeft && iconLeft}
                {type === 'area' ? (
                    <textarea />
                ) : (
                    <input
                        type={showPass ? 'text' : type}
                        placeholder={placeholder}
                        disabled={disabled ?? false}
                        onChange={onChange}
                        value={value}
                        className={clsx(
                            'box-border border-0 bg-inherit autofill:bg-white outline-none text-[16px] flex-1 placeholder:text-newtral-500',
                        )}
                    />
                )}

                {type === 'coin' && <SelectCoin value={selectedCoin} />}

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
