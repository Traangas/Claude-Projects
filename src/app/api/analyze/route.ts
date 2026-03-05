import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `This is a photo of a skincare or cosmetic product. Find the ingredient list and analyze it.

Respond with ONLY a valid JSON object — no markdown, no code blocks, no explanation. Use this exact structure:

{
  "summary": "Two sentences describing what type of product this is and what it does, based purely on the ingredients. Be factual and avoid all marketing language.",
  "idealFor": ["skin type or concern 1", "skin type or concern 2"],
  "cautions": ["caution or warning based on a specific ingredient", "another caution if applicable"],
  "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"]
}

Rules:
- summary: factual only, no marketing language, 2 sentences max
- idealFor: be specific (e.g. "dry skin", "acne-prone skin", "sensitive skin", "hyperpigmentation")
- cautions: only include real concerns (e.g. allergens, irritants, UV sensitisers, comedogenic ingredients). If none, return an empty array.
- ingredients: list exactly as they appear on the label

If no ingredient list is visible in the image, return: {"error": "No ingredient list visible in this image."}`;

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json({ error: 'Image data required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      PROMPT,
    ]);

    const text = result.response.text().trim();

    // Strip markdown code fences if Gemini wraps the response
    const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

    const data = JSON.parse(cleaned);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 422 });
    }

    return NextResponse.json({
      summary: data.summary ?? '',
      idealFor: Array.isArray(data.idealFor) ? data.idealFor : [],
      cautions: Array.isArray(data.cautions) ? data.cautions : [],
      ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analysis failed' },
      { status: 500 }
    );
  }
}
