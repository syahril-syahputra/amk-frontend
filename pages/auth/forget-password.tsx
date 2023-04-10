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
import auth from '@/services/auth'

const schema = yup.object({
    email: yup.string().email().required().label('Email'),
})

interface FormInputs {
    email: string
}

export default function ForgetPassword() {
    const [isSended, setisSended] = useState(false)
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<FormInputs>({ mode: 'onChange', resolver: yupResolver(schema) })
    const email = watch('email')
    const onsubmit = async (data: FormInputs) => {
        try {
            // await auth.resendEmailForgetPassword(data.email)
            setisSended(true)
        } catch (error: any) {
            setError('email', { message: error?.response.data.message })
        }
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
                        Forgot your password?
                    </span>

                    <span className="text-[16px] text-newtral-800 text-center">
                        Enter your registered email address below, and we’ll
                        send you link to recover your password.
                    </span>
                    <div className="space-y-4  w-full py-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    type="tel"
                                    placeholder="Enter your registered email"
                                    block
                                    value={value || ''}
                                    iconLeft={
                                        <MailOutlined className="aspect-square mb-0  text-newtral-500" />
                                    }
                                    error={errors.email?.message}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <Button
                            isLoading={isSubmitting}
                            size="lg"
                            block
                            onClick={handleSubmit(onsubmit)}
                        >
                            Request reset link
                        </Button>

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
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center px-[10vw]">
                    <Image
                        src={'/images/emailbadge.svg'}
                        alt="Checklist"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[184px] h-auto mb-[16px]"
                    />
                    <span className="font-prompt font-bold text-[24px] mb-[8px]">
                        Check your mail!
                    </span>
                    <span className="font-prompt mb-[8px] text-center text-neutral-800">
                        We sent a password reset link to
                        <br />
                        {email}
                    </span>
                    <div className="text-[16px] mt-[24px] text-newtral-800 text-center">
                        Don’t receive the email?{' '}
                        <Link
                            href="/auth/forget-password"
                            className="text-primary-base"
                        >
                            Click to resend
                        </Link>
                    </div>
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
