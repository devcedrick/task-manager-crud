import React from 'react'


const Header = () => {
  return (
    <div className='fixed w-full h-16 lg:h-20 bg-surface border-b border-border shadow-sm flex items-center justify-between px-5 py-2 lg:px-10 z-40'>
      <h1 className='text-sm lg:text-xl font-sans font-bold text-foreground '>To-Do List CRUD</h1>
    </div>
  )
}

export default Header
