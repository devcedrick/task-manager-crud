import React from 'react'
import { Edit, Trash } from 'lucide-react'

interface DropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({onEdit, onDelete}) => {
  return (
    <div className='absolute flex flex-col gap-2 right-7 z-100 top-12 w-50 bg-surface-2 border border-border rounded-md p-4'> 
      <button type='button' className='w-full hover:text-background button hover:bg-accent' onClick={onEdit}>
        <Edit className='inline mr-3' size={16}/>
        Edit
      </button>
      <button type='button' className='w-full hover:text-background button hover:bg-red-400' onClick={onDelete}>
        <Trash className='inline mr-3' size={16}/>
        Delete
      </button>
    </div>
  )
}

export default Dropdown
