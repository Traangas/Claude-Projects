/**
 * Presigned URL Generation API Route
 *
 * Generates presigned URLs for secure file access or upload
 * POST /api/files/presigned-url
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getPresignedUrl,
  getPresignedUploadUrl,
  generateFileKey,
} from '@/lib/s3';
import type { FileCategory } from '@/lib/s3';

type PresignedUrlType = 'download' | 'upload';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      type = 'download',
      key,
      fileName,
      category,
      userId,
      contentType,
      expiresIn = 3600, // 1 hour default
    } = body as {
      type?: PresignedUrlType;
      key?: string;
      fileName?: string;
      category?: FileCategory;
      userId?: string;
      contentType?: string;
      expiresIn?: number;
    };

    // Validate expiration time (max 7 days)
    if (expiresIn > 604800) {
      return NextResponse.json(
        { error: 'Expiration time cannot exceed 7 days (604800 seconds)' },
        { status: 400 }
      );
    }

    if (type === 'download') {
      // For download, we need the key
      if (!key) {
        return NextResponse.json(
          { error: 'File key is required for download URLs' },
          { status: 400 }
        );
      }

      const url = await getPresignedUrl({ key, expiresIn });

      return NextResponse.json({
        success: true,
        data: {
          url,
          key,
          expiresIn,
          expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
        },
      });
    } else if (type === 'upload') {
      // For upload, we need fileName, category, and userId
      if (!fileName || !category || !userId) {
        return NextResponse.json(
          {
            error:
              'fileName, category, and userId are required for upload URLs',
          },
          { status: 400 }
        );
      }

      // Generate a new key for the upload
      const uploadKey = key || generateFileKey(fileName, category, userId);

      const url = await getPresignedUploadUrl({
        key: uploadKey,
        expiresIn,
        contentType,
      });

      return NextResponse.json({
        success: true,
        data: {
          url,
          key: uploadKey,
          expiresIn,
          expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "download" or "upload"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Presigned URL generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate presigned URL',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
