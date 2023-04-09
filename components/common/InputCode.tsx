import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface InputCodeProps {
    lenght: 5 | 6
    onChange: (otp: string) => void
    error?: string
}

export default function InputCode(props: InputCodeProps) {
    const [otp, setOtp] = useState(
        props.lenght === 5 ? ['', '', '', '', ''] : ['', '', '', '', '', ''],
    )
    const [errorOtp, seterrorOtp] = useState('')
    const handleChange = (e: any, index: number) => {
        const newOtp = [...otp]
        seterrorOtp('')
        if (e.target.value.length === 1) {
            newOtp[index] = e.target.value
            setOtp(newOtp)
        }
    }
    const moveFocus = (e: any, index: number) => {
        if (index <= props.lenght - 2) {
            const keyCode = e.which || e.keyCode
            if (e.target.value.length === 1 && keyCode >= 48 && keyCode <= 57) {
                const nextInput = e.target.nextSibling
                nextInput.focus()
            }
        }
    }
    const handlePaste = (e: any, index: number) => {
        const paste = e.clipboardData.getData('text')
        const pasteArr = paste.split('')
        const newOtp = [...otp]
        pasteArr.forEach((val: string, i: number) => {
            if (i + index >= otp.length) return
            const input = e.target.parentElement.childNodes[index + i]
            input.value = val
            newOtp[index + i] = val
        })
        setOtp(newOtp)
    }
    const handleFocus = (e: any, index: number) => {
        e.target.value = ''
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
    }

    useEffect(() => {
        props.onChange(otp.join(''))
    }, [otp, props])

    return (
        <div>
            <div className="space-x-4 flex justify-center">
                {otp.map((item, index) => (
                    <input
                        type="text"
                        key={index}
                        maxLength={1}
                        onKeyDown={(e) => moveFocus(e, index)}
                        onChange={(e) => handleChange(e, index)}
                        onPaste={(e) => handlePaste(e, index)}
                        onFocus={(e) => handleFocus(e, index)}
                        className={clsx(
                            'w-10 border  bg-newtral-200 px-2 py-4 rounded-md text-center outline-none',
                            props.error
                                ? 'border-warning-400'
                                : 'border-newtral-200',
                        )}
                    />
                ))}
            </div>
            {props.error && (
                <div className="text-warning-500 text-center p-4">
                    {props.error}
                </div>
            )}
        </div>
    )
}
