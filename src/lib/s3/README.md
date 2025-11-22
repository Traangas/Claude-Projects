# AWS S3 Integration for ClearSkin Platform

This directory contains the AWS S3 integration for managing file uploads in the ClearSkin platform.

## Configuration

### S3 Bucket Details

- **Bucket Name**: `clearskin-s3-bucket`
- **Region**: `eu-north-1` (Europe - Stockholm)
- **Purpose**: Storing scanned images, profile photos, and general file uploads

### Environment Variables

Add the following environment variables to your `.env.local` file:

```env
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=clearskin-s3-bucket
```

## AWS Setup Guide

### 1. Create S3 Bucket

1. Log in to AWS Console
2. Navigate to S3 service
3. Click "Create bucket"
4. Configure:
   - **Bucket name**: `clearskin-s3-bucket`
   - **Region**: Europe (Stockholm) `eu-north-1`
   - **Block Public Access**: Keep enabled (recommended for security)
   - **Bucket Versioning**: Enable (optional, for backup)
   - **Default encryption**: Enable (AES-256 or AWS KMS)

### 2. Create IAM User

1. Navigate to IAM service
2. Click "Users" → "Create user"
3. Set username (e.g., `clearskin-s3-user`)
4. Attach policies directly or create custom policy:

**Recommended Custom Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:HeadObject"
      ],
      "Resource": [
        "arn:aws:s3:::clearskin-s3-bucket",
        "arn:aws:s3:::clearskin-s3-bucket/*"
      ]
    }
  ]
}
```

5. Create access keys:
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Select "Application running outside AWS"
   - Save the Access Key ID and Secret Access Key

### 3. Configure CORS (Optional)

If you need browser-based uploads, configure CORS on your bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 4. Set Bucket Lifecycle Rules (Optional)

Configure automatic deletion or archiving of old files:

1. Navigate to S3 bucket → "Management" → "Lifecycle rules"
2. Create rule for temporary files
3. Example: Delete scanned images older than 90 days

## Usage Examples

### Upload a File

```typescript
import { uploadFile, generateFileKey } from '@/lib/s3';

async function handleFileUpload(file: File, userId: string) {
  const key = generateFileKey(file.name, 'scanned-images', userId);

  const result = await uploadFile({
    file,
    key,
    category: 'scanned-images',
    contentType: file.type,
    metadata: {
      userId,
      uploadedAt: new Date().toISOString(),
    },
  });

  console.log('Uploaded to:', result.url);
  return result;
}
```

### Get Presigned URL for Secure Access

```typescript
import { getPresignedUrl } from '@/lib/s3';

async function getSecureImageUrl(imageKey: string) {
  // URL valid for 1 hour
  const url = await getPresignedUrl({
    key: imageKey,
    expiresIn: 3600,
  });

  return url;
}
```

### Direct Browser Upload (Presigned Upload URL)

```typescript
import { getPresignedUploadUrl, generateFileKey } from '@/lib/s3';

async function getBrowserUploadUrl(fileName: string, userId: string) {
  const key = generateFileKey(fileName, 'profile-photos', userId);

  // Get presigned URL valid for 5 minutes
  const uploadUrl = await getPresignedUploadUrl({
    key,
    expiresIn: 300,
    contentType: 'image/jpeg',
  });

  // Client can now PUT directly to this URL
  return { uploadUrl, key };
}

// Client-side usage
async function uploadFromBrowser(file: File, uploadUrl: string) {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
}
```

### Delete a File

```typescript
import { deleteFile } from '@/lib/s3';

async function removeImage(imageKey: string) {
  const result = await deleteFile({ key: imageKey });
  console.log('Deleted:', result.success);
}
```

### List User Files

```typescript
import { listFiles } from '@/lib/s3';

async function getUserScans(userId: string) {
  const files = await listFiles(`scanned-images/${userId}`);
  return files;
}
```

### Check if File Exists

```typescript
import { fileExists } from '@/lib/s3';

async function validateImageExists(imageKey: string) {
  const exists = await fileExists(imageKey);
  if (!exists) {
    throw new Error('Image not found');
  }
}
```

## File Organization Structure

Files are organized in S3 using the following structure:

```
clearskin-s3-bucket/
├── scanned-images/
│   ├── user123/
│   │   ├── 1234567890-abc123-label1.jpg
│   │   └── 1234567891-def456-label2.jpg
│   └── user456/
│       └── 1234567892-ghi789-label3.jpg
├── profile-photos/
│   ├── user123/
│   │   └── 1234567893-jkl012-profile.jpg
│   └── user456/
│       └── 1234567894-mno345-profile.jpg
└── general-uploads/
    └── 1234567895-pqr678-document.pdf
```

## File Categories

The platform supports three file categories:

1. **`scanned-images`**: Product ingredient label scans
2. **`profile-photos`**: User profile pictures
3. **`general-uploads`**: Other file uploads

## Security Best Practices

1. **Never commit credentials**: Keep `.env.local` in `.gitignore`
2. **Use presigned URLs**: For temporary access instead of making bucket public
3. **Implement file validation**: Check file types and sizes before upload
4. **Set up CloudFront**: For better performance and security (optional)
5. **Enable S3 access logging**: Monitor bucket access
6. **Use IAM roles**: For EC2/Lambda instead of access keys when possible
7. **Rotate access keys**: Regularly update IAM user credentials

## File Size Limits

Recommended limits:
- **Scanned images**: Max 10 MB
- **Profile photos**: Max 5 MB
- **General uploads**: Max 20 MB

Implement validation before upload:

```typescript
const MAX_FILE_SIZE = {
  'scanned-images': 10 * 1024 * 1024, // 10 MB
  'profile-photos': 5 * 1024 * 1024,  // 5 MB
  'general-uploads': 20 * 1024 * 1024, // 20 MB
};

function validateFileSize(file: File, category: FileCategory) {
  if (file.size > MAX_FILE_SIZE[category]) {
    throw new Error(`File too large. Max size: ${MAX_FILE_SIZE[category] / 1024 / 1024} MB`);
  }
}
```

## Error Handling

Always wrap S3 operations in try-catch blocks:

```typescript
import { uploadFile } from '@/lib/s3';

async function safeUpload(file: File, key: string) {
  try {
    const result = await uploadFile({
      file,
      key,
      category: 'scanned-images',
    });
    return { success: true, result };
  } catch (error) {
    console.error('Upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
```

## Next.js API Route Example

Create an API route for handling uploads:

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadFile, generateFileKey } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const category = formData.get('category') as FileCategory;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const key = generateFileKey(file.name, category, userId);
    const result = await uploadFile({
      file,
      key,
      category,
      contentType: file.type,
      metadata: { userId },
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

## Monitoring and Costs

- **Monitor usage**: Check S3 metrics in CloudWatch
- **Set up billing alerts**: Get notified of unexpected costs
- **Estimated costs**:
  - Storage: ~$0.023 per GB/month (eu-north-1)
  - Requests: ~$0.0043 per 1,000 PUT requests
  - Data transfer: First 100 GB/month free

## Support

For issues or questions:
- Check AWS S3 documentation: https://docs.aws.amazon.com/s3/
- Review ClearSkin platform documentation
- Contact the development team

---

**Last Updated**: November 2025
**Version**: 1.0.0
