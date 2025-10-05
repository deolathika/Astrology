'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface MissingKey {
  key: string
  component: string
  file: string
  line?: number
  context?: string
}

interface MissingKeysReport {
  totalKeys: number
  missingKeys: MissingKey[]
  coverage: number
  lastUpdated: string
}

export const useMissingKeysReport = () => {
  const [report, setReport] = useState<MissingKeysReport | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateReport = async () => {
    setIsGenerating(true)
    try {
      // This would be implemented to scan the codebase for missing translation keys
      // For now, we'll create a mock report
      const mockReport: MissingKeysReport = {
        totalKeys: 150,
        missingKeys: [
          {
            key: 'home.dailyInsights.title',
            component: 'HomePage',
            file: 'src/app/page.tsx',
            line: 120,
            context: 'Daily insights section title'
          },
          {
            key: 'astrology.birthData.placeLabel',
            component: 'AstrologyPage',
            file: 'src/app/astrology/page.tsx',
            line: 45,
            context: 'Birth place input label'
          },
          {
            key: 'numerology.calculation.results',
            component: 'NumerologyPage',
            file: 'src/app/numerology/page.tsx',
            line: 78,
            context: 'Numerology results section'
          },
          {
            key: 'compatibility.score.interpretation',
            component: 'CompatibilityPage',
            file: 'src/app/compatibility/page.tsx',
            line: 92,
            context: 'Compatibility score interpretation'
          },
          {
            key: 'dreams.analysis.symbols',
            component: 'DreamsPage',
            file: 'src/app/dreams/page.tsx',
            line: 156,
            context: 'Dream symbols analysis'
          },
          {
            key: 'community.post.placeholder',
            component: 'CommunityPage',
            file: 'src/app/community/page.tsx',
            line: 203,
            context: 'Community post input placeholder'
          },
          {
            key: 'profile.settings.theme',
            component: 'ProfilePage',
            file: 'src/app/profile/page.tsx',
            line: 234,
            context: 'Theme setting label'
          },
          {
            key: 'admin.dashboard.stats',
            component: 'AdminPage',
            file: 'src/app/admin/page.tsx',
            line: 167,
            context: 'Admin dashboard statistics'
          }
        ],
        coverage: 85.3,
        lastUpdated: new Date().toISOString()
      }
      
      setReport(mockReport)
    } catch (error) {
      console.error('Error generating missing keys report:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    generateReport()
  }, [])

  return {
    report,
    isGenerating,
    generateReport
  }
}

export const MissingKeysReportComponent = () => {
  const { report, isGenerating } = useMissingKeysReport()

  if (isGenerating) {
    return (
      <div className="p-4 bg-violet-900/50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-violet-700 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-violet-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300">
        Failed to generate missing keys report
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-4 bg-violet-900/50 rounded-lg">
        <h3 className="text-lg font-semibold text-gold-400 mb-2">Translation Coverage Report</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-violet-300">Total Keys:</span>
            <span className="text-violet-200 ml-2 font-medium">{report.totalKeys}</span>
          </div>
          <div>
            <span className="text-violet-300">Coverage:</span>
            <span className="text-violet-200 ml-2 font-medium">{report.coverage}%</span>
          </div>
          <div>
            <span className="text-violet-300">Missing Keys:</span>
            <span className="text-red-400 ml-2 font-medium">{report.missingKeys.length}</span>
          </div>
          <div>
            <span className="text-violet-300">Last Updated:</span>
            <span className="text-violet-200 ml-2 font-medium">
              {new Date(report.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Missing Keys List */}
      {report.missingKeys.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-md font-semibold text-violet-300">Missing Translation Keys</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {report.missingKeys.map((missingKey, index) => (
              <div
                key={index}
                className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-red-400 font-medium text-sm">
                      {missingKey.key}
                    </div>
                    <div className="text-red-300 text-xs mt-1">
                      {missingKey.component} • {missingKey.file}
                      {missingKey.line && `:${missingKey.line}`}
                    </div>
                    {missingKey.context && (
                      <div className="text-red-400 text-xs mt-1">
                        {missingKey.context}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 text-xs text-red-400">
                    Missing
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => window.open('/admin/translations', '_blank')}
          className="px-4 py-2 bg-gold-400 text-violet-900 rounded-lg hover:bg-gold-500 transition-colors text-sm font-medium"
        >
          Open Translation Editor
        </button>
        <button
          onClick={() => window.open('/admin/translations/export', '_blank')}
          className="px-4 py-2 bg-violet-600 text-violet-200 rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
        >
          Export Missing Keys
        </button>
      </div>
    </div>
  )
}

export default MissingKeysReportComponent
