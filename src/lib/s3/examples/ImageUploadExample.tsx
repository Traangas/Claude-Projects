/**
 * Example Component: Image Upload
 *
 * This component demonstrates how to use the S3 upload hooks
 * to upload images from a React component.
 *
 * Usage:
 * ```tsx
 * import ImageUploadExample from '@/lib/s3/examples/ImageUploadExample';
 *
 * function MyPage() {
 *   return <ImageUploadExample userId="user123" />;
 * }
 * ```
 */

'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useFileUpload, useFileDelete } from '../hooks';
import type { FileCategory } from '../types';

interface ImageUploadExampleProps {
  userId: string;
  category?: FileCategory;
}

export default function ImageUploadExample({
  userId,
  category = 'scanned-images',
}: ImageUploadExampleProps) {
  const [uploadedFile, setUploadedFile] = useState<{
    key: string;
    url: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { upload, isUploading, error: uploadError } = useFileUpload({
    category,
    userId,
  });

  const { deleteFile, isDeleting, error: deleteError } = useFileDelete();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Upload the file
    const result = await upload(file);

    if (result) {
      setUploadedFile({ key: result.key, url: result.url });
      console.log('Upload successful:', result);
    }
  };

  const handleDelete = async () => {
    if (!uploadedFile) return;

    const success = await deleteFile(uploadedFile.key, userId);

    if (success) {
      setUploadedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      console.log('Delete successful');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image Upload Example</h2>

      {/* Upload Section */}
      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select an image to upload
        </label>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Loading State */}
      {isUploading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700">Uploading...</p>
        </div>
      )}

      {/* Error State */}
      {(uploadError || deleteError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{uploadError || deleteError}</p>
        </div>
      )}

      {/* Success State */}
      {uploadedFile && (
        <div className="mb-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-3">
            <p className="text-green-700 font-medium mb-2">Upload successful!</p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Key:</strong> {uploadedFile.key}
            </p>
          </div>

          {/* Preview Image */}
          <div className="mb-3">
            <img
              src={uploadedFile.url}
              alt="Uploaded"
              className="w-full h-auto rounded-md border border-gray-200"
            />
          </div>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md
              hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed
              transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Image'}
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Info:</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Max file size: 10 MB</li>
          <li>• Allowed types: JPEG, PNG, WebP</li>
          <li>• Category: {category}</li>
          <li>• User ID: {userId}</li>
        </ul>
      </div>
    </div>
  );
}
