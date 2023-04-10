import { api } from '@/services/axios'
import profile, { FotoField, ProfileField } from '@/services/profile'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export interface ItemState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    data?: any
}

const initialState: ItemState = {
    status: 'idle',
}

export const fetchItem = createAsyncThunk<void, void>(
    'item/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/items')
            if (response) {
                const data = response.data
                return data
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.status)
        }
    },
)

export const addItem = createAsyncThunk<any, any>(
    'user/updatePhone',
    async (params) => {
        try {
            const data = await api.post('/items', {
                name: params.name,
                price: params.price,
                description: params.description,
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
            .addCase(fetchItem.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchItem.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
        builder
            .addCase(addItem.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addItem.fulfilled, (state, action: any) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
    },
})

// export const { , setUserData, removeUserLogin } = useSlice.actions
export default useSlice.reducer
