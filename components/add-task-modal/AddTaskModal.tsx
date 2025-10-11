"use client"
import React, { useState } from 'react'
import Input from './Input'
import DescInput from './DescInput'
import AddButton from '../AddButton'
import CancelButton from './CancelButton'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .insert({ title: title.trim(), desc: desc })
        .single();

      if (error) {
        console.log('Error creating task:', error.message);
        return;
      }

      setTitle('');
      setDesc('');
      onClose();

      toast.success('Task added successfully!');
    } catch (err) {
      console.log('Unexpected error creating task');
      toast.error('Unexpected error creating task');
    } finally {
      setIsSubmitting(false);
    }
  }



  if (!isOpen) return null;

  return (
    <div className='bg-surface w-150 justify-center items-start p-8 rounded-md shadow-md border border-border'>
      <h1 className='ml-2 mb-3 text-2xl font-bold'>Add New Task</h1>
      <form onSubmit={handleSubmitTask} className=' flex flex-col gap-5'>
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
          <AddButton content={isSubmitting ? 'Adding...' : 'Add'} type='submit' disabled={isSubmitting} />
        </div>
      </form>
    </div>
  )
}

export default AddTaskModal
