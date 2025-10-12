import React, { useEffect } from 'react'
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import TaskCard from './TaskCard';
import LoadingOverlay from '../LoadingOverlay';
import AddTaskModal from '../add-task-modal/AddTaskModal';

interface Task {
  task_id: string;
  title: string;
  desc: string;
  created_at: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const {error, data} = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

      setTasks(data as Task[] || []);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log('Error fetching tasks:', error);
      toast.error('Error fetching tasks');
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('task_id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(t => t.task_id !== id));
    } finally {
      // Slight delay to avoid flicker on very fast operations
      setTimeout(() => setIsDeleting(false), 150);
    }
  };

  const editTask = (id: string) => {
    const task = tasks.find(t => t.task_id === id) || null;
    setEditingTask(task);
    setIsModalOpen(true);
  }

  return (
    <div className='w-screen h-screen'>
      {(isFetching || isDeleting) && (
        <LoadingOverlay message={isFetching ? 'Loading tasks...' : 'Deleting task...'} />
      )}
      <>
        {tasks.length ?
          <div className='w-full h-max grid grid-cols-4 gap-4 p-10 pt-30'>
              {
                tasks.map(task => (
                  <TaskCard
                    key={task.task_id}
                    id={task.task_id}
                    title={task.title}
                    desc={task.desc}
                    onDelete={deleteTask}
                    onEdit={() => editTask(task.task_id)}
                  />
                )) 
              }
          </div> : 
          <div className='w-full h-screen flex items-center justify-center text-gray-400 text-4xl'>No task added yet.</div>
        }
        {isModalOpen && (
          <div className="absolute flex items-center justify-center top-0 left-0 z-100 h-screen w-full backdrop-blur-sm">
            <AddTaskModal
              affirmativeAct='Edit'
              isOpen={isModalOpen}
              onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
              taskId={editingTask?.task_id}
              initialTitle={editingTask?.title}
              initialDesc={editingTask?.desc}
              onSuccess={(updated) => {
                setTasks(prev => prev.map(t => 
                  t.task_id === updated.task_id ? 
                  { ...t, title: updated.title, desc: updated.desc } : t));
              }}
            />
          </div> 
        )}
      </>
    </div>
  )
}

export default TaskList
