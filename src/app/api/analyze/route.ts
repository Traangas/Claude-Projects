import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT =
  'This is a photo of a skincare or cosmetic product. ' +
  'Find the ingredient list and extract every ingredient from it. ' +
  'Return ONLY a numbered list of ingredients, one per line, exactly as they appear on the label. ' +
  'Do not add explanations, descriptions, or any other text. ' +
  'If no ingredient list is visible in the image, reply with exactly: "No ingredient list visible in this image."';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: 'Image data required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      PROMPT,
    ]);

    return NextResponse.json({ ingredients: result.response.text() });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
