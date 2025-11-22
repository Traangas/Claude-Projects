/**
 * AWS S3 Integration for ClearSkin Platform
 *
 * This module provides complete S3 functionality for managing file uploads,
 * including scanned images, profile photos, and general file uploads.
 *
 * @module s3
 */

// Export configuration
export { s3Client, s3Config, S3_BUCKET, S3_REGION } from './config';

// Export all service functions
export {
  uploadFile,
  getPresignedUrl,
  getPresignedUploadUrl,
  deleteFile,
  deleteMultipleFiles,
  getFileInfo,
  listFiles,
  fileExists,
  generateFileKey,
} from './service';

// Export all types
export type {
  FileCategory,
  UploadOptions,
  UploadResult,
  PresignedUrlOptions,
  DeleteOptions,
  DeleteResult,
  FileInfo,
} from './types';

// Export client-side hooks
export {
  useFileUpload,
  usePresignedUrl,
  useFileDelete,
  useDirectUpload,
} from './hooks';
