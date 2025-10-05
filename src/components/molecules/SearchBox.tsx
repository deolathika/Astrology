/**
 * SearchBox Molecule Component
 * Search input with icon and clear functionality
 */

import React, { useState } from 'react'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  loading?: boolean
  className?: string
  showClearButton?: boolean
  showSearchButton?: boolean
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSearch,
  onClear,
  loading = false,
  className,
  showClearButton = true,
  showSearchButton = false
}) => {
  const [internalValue, setInternalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleSearch = () => {
    onSearch?.(internalValue)
  }

  const handleClear = () => {
    setInternalValue('')
    onChange?.('')
    onClear?.()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const searchIcon = (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )

  const clearIcon = (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          icon={searchIcon}
          iconPosition="left"
          className="pr-10"
        />
        
        {showClearButton && internalValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            {clearIcon}
          </Button>
        )}
      </div>
      
      {showSearchButton && (
        <Button
          onClick={handleSearch}
          loading={loading}
          disabled={!internalValue}
        >
          Search
        </Button>
      )}
    </div>
  )
}

export { SearchBox }
export type { SearchBoxProps }

