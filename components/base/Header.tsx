import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='bg-black text-white'>
        <div className='flex max-w-5xl mx-auto'>
            {/* Logo */}
            <div className='bg-red-600 py-2 px-4'>
                News & Weather
            </div>

            {/* News sections, visible on large screens only */}
        </div>
    </div>
  )
}

export default Header;