import React, { useState } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { useBulkUploadGallery } from '@/hooks';

export function GalleryUpload({ adventureId }: { adventureId: string }) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: uploadGallery, isPending } = useBulkUploadGallery();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = (files: File[]) => {
    uploadGallery({
      adventureId: '123-abc',
      files: files,
      altTexts: files.map((f) => f.name),
    });
  };

  return (
    <VStack align='start' gap={4}>
      <Input
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileChange}
      />
      <Button
        loading={isUploading}
        onClick={handleUpload}
        disabled={!selectedFiles}
      >
        Upload to Gallery
      </Button>
    </VStack>
  );
}
