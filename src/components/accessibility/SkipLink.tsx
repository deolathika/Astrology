'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className = '' }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Navigate to the target
    if (href.startsWith('/')) {
      router.push(href);
    } else {
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        (element as HTMLElement).focus();
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`skip-link ${className}`}
      tabIndex={0}
    >
      {children}
    </a>
  );
};

export default SkipLink;
