import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface VerificationState {
    email: string
}

const initial: VerificationState = {
    email: '',
}
const verificationSlice = createSlice({
    name: 'verification',
    initialState: initial,
    reducers: {
        verificationAdd: (state, actions: PayloadAction<VerificationState>) => {
            state.email = actions.payload.email
        },
        verificationClear: (state) => {
            state = initial
        },
    },
})

export const { verificationAdd, verificationClear } = verificationSlice.actions
export default verificationSlice.reducer
