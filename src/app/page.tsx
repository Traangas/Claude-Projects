export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="container-custom py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-hero-mobile md:text-hero-desktop font-normal mb-6">
            Know what's in your skincare.
            <br />
            <span className="text-gray-400">Cut through the marketing hype.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-2xl mx-auto">
            Scan product ingredient lists instantly, get AI-powered analysis in plain language, and track what works for your skin.
          </p>

          <button className="btn-primary max-w-md mx-auto">
            Scan Your First Product
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white text-2xl">
                🔍
              </div>
            </div>
            <h3 className="text-xl mb-3">Ingredient Analysis</h3>
            <p className="text-gray-600 font-light">
              AI-powered analysis of what each ingredient does, in plain language you can understand.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white text-2xl">
                📊
              </div>
            </div>
            <h3 className="text-xl mb-3">Personal History</h3>
            <p className="text-gray-600 font-light">
              Track products you've tried and rate their effectiveness for your unique skin.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-black rounded-full flex items-center justify-center text-white text-2xl">
                ⚖️
              </div>
            </div>
            <h3 className="text-xl mb-3">Smart Recommendations</h3>
            <p className="text-gray-600 font-light">
              Compare products side-by-side and get recommendations based on what worked for you.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="container-custom text-center">
          <p className="text-sm text-gray-400 font-light">
            Not medical advice. Consult a dermatologist for skin concerns.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 ClearSkin. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
