import { api } from './axios'
interface LoginData {
    username: string
    password: string
}

const submitLogin = async (data: LoginData) => {
    const response = await api.post('/login', {
        ...data,
    })
    return response
}

const a = {
    submitLogin,
}

export default a
