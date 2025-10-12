import React from 'react'
import { X } from 'lucide-react'

interface CancelButtonProps {
  onClick?: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return (
    <button type='button' className='button bg-muted text-background' onClick={onClick}>
      <X className='inline mr-2' size={18}/>
      Cancel
    </button>
  )
}

export default CancelButton
