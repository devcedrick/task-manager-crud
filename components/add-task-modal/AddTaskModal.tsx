"use client"
import React, { useState } from 'react'
import Input from './Input'
import DescInput from './DescInput'
import AddButton from '../AddButton'
import CancelButton from './CancelButton'
import { supabase } from '@/lib/supabase-client'
import { toast } from 'sonner'

interface AddTaskModalProps {
  affirmativeAct: string;
  isOpen: boolean;
  onClose: () => void;
  // Optional props for edit mode
  taskId?: string;
  initialTitle?: string;
  initialDesc?: string;
  onSuccess?: (payload: { task_id: string; title: string; desc: string }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ affirmativeAct, isOpen, onClose, taskId, initialTitle, initialDesc, onSuccess }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    desc: ''
  });
  
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      if (affirmativeAct.toLowerCase() === 'edit') {
        setNewTask({
          title: initialTitle ?? '',
          desc: initialDesc ?? ''
        });
      } else {
        setNewTask({ title: '', desc: '' });
      }
      setIsError(false);
    }
  }, [isOpen, affirmativeAct, initialTitle, initialDesc]);

  const handleSubmitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.title.trim() === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsSubmitting(true);
    try {
      if (affirmativeAct.toLowerCase() === 'edit' && taskId) {
        const { data, error } = await supabase
          .from('tasks')
          .update({ title: newTask.title.trim(), desc: newTask.desc })
          .eq('task_id', taskId)
          .select('task_id, title, desc')
          .single();

        if (error) throw error;

        onSuccess?.({ task_id: data.task_id, title: data.title, desc: data.desc });
        toast.success('Task updated successfully!');
      } else {
        const { error } = await supabase
          .from('tasks')
          .insert({ title: newTask.title.trim(), desc: newTask.desc })
          .single();

        if (error) throw error;
        toast.success('Task added successfully!');
      }

      setNewTask({ title: '', desc: '' });
      onClose();
    } catch (err) {
      const isEdit = affirmativeAct.toLowerCase() === 'edit';
      toast.error(isEdit ? 'Unexpected error updating task' : 'Unexpected error creating task');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className='bg-surface w-150 justify-center items-start p-8 rounded-md shadow-md border border-border'>
      <h1 className='ml-2 mb-3 text-2xl font-bold'>{affirmativeAct.toLowerCase() === 'edit' ? 'Edit Task' : 'Add New Task'}</h1>
      <form onSubmit={handleSubmitTask} className=' flex flex-col gap-5'>
          <Input 
          value={newTask.title}
          onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
          isError={isError}
        />
        <DescInput 
          value={newTask.desc}
          onChange={(value) => setNewTask(prev => ({ ...prev, desc: value }))}
        />
        <div className='w-full flex justify-end gap-3 mt-3'>
          <CancelButton onClick={onClose}/>
          <AddButton content={isSubmitting ? `${affirmativeAct}ing...` : affirmativeAct} type='submit' disabled={isSubmitting} />
        </div>
      </form>
    </div>
  )
}

export default AddTaskModal
