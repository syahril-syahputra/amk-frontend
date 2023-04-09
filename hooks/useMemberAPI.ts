import axios, { Axios, AxiosError, AxiosResponse, Method } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { boolean } from 'yup'

interface IParams {
    url: string
    method: Method
    data?: any
}

interface IAxiosResponse<T> {
    data: T | null
    isLoading: boolean
    error: Error | null
}

const useMemberAPI = <T>(params: IParams): IAxiosResponse<T> => {
    const [responseData, setResponseData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    const router = useRouter()

    useEffect(() => {
        const fetch = async () => {
            try {
                const res: AxiosResponse<T> = await axios({
                    baseURL: '/cryptoswap',
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json',
                        Authorization: Cookies.get('accessToken'),
                    },
                    method: params.method,
                    url: params.url,
                    withCredentials: true,
                    data: params.data,
                })
                setResponseData(res.data)
            } catch (error: any) {
                if (error.response && error.response.status === 401) {
                    router.push('/auth/login')
                }
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetch()
    }, [params, router])
    return { data: responseData, isLoading, error }
}

export default useMemberAPI
