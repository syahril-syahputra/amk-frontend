import axios, { AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'
import store from 'store/store'
import { removeUserLogin } from 'store/slices/userSlice'

const api = axios.create({
    baseURL: '/',
    headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
    },
})

export { api }
