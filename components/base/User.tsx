import React, { useEffect, useState } from 'react'
import { BellOutlined, CaretDownFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, MenuProps, Modal, Skeleton } from 'antd'
import { Button } from '../common/Button'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { fetchUser, removeUserLogin } from 'store/slices/userSlice'
import { useRouter } from 'next/router'
import auth from '@/services/auth'
import profile from '@/services/profile'
import Cookies from 'js-cookie'

const MemberSection = () => {
    const userState = useSelector((state: RootState) => state.user)

    const [isOpen, setisOpen] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const dispatch = useDispatch()
    const router = useRouter()
    const logout = async () => {
        setisLoading(true)
        try {
            // await auth.logout(userState.deviceId || '')
            dispatch(removeUserLogin())
            Cookies.remove('accessToken')
            router.push('/auth/login')
        } catch (error) {
            alert(error)
        } finally {
            setisLoading(false)
        }
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            onClick: () => setisOpen(true),
            label: <span className="text-base">Sign out</span>,
        },
    ]

    // useEffect(() => {
    //     if (userState.isLogin) {
    //         dispatch(fetchUser() as any)
    //     }
    // }, [])

    return (
        <section className="flex flex-row space-x-4 items-center">
            <BellOutlined className="text-newtral-600 aspect-square m-0 bg-neutral-50 p-1 rounded-lg" />
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <div>
                    {userState.status !== 'loading' && (
                        <div className="space-x-2 font-bold flex flex-row items-center font-prompt capitalize">
                            <Avatar
                                size="large"
                                icon={
                                    <UserOutlined
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                    />
                                }
                                className="border-1 border-newtral-600"
                                src={
                                    !userState.data?.profilePicture
                                        ? undefined
                                        : 'data:image/png;base64, ' +
                                          userState.data?.profilePicture
                                }
                            />
                            <span>
                                {userState.data?.displayName === 'null null'
                                    ? 'User'
                                    : userState.data?.displayName}
                            </span>
                            <CaretDownFilled className="mt-1" />
                        </div>
                    )}
                    <Skeleton
                        loading={userState.status === 'loading'}
                        active
                        className="flex items-center justify-center"
                        avatar
                        title={false}
                        paragraph={{ rows: 1, width: '100px' }}
                    ></Skeleton>
                </div>
            </Dropdown>
            <Modal
                title="Sign out"
                open={isOpen}
                okText="Sign out"
                okButtonProps={{
                    className: 'bg-warning-600 hover:bg-warning-500',
                }}
                onOk={logout}
                confirmLoading={isLoading}
                onCancel={() => setisOpen(false)}
            >
                <p>Are you sure you want to sign out ?</p>
            </Modal>
        </section>
    )
}

const LoginSection = () => {
    return (
        <section className="flex flex-row space-x-2">
            <Link href="/auth/login">
                <Button type="ghost">Sign in</Button>
            </Link>
            <Link href="/auth/register">
                <Button>Sign up</Button>
            </Link>
        </section>
    )
}

function User() {
    const user = useSelector((state: RootState) => state.user)
    return user.isLogin ? <MemberSection /> : <LoginSection />
}

export default User
