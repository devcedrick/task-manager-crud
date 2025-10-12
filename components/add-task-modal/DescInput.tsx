"use client"
import React, { useEffect, useRef } from 'react'

interface DescInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescInput: React.FC<DescInputProps> = ({ value, onChange }) => {
  const divRef = useRef<HTMLDivElement>(null);

  // Keep the DOM in sync when value changes from above
  useEffect(() => {
    if (!divRef.current) return;
    const currentText = divRef.current.innerText;
    // Only update if different to avoid cursor jump on each keystroke
    if ((value || '') !== (currentText || '')) {
      divRef.current.innerText = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (!divRef.current) return;
    const text = divRef.current.innerText;
    onChange(text);
  };

  return (
    <div className="relative w-full">
      <div
        ref={divRef}
        onInput={handleInput}
        contentEditable={true}
        tabIndex={0}
        className="w-full h-32 px-4 py-2.5 border rounded-md bg-surface-2 input-focus overflow-y-auto"
        style={{ borderColor: 'var(--border)' }}
        role="textbox"
        aria-multiline="true"
        aria-label="Description"
      />
      {(value ?? '') === '' && (
        <div className="absolute top-2 left-4 text-muted pointer-events-none">
          Task Description
        </div>
      )}
    </div>
  )
}

export default DescInput
