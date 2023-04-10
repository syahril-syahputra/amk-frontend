import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Nav from './Nav'
import User from './User'

function Header() {
    return (
        <div className="bg-white py-2">
            <div className="container box-border flex flex-row justify-between items-center">
                <Link href="/">
                    <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-[174px] h-auto"
                        src={'/icons/Logo.png'}
                        alt="Crypto Swap"
                    />
                </Link>

                <Nav />
                <User />
            </div>
        </div>
    )
}

;<style></style>
export default Header
