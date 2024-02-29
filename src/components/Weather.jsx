import React from 'react';

const Weather = ({ weatherData }) => {
  
  const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;


  return (
   <div className='w-full lg:w-1/2 mx-auto px-4'>
    <div className='rounded-md p-5 border-gray-500 border'>
      <h2 className="text-3xl font-semibold mb-4 border-b pb-2 ">{weatherData.name}</h2>
      <div className="flex items-center flex-wrap gap-5 justify-between">
        <div>
          <img src={iconUrl} alt="Weather Icon" className="w-20" />
          <p className="text-5xl">{weatherData.main.temp}°C</p>
          <p className="text-gray-600 text-3xl my-2">{weatherData.weather[0].description}</p>
        </div>
        <div className='flex flex-col gap-3 text-xl md:w-fit w-full'>
          <p><span className="font-semibold">Feels like:</span> {weatherData.main.feels_like}°C</p>
          <p><span className="font-semibold">Humidity:</span> {weatherData.main.humidity}%</p>
          <p><span className="font-semibold">Pressure:</span> {weatherData.main.pressure} hPa</p>
          <p><span className="font-semibold">Wind Speed:</span> {weatherData.wind.speed} m/s</p>
        </div>
      </div>
   </div>
   </div>
  );
};

export default Weather;
