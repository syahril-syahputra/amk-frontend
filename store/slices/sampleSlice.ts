import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SampleState {
    name: string
    age: number
}

const sampleSlice = createSlice({
    name: 'sample',
    initialState: {
        name: 'First Init',
        age: 0,
    } as SampleState,
    reducers: {
        change: (state, actions: PayloadAction<SampleState>) => {
            state.name = actions.payload.name
            state.age = actions.payload.age
        },
        clear: (state) => {
            state.name = ''
            state.age = 0
        },
    },
})

export const { change, clear } = sampleSlice.actions

export default sampleSlice.reducer
