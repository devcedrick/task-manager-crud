"use client"
import AddTaskModal from "@/components/add-task-modal/AddTaskModal";
import { useState } from "react";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleOutClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  }

  return (
    <div className="font-sans grid grid-cols-4  items-center justify-center min-h-screen w-full">
      {
        isModalOpen ? 
        <div className="absolute flex items-center justify-center top-0 left-0 z-100 h-screen w-full backdrop-blur-sm" onClick={handleOutClick}>
          <AddTaskModal isOpen={isModalOpen} onClose={handleModalClose}/>
        </div> : <></>
      }
      
    </div>
  );
}
