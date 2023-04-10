import { api } from '@/services/axios'
import profile, { FotoField, ProfileField } from '@/services/profile'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export interface CustomerState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    data?: any
}

const initialState: CustomerState = {
    status: 'idle',
}

export const fetchData = createAsyncThunk<void, void>(
    'customer/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/customer')
            if (response) {
                const data = response.data
                return data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.status)
        }
    },
)

export const addCustomer = createAsyncThunk<any, any>(
    'user/updatePhone',
    async (params) => {
        try {
            const data = await api.post('/customer', {
                name: params.name,
                address: params.address,
                phone: params.phone,
            })
            return data.data
        } catch (error) {
            throw new Error('rejected')
        }
    },
)
const useSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        removeUserLogin: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
        builder
            .addCase(addCustomer.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addCustomer.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
    },
})

// export const { , setUserData, removeUserLogin } = useSlice.actions
export default useSlice.reducer
