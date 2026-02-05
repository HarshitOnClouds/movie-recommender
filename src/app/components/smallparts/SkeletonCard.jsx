import React from 'react'

function SkeletonCard() {
    return (
        <>
            <div className="relative">
                <div className="w-full h-64 object-cover rounded-t-lg bg-gray-700 animate-pulse"/>
                <div className="w-full h-64 object-cover rounded-t-lg bg-gray-700 animate-pulse"/>
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <div>
                        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    </div>
                    <div className='h-4 w-1/2 bg-gray-700 rounded animate-pulse'>

                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className=' bg-gray-700 h-6 w-6 rounded-full animate-pulse'></div>
                        <div className=' bg-gray-700 h-6 w-6 rounded-full animate-pulse'></div>
                        <div className=' bg-gray-700 h-6 w-6 rounded-full animate-pulse'></div>
                    </div>
                    <div className='h-4 w-1/4 bg-gray-700 rounded animate-pulse'></div>
                </div>

                <div>
                    <div className='bg-gray-700 h-6 w-1/4 rounded animate-pulse'></div>
                    <div className="flex flex-wrap gap-2">
                    <div className='bg-gray-700 h-6 w-20 rounded-full animate-pulse'></div>
                        
                    </div>
                </div>

                <div>
                    <div className='bg-gray-700 h-6 w-1/4 rounded animate-pulse'></div>
                    <div className='bg-gray-700 h-6 w-1/4 rounded animate-pulse'></div>
                    <div className='bg-gray-700 h-6 w-1/4 rounded animate-pulse'></div>
                </div>
            </div>
        </>
    )
}

export default SkeletonCard
