import clsx from 'clsx'
import React, { ReactNode } from 'react'
interface PropsContainer {
    children: ReactNode
    title?: string
    subtitle?: string
}
export default function Container(props: PropsContainer) {
    return (
        <div className={clsx('bg-white p-8 rounded-lg space-y-4')}>
            {props.title || props.subtitle ? (
                <div className="space-y-2">
                    {props.title && (
                        <h1 className="font-prompt font-bold text-lg ">
                            {props.title}
                        </h1>
                    )}
                    {props.subtitle && (
                        <div className="text-sm text-newtral-700">
                            {props.subtitle}
                        </div>
                    )}
                </div>
            ) : null}
            {props.children}
        </div>
    )
}
