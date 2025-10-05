import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'DMCA Policy - Daily Secrets',
  description: 'Digital Millennium Copyright Act (DMCA) policy for Daily Secrets platform.',
  keywords: 'dmca, copyright, policy, intellectual property, takedown',
};

const DMCAPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            DMCA Policy
          </h1>
          
          <div className="space-y-8">
            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Digital Millennium Copyright Act (DMCA) Policy</h2>
              <p className="text-violet-200 mb-4">
                Daily Secrets respects the intellectual property rights of others and expects our users to do the same. 
                We comply with the Digital Millennium Copyright Act (DMCA) and will respond to valid DMCA notices.
              </p>
              <p className="text-violet-200">
                This policy outlines our procedures for handling copyright infringement claims and counter-notifications.
              </p>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Reporting Copyright Infringement</h2>
              <p className="text-violet-200 mb-4">
                If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, 
                please provide us with the following information:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing and information sufficient to locate the material</li>
                <li>Contact information, including name, address, telephone number, and email address</li>
                <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner</li>
                <li>A statement that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">How to Submit a DMCA Notice</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Email Submission</h3>
                  <p className="text-violet-200 mb-2">Send your DMCA notice to:</p>
                  <a href="mailto:dmca@dailysecrets.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                    dmca@dailysecrets.com
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Mail Submission</h3>
                  <div className="text-violet-200">
                    <p>Daily Secrets DMCA Agent</p>
                    <p>Legal Department</p>
                    <p>Colombo, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Our Response Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Initial Review</h3>
                  <p className="text-violet-200">
                    We will review your DMCA notice within 24-48 hours of receipt. If the notice is valid and complete, 
                    we will take appropriate action.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Takedown Process</h3>
                  <p className="text-violet-200">
                    If we determine that the material infringes copyright, we will remove or disable access to the 
                    infringing material and notify the user who posted it.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">User Notification</h3>
                  <p className="text-violet-200">
                    We will notify the user who posted the allegedly infringing material and provide them with 
                    information about the DMCA process and their right to file a counter-notification.
                  </p>
                </div>
              </div>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Counter-Notification Process</h2>
              <p className="text-violet-200 mb-4">
                If you believe that your material was removed or disabled as a result of mistake or misidentification, 
                you may file a counter-notification. Your counter-notification must include:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed or disabled and its location before removal</li>
                <li>A statement under penalty of perjury that you have a good faith belief the material was removed by mistake</li>
                <li>Your name, address, and telephone number</li>
                <li>A statement that you consent to the jurisdiction of the federal court in your district</li>
                <li>A statement that you will accept service of process from the person who filed the original DMCA notice</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Repeat Infringer Policy</h2>
              <p className="text-violet-200 mb-4">
                Daily Secrets has a policy of terminating, in appropriate circumstances, the accounts of users 
                who are repeat infringers of copyright. We will consider factors such as:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>The number of valid DMCA notices received</li>
                <li>The nature and severity of the infringements</li>
                <li>The user's response to previous notices</li>
                <li>Whether the user has a pattern of infringing activity</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="glass">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">False Claims</h2>
              <p className="text-violet-200 mb-4">
                Please be aware that filing a false DMCA notice may result in liability for damages, 
                including costs and attorney's fees. Before filing a DMCA notice, please ensure that:
              </p>
              <ul className="list-disc list-inside text-violet-200 space-y-2 ml-4">
                <li>You are the copyright owner or authorized to act on their behalf</li>
                <li>The material is actually infringing your copyright</li>
                <li>You have a good faith belief that the use is not authorized</li>
                <li>You understand the consequences of filing a false claim</li>
              </ul>
            </CosmicCard>

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">DMCA Agent</h3>
                  <div className="text-violet-200">
                    <p>Email: dmca@dailysecrets.com</p>
                    <p>Phone: +94 11 234 5678</p>
                    <p>Address: Daily Secrets Legal Department</p>
                    <p>Colombo, Sri Lanka</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Response Time</h3>
                  <p className="text-violet-200">
                    We typically respond to DMCA notices within 24-48 hours. For urgent matters, 
                    please mark your email as "URGENT" in the subject line.
                  </p>
                </div>
              </div>
            </CosmicCard>

            <CosmicCard variant="gradient">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Legal Disclaimer</h2>
              <p className="text-violet-200 mb-4">
                This DMCA policy is provided for informational purposes only and does not constitute legal advice. 
                If you have questions about copyright law or the DMCA process, please consult with an attorney.
              </p>
              <p className="text-violet-200">
                Daily Secrets reserves the right to modify this policy at any time. Changes will be posted on this page 
                and will become effective immediately upon posting.
              </p>
            </CosmicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default DMCAPage;
