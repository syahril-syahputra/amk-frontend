import profile, { FotoField, ProfileField } from '@/services/profile'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export interface UserState {
    isLogin: boolean
    isLoadingEmail?: boolean
    isLoadingPhone?: boolean
    isLoadingPP?: boolean
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    data?: any
}
interface SecurityField {
    status: boolean
    userId: string
}

export const updateProfilePicture = createAsyncThunk<FotoField, FotoField>(
    'user/updateProfilePicture',
    async (params) => {
        try {
            await profile.updateProfilePicture(params)
            return params
        } catch (error) {
            throw new Error('rejected')
        }
    },
)

export const updateEmail = createAsyncThunk<SecurityField, SecurityField>(
    'user/updateEmail',
    async (params) => {
        try {
            await profile.updateSecurityEmail(params.status, params.userId)
            return params
        } catch (error) {
            throw new Error('rejected')
        }
    },
)

export const updatePhone = createAsyncThunk<SecurityField, SecurityField>(
    'user/updatePhone',
    async (params) => {
        try {
            await profile.updateSecurityPhone(params.status, params.userId)
            return params
        } catch (error) {
            throw new Error('rejected')
        }
    },
)

export const fetchUser = createAsyncThunk<void, void>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await profile.getProfile()
            if (response) {
                const data = response.data.data
                return data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.status)
        }
    },
)
export const updateUser = createAsyncThunk<ProfileField, ProfileField>(
    'user/updateUser',
    async (params): Promise<ProfileField> => {
        try {
            await profile.updateProfile(params)
            return params
        } catch (error: any) {
            throw new Error('rejected')
        }
    },
)
const initialState: UserState = {
    isLogin: false,
    isLoadingEmail: false,
    isLoadingPhone: false,
    isLoadingPP: false,
    status: 'idle',
}

const useSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserLogin: (state, actions: PayloadAction<UserState>) => {
            state.isLogin = true
            state.data = actions.payload.data
        },
        setUserData: (state, actions: PayloadAction<UserState>) => {
            state.data = actions.payload.data
        },
        removeUserLogin: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data = action.payload.data
            })
            .addCase(fetchUser.rejected, (state, action) => {
                if (action.payload === 401) {
                    state.isLogin = false
                    state.status = 'failed'
                    // state.firstName = undefined
                    // state.deviceId = undefined
                    // state.lastName = undefined
                    // state.displayName = undefined
                    // state.email = undefined
                    // state.phoneNumber = undefined
                    // state.nationCode = undefined

                    Cookies.remove('accessToken')
                    window.location.replace('/auth/login')
                }
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                console.log(action.payload)
                state.data.countryCode = action.payload.countryCode
                state.data.phoneNumber = action.payload.phoneNumber
                state.data.displayName = action.payload.displayName
                // state.firstName = action.payload.firstName
                // state.lastName = action.payload.lastName
                // state.nationCode = action.payload.nationCode
            })
            .addCase(updateUser.rejected, (state) => {
                state.status = 'failed'
            })
        builder
            .addCase(updateEmail.fulfilled, (state, action: any) => {
                state.isLoadingEmail = false
                state.data.enableEmailAuthentication = action.payload.status
            })
            .addCase(updateEmail.pending, (state) => {
                state.isLoadingEmail = true
            })
        builder
            .addCase(updatePhone.fulfilled, (state, action: any) => {
                state.isLoadingPhone = false
                state.data.enablePhoneAuthentication = action.payload.status
            })
            .addCase(updatePhone.pending, (state) => {
                state.isLoadingPhone = true
            })

        builder
            .addCase(updateProfilePicture.fulfilled, (state, action: any) => {
                state.isLoadingPP = false
                state.data.profilePicture = action.payload.base64
            })
            .addCase(updateProfilePicture.pending, (state) => {
                state.isLoadingPP = true
            })
    },
})

export const { setUserLogin, setUserData, removeUserLogin } = useSlice.actions
export default useSlice.reducer
