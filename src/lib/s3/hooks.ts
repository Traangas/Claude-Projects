/**
 * React Hooks for S3 File Operations
 *
 * Client-side utilities for interacting with S3 via API routes
 */

'use client';

import { useState, useCallback } from 'react';
import type { FileCategory } from './types';

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface UseFileUploadOptions {
  category: FileCategory;
  userId: string;
  onProgress?: (progress: UploadProgress) => void;
}

interface UploadResult {
  key: string;
  url: string;
  bucket: string;
  size: number;
  type: string;
}

/**
 * Hook for uploading files via API route
 */
export function useFileUpload(options: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<UploadResult | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', options.userId);
        formData.append('category', options.category);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const { data } = await response.json();
        return data as UploadResult;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Upload failed';
        setError(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [options.userId, options.category]
  );

  return { upload, isUploading, error };
}

/**
 * Hook for getting presigned download URLs
 */
export function usePresignedUrl() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDownloadUrl = useCallback(
    async (key: string, expiresIn: number = 3600): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/files/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'download', key, expiresIn }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate URL');
        }

        const { data } = await response.json();
        return data.url;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate URL';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getUploadUrl = useCallback(
    async (
      fileName: string,
      category: FileCategory,
      userId: string,
      contentType?: string,
      expiresIn: number = 300
    ): Promise<{ url: string; key: string } | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/files/presigned-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'upload',
            fileName,
            category,
            userId,
            contentType,
            expiresIn,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate URL');
        }

        const { data } = await response.json();
        return { url: data.url, key: data.key };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate URL';
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { getDownloadUrl, getUploadUrl, isLoading, error };
}

/**
 * Hook for deleting files
 */
export function useFileDelete() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFile = useCallback(
    async (key: string, userId?: string): Promise<boolean> => {
      setIsDeleting(true);
      setError(null);

      try {
        const response = await fetch('/api/files/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, userId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Delete failed');
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Delete failed';
        setError(errorMessage);
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    []
  );

  return { deleteFile, isDeleting, error };
}

/**
 * Hook for direct browser upload using presigned URLs
 */
export function useDirectUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getUploadUrl } = usePresignedUrl();

  const upload = useCallback(
    async (
      file: File,
      category: FileCategory,
      userId: string
    ): Promise<string | null> => {
      setIsUploading(true);
      setError(null);

      try {
        // Step 1: Get presigned upload URL
        const urlData = await getUploadUrl(
          file.name,
          category,
          userId,
          file.type
        );

        if (!urlData) {
          throw new Error('Failed to get upload URL');
        }

        // Step 2: Upload directly to S3
        const uploadResponse = await fetch(urlData.url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error('Upload to S3 failed');
        }

        // Return the S3 key for future reference
        return urlData.key;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Upload failed';
        setError(errorMessage);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [getUploadUrl]
  );

  return { upload, isUploading, error };
}
