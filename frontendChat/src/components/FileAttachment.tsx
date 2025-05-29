import React, { useRef } from 'react';
import { FileIcon } from 'lucide-react';

interface FileAttachmentProps {
  onFileSelect: (file: File) => void;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="w-16 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 bg-gray-50 dark:bg-gray-800/50">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        multiple={false}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300"
        title="Attach file"
      >
        <FileIcon size={20} />
      </button>
    </div>
  );
}

export default FileAttachment;