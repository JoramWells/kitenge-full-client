import { InboxInIcon, PlusCircleIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Footer() {
    return (
        <div className="mobile__footer">
            <div className="flex flex-col">
                <InboxInIcon className="h-5" />
                <div className="text-xs text-white">
                    Inbox
                </div>
            </div>
            <div className="flex flex-col">
                <PlusCircleIcon className="h-5" />
                <div className="text-xs text-white">
                    Add
                </div>
            </div>
            <div className="flex flex-col">
                <ShoppingBagIcon className="h-5" />
                <div className="text-xs text-white">
                    Cart
                </div>
            </div>
               
        </div>
    )
}
