import React, { useEffect, useState } from 'react'

type Props = {}

const WeatherLocationSelector = (props: Props) => {
  const [weatherLocation, setWeatherLocation] = useState('Uganda')

  useEffect(() => {

  }, []);

  return (
    // <div className=''>
    //     <div className='flex flex-col gap-4 md:flex-row px-4 md:px-0 py-2 pt-4'>
    //         <div className='md:px-0 md:w-8/12'>
    //             <label htmlFor='location' className='sr-only'>Location:</label>
    //             <input className='w-full py-2 px-4 outline-none border border-gray-300 text-lg text-gray-500' type="text" placeholder='Enter Location'></input>
    //         </div>
    //         <div className='flex gap-4 items-center md:pr-0 md:w-4/12'>
    //             <button className='bg-gray-500 hover:bg-gray-600 px-4 py-2 text-lg text-white font-semibold h-max'>Get Forecast</button>
    //             <div className='flex md:flex-1 text-lg text-white gap-4'>
    //                 <button className='px-4 py-2 min-w w-1/2 bg-gray-400 hover:bg-gray-500 font-semibold'><sup>o</sup>C</button>
    //                 <button className='px-4 py-2 w-1/2 bg-gray-300 hover:bg-gray-500 font-semibold'><sup>o</sup>F</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <></>
  )
}

export default WeatherLocationSelector