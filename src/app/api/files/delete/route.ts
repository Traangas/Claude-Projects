/**
 * File Deletion API Route
 *
 * Handles file deletion from AWS S3
 * DELETE /api/files/delete
 */

import { NextRequest, NextResponse } from 'next/server';
import { deleteFile, fileExists } from '@/lib/s3';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, userId } = body as {
      key: string;
      userId?: string;
    };

    // Validate required fields
    if (!key) {
      return NextResponse.json(
        { error: 'File key is required' },
        { status: 400 }
      );
    }

    // Optional: Verify file belongs to user
    // You can add additional authorization logic here
    if (userId) {
      // Check if key starts with a path that includes userId
      const allowedPrefixes = [
        `scanned-images/${userId}/`,
        `profile-photos/${userId}/`,
      ];

      const isAuthorized = allowedPrefixes.some((prefix) =>
        key.startsWith(prefix)
      );

      if (!isAuthorized) {
        return NextResponse.json(
          { error: 'Unauthorized to delete this file' },
          { status: 403 }
        );
      }
    }

    // Check if file exists
    const exists = await fileExists(key);
    if (!exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Delete the file
    const result = await deleteFile({ key });

    return NextResponse.json({
      success: true,
      data: {
        key: result.key,
        deletedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete file',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
