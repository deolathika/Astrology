import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'Privacy Policy - Daily Secrets',
  description: 'Privacy Policy for Daily Secrets astrology and numerology platform.',
  keywords: 'privacy, policy, data, protection, astrology, numerology',
};

const PrivacyPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-8">
            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">1. Information We Collect</h2>
              <div className="text-violet-200 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Birth date, time, and location for astrological calculations</li>
                    <li>Account preferences and settings</li>
                    <li>Payment information (processed securely through Stripe)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>App usage patterns and feature interactions</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">2. How We Use Your Information</h2>
              <div className="text-violet-200 space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide personalized astrological and numerological services</li>
                  <li>Generate accurate birth charts and calculations</li>
                  <li>Send daily insights and cosmic guidance</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Improve our services and user experience</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Ensure platform security and prevent fraud</li>
                </ul>
              </div>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">3. Information Sharing</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>In case of business transfer or merger (with notice to users)</li>
                </ul>
              </div>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">4. Data Security</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>End-to-end encryption for sensitive data</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Secure payment processing through Stripe</li>
                  <li>Data backup and recovery procedures</li>
                </ul>
              </div>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">5. Your Rights</h2>
              <div className="text-violet-200 space-y-4">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to certain types of data processing</li>
                </ul>
                <p>
                  To exercise these rights, contact us at privacy@dailysecrets.com
                </p>
              </div>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">6. Cookies and Tracking</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
                </ul>
                <p>
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">7. Data Retention</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Account data: Until account deletion or 3 years of inactivity</li>
                  <li>Astrological data: Until account deletion or user request</li>
                  <li>Usage data: Up to 2 years for analytics purposes</li>
                  <li>Payment data: As required by law and payment processors</li>
                </ul>
              </div>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">8. International Data Transfers</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard contractual clauses for data protection</li>
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Binding corporate rules for international transfers</li>
                  <li>User consent for specific transfers</li>
                </ul>
              </div>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">9. Children's Privacy</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  Daily Secrets is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
                <p>
                  If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
                </p>
              </div>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">10. Changes to This Policy</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices in our application</li>
                </ul>
                <p>
                  Your continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">11. Contact Us</h2>
              <div className="text-violet-200 space-y-4">
                <p>
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@dailysecrets.com</p>
                  <p><strong>Address:</strong> Daily Secrets Privacy Officer</p>
                  <p>Colombo, Sri Lanka</p>
                </div>
                <p>
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
