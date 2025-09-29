export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cosmic-gradient-text mb-4">
          ✅ Daily Secrets App is Working!
        </h1>
        <p className="text-stellar-gray-light text-lg">
          Server is running successfully on port 8120
        </p>
        <div className="mt-8">
          <a 
            href="/setup-test" 
            className="inline-block px-6 py-3 bg-electric-violet text-white rounded-full hover:bg-electric-violet/80 transition-all"
          >
            Go to Setup Test
          </a>
        </div>
      </div>
    </div>
  )
}
