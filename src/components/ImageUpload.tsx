import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageUploadProps {
  onUpload: (base64: string) => void;
  className?: string;
  label?: string;
  iconOnly?: boolean;
}

export function ImageUpload({ onUpload, className, label = "Upload Image", iconOnly = false }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={cn("flex items-center justify-center w-full h-full", className)} 
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <input type="file" accept="image/*" className="hidden" ref={inputRef} onChange={handleFileChange} />
      <Upload className="w-5 h-5" />
      {!iconOnly && <span className="ml-2 text-sm font-medium">{label}</span>}
    </div>
  );
}
