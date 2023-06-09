import ListCustomer from '@/components/app/dashboard/ListCustomer'
import LayoutDefault from '@/components/layout/LayoutDefault'
import React from 'react'
import withAuth from 'utils/withAuth'

function Index() {
    return (
        <LayoutDefault>
            <ListCustomer />
        </LayoutDefault>
    )
}

export default withAuth(Index)
