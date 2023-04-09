import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LayoutBeforeLogin from '@/components/layout/LayoutBeforeLogin'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import Link from 'next/link'

const schema = yup.object({
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(
            /[a-z]/,
            'Password must contain at least 1 lowercase character',
        )
        .matches(
            /[A-Z]/,
            'Password must contain at least 1 uppercase character',
        )
        .matches(/\d/, 'Password must contain at least 1 number')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required()
        .label('Confirm Password'),
})

interface FormInputs {
    password: string
    confirmPassword: string
}

export default function CreatePassword() {
    const [isSended, setisSended] = useState(true)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({ mode: 'onChange', resolver: yupResolver(schema) })

    const onsubmit = async (data: FormInputs) => {
        setisSended(true)
    }
    return (
        <LayoutBeforeLogin>
            {!isSended ? (
                <div className="flex flex-col items-center justify-center px-[5vw]  ">
                    <Image
                        src={'/images/Logo.svg'}
                        alt="Login"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[174px] h-auto mb-[16px]"
                    />
                    <span className="font-prompt font-semibold text-[23px] mb-[8px] text-neutral-800">
                        Set new password
                    </span>

                    <span className="text-[16px] text-newtral-800 text-center">
                        Your new password mus be different to previously used
                        password.
                    </span>
                    <div className="space-y-4  w-full py-4">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    type="password"
                                    placeholder="New Password"
                                    block
                                    value={value || ''}
                                    error={errors.password?.message}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    block
                                    value={value || ''}
                                    error={errors.confirmPassword?.message}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Button
                            size="lg"
                            block
                            onClick={handleSubmit(onsubmit)}
                        >
                            Change password
                        </Button>

                        <div className="text-[16px] mt-[24px]  !text-newtral-500 text-center">
                            <Link
                                href="/auth/login"
                                className="flex flex-row space-x-1 items-center justify-center"
                            >
                                <ArrowLeftOutlined />
                                <span className="text-base">Back To Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center px-[10vw]">
                    <Image
                        src={'/images/checklist-blue.svg'}
                        alt="Checklist"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[184px] h-auto mb-[16px]"
                    />
                    <span className="font-prompt font-bold text-[24px] mb-[8px] text-primary-base">
                        Successfuly change your password
                    </span>
                    <span className="font-prompt mb-[8px] text-neutral-800">
                        Please login using your new password.
                    </span>
                    <div className="text-[16px] mt-[24px]  !text-newtral-500 text-center">
                        <Link
                            href="/auth/login"
                            className="flex flex-row space-x-1 items-center justify-center"
                        >
                            <ArrowLeftOutlined />
                            <span className="">Back to sign in</span>
                        </Link>
                    </div>
                </div>
            )}
        </LayoutBeforeLogin>
    )
}
