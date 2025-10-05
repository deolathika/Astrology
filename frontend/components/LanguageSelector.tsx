/**
 * 🌌 Daily Secrets - Language Selector Component
 * Multi-language support with cosmic styling
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  ChevronDown, 
  Check,
  Languages
} from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

interface LanguageSelectorProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
  availableLanguages?: Language[];
  showNativeNames?: boolean;
  showFlags?: boolean;
  position?: 'header' | 'footer' | 'sidebar';
  size?: 'sm' | 'md' | 'lg';
}

const defaultLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'si-LK',
    name: 'Sinhala',
    nativeName: 'සිංහල',
    flag: '🇱🇰'
  },
  {
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳'
  },
  {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳'
  },
  {
    code: 'zh-CN',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
  availableLanguages = defaultLanguages,
  showNativeNames = true,
  showFlags = true,
  position = 'header',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get current language info
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];

  // Filter languages based on search
  const filteredLanguages = availableLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle language selection
  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange?.(languageCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, languageCode: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageSelect(languageCode);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3'
  };

  return (
    <div className={`language-selector language-selector-${position} language-selector-${size}`}>
      {/* Trigger Button */}
      <button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="language-trigger-content">
          {showFlags && (
            <span className="language-flag" aria-hidden="true">
              {currentLang.flag}
            </span>
          )}
          <span className="language-name">
            {showNativeNames ? currentLang.nativeName : currentLang.name}
          </span>
          <Globe className="language-icon" />
          <ChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            aria-label="Available languages"
          >
            {/* Search Input */}
            <div className="language-search">
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="language-search-input"
                autoFocus
              />
            </div>

            {/* Language List */}
            <div className="language-list">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((language) => (
                  <button
                    key={language.code}
                    className={`language-option ${currentLanguage === language.code ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(language.code)}
                    onKeyDown={(e) => handleKeyDown(e, language.code)}
                    role="option"
                    aria-selected={currentLanguage === language.code}
                    dir={language.rtl ? 'rtl' : 'ltr'}
                  >
                    <div className="language-option-content">
                      {showFlags && (
                        <span className="language-option-flag" aria-hidden="true">
                          {language.flag}
                        </span>
                      )}
                      <div className="language-option-text">
                        <span className="language-option-name">
                          {showNativeNames ? language.nativeName : language.name}
                        </span>
                        {showNativeNames && language.nativeName !== language.name && (
                          <span className="language-option-english">
                            {language.name}
                          </span>
                        )}
                      </div>
                      {currentLanguage === language.code && (
                        <Check className="language-option-check" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="language-no-results">
                  <Languages className="no-results-icon" />
                  <span>No languages found</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="language-footer">
              <span className="language-count">
                {filteredLanguages.length} language{filteredLanguages.length !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .language-selector {
          position: relative;
          display: inline-block;
        }

        .language-trigger {
          display: flex;
          align-items: center;
          padding: ${sizeClasses[size]};
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border: 1px solid var(--color-cosmic-stellarGray);
          border-radius: var(--border-radius-lg);
          color: var(--color-neutral-white);
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
          min-width: 120px;
        }

        .language-trigger:hover {
          border-color: var(--mood-primary, var(--color-semantic-primary));
          background: var(--mood-primary, var(--color-semantic-primary));
        }

        .language-trigger:focus {
          outline: 2px solid var(--mood-primary, var(--color-semantic-primary));
          outline-offset: 2px;
        }

        .language-trigger-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .language-flag {
          font-size: 1.2em;
          flex-shrink: 0;
        }

        .language-name {
          flex: 1;
          text-align: left;
          font-weight: var(--font-weight-medium);
        }

        .language-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .chevron-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
          transition: transform var(--duration-normal) var(--easing-cosmic);
        }

        .chevron-icon.open {
          transform: rotate(180deg);
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--mood-surface, var(--color-cosmic-cosmicNavy));
          border: 1px solid var(--color-cosmic-stellarGray);
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-xl);
          z-index: var(--z-index-dropdown);
          margin-top: 0.5rem;
          min-width: 200px;
          max-height: 300px;
          overflow: hidden;
        }

        .language-search {
          padding: 0.75rem;
          border-bottom: 1px solid var(--color-cosmic-stellarGray);
        }

        .language-search-input {
          width: 100%;
          padding: 0.5rem;
          background: var(--color-cosmic-deepSpace);
          border: 1px solid var(--color-cosmic-stellarGray);
          border-radius: var(--border-radius-md);
          color: var(--color-neutral-white);
          font-size: var(--font-size-sm);
        }

        .language-search-input:focus {
          outline: none;
          border-color: var(--mood-primary, var(--color-semantic-primary));
        }

        .language-search-input::placeholder {
          color: var(--color-neutral-gray400);
        }

        .language-list {
          max-height: 200px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--color-cosmic-stellarGray) transparent;
        }

        .language-list::-webkit-scrollbar {
          width: 6px;
        }

        .language-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .language-list::-webkit-scrollbar-thumb {
          background: var(--color-cosmic-stellarGray);
          border-radius: 3px;
        }

        .language-option {
          width: 100%;
          padding: 0.75rem;
          background: transparent;
          border: none;
          color: var(--color-neutral-white);
          cursor: pointer;
          transition: all var(--duration-normal) var(--easing-cosmic);
          text-align: left;
        }

        .language-option:hover {
          background: var(--mood-primary, var(--color-semantic-primary));
        }

        .language-option.selected {
          background: var(--mood-primary, var(--color-semantic-primary));
        }

        .language-option:focus {
          outline: none;
          background: var(--mood-primary, var(--color-semantic-primary));
        }

        .language-option-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .language-option-flag {
          font-size: 1.2em;
          flex-shrink: 0;
        }

        .language-option-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .language-option-name {
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-sm);
        }

        .language-option-english {
          font-size: var(--font-size-xs);
          color: var(--color-neutral-gray300);
        }

        .language-option-check {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .language-no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 2rem;
          color: var(--color-neutral-gray400);
          text-align: center;
        }

        .no-results-icon {
          width: 2rem;
          height: 2rem;
        }

        .language-footer {
          padding: 0.5rem 0.75rem;
          border-top: 1px solid var(--color-cosmic-stellarGray);
          background: var(--color-cosmic-deepSpace);
        }

        .language-count {
          font-size: var(--font-size-xs);
          color: var(--color-neutral-gray400);
        }

        .language-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: var(--z-index-overlay);
        }

        /* Position variants */
        .language-selector-header .language-dropdown {
          top: 100%;
          left: 0;
        }

        .language-selector-footer .language-dropdown {
          bottom: 100%;
          left: 0;
        }

        .language-selector-sidebar .language-dropdown {
          top: 0;
          left: 100%;
          margin-left: 0.5rem;
        }

        /* Size variants */
        .language-selector-sm .language-trigger {
          padding: 0.25rem 0.5rem;
          font-size: var(--font-size-sm);
          min-width: 80px;
        }

        .language-selector-lg .language-trigger {
          padding: 0.75rem 1rem;
          font-size: var(--font-size-lg);
          min-width: 160px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .language-dropdown {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90vw;
            max-width: 300px;
            max-height: 70vh;
          }

          .language-trigger {
            min-width: 100px;
          }
        }

        /* RTL support */
        .language-option[dir="rtl"] {
          text-align: right;
        }

        .language-option[dir="rtl"] .language-option-content {
          flex-direction: row-reverse;
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .language-trigger {
            border-width: 2px;
          }

          .language-option {
            border-bottom: 1px solid var(--color-cosmic-stellarGray);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .language-trigger,
          .language-option,
          .chevron-icon {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;

