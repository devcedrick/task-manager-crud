"use client"
import React, { useState } from 'react'
import Input from './Input'
import DescInput from './DescInput'
import AddButton from '../AddButton'
import CancelButton from './CancelButton'

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isError, setIsError] = useState(false);

  const onAddTask = () => {
    if (title.trim() === '') {
      setIsError(true);
      console.log('Title field is empty!');
      return;
    }
    else {
      console.log(`Task Added: ${title}`, { desc });
      // reset state and close modal
      setTitle('');
      setDesc('');
      setIsError(false);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className='flex flex-col gap-5 bg-surface w-150 justify-center items-start p-8 rounded-md shadow-md border border-border'>
      <h1 className='ml-2 mb-3 text-2xl font-bold'>Add New Task</h1>
      <Input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        isError={isError}
      />
      <DescInput 
        value={desc}
        onChange={setDesc}
      />
      <div className='w-full flex justify-end gap-3 mt-3'>
        <CancelButton onClick={onClose}/>
        <AddButton content='Add' handleClick={onAddTask} />
      </div>
    </div>
  )
}

export default AddTaskModal
