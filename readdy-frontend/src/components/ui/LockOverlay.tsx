import { ReactNode } from 'react';
import Button from '../base/Button';

interface LockOverlayProps {
  children: ReactNode;
  isLocked?: boolean;
  title?: string;
  message?: string;
  onUnlock?: () => void;
  className?: string;
}

export default function LockOverlay({ 
  children, 
  isLocked = true, 
  title = "Premium Feature",
  message = "Unlock premium to access this feature",
  onUnlock,
  className = ""
}: LockOverlayProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Blurred Content */}
      <div className="filter blur-sm pointer-events-none select-none">
        {children}
      </div>
      
      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
        <div className="text-center p-6 max-w-sm">
          {/* Lock Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <i className="ri-lock-line text-2xl text-white"></i>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          
          {/* Message */}
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">{message}</p>
          
          {/* Unlock Button */}
          <Button 
            variant="cosmic" 
            className="w-full"
            onClick={onUnlock}
          >
            <i className="ri-vip-crown-line mr-2"></i>
            Unlock Premium
          </Button>
          
          {/* Features List */}
          <div className="mt-4 text-xs text-gray-400">
            <p>✨ Unlimited readings</p>
            <p>🔮 Advanced insights</p>
            <p>📊 Detailed charts</p>
          </div>
        </div>
      </div>
    </div>
  );
}