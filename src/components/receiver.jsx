import React, { useState } from 'react'
import { RecipientTable } from './RecipientTable'
import Button from './button';
import { Link } from 'react-router-dom';

function Receiver() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Recipient Management</h1>
                <Link
                    to="/add-recipient"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Recipient
                </Link>
            </div>
            <section className='max-w-screen-xl mx-auto'>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Receiver Details</h1>
                <RecipientTable />
            </section>
        </div>
    )
}

export default Receiver
