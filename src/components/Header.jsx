import React, { useState } from 'react'

const Header = ({getWeather}) => {
    const [city,setCity] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        getWeather(city)
        setCity('')
    }
  return (
    <header className='text-center p-4'>
        <form className='flex items-center justify-center' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search city name..' className='outline-none px-3 py-2 rounded-lg lg:w-1/3 w-full' value={city} onChange={(e)=>setCity(e.target.value)} required/>
            <button type='submit'>
                <img src="https://cdn-icons-png.flaticon.com/128/14611/14611690.png" alt="search icon" className='w-14'/>
            </button>
        </form>
    </header>
  )
}

export default Header