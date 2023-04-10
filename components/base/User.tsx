import React, { useEffect, useState } from 'react'
import {
    BellOutlined,
    CaretDownFilled,
    MenuOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, MenuProps, Modal, Skeleton } from 'antd'
import { Button } from '../common/Button'
import Link, { LinkProps } from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { fetchUser, removeUserLogin } from 'store/slices/userSlice'
import { useRouter } from 'next/router'
import auth from '@/services/auth'
import profile from '@/services/profile'
import Cookies from 'js-cookie'
import clsx from 'clsx'

const MemberSection = () => {
    const userState = useSelector((state: RootState) => state.user)

    const [isOpenMenu, setisOpenMenu] = useState(false)
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

    return (
        <div>
            <section className="md:flex hidden flex-row space-x-4 items-center">
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
                                />
                                <span>
                                    {userState.data?.username === 'null null'
                                        ? 'User'
                                        : userState.data?.username}
                                </span>
                                <CaretDownFilled className="mt-1" />
                            </div>
                        )}
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
            <div
                onClick={() => setisOpenMenu(!isOpenMenu)}
                className="bg-newtral-100 cursor-pointer active:bg-newtral-400-300 hover:bg-newtral-200 px-2 pb-0.5 rounded-md"
            >
                <MenuOutlined className="md:hidden" />
            </div>
            {isOpenMenu && (
                <nav className="fixed w-full text-newtral-600 top-14 left-0 p-4 z-50 md:hidden">
                    <ul className="bg-white capitalize shadow-xl w-full">
                        <Item href="/" name="customer" />
                        <Item href="/item" name="data item" />
                        <Item href="/data" name="data order" />
                    </ul>
                </nav>
            )}
        </div>
    )
}
interface ItemProps extends LinkProps {
    name: string
}

const Item = ({ name, href }: ItemProps) => {
    const router = useRouter()
    const path = router.pathname === '/' ? '/trade' : router.pathname
    const url = href.toString() === '/' ? '/trade' : href.toString()
    return (
        <Link href={href}>
            <li
                className={clsx(
                    ' active:bg-newtral-100 px-4 capitalize py-4 font-prompt font-bold',
                    path.startsWith(url)
                        ? ' text-primary-base bg-primary-50'
                        : 'border-transparent text-base',
                )}
            >
                {name}
                {/* {path} + {href.toString()} */}
            </li>
        </Link>
    )
}
function User() {
    return <MemberSection />
}

export default User
