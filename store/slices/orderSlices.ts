import { api } from '@/services/axios'
import profile, { FotoField, ProfileField } from '@/services/profile'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export interface OrderState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    data?: any
}

const initialState: OrderState = {
    status: 'idle',
}

export const fetchOrder = createAsyncThunk<void, void>(
    'order/fetchData',
    async (_, { rejectWithValue }) => {
        console.log('a')
        try {
            const response = await api.get('/order')
            console.log(response)
            if (response) {
                const data = response.data
                return data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.status)
        }
    },
)

export const addOrder = createAsyncThunk<any, any>(
    'order/updatePhone',
    async (params) => {
        try {
            const data = await api.post('/order', params)
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
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchOrder.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
        builder
            .addCase(addOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addOrder.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
    },
})

// export const { , setUserData, removeUserLogin } = useSlice.actions
export default useSlice.reducer
