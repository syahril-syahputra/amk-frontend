import clsx from 'clsx'
import Cookies from 'js-cookie'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

interface ItemProps extends LinkProps {
    name: string
}

const Item = ({ name, href }: ItemProps) => {
    const router = useRouter()
    const path = router.pathname === '/' ? '/trade' : router.pathname
    const url = href.toString() === '/' ? '/trade' : href.toString()
    return (
        <Link href={href}>
            <li
                className={clsx(
                    'inline-block capitalize border-b-4 py-4 font-prompt font-bold',
                    path.startsWith(url)
                        ? 'border-primary-base text-primary-base'
                        : 'border-transparent text-base',
                )}
            >
                {name}
                {/* {path} + {href.toString()} */}
            </li>
        </Link>
    )
}

const Nav = () => {
    return (
        <nav className="md:inline-block hidden space-x-4 list-none ">
            <Item href="/" name="customer" />
            <Item href="/item" name="data item" />
            <Item href="/data" name="data order" />
        </nav>
    )
}

export default Nav
