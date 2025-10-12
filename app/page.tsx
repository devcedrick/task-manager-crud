"use client"
import React, { useState } from "react";
import AddButton from "@/components/AddButton";
import AddTaskModal from "@/components/add-task-modal/AddTaskModal";
import TaskList from "@/components/task-list/TaskList";
import { toast } from 'sonner'


export default function Home() {
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
    <div className="min-h-screen px-5 lg:px-15">
      <div className="flex justify-center sm:justify-start pt-28 ">
        <AddButton content='Add Task' handleClick={() => setIsModalOpen(true)} />
      </div>

      <div className='bg-gray-800 w-full border opacity-10 mt-5'></div>
      {
        isModalOpen ? 
        <div className="absolute flex items-center justify-center top-0 left-0 z-100 h-screen w-full backdrop-blur-sm" onClick={handleOutClick}>
          <AddTaskModal affirmativeAct='Add' isOpen={isModalOpen} onClose={handleModalClose}/>
        </div> : <></>
      }
      <TaskList />  
    </div>
  );
}
