
import Button from '../../../components/base/Button';

interface VedicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
}

export default function VedicModal({ isOpen, onClose, onSelect }: VedicModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-sun-line text-3xl text-white"></i>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">Vedic Astrology</h3>
          <p className="text-orange-300">Ancient Wisdom of the Sages</p>
        </div>

        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-gradient-to-r from-orange-600/20 to-yellow-600/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
              <i className="ri-ancient-pavilion-line mr-2 text-orange-400"></i>
              Ancient Heritage
            </h4>
            <p className="text-gray-200 leading-relaxed">
              Vedic astrology, known as Jyotisha, is the ancient Indian system of astrology dating back over 5,000 years. Based on the sidereal zodiac and lunar mansions, it provides profound insights into karma, dharma, and life purpose through precise mathematical calculations.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-2 flex items-center">
                <i className="ri-star-line mr-2 text-red-400"></i>
                Sidereal Zodiac
              </h5>
              <p className="text-sm text-gray-300">Based on actual star positions, accounting for precession</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-2 flex items-center">
                <i className="ri-moon-line mr-2 text-purple-400"></i>
                27 Nakshatras
              </h5>
              <p className="text-sm text-gray-300">Lunar mansions providing detailed personality insights</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-2 flex items-center">
                <i className="ri-time-line mr-2 text-blue-400"></i>
                Dasha System
              </h5>
              <p className="text-sm text-gray-300">Planetary periods revealing life timing and events</p>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4">
              <h5 className="font-semibold text-white mb-2 flex items-center">
                <i className="ri-scales-line mr-2 text-green-400"></i>
                Karma & Dharma
              </h5>
              <p className="text-sm text-gray-300">Understanding life purpose and spiritual evolution</p>
            </div>
          </div>

          {/* Unique Elements */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
              <i className="ri-compass-3-line mr-2 text-indigo-400"></i>
              Distinctive Features
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Divisional Charts (Vargas)</p>
                  <p className="text-sm text-gray-300">Multiple chart divisions for specific life areas analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Yogas & Combinations</p>
                  <p className="text-sm text-gray-300">Planetary combinations revealing special talents and challenges</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-white font-medium">Remedial Measures</p>
                  <p className="text-sm text-gray-300">Gemstones, mantras, and rituals for planetary harmony</p>
                </div>
              </div>
            </div>
          </div>

          {/* Spiritual Context */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-white mb-3 flex items-center">
              <i className="ri-meditation-line mr-2 text-yellow-400"></i>
              Spiritual Foundation
            </h4>
            <p className="text-gray-200 leading-relaxed">
              Vedic astrology is deeply rooted in spiritual philosophy, viewing life as a journey of soul evolution. It emphasizes the law of karma, the importance of dharma (righteous living), and the ultimate goal of moksha (liberation). Each chart is seen as a map of the soul's journey through this lifetime.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="cosmic" className="flex-1" onClick={() => { onSelect(); onClose(); }}>
              <i className="ri-sun-line mr-2"></i>
              Explore Vedic System
            </Button>
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              <i className="ri-bookmark-line mr-2"></i>
              Learn More Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
