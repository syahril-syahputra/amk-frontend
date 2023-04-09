import { client, member } from './axios'

interface AuthResData {
    result: boolean
    msg: string
}
export interface RegistrationReqData {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    referalCode: string
}
interface RegistrationVerificationData {
    email: string
    activationCode: string
}

interface LoginData {
    username: string
    password: string
}

interface VerificationWithEmailData {
    email: string
    otpCode: string
}
interface VerificationWithPhoneData {
    uid: string
}
const submitRegistration = async (
    data: RegistrationReqData,
): Promise<AuthResData> => {
    const response = await client.post('/user/register', {
        ...data,
    })
    return response.data
}

const sendVerificationEmail = async (email: string | string[]) => {
    const response = await client.post('/register/email/verification-code', {
        email,
    })
    return response.data
}

const verificationRegistration = async (data: RegistrationVerificationData) => {
    const response = await client.post('/user/verify-account', {
        ...data,
    })
    return response.data
}

const submitLogin = async (data: LoginData) => {
    const response = await client.post('/user/login', {
        ...data,
    })
    return response
}
const verificationWithEmail = async (data: VerificationWithEmailData) => {
    const response = await client.post('/login/email/otp', {
        ...data,
    })
    return response
}

const verificationWithPhone = async (data: VerificationWithPhoneData) => {
    const response = await client.post('/login/phone/otp', {
        ...data,
    })
    return response
}

const logout = async (deviceId: string) => {
    const response = await member.post('/logout/' + deviceId)
    return response
}

const resendEmailForgetPassword = async (email: string) => {
    const encodedEmail = encodeURIComponent(email)
    const response = await client.get('/user/reset-password/' + encodedEmail)
    return response
}

const a = {
    submitRegistration,
    sendVerificationEmail,
    verificationRegistration,
    submitLogin,
    verificationWithEmail,
    verificationWithPhone,
    logout,
    resendEmailForgetPassword,
}

export default a
