import { Spin } from 'antd'
import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface ButtonProps {
    type?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'green'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    onClick?: () => void
    icon?: ReactNode
    block?: boolean
    disabled?: boolean
    children?: ReactNode
    isLoading?: boolean
}

export const Button = ({
    type = 'primary',
    size = 'md',
    onClick,
    icon,
    disabled,
    block,
    children,
    isLoading,
}: ButtonProps) => {
    return isLoading ? (
        <div className="inline-flex justify-center items-center space-x-2 py-4">
            <Spin /> <span className="text-newtral-500 font-bold">Loading</span>
        </div>
    ) : (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'cursor-pointer font-sans border-solid outline-none rounded focus:outline-primary-600 outline-0',

                [
                    type === 'primary' &&
                        'text-white  bg-primary-600  border-[1px] border-primary-600 hover:bg-primary-800 active:bg-primary-200 active:border-primary-200 disabled:bg-disable-buttonBg disabled:border-disable-buttonBorder disabled:text-disable-buttonText ',
                ],
                [
                    type === 'secondary' &&
                        'text-newtral-800 bg-white  border-[1px] border-newtral-100 hover:bg-newtral-400 hover:border-newtral-500 active:bg-newtral-100 active:border-white disabled:bg-disable-buttonBg disabled:border-disable-buttonBorder disabled:text-disable-buttonText ',
                ],
                [
                    type === 'destructive' &&
                        'text-white bg-warning-700  border-[1px] border-warning-700 hover:bg-warning-500 hover:border-warning-500 active:bg-warning-600 active:border-warning-600 disabled:bg-warning-600 disabled:border-warning-600 disabled:text-white',
                ],
                [
                    type === 'ghost' &&
                        'text-primary-900 bg-white border-[1px] border-primary-900 hover:border-primary-600 active:border-primary-200 disabled:bg-disable-buttonBg disabled:border-disable-buttonBorder disabled:text-disable-buttonText',
                ],

                [
                    type === 'green' &&
                        'text-white bg-success-500 border-[1px] border-success-500 hover:bg-success-500 hover:border-success-500 active:bg-success-600 active:border-success-600 disabled:bg-success-600 disabled:border-success-600 disabled:text-white',
                ],
                [size === 'sm' && 'text-sm py-[6px] px-[14px]'],
                [size === 'md' && 'text-base py-[8px] px-[16px]'],
                [size === 'lg' && 'text-[18px] px-[18px] py-[10px]'],
                [size === 'xl' && 'text-lg px-[18px] py-[10px]'],
                [disabled && 'cursor-default '],
                [block && 'w-full'],
            )}
        >
            <span className="flex items-center space-x-2 whitespace-nowrap justify-center">
                {icon && icon}
                <label className="cursor-pointer">{children}</label>
            </span>
        </button>
    )
}
