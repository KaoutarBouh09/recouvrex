import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface DragAndDropUploadProps {
  onDrop: (files: FileList | null) => Promise<void>;
}

const DragAndDropUpload: React.FC<DragAndDropUploadProps> = ({ onDrop }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // const fileList = Array.from(e.dataTransfer.files);
    // setFiles(fileList);
    // await onDrop(e.dataTransfer.files);
    handleFileUpload(e);

  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = Array.from(e.target.files || []);
    setFiles(fileList);
    await onDrop(e.target.files);
  };

  const handleUpload = () => {
    // Handle upload logic here
    console.log(files);
    // Reset files state after upload
    setFiles([]);
  };

  return (
    <Box
      sx={{
        border: '2px dashed #aaa',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {files.length === 0 ? (
        <Typography>Drag and drop files here or click to select files</Typography>
      ) : (
        <Typography>{files.length} file(s) selected</Typography>
      )}
      <input
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        multiple
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={files.length === 0}
      >
        Upload
      </Button>
    </Box>
  );
};

export default DragAndDropUpload;
