import React from 'react'
import AddButton from '../AddButton'

const Header = () => {
  return (
    <div className='fixed w-full h-20 bg-surface border-b border-border shadow-sm flex items-center justify-between px-10'>
      <h1 className='text-xl font-sans font-bold text-foreground '>Task Manager CRUD</h1>
      <AddButton content='Add Task'/>
    </div>
  )
}

export default Header
