import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
) => {
    const Auth = (props: P) => {
        const userState = useSelector((state: RootState) => state.user)
        const router = useRouter()

        if (!userState.isLogin) {
            router.push('/auth/login')
            return null
        }

        return <WrappedComponent {...props} />
    }

    return Auth
}

export default withAuth
