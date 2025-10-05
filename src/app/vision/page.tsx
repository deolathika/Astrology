import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'Vision & Mission - Daily Secrets',
  description: 'Learn about Daily Secrets vision and mission to democratize cosmic wisdom and spiritual guidance.',
  keywords: 'vision, mission, purpose, astrology, numerology, spiritual guidance',
};

const VisionPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Vision & Mission
          </h1>
          
          <div className="space-y-8">
            {/* Vision */}
            <CosmicCard variant="glass" glow>
              <h2 className="text-3xl font-semibold mb-6 text-gold-400">Our Vision</h2>
              <p className="text-xl text-violet-200 mb-6 leading-relaxed">
                To create a world where cosmic wisdom is accessible to everyone, regardless of their background, 
                culture, or technical expertise. We envision a future where ancient spiritual knowledge and 
                modern technology work in harmony to guide humanity toward greater understanding and enlightenment.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Universal Access</h3>
                  <p className="text-violet-200">
                    Making astrological and numerological guidance available to people worldwide, 
                    breaking down barriers of language, culture, and accessibility.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Cultural Preservation</h3>
                  <p className="text-violet-200">
                    Honoring and preserving diverse astrological traditions while making them 
                    accessible to modern seekers through technology.
                  </p>
                </div>
              </div>
            </CosmicCard>

            {/* Mission */}
            <CosmicCard variant="neon">
              <h2 className="text-3xl font-semibold mb-6 text-gold-400">Our Mission</h2>
              <p className="text-xl text-violet-200 mb-6 leading-relaxed">
                To democratize cosmic wisdom by combining the accuracy of Swiss Ephemeris calculations 
                with the validation of NASA/JPL data, while respecting and honoring diverse cultural 
                traditions and belief systems.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Accuracy</h3>
                  <p className="text-violet-200">
                    Providing the most accurate astronomical calculations possible through 
                    Swiss Ephemeris integration and NASA validation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Accessibility</h3>
                  <p className="text-violet-200">
                    Creating an inclusive platform that works for users of all abilities, 
                    languages, and cultural backgrounds.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Authenticity</h3>
                  <p className="text-violet-200">
                    Maintaining the integrity of traditional astrological and numerological 
                    systems while making them accessible to modern users.
                  </p>
                </div>
              </div>
            </CosmicCard>

            {/* Values */}
            <CosmicCard variant="gradient">
              <h2 className="text-3xl font-semibold mb-6 text-gold-400">Our Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Scientific Integrity</h3>
                    <p className="text-violet-200">
                      We combine traditional wisdom with modern scientific accuracy, ensuring 
                      that our calculations meet the highest standards of precision.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Cultural Respect</h3>
                    <p className="text-violet-200">
                      We honor and preserve the integrity of diverse astrological traditions, 
                      ensuring that each system is represented authentically and respectfully.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">User Privacy</h3>
                    <p className="text-violet-200">
                      We protect user data with the highest security standards and provide 
                      complete control over personal information.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Accessibility</h3>
                    <p className="text-violet-200">
                      We design our platform to be accessible to users of all abilities, 
                      with comprehensive internationalization and cultural adaptation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Innovation</h3>
                    <p className="text-violet-200">
                      We continuously innovate to improve accuracy, user experience, and 
                      accessibility while maintaining respect for traditional wisdom.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-400">Community</h3>
                    <p className="text-violet-200">
                      We foster a supportive community where users can share experiences, 
                      learn from each other, and grow together on their spiritual journey.
                    </p>
                  </div>
                </div>
              </div>
            </CosmicCard>

            {/* Impact */}
            <CosmicCard variant="glass">
              <h2 className="text-3xl font-semibold mb-6 text-gold-400">Our Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400 mb-2">10,000+</div>
                  <div className="text-violet-200">Daily Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400 mb-2">50+</div>
                  <div className="text-violet-200">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gold-400 mb-2">5</div>
                  <div className="text-violet-200">Languages Supported</div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Making a Difference</h3>
                <p className="text-violet-200 mb-4">
                  Daily Secrets is more than just a platform—it's a movement toward greater understanding, 
                  compassion, and spiritual growth. We're helping people around the world:
                </p>
                <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                  <li>Discover their unique cosmic blueprint and life purpose</li>
                  <li>Understand their relationships and compatibility with others</li>
                  <li>Navigate life's challenges with greater wisdom and insight</li>
                  <li>Connect with their spiritual nature and higher self</li>
                  <li>Honor and preserve diverse cultural traditions</li>
                  <li>Access accurate cosmic guidance regardless of their background</li>
                </ul>
              </div>
            </CosmicCard>

            {/* Future */}
            <CosmicCard variant="neon">
              <h2 className="text-3xl font-semibold mb-6 text-gold-400">Looking Forward</h2>
              <p className="text-xl text-violet-200 mb-6 leading-relaxed">
                As we continue to grow and evolve, our commitment remains steadfast: to provide the most 
                accurate, accessible, and culturally-sensitive cosmic guidance possible. We're constantly 
                working to improve our technology, expand our cultural reach, and enhance the user experience.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Upcoming Features</h3>
                  <ul className="list-disc list-inside text-violet-200 space-y-2">
                    <li>Advanced AI-powered dream analysis</li>
                    <li>Real-time astrological event notifications</li>
                    <li>Community features and user forums</li>
                    <li>Mobile app for iOS and Android</li>
                    <li>Additional language support</li>
                    <li>Enhanced accessibility features</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Our Commitment</h3>
                  <ul className="list-disc list-inside text-violet-200 space-y-2">
                    <li>Maintaining the highest accuracy standards</li>
                    <li>Preserving cultural authenticity</li>
                    <li>Protecting user privacy and data</li>
                    <li>Ensuring accessibility for all users</li>
                    <li>Continuous innovation and improvement</li>
                    <li>Building a supportive community</li>
                  </ul>
                </div>
              </div>
            </CosmicCard>

            {/* Call to Action */}
            <CosmicCard variant="gradient">
              <div className="text-center">
                <h2 className="text-3xl font-semibold mb-4 text-gold-400">Join Our Journey</h2>
                <p className="text-xl text-violet-200 mb-6">
                  Be part of the movement to democratize cosmic wisdom and make spiritual guidance 
                  accessible to everyone, everywhere.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/auth/signup" 
                    className="btn bg-gold-400 text-violet-900 hover:bg-gold-500 transition-colors"
                  >
                    Get Started Today
                  </a>
                  <a 
                    href="/about" 
                    className="btn bg-violet-800/50 text-violet-200 hover:bg-violet-700/50 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisionPage;
