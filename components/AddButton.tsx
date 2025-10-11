import React from 'react'
import { Plus } from 'lucide-react'

interface AddButtonProps {
  content: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({content, handleClick, type = 'button', disabled = false}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className='button bg-primary text-background bg-accent transition hover:bg-accent-600 disabled:opacity-60 disabled:cursor-not-allowed'
      onClick={handleClick}
    >
      <Plus className='inline mr-2' size={18}/>
      {content}
    </button>
  )
}

export default AddButton
