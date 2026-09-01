import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, X, Edit2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  multiline?: boolean;
  as?: React.ElementType;
}

export function EditableText({ value, onSave, className, multiline = false, as: Component = 'span' }: EditableTextProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (!user || user.role !== 'admin') {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full z-50">
        {multiline ? (
          <textarea
            ref={inputRef as any}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 border-2 border-[#008751] rounded-lg shadow-lg text-gray-900 bg-white min-h-[100px] text-base"
          />
        ) : (
          <input
            ref={inputRef as any}
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 border-2 border-[#008751] rounded-lg shadow-lg text-gray-900 bg-white text-base"
          />
        )}
        <div className="absolute right-2 top-2 flex space-x-1 bg-white rounded-md shadow p-1">
          <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check className="w-4 h-4" /></button>
          <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <Component className={cn("relative group cursor-pointer border-b-2 border-transparent hover:border-[#FFD100] transition-colors inline-block", className)} onClick={() => setIsEditing(true)}>
      {value}
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit2 className="w-4 h-4 text-[#008751]" />
      </div>
    </Component>
  );
}
