"use client"
import React, { useState } from 'react'
import AddButton from '../AddButton'
import AddTaskModal from '../add-task-modal/AddTaskModal'
import { toast } from 'sonner'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  }

  return (
    <>
      <div className='fixed w-full h-20 bg-surface border-b border-border shadow-sm flex items-center justify-between px-10 z-40'>
        <h1 className='text-xl font-sans font-bold text-foreground '>Task Manager CRUD</h1>
        <AddButton content='Add Task' handleClick={() => setIsModalOpen(true)} />
      </div>
      {
        isModalOpen ? 
        <div className="absolute flex items-center justify-center top-0 left-0 z-100 h-screen w-full backdrop-blur-sm" onClick={handleOutClick}>
          <AddTaskModal isOpen={isModalOpen} onClose={handleModalClose}/>
        </div> : <></>
      }
    </>
  )
}

export default Header
