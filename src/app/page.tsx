'use client';

import { useState, useRef } from 'react';
import { Camera, RotateCcw, AlertTriangle } from 'lucide-react';

interface Analysis {
  summary: string;
  idealFor: string[];
  cautions: string[];
  ingredients: string[];
}

export default function Home() {
  const [preview, setPreview] = useState('');
  const [mimeType, setMimeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalysis(null);
    setError('');
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!preview) return;

    setLoading(true);
    setError('');

    try {
      const base64 = preview.split(',')[1];
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview('');
    setMimeType('');
    setAnalysis(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 border-b border-gray-100">
        <h1 className="text-xl font-normal tracking-tight text-black">ClearSkin</h1>
        <p className="text-xs text-gray-400 font-light mt-0.5">Ingredient scanner</p>
      </header>

      <main className="flex-1 px-5 py-7 w-full max-w-lg mx-auto">
        {!preview ? (
          /* Upload zone */
          <div className="space-y-5">
            <p className="text-sm text-gray-400 font-light">
              Photograph the ingredient list on a product label to see what&apos;s inside.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-gray-200 rounded-2xl py-14 flex flex-col items-center gap-3 active:bg-gray-50 transition-colors"
            >
              <Camera className="w-7 h-7 text-gray-300" />
              <span className="text-sm text-gray-400 font-light">Take photo or choose image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-5">
            {/* Image preview */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Product label"
                className="w-full max-h-64 object-contain"
              />
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm active:scale-95 transition-transform"
                aria-label="Remove image"
              >
                <RotateCcw className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scan button */}
            {!analysis && !loading && (
              <button onClick={handleAnalyze} className="btn-primary">
                Scan Ingredients
              </button>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center py-10 gap-3">
                <div className="w-5 h-5 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
                <p className="text-xs text-gray-400 font-light">Analysing ingredients…</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm text-red-400 font-light">{error}</p>
            )}

            {/* Results */}
            {analysis && (
              <div className="space-y-3">

                {/* Scan another */}
                <div className="flex justify-end">
                  <button
                    onClick={handleReset}
                    className="text-xs text-gray-400 underline underline-offset-2"
                  >
                    Scan another
                  </button>
                </div>

                {/* 1. Summary */}
                <section className="bg-gray-50 rounded-2xl p-5 space-y-1.5">
                  <span className="text-xs uppercase tracking-widest text-gray-300 font-normal">
                    Summary
                  </span>
                  <p className="text-sm font-light leading-6 text-gray-700">
                    {analysis.summary}
                  </p>
                </section>

                {/* 2. Ideal For */}
                <section className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-gray-300 font-normal">
                    Ideal for
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {analysis.idealFor.map((item, i) => (
                      <span
                        key={i}
                        className="bg-black text-white text-xs font-light px-3 py-1.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                {/* 3. Cautions */}
                <section className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-gray-300 font-normal">
                    Cautions
                  </span>
                  {analysis.cautions.length === 0 ? (
                    <p className="text-sm font-light text-gray-400">No notable cautions found.</p>
                  ) : (
                    <ul className="space-y-2">
                      {analysis.cautions.map((item, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span className="text-sm font-light text-gray-700 leading-5">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                {/* 4. Full Ingredient List */}
                <section className="bg-gray-50 rounded-2xl p-5 space-y-3">
                  <span className="text-xs uppercase tracking-widest text-gray-300 font-normal">
                    Full ingredient list
                  </span>
                  <ol className="space-y-1.5">
                    {analysis.ingredients.map((item, i) => (
                      <li key={i} className="flex gap-3 items-baseline">
                        <span className="text-xs text-gray-300 font-light w-5 shrink-0 text-right">
                          {i + 1}
                        </span>
                        <span className="text-sm font-light text-gray-700 leading-5">{item}</span>
                      </li>
                    ))}
                  </ol>
                </section>

              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-5 border-t border-gray-100 text-center mt-4">
        <p className="text-xs text-gray-300 font-light">
          For educational use only. Not medical advice.
        </p>
      </footer>
    </div>
  );
}
