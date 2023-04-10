import clsx from 'clsx'
import React, { Children, ReactNode } from 'react'
interface ActionProps {
    label: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    small?: boolean
    className?: string
    onClick?: () => void
}
export default function Action(props: ActionProps) {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                props.className +
                    ' flex space-x-2 items-center justify-center rounded-lg text-[#5367FF] cursor-pointer hover:opacity-50',
                props.small ? 'text-sm p-[9px]' : 'p-[16px]',
            )}
        >
            {props.leftIcon && props.leftIcon}
            <label className=" cursor-pointer">{props.label}</label>
            {props.rightIcon && props.rightIcon}
        </button>
    )
}
