import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import auth from '@/services/auth'
import { Button } from '@/components/common/Button'
import { Alert } from 'antd'
import { Input } from '@/components/common/Input'

import useChecker from '@/hooks/useChecker'
import { useDispatch } from 'react-redux'
import { setUserLogin } from 'store/slices/userSlice'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import crypto from 'crypto'

const schema = yup.object({
    username: yup.string().required().label('Mobile Number or Email'),
    password: yup.string().required().label('Password'),
})
interface FormInputs {
    username: string
    password: string
}
interface FormLoginProps {
    handleSubmit: (strxing: string, string: string) => void
}

function FormLogin(props: FormLoginProps) {
    const [error, seterror] = useState('')
    const {
        control,
        setError,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({ mode: 'onChange', resolver: yupResolver(schema) })
    const { typeCheker } = useChecker()

    const dispatch = useDispatch()
    const router = useRouter()
    const onsubmit = async (data: FormInputs) => {
        seterror('')

        try {
            const result = await auth.submitLogin({
                ...data,
                password: crypto
                    .createHash('sha256')
                    .update(data.password || '')
                    .digest('hex'),
            })
            const json = result.data.data

            Cookies.set('accessToken', json.token)
            dispatch(
                setUserLogin({
                    isLogin: true,
                    data: json,
                    status: 'idle',
                }),
            )
        } catch (error: any) {
            if (error?.response.status === 401) {
                seterror(error?.response.data.message)
                return
            }

            if (error?.response.status === 400) {
                // console.log(error?.response.data)
                // error?.response.data.map((item: any) => {
                //     setError(item.fieldName, {
                //         type: 'server',
                //         message: item.errorMessage,
                //     })
                // })
                seterror(error?.response.data.message)
                return
            }
            seterror(error?.response.data.message + ' : Something Wrong')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center px-[5vw]  ">
            <Image
                src={'/icons/logo.png'}
                alt="Login"
                width="0"
                height="0"
                sizes="100vw"
                className="w-[174px] h-auto mb-[16px]"
            />
            <span className="font-prompt font-semibold text-[23px] mb-[8px] text-neutral-800">
                Sign in with your account
            </span>

            <span className="text-[16px] text-newtral-800">
                Don’t have an account?{' '}
                <Link href="/auth/register" className="text-primary-base">
                    Register here
                </Link>
            </span>
            <div className="space-y-4  w-full py-4">
                <Controller
                    name="username"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="tel"
                            placeholder="Mobile Numbe or Email"
                            block
                            value={value || ''}
                            error={errors.username?.message}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            type="password"
                            placeholder="Password"
                            block
                            value={value || ''}
                            error={errors.password?.message}
                            onChange={onChange}
                        />
                    )}
                />

                {error && <Alert description={error} type="error" showIcon />}

                <Button
                    isLoading={isSubmitting}
                    size="lg"
                    block
                    onClick={handleSubmit(onsubmit)}
                >
                    Sign In
                </Button>

                <div className="text-[16px] mt-[24px] text-newtral-800 text-center">
                    Forget Password?{' '}
                    <Link
                        href="/auth/forget-password"
                        className="text-primary-base"
                    >
                        Click here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FormLogin
