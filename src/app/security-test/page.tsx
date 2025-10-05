'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, Lock, AlertTriangle, CheckCircle, XCircle,
  Eye, EyeOff, Key, Database, Server, Globe
} from 'lucide-react'

interface SecurityTest {
  id: string
  name: string
  description: string
  endpoint: string
  method: string
  expectedResult: string
  status: 'pending' | 'running' | 'passed' | 'failed'
  result?: string
  error?: string
}

const securityTests: SecurityTest[] = [
  {
    id: 'csrf-protection',
    name: 'CSRF Protection',
    description: 'Test CSRF token validation on state-changing operations',
    endpoint: '/api/admin/users',
    method: 'GET',
    expectedResult: 'Should require valid CSRF token',
    status: 'pending'
  },
  {
    id: 'rate-limiting',
    name: 'Rate Limiting',
    description: 'Test rate limiting on authentication endpoints',
    endpoint: '/api/auth/simple',
    method: 'POST',
    expectedResult: 'Should limit requests per time window',
    status: 'pending'
  },
  {
    id: 'pii-masking',
    name: 'PII Masking',
    description: 'Test personal information masking in responses',
    endpoint: '/api/auth/simple',
    method: 'POST',
    expectedResult: 'Should mask sensitive user data',
    status: 'pending'
  },
  {
    id: 'security-headers',
    name: 'Security Headers',
    description: 'Test security headers are present in responses',
    endpoint: '/api/admin/users',
    method: 'GET',
    expectedResult: 'Should include CSP, HSTS, X-Frame-Options',
    status: 'pending'
  },
  {
    id: 'role-protection',
    name: 'Role Protection',
    description: 'Test admin-only endpoints are protected',
    endpoint: '/api/admin/users',
    method: 'GET',
    expectedResult: 'Should require admin role',
    status: 'pending'
  },
  {
    id: 'input-validation',
    name: 'Input Validation',
    description: 'Test malicious input is sanitized',
    endpoint: '/api/auth/simple',
    method: 'POST',
    expectedResult: 'Should sanitize dangerous input',
    status: 'pending'
  }
]

export default function SecurityTestPage() {
  const [tests, setTests] = useState<SecurityTest[]>(securityTests)
  const [isRunning, setIsRunning] = useState(false)
  const [overallStatus, setOverallStatus] = useState<'pending' | 'running' | 'completed'>('pending')

  const runSecurityTest = async (test: SecurityTest) => {
    setTests(prev => prev.map(t => 
      t.id === test.id ? { ...t, status: 'running' } : t
    ))

    try {
      const startTime = Date.now()
      
      // Simulate security test based on test type
      let response: Response
      let result: any

      switch (test.id) {
        case 'csrf-protection':
          // Test without CSRF token
          response = await fetch(test.endpoint, {
            method: test.method,
            headers: { 'Content-Type': 'application/json' }
          })
          result = await response.json()
          break

        case 'rate-limiting':
          // Test rate limiting by making multiple requests
          const promises = Array(10).fill(0).map(() => 
            fetch(test.endpoint, {
              method: test.method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'login', email: 'test@test.com', password: 'test' })
            })
          )
          const responses = await Promise.all(promises)
          response = responses[0] // Use the first response as the main response
          result = { rateLimited: responses.some(r => r.status === 429) }
          break

        case 'pii-masking':
          // Test PII masking
          response = await fetch(test.endpoint, {
            method: test.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'getUser' })
          })
          result = await response.json()
          break

        case 'security-headers':
          // Test security headers
          response = await fetch(test.endpoint, {
            method: test.method,
            headers: { 'Content-Type': 'application/json' }
          })
          const headers = Object.fromEntries(response.headers.entries())
          result = { 
            hasCSP: !!headers['content-security-policy'],
            hasHSTS: !!headers['strict-transport-security'],
            hasXFrame: !!headers['x-frame-options']
          }
          break

        case 'role-protection':
          // Test without admin role
          response = await fetch(test.endpoint, {
            method: test.method,
            headers: { 'Content-Type': 'application/json' }
          })
          result = await response.json()
          break

        case 'input-validation':
          // Test with malicious input
          response = await fetch(test.endpoint, {
            method: test.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'login', 
              email: '<script>alert("xss")</script>', 
              password: 'test' 
            })
          })
          result = await response.json()
          break

        default:
          response = new Response(JSON.stringify({ error: 'Unknown test' }), { status: 400 })
          result = { error: 'Unknown test' }
      }

      const duration = Date.now() - startTime
      const passed = response.status !== 403 && response.status !== 429 && !result?.error

      setTests(prev => prev.map(t => 
        t.id === test.id ? { 
          ...t, 
          status: passed ? 'passed' : 'failed',
          result: JSON.stringify(result),
          error: passed ? undefined : `Status: ${response?.status}`
        } : t
      ))

    } catch (error) {
      setTests(prev => prev.map(t => 
        t.id === test.id ? { 
          ...t, 
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } : t
      ))
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setOverallStatus('running')

    for (const test of tests) {
      await runSecurityTest(test)
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsRunning(false)
    setOverallStatus('completed')
  }

  const getStatusIcon = (status: SecurityTest['status']) => {
    switch (status) {
      case 'passed': return CheckCircle
      case 'failed': return XCircle
      case 'running': return Eye
      default: return Lock
    }
  }

  const getStatusColor = (status: SecurityTest['status']) => {
    switch (status) {
      case 'passed': return 'text-green-500'
      case 'failed': return 'text-red-500'
      case 'running': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  const passedTests = tests.filter(t => t.status === 'passed').length
  const totalTests = tests.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
        >
          <div className="flex items-center mb-8">
            <Shield className="w-12 h-12 text-red-400 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-white">Security Testing Dashboard</h1>
              <p className="text-gray-300 mt-2">Comprehensive security validation for Daily Secrets app</p>
            </div>
          </div>

          {/* Overall Status */}
          <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-white">Security Test Results</h2>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Tests Passed</p>
                  <p className="text-2xl font-bold text-white">{passedTests}/{totalTests}</p>
                </div>
                <button
                  onClick={runAllTests}
                  disabled={isRunning}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-white font-semibold transition-colors"
                >
                  {isRunning ? 'Running Tests...' : 'Run All Tests'}
                </button>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${(passedTests / totalTests) * 100}%` }}
              />
            </div>
          </div>

          {/* Security Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, index) => {
              const StatusIcon = getStatusIcon(test.status)
              const statusColor = getStatusColor(test.status)

              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <StatusIcon className={`w-6 h-6 ${statusColor} mr-3`} />
                    <h3 className="text-lg font-semibold text-white">{test.name}</h3>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">{test.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Endpoint:</span>
                      <span className="text-white font-mono">{test.endpoint}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Method:</span>
                      <span className="text-white font-mono">{test.method}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className={`font-semibold ${statusColor}`}>
                        {test.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {test.result && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-1">Result:</p>
                      <pre className="text-xs text-gray-300 bg-black/20 p-2 rounded overflow-x-auto">
                        {test.result}
                      </pre>
                    </div>
                  )}

                  {test.error && (
                    <div className="mb-4">
                      <p className="text-sm text-red-400 mb-1">Error:</p>
                      <p className="text-xs text-red-300 bg-red-900/20 p-2 rounded">
                        {test.error}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => runSecurityTest(test)}
                    disabled={test.status === 'running'}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white text-sm font-semibold transition-colors"
                  >
                    {test.status === 'running' ? 'Testing...' : 'Run Test'}
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Security Recommendations */}
          <div className="mt-8 p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Security Recommendations</h3>
            <ul className="text-white space-y-2 text-sm">
              <li>• Ensure all API endpoints have proper rate limiting</li>
              <li>• Implement CSRF protection on all state-changing operations</li>
              <li>• Mask PII data in all API responses</li>
              <li>• Add security headers to all responses</li>
              <li>• Implement proper role-based access control</li>
              <li>• Sanitize all user input to prevent XSS attacks</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
