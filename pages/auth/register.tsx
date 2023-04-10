import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LayoutBeforeLogin from '@/components/layout/LayoutBeforeLogin'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import auth from '@/services/auth'
// import { verificationAdd } from 'store/slices/verificationSlice'
import { useDispatch } from 'react-redux'
import crypto from 'crypto'

const schema = yup.object({
    phoneNumber: yup
        .string()
        .matches(
            /^\+\d{10,15}$/,
            'Phone number must be in format +[country code][phone number], e.g. +88612345789',
        )
        .required()
        .label('Phone number'),
    email: yup.string().email().required().label('Email'),
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
    referalCode: yup.string().label('Referal Code'),
})

interface FormInputs {
    phoneNumber: string
    email: string
    password: string
    confirmPassword: string
    referalCode: string
}

export default function Register() {
    const [error, seterror] = useState('')
    const router = useRouter()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormInputs>({ mode: 'onChange', resolver: yupResolver(schema) })

    // const { generateRecaptcha, isSolved, requestOTP } = useOTP()
    const dispatch = useDispatch()
    const onsubmit = async (data: FormInputs) => {
        seterror('')
        const { email, password, phoneNumber, referalCode } = data
        // if (isSolved) {
        try {
            // await requestOTP(phoneNumber, email)
            // await auth.submitRegistration({
            //     firstName: '',
            //     lastName: '',
            //     email,
            //     password: crypto
            //         .createHash('sha256')
            //         .update(password || '')
            //         .digest('hex'),
            //     phoneNumber,
            //     referalCode,
            // })
            // dispatch(
            //     verificationAdd({
            //         email: email,
            //     }),
            // )
            router.push({
                pathname: '/auth/verification',
            })
        } catch (error: any) {
            error?.response
                ? seterror(error?.response.data.message)
                : alert(error)

            // console.log(error);
            // seterror(error?.response.data.message);
        }
        // } else {
        //     seterror('please verify you are a human')
        // }
    }

    // useEffect(() => {
    //     generateRecaptcha('recaptcha-container')
    //     window.recaptchaVerifier.render()
    // }, [])
    return (
        <LayoutBeforeLogin>
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
                    Create your account now.
                </span>

                <span className="text-[16px] text-newtral-800">
                    Have an account?{' '}
                    <Link href="/auth/login" className="text-primary-base">
                        Sign in
                    </Link>
                </span>
                <div className="space-y-4  w-full py-4">
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="tel"
                                placeholder="Phone Number"
                                block
                                value={value || ''}
                                error={errors.phoneNumber?.message}
                                onChange={onChange}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="email"
                                placeholder="Email Address"
                                block
                                value={value || ''}
                                error={errors.email?.message}
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
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                block
                                value={value || ''}
                                error={errors.confirmPassword?.message}
                                onChange={onChange}
                            />
                        )}
                    />

                    <Controller
                        name="referalCode"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                type="text"
                                placeholder="Referal Code (Optional)"
                                block
                                value={value || ''}
                                error={errors.referalCode?.message}
                                onChange={onChange}
                            />
                        )}
                    />
                    {/* <div hidden={isSubmitting}>
                        <div
                            id="recaptcha-container"
                            className="flex items-center justify-center mx-auto"
                        ></div>
                    </div> */}
                    {error && (
                        <div className="py-2 text-sm bg-warning-100 text-center text-warning-400 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button
                        size="lg"
                        isLoading={isSubmitting}
                        block
                        onClick={handleSubmit(onsubmit)}
                    >
                        Create Your Account
                    </Button>

                    <div className="text-neutral-700 text-center text-[17px]">
                        By clicking this button, you agree to CryptoSwap’s
                        <br />
                        <a className="text-primary-base">
                            Terms of use & Privacy Policy.
                        </a>
                    </div>
                </div>
            </div>
        </LayoutBeforeLogin>
    )
}
