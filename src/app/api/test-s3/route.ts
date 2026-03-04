/**
 * S3 Connection Test API Route
 *
 * Tests if AWS S3 is properly configured
 * GET /api/test-s3
 */

import { NextResponse } from 'next/server';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { s3Client, S3_BUCKET } from '@/lib/s3/config';

export async function GET() {
  try {
    // Test 1: Check environment variables
    const envCheck = {
      hasRegion: !!process.env.AWS_REGION,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
      hasBucket: !!process.env.AWS_S3_BUCKET,
      region: process.env.AWS_REGION,
      bucket: S3_BUCKET,
    };

    // Test 2: Try to list objects in the bucket (just to verify connection)
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      MaxKeys: 1, // Only fetch 1 object to test connection
    });

    const response = await s3Client.send(command);

    return NextResponse.json({
      success: true,
      message: 'S3 connection successful!',
      tests: {
        environment: envCheck,
        s3Connection: {
          connected: true,
          bucket: S3_BUCKET,
          objectCount: response.KeyCount || 0,
        },
      },
    });
  } catch (error) {
    console.error('S3 Test Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'S3 connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        tests: {
          environment: {
            hasRegion: !!process.env.AWS_REGION,
            hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
            hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
            hasBucket: !!process.env.AWS_S3_BUCKET,
          },
        },
      },
      { status: 500 }
    );
  }
}
