/**
 * AWS S3 Service
 *
 * This module provides utility functions for interacting with AWS S3.
 * All functions are designed for the ClearSkin platform's file storage needs.
 */

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client, S3_BUCKET } from './config';
import type {
  UploadOptions,
  UploadResult,
  PresignedUrlOptions,
  DeleteOptions,
  DeleteResult,
  FileInfo,
  FileCategory,
} from './types';

/**
 * Generate a unique file key with category-based organization
 */
export function generateFileKey(
  fileName: string,
  category: FileCategory,
  userId?: string
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

  // Organize files by category and optionally by user
  const basePath = userId
    ? `${category}/${userId}`
    : category;

  return `${basePath}/${timestamp}-${randomString}-${sanitizedFileName}`;
}

/**
 * Upload a file to S3
 *
 * @example
 * ```typescript
 * const result = await uploadFile({
 *   file: imageFile,
 *   key: 'scanned-images/user123/1234567890-abc123-label.jpg',
 *   category: 'scanned-images',
 *   contentType: 'image/jpeg',
 *   metadata: { userId: 'user123' }
 * });
 * console.log('Uploaded to:', result.url);
 * ```
 */
export async function uploadFile(
  options: UploadOptions
): Promise<UploadResult> {
  const { file, key, contentType, metadata } = options;

  // Convert File to Buffer if needed
  let body: Buffer;
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    body = Buffer.from(arrayBuffer);
  } else {
    body = file;
  }

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
    Metadata: metadata,
  });

  const response = await s3Client.send(command);

  return {
    key,
    url: `https://${S3_BUCKET}.s3.amazonaws.com/${key}`,
    etag: response.ETag,
    bucket: S3_BUCKET,
  };
}

/**
 * Generate a presigned URL for secure file access
 *
 * This is useful for:
 * - Providing temporary access to private files
 * - Allowing direct browser uploads without exposing credentials
 * - Sharing files with expiration times
 *
 * @example
 * ```typescript
 * const url = await getPresignedUrl({
 *   key: 'scanned-images/user123/label.jpg',
 *   expiresIn: 3600 // 1 hour
 * });
 * ```
 */
export async function getPresignedUrl(
  options: PresignedUrlOptions
): Promise<string> {
  const { key, expiresIn = 3600 } = options;

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generate a presigned URL for uploading files
 *
 * This allows clients to upload files directly to S3 without
 * going through your server, reducing bandwidth and latency.
 *
 * @example
 * ```typescript
 * const uploadUrl = await getPresignedUploadUrl({
 *   key: 'scanned-images/user123/new-label.jpg',
 *   expiresIn: 300 // 5 minutes
 * });
 * // Client can now PUT to this URL
 * ```
 */
export async function getPresignedUploadUrl(
  options: PresignedUrlOptions & { contentType?: string }
): Promise<string> {
  const { key, expiresIn = 300, contentType } = options;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Delete a file from S3
 *
 * @example
 * ```typescript
 * const result = await deleteFile({
 *   key: 'scanned-images/user123/old-label.jpg'
 * });
 * console.log('Deleted:', result.success);
 * ```
 */
export async function deleteFile(
  options: DeleteOptions
): Promise<DeleteResult> {
  const { key } = options;

  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);

  return {
    success: true,
    key,
  };
}

/**
 * Get file metadata without downloading the file
 *
 * @example
 * ```typescript
 * const info = await getFileInfo('scanned-images/user123/label.jpg');
 * console.log('File size:', info.size, 'bytes');
 * ```
 */
export async function getFileInfo(key: string): Promise<FileInfo> {
  const command = new HeadObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
  });

  const response = await s3Client.send(command);

  return {
    key,
    size: response.ContentLength || 0,
    lastModified: response.LastModified || new Date(),
    contentType: response.ContentType,
    metadata: response.Metadata,
  };
}

/**
 * List files in a specific category or prefix
 *
 * @example
 * ```typescript
 * const files = await listFiles('scanned-images/user123');
 * console.log('Found', files.length, 'files');
 * ```
 */
export async function listFiles(
  prefix: string,
  maxKeys: number = 1000
): Promise<FileInfo[]> {
  const command = new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: prefix,
    MaxKeys: maxKeys,
  });

  const response = await s3Client.send(command);

  return (response.Contents || []).map((item) => ({
    key: item.Key || '',
    size: item.Size || 0,
    lastModified: item.LastModified || new Date(),
  }));
}

/**
 * Check if a file exists in S3
 *
 * @example
 * ```typescript
 * const exists = await fileExists('scanned-images/user123/label.jpg');
 * if (exists) {
 *   console.log('File found!');
 * }
 * ```
 */
export async function fileExists(key: string): Promise<boolean> {
  try {
    await getFileInfo(key);
    return true;
  } catch (error) {
    // If error is 'NotFound', file doesn't exist
    if ((error as any).name === 'NotFound') {
      return false;
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Delete multiple files from S3
 *
 * @example
 * ```typescript
 * const results = await deleteMultipleFiles([
 *   'scanned-images/user123/old1.jpg',
 *   'scanned-images/user123/old2.jpg'
 * ]);
 * console.log('Deleted', results.filter(r => r.success).length, 'files');
 * ```
 */
export async function deleteMultipleFiles(
  keys: string[]
): Promise<DeleteResult[]> {
  const deletePromises = keys.map((key) => deleteFile({ key }));
  return Promise.all(deletePromises);
}
