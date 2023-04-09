import { member } from './axios'

export interface ProfileField {
    phoneNumber: string
    displayName: string
    countryCode: string
    userId: string
}
export interface UpdateProfileFiled {
    profilePicture: string
    phoneNumber: string
    country: string
    isActive: boolean
    firstName: string
    lastName: string
    displayName: string
    enableEmailAuthentication: boolean
    enablePhoneAuthentication: boolean
}
export interface PasswordField {
    username: string
    oldPassword: string
    newPassword: string
}
export interface FotoField {
    base64: string
    userId: string
}
const getProfile = async () => {
    const data = await member.get('/info')
    return data
}
const getDetail = async () => {
    const data = await member.get('/user/user-detail/')
    return data
}

const updateProfile = async (data: ProfileField) => {
    const response = await member.patch('/user/patch-account/' + data.userId, {
        ...data,
    })
    return response
}
const updateSecurityEmail = async (enabled: boolean, userId: string) => {
    const response = await member.patch('/user/patch-account/' + userId, {
        enableEmailAuthentication: enabled,
    })
    return response
}
const updateSecurityPhone = async (enabled: boolean, userId: string) => {
    const response = await member.patch('/user/patch-account/' + userId, {
        enablePhoneAuthentication: enabled,
    })
    return response
}
const updatePassword = async (data: PasswordField) => {
    const response = await member.post('/user/change-password', data)
    return response
}
const updateProfilePicture = async (data: FotoField) => {
    const response = await member.patch('/user/patch-account/' + data.userId, {
        profilePicture: data.base64,
    })
    return response
}

const submitkyc = async (data: any) => {
    const response = await member.post('/user/kyc/submit-kyc', data)
    return response
}
const method = {
    getProfile,
    updateProfile,
    updateSecurityEmail,
    updateSecurityPhone,
    getDetail,
    updatePassword,
    submitkyc,
    updateProfilePicture,
}
export default method
