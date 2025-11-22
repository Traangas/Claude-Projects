/**
 * File Upload API Route
 *
 * Handles file uploads to AWS S3
 * POST /api/upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, generateFileKey } from '@/lib/s3';
import type { FileCategory } from '@/lib/s3';

// Configuration for file size limits (in bytes)
const MAX_FILE_SIZE = {
  'scanned-images': 10 * 1024 * 1024, // 10 MB
  'profile-photos': 5 * 1024 * 1024,  // 5 MB
  'general-uploads': 20 * 1024 * 1024, // 20 MB
};

// Allowed file types for each category
const ALLOWED_TYPES = {
  'scanned-images': ['image/jpeg', 'image/png', 'image/webp'],
  'profile-photos': ['image/jpeg', 'image/png', 'image/webp'],
  'general-uploads': [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ],
};

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const category = (formData.get('category') as FileCategory) || 'general-uploads';

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE[category]) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size for ${category}: ${
            MAX_FILE_SIZE[category] / 1024 / 1024
          } MB`,
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES[category].includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed types for ${category}: ${ALLOWED_TYPES[
            category
          ].join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Generate unique file key
    const key = generateFileKey(file.name, category, userId);

    // Upload to S3
    const result = await uploadFile({
      file,
      key,
      category,
      contentType: file.type,
      metadata: {
        userId,
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        key: result.key,
        url: result.url,
        bucket: result.bucket,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Upload failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
