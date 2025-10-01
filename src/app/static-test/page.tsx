export default function StaticTestPage() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          Static Test Page
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          This is a static page that should work without any JavaScript.
        </p>
        <div className="bg-cosmic-navy/30 p-6 rounded-lg border border-electric-violet/20 max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-stellar-yellow mb-4">Status</h2>
          <p className="text-stellar-gray-light">✅ Server-side rendering works</p>
          <p className="text-stellar-gray-light">✅ CSS classes are applied</p>
          <p className="text-stellar-gray-light">✅ Static content loads</p>
        </div>
      </div>
    </div>
  )
}



