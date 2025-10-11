import React from 'react'
import { Plus } from 'lucide-react'

interface AddButtonProps {
  content: string;
  handleClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({content, handleClick}) => {
  return (
    <button className='button bg-primary text-background bg-accent transition hover:bg-accent-600'
      onClick={handleClick}>
      <Plus className='inline mr-2' size={18}/>
      {content}
    </button>
  )
}

export default AddButton
