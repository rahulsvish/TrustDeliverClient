
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, disabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (disabled) return;
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (disabled) return;
    
    // Validate file type and size
    const validTypes = ['text/csv', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or TXT file",
        variant: "destructive",
      });
      return;
    }

    // 10MB max size check
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Send the file to the parent component
    onFileUpload(file);
    
    // Reset the upload state after a delay to simulate processing
    setTimeout(() => {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };

  const handleButtonClick = () => {
    if (disabled) return;
    
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
        disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' :
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
        accept=".csv, .txt"
        disabled={disabled}
      />
      
      <div className="text-center">
        <motion.div 
          className={`mx-auto mb-4 p-3 rounded-full ${disabled ? 'bg-gray-200' : 'bg-primary/10'} inline-flex`}
          animate={{ scale: isDragging && !disabled ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Upload className={`h-8 w-8 ${disabled ? 'text-gray-400' : 'text-primary'}`} />
        </motion.div>
        
        <h3 className="text-lg font-medium mb-2">
          {isUploading ? 'Uploading...' : disabled ? 'Bulk Verification Requires a Plan' : 'Drop your file here'}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          {disabled ? 'Please subscribe to one of our plans to use this feature' : 'or'}
        </p>
        
        <Button
          onClick={handleButtonClick}
          disabled={isUploading || disabled}
          variant="outline"
        >
          {isUploading ? 'Processing...' : disabled ? 'View Plans' : 'Browse Files'}
        </Button>
      </div>
    </div>
  );
};
