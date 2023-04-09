import axios, { AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'
import store from 'store/store'
import { removeUserLogin } from 'store/slices/userSlice'

const client = axios.create({
    baseURL: '/cryptoswap',
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
})

const member = axios.create({
    baseURL: '/cryptoswap',
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
})

member.interceptors.request.use(async (req: any) => {
    const cookies = Cookies.get('accessToken')
    if (cookies) {
        req.headers['Authorization'] = `Bearer ${cookies}`
    }
    return req
})

member.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        // const dispatch = store.dispatch;
        if (error.response.status === 401) {
            // dispatch(removeUserLogin());
        }
        return Promise.reject(error)
    },
)

const cryptowat = axios.create({
    baseURL: '/cryptowat',
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
})

const coinmarketcap = axios.create({
    baseURL: '/coinmarketcap',
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
})

export { client, member, cryptowat, coinmarketcap }
