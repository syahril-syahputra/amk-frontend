import React, { useState } from 'react'
import LayoutBeforeLogin from '@/components/layout/LayoutBeforeLogin'

import FormLogin from '@/components/app/auth/login/FormLogin'

export default function Login() {
    const handleSubmit = (userName: string, verificationWith: string) => {}
    return (
        <LayoutBeforeLogin>
            <FormLogin handleSubmit={handleSubmit} />
        </LayoutBeforeLogin>
    )
}
