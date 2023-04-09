import React, { ReactNode } from 'react'
import Header from '../base/Header'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

interface PropsChild {
    children: ReactNode
    center?: boolean
}
export default function LayoutDefault(props: PropsChild) {
    const router = useRouter()
    return (
        <div className="bg-[#EFEFEF] min-h-screen">
            <Header />
            <div className="container box-border py-4 space-y-4">
                {props.center ? (
                    <div className="flex flex-col justify-center ">
                        <div className="mx-auto w-full max-w-lg">
                            <AnimatePresence>
                                <motion.div
                                    key={router.pathname}
                                    initial={{ opacity: 0, scale: 1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    exit={{ opacity: 0, scale: 1 }}
                                >
                                    {props.children}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            key={router.pathname}
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            exit={{ opacity: 0, scale: 1 }}
                            className="space-y-8"
                        >
                            {props.children}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}
