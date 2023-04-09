import '@/styles/globals.css'
import '@/styles/antd.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store, { persistor } from 'store/store'
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}
