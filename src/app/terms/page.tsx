import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'Terms of Service - Daily Secrets',
  description: 'Terms of Service for Daily Secrets astrology and numerology platform.',
  keywords: 'terms, service, legal, astrology, numerology',
};

const TermsPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="space-y-8">
            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">1. Acceptance of Terms</h2>
              <p className="text-violet-200 mb-4">
                By accessing and using Daily Secrets ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-violet-200">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">2. Use License</h2>
              <p className="text-violet-200 mb-4">
                Permission is granted to temporarily download one copy of Daily Secrets for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>attempt to decompile or reverse engineer any software contained on Daily Secrets</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">3. Disclaimer</h2>
              <p className="text-violet-200 mb-4">
                The materials on Daily Secrets are provided on an 'as is' basis. Daily Secrets makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-violet-200">
                Further, Daily Secrets does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">4. Limitations</h2>
              <p className="text-violet-200 mb-4">
                In no event shall Daily Secrets or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Daily Secrets, even if Daily Secrets or a Daily Secrets authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              <p className="text-violet-200">
                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
              </p>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">5. Accuracy of Materials</h2>
              <p className="text-violet-200 mb-4">
                The materials appearing on Daily Secrets could include technical, typographical, or photographic errors. Daily Secrets does not warrant that any of the materials on its website are accurate, complete or current.
              </p>
              <p className="text-violet-200">
                Daily Secrets may make changes to the materials contained on its website at any time without notice. However Daily Secrets does not make any commitment to update the materials.
              </p>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">6. Links</h2>
              <p className="text-violet-200 mb-4">
                Daily Secrets has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Daily Secrets of the site.
              </p>
              <p className="text-violet-200">
                Use of any such linked website is at the user's own risk.
              </p>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">7. Modifications</h2>
              <p className="text-violet-200 mb-4">
                Daily Secrets may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">8. Governing Law</h2>
              <p className="text-violet-200">
                These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">9. Astrological and Numerological Services</h2>
              <p className="text-violet-200 mb-4">
                Daily Secrets provides astrological and numerological guidance for entertainment and personal insight purposes. Our services are not intended to replace professional advice in areas such as medical, legal, financial, or psychological matters.
              </p>
              <p className="text-violet-200 mb-4">
                Users acknowledge that:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>Astrological and numerological interpretations are subjective and based on traditional systems</li>
                <li>Results may vary and are not guaranteed</li>
                <li>Users should use their own judgment and seek professional advice when appropriate</li>
                <li>Daily Secrets is not responsible for decisions made based on our guidance</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">10. Contact Information</h2>
              <p className="text-violet-200 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-violet-200">
                <p>Email: legal@dailysecrets.com</p>
                <p>Address: Daily Secrets Legal Department</p>
                <p>Colombo, Sri Lanka</p>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsPage;
