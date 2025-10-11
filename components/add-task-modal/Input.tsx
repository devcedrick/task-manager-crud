"use client";
import React, { useRef, useState } from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
}

const Input: React.FC<InputProps> = ({ value, onChange, isError }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const hasError = isError && value.trim().length === 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={() => inputRef.current?.focus()}
      onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          inputRef.current?.focus();
        }
        setIsFocused(true);
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        const related = e.relatedTarget as Node | null;
        if (!containerRef.current?.contains(related)) {
          setIsFocused(false);
        }
      }}
      className={`w-full rounded-md ${
        hasError ? 'ring-2 ring-red-400 ring-offset-2 ring-offset-background' : ''
      }`}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        placeholder="Task Title"
        aria-invalid={hasError}
        className={`border border-border bg-surface-2 px-4 py-2 w-full focus:outline-0 focus:ring-0 rounded-md ${
          isFocused && !isError ? "input-focus" : ""
        } placeholder:text-muted`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default Input;
