import React, { ReactNode } from 'react'
import Image from 'next/image'
import LayoutCenter from './LayoutCenter'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useRouter } from 'next/router'

interface PropsChild {
    children: ReactNode
}

const CheckLogin = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
) => {
    const Auth = (props: P) => {
        const userState = useSelector((state: RootState) => state.user)
        const router = useRouter()

        if (userState.isLogin) {
            router.push('/')
            return null
        }

        return <WrappedComponent {...props} />
    }

    return Auth
}

function LayoutBeforeLogin(props: PropsChild) {
    const { children } = props
    return (
        <LayoutCenter>
            <div className="flex md:flex-row flex-col w-full md:items-center justify-center ">
                <Image
                    src={'/images/before-login.png'}
                    alt="Login"
                    width="0"
                    height="0"
                    sizes="50vw"
                    className="w-[250px] h-full flex-1 hidden md:block"
                />
                <div className="flex-1">{children}</div>
            </div>
        </LayoutCenter>
    )
}
export default CheckLogin(LayoutBeforeLogin)
