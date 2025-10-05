'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeConfig } from '@/lib/i18n/config';

const LanguageSelector: React.FC = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    // Get current path without locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    
    // Navigate to new locale
    if (newLocale === 'en') {
      router.push(pathWithoutLocale);
    } else {
      router.push(`/${newLocale}${pathWithoutLocale}`);
    }
    
    setIsOpen(false);
  };

  const currentLocaleConfig = localeConfig[locale as keyof typeof localeConfig];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-violet-800/50 hover:bg-violet-700/50 transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gold-400" />
        <span className="text-sm text-violet-200">
          {currentLocaleConfig.flag} {currentLocaleConfig.nativeName}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 text-violet-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-64 bg-violet-900/95 backdrop-blur-xl border border-violet-700/50 rounded-lg shadow-xl z-50"
          >
            <div className="p-2">
              {locales.map((loc) => {
                const config = localeConfig[loc];
                const isSelected = loc === locale;
                
                return (
                  <motion.button
                    key={loc}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageChange(loc)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                      isSelected
                        ? "bg-gold-400/20 text-gold-400"
                        : "text-violet-300 hover:text-gold-400 hover:bg-violet-800/50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{config.flag}</span>
                      <div>
                        <div className="font-medium">{config.nativeName}</div>
                        <div className="text-xs text-violet-400">{config.name}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-gold-400" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
