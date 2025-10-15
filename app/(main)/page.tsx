"use client"

import React, { useState, useEffect } from "react";
import AddButton from "@/components/AddButton";
import AddTaskModal from "@/components/add-task-modal/AddTaskModal";
import TaskList from "@/components/task-list/TaskList";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {session, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading && !session) {
      router.push('/login');
      console.log('We are now in Login page.')
    }
  }, [session, loading, router]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  }

  if(loading) {
    return (
      <LoadingOverlay />
    )
  }

  if (!session) return null;

  return (
    <div className="min-h-screen px-8 sm:px-15">
      <div className="flex justify-center sm:justify-start pt-28 ">
        <AddButton content='Add Task' handleClick={() => setIsModalOpen(true)} />
      </div>
      
      <p className="mt-10 text-xs font-['Arial'] text-gray-500">
        The system is currently accessible to the public, allowing anyone with the website link to add, modify, or update tasks. User authentication is actively under development by the developer, <a href="mailto:kencedrickjimeno@gmail.com">Ken Cedrick A. Jimeno</a>. Stay tune for more updates!
      </p>
      <div className='bg-gray-800 w-full border opacity-10 mt-5'></div>
      {
        isModalOpen ? 
        <div className="absolute flex items-center justify-center top-0 left-0 z-100 h-screen w-full backdrop-blur-sm" onClick={handleOutClick}>
          <AddTaskModal affirmativeAct='Add' isOpen={isModalOpen} onClose={handleModalClose}/>
        </div> : <></>
      }
      <TaskList />  

      {/* Authentication */}
      <form action="">

      </form>
    </div>
  );
}
