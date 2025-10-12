import React from 'react';
import { ClipLoader } from 'react-spinners';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-lg bg-surface px-5 py-4 shadow-md border border-border">
        <ClipLoader size={25} color="#fff" />
        <span className="text-md text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
