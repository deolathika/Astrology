/**
 * Navigation Organism Component
 * Main navigation component with sidebar and mobile support
 */

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { useAppStore, useUser, useSidebarOpen, useUIActions } from '@/lib/stores/app-store'
import { useAuth } from '@/lib/contexts/auth-context'
import { cn } from '@/lib/utils'

interface NavigationProps {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const pathname = usePathname()
  const user = useUser()
  const sidebarOpen = useSidebarOpen()
  const { setSidebarOpen } = useUIActions()
  const { logout } = useAuth()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        </svg>
      )
    },
    {
      name: 'Astrology',
      href: '/astrology',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      name: 'Numerology',
      href: '/numerology',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      )
    },
    {
      name: 'Dreams',
      href: '/dreams',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      name: 'Matches',
      href: '/matches',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ]

  const adminItems = [
    {
      name: 'Admin',
      href: '/admin',
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      )
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={cn('bg-card border-r border-border', className)}>
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <Link href="/" className="text-xl font-bold text-foreground">
          Daily Secrets
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-xl font-bold text-foreground">
              Daily Secrets
            </Link>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
              
                  {user?.role === 'admin' && (
                    <>
                      <div className="border-t border-border my-2"></div>
                      {adminItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                            isActive(item.href)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          )}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Link>
                      ))}
                    </>
                  )}
                  
                  {user && (
                    <>
                      <div className="border-t border-border my-2"></div>
                      <button
                        onClick={logout}
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent w-full"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="ml-3">Logout</span>
                      </button>
                    </>
                  )}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0 bg-background/80" onClick={() => setSidebarOpen(false)} />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link href="/" className="text-xl font-bold text-foreground">
                    Daily Secrets
                  </Link>
                </div>
                
                <nav className="mt-5 px-2 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  ))}
                  
                  {user?.role === 'admin' && (
                    <>
                      <div className="border-t border-border my-2"></div>
                      {adminItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            isActive(item.href)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Link>
                      ))}
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export { Navigation }
export type { NavigationProps }
