import { InboxInIcon, PlusCircleIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Footer() {
    return (
        <div className="mobile__footer">
            <div className="flex flex-col ">
                <InboxInIcon className="h-5 text-gray-800" />
                <div className="text-xs text-gray-800 font-bold">
                    Inbox
                </div>
            </div>
            <div className="flex flex-col">
                <PlusCircleIcon className="h-5 text-gray-800" />
                <div className="text-xs text-gray-800 font-bold">
                    Add
                </div>
            </div>
            <div className="flex flex-col">
                <ShoppingBagIcon className="h-5 text-gray-800" />
                <div className="text-xs text-gray-800 font-bold">
                    Cart
                </div>
            </div>
               
        </div>
    )
}
