import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
    Config,
    createStateSyncMiddleware,
    initMessageListener,
} from 'redux-state-sync'

import sampleSlice, { SampleState } from './slices/sampleSlice'
import userSlice, { UserState } from './slices/userSlice'
import customerSlices, { CustomerState } from './slices/customerSlices'
import itemSlices, { ItemState } from './slices/itemSlices'
import orderSlices, { OrderState } from './slices/orderSlices'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['verification'],
}
const reducer = combineReducers({
    //add your slice heere
    sample: sampleSlice,
    user: userSlice,
    customer: customerSlices,
    item: itemSlices,
    order: orderSlices,
})
const persistedReducer = persistReducer(persistConfig, reducer)

const isServer = typeof window === 'undefined'

const syncConfig: Config = {
    blacklist: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'verification/verificationAdd',
        'verification/verificationClear',
    ] as string[],
}
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            isServer
                ? createStateSyncMiddleware()
                : createStateSyncMiddleware(syncConfig),
        ),
})
initMessageListener(store)

export interface RootState {
    sample: SampleState
    user: UserState
    customer: CustomerState
    item: ItemState
    order: OrderState
}
export const persistor = persistStore(store)

export default store
