export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Daily Secrets
          </h1>
          <p className="text-lg text-slate-600">
            Discover your personalized cosmic insights with the power of astrology and numerology.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Today's Secret</h3>
                <p className="text-sm text-slate-600">Personalized daily cosmic guidance</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Get your personalized daily cosmic insights, lucky numbers, and advice.
            </p>
            <a href="/today" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
              View Today
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Cosmic Profile</h3>
                <p className="text-sm text-slate-600">Complete astrological analysis</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Explore your natal chart, numerology, and unique cosmic blueprint.
            </p>
            <a href="/profile" className="inline-block px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
              View Profile
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Compatibility</h3>
                <p className="text-sm text-slate-600">Relationship insights</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Discover your cosmic connections and relationship insights.
            </p>
            <a href="/compatibility" className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              Check Compatibility
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Numerology</h3>
                <p className="text-sm text-slate-600">Numerical analysis</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Calculate your life path, expression, and soul urge numbers.
            </p>
            <a href="/numerology" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Calculate Numbers
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Community</h3>
                <p className="text-sm text-slate-600">Connect with cosmic souls</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Connect with like-minded cosmic explorers and share insights.
            </p>
            <a href="/community" className="inline-block px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors">
              Join Community
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Premium Services</h3>
                <p className="text-sm text-slate-600">Advanced features</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              Unlock advanced features and expert consultations.
            </p>
            <a href="/premium-services" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition-colors">
              Upgrade Now
            </a>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">10</div>
                <div className="text-xs text-slate-600">Active Features</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">5</div>
                <div className="text-xs text-slate-600">Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">3</div>
                <div className="text-xs text-slate-600">Systems</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">∞</div>
                <div className="text-xs text-slate-600">Possibilities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/main" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Main Dashboard
            </a>
            <a href="/onboarding/complete" className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
              Complete Setup
            </a>
            <a href="/today" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Today's Secret
            </a>
            <a href="/profile" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              My Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}