import React from 'react'

const Loading = () => {
  return (
    <div className='w-full text-center'>
        <img src="loading.gif" alt="loading" className='mx-auto' width={300}  />
        <h2 className='text-blue-500 text-4xl font-bold'>Loading...</h2>

    </div>
  )
}

export default Loading