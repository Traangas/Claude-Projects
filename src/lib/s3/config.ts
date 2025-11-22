/**
 * AWS S3 Configuration
 *
 * This module provides the S3 client configuration for the ClearSkin platform.
 *
 * Bucket: clearskin-s3-bucket
 * Region: eu-north-1 (Europe - Stockholm)
 * Purpose: Storing scanned images, profile photos, and general file uploads
 */

import { S3Client } from '@aws-sdk/client-s3';

// Validate required environment variables
const requiredEnvVars = [
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// S3 Configuration
export const s3Config = {
  region: process.env.AWS_REGION!,
  bucket: process.env.AWS_S3_BUCKET!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
} as const;

// Create and export S3 client instance
export const s3Client = new S3Client({
  region: s3Config.region,
  credentials: s3Config.credentials,
});

// Export bucket name for easy access
export const S3_BUCKET = s3Config.bucket;
export const S3_REGION = s3Config.region;
