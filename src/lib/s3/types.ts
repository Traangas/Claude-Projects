/**
 * TypeScript types for S3 operations
 */

export type FileCategory =
  | 'scanned-images'     // Product ingredient label scans
  | 'profile-photos'     // User profile pictures
  | 'general-uploads';   // Other file uploads

export interface UploadOptions {
  /** The file to upload */
  file: File | Buffer;
  /** The unique key/path for the file in S3 */
  key: string;
  /** File category for organizing files */
  category: FileCategory;
  /** Content type (MIME type) of the file */
  contentType?: string;
  /** Additional metadata to store with the file */
  metadata?: Record<string, string>;
}

export interface UploadResult {
  /** The S3 key where the file was uploaded */
  key: string;
  /** The full S3 URL of the uploaded file */
  url: string;
  /** The ETag of the uploaded file */
  etag?: string;
  /** The bucket name */
  bucket: string;
}

export interface PresignedUrlOptions {
  /** The S3 key of the file */
  key: string;
  /** Expiration time in seconds (default: 3600 = 1 hour) */
  expiresIn?: number;
}

export interface DeleteOptions {
  /** The S3 key of the file to delete */
  key: string;
}

export interface DeleteResult {
  /** Whether the deletion was successful */
  success: boolean;
  /** The key of the deleted file */
  key: string;
}

export interface FileInfo {
  /** The S3 key of the file */
  key: string;
  /** File size in bytes */
  size: number;
  /** Last modified date */
  lastModified: Date;
  /** Content type */
  contentType?: string;
  /** File metadata */
  metadata?: Record<string, string>;
}
