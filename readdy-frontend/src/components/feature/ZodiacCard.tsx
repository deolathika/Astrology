
import { useState } from 'react';
import Card from '../base/Card';
import Button from '../base/Button';

interface ZodiacCardProps {
  sign: string;
  icon: string;
  dateRange: string;
  element: string;
  prediction: string;
  mood: string;
  luckyNumber: number;
  userRole: 'guest' | 'premium' | 'admin';
  onUnlockReading?: () => void;
  onSaveToJournal?: (entry: any) => void;
}

export default function ZodiacCard({
  sign,
  icon,
  dateRange,
  element,
  prediction,
  mood,
  luckyNumber,
  userRole,
  onUnlockReading,
  onSaveToJournal
}: ZodiacCardProps) {
  const [showFullReading, setShowFullReading] = useState(false);

  const elementColors = {
    fire: 'from-red-500 to-orange-500',
    earth: 'from-green-500 to-emerald-500',
    air: 'from-blue-500 to-cyan-500',
    water: 'from-indigo-500 to-purple-500'
  };

  const handleReadMore = () => {
    if (userRole === 'guest') {
      onUnlockReading();
    } else {
      setShowFullReading(true);
    }
  };

  return (
    <>
      <Card className="p-6 text-center hover:scale-105 transition-all duration-300">
        <div className={`w-16 h-16 bg-gradient-to-r ${elementColors[element as keyof typeof elementColors]} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`${icon} text-2xl text-white`}></i>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{sign}</h3>
        <p className="text-sm text-gray-400 mb-4">{dateRange}</p>
        
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
            ${element === 'fire' ? 'bg-red-500/20 text-red-300' : 
              element === 'earth' ? 'bg-green-500/20 text-green-300' :
              element === 'air' ? 'bg-blue-500/20 text-blue-300' :
              'bg-purple-500/20 text-purple-300'}`}>
            {element}
          </span>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {userRole === 'guest' ? prediction.substring(0, 80) + '...' : prediction}
        </p>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="text-center">
            <p className="text-gray-400">Mood</p>
            <p className="text-white font-medium">{mood}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Lucky #</p>
            <p className="text-white font-medium">{luckyNumber}</p>
          </div>
        </div>

        <Button 
          variant="primary" 
          size="sm" 
          className="w-full"
          onClick={handleReadMore}
        >
          {userRole === 'guest' ? (
            <>
              <i className="ri-lock-line mr-2"></i>
              Unlock Reading
            </>
          ) : (
            <>
              <i className="ri-book-open-line mr-2"></i>
              Read More
            </>
          )}
        </Button>
      </Card>

      {/* Full Reading Modal */}
      {showFullReading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFullReading(false)}></div>
          <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl">
            <button
              onClick={() => setShowFullReading(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${elementColors[element as keyof typeof elementColors]} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <i className={`${icon} text-3xl text-white`}></i>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{sign}</h3>
              <p className="text-gray-400 mb-6">{dateRange}</p>

              <div className="text-left space-y-4 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Today's Reading</h4>
                  <p className="text-gray-200 leading-relaxed">{prediction}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <p className="text-sm text-gray-400">Element</p>
                    <p className="text-white font-medium capitalize">{element}</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <p className="text-sm text-gray-400">Mood</p>
                    <p className="text-white font-medium">{mood}</p>
                  </div>
                </div>

                <div className="text-center p-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg">
                  <p className="text-sm text-gray-300">Lucky Number</p>
                  <p className="text-2xl font-bold text-white">{luckyNumber}</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="cosmic" className="w-full" onClick={() => {
                  if (onSaveToJournal) {
                    onSaveToJournal({
                      type: 'zodiac-reading',
                      title: `${sign} Daily Reading`,
                      content: prediction,
                      icon: icon,
                      color: elementColors[element as keyof typeof elementColors],
                      metadata: {
                        sign,
                        element,
                        mood,
                        luckyNumber,
                        dateRange,
                        date: new Date().toDateString()
                      }
                    });
                  }
                  setShowFullReading(false);
                }}>
                  <i className="ri-bookmark-line mr-2"></i>
                  Save to Journal
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setShowFullReading(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
