import React from 'react'

function SkeletonRowCard() {
  return (
    <div className='w-40 flex flex-col shrink-0 animate-pulse'>
      <div className='rounded-lg w-full h-60 bg-gray-700'></div>
      <div className='h-4 bg-gray-700 rounded mt-2 w-3/4'></div>
      <div className='h-3 bg-gray-700 rounded mt-2 w-1/2'></div>
      <div className='h-3 bg-gray-700 rounded mt-1 w-2/3'></div>
    </div>
  )
}

export default SkeletonRowCard