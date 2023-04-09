import React, { ReactNode } from 'react'

interface PropsChild {
    children: ReactNode
}
export default function LayoutCenter(props: PropsChild) {
    const { children } = props
    return (
        <div className="container h-screen flex items-center justify-center ">
            {children}
        </div>
    )
}
