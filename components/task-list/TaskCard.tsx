import React from 'react'
import { Ellipsis } from 'lucide-react';
import Dropdown from './Dropdown';
import { toast } from 'sonner';

interface TaskCardProps {
  id: string;
  title: string;
  desc: string;
  onDelete: (id: string) => Promise<unknown>;
  onEdit?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({id, title, desc, onDelete, onEdit}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownAreaRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  React.useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (
        isDropdownOpen &&
        dropdownAreaRef.current &&
        !dropdownAreaRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown as EventListener);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown as EventListener);
    };
  }, [isDropdownOpen]);

  const handleDelete = () => {
    setIsDropdownOpen(false);
    toast.promise(onDelete(id), {
      loading: 'Deleting task...',
      success: 'Task Deleted Successfully',
      error: 'Failed to Delete Task',
    });
  };

  const handleEdit = () => {
    setIsDropdownOpen(false);
    onEdit?.();
  }

  return (
    <div className='flex flex-col relative bg-surface h-max lg:h-60 p-6 rounded-md shadow-md border border-border'>
      <div className='flex h-auto sm:h-15 lg:overflow-hidden'>
        <h1 className='flex-1 text-base sm:text-lg font-bold'>{title}</h1>
        <div ref={dropdownAreaRef}>
          <button className='flex justify-center w-10 cursor-pointer rounded-full '
            onClick={toggleDropdown}>
            <Ellipsis className='transition-all duration-150 ease-in-out hover:scale-130'/>
          </button>
          {isDropdownOpen && (
            <Dropdown onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </div>

      <div className='bg-gray-300 w-full border opacity-5 mt-1'></div>
      
      {
        desc.trim() !== '' ? <p className='mt-5 text-sm text-muted-foreground'>{desc}</p> : <p className='mt-5 text-sm text-gray-500 italic'>No description provided</p>
      }
    </div>
  )
}

export default TaskCard
