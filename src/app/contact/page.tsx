import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import CosmicButton from '@/components/ui/CosmicButton';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'Contact Us - Daily Secrets',
  description: 'Get in touch with Daily Secrets support team for assistance with astrology and numerology services.',
  keywords: 'contact, support, help, astrology, numerology, assistance',
};

const ContactPage: React.FC = () => {
  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <CosmicCard variant="glass" glow>
              <h2 className="text-2xl font-semibold mb-6 text-gold-400">Send us a Message</h2>
              <form className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select id="subject" name="subject" className="input" required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="input"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>
                
                <CosmicButton type="submit" variant="primary" className="w-full">
                  Send Message
                </CosmicButton>
              </form>
            </CosmicCard>

            {/* Contact Information */}
            <div className="space-y-6">
              <CosmicCard variant="neon">
                <h2 className="text-2xl font-semibold mb-4 text-gold-400">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Email Support</h3>
                    <p className="text-violet-200 mb-2">For general inquiries and support:</p>
                    <a href="mailto:support@dailysecrets.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                      support@dailysecrets.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Technical Support</h3>
                    <p className="text-violet-200 mb-2">For technical issues and bugs:</p>
                    <a href="mailto:tech@dailysecrets.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                      tech@dailysecrets.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">Billing Support</h3>
                    <p className="text-violet-200 mb-2">For payment and subscription issues:</p>
                    <a href="mailto:billing@dailysecrets.com" className="text-gold-400 hover:text-gold-300 transition-colors">
                      billing@dailysecrets.com
                    </a>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard variant="gradient">
                <h2 className="text-2xl font-semibold mb-4 text-gold-400">Response Times</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-violet-200">General Support</span>
                    <span className="text-gold-400 font-semibold">24-48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-violet-200">Technical Issues</span>
                    <span className="text-gold-400 font-semibold">12-24 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-violet-200">Billing Support</span>
                    <span className="text-gold-400 font-semibold">6-12 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-violet-200">Premium Users</span>
                    <span className="text-gold-400 font-semibold">Priority Support</span>
                  </div>
                </div>
              </CosmicCard>

              <CosmicCard variant="glass">
                <h2 className="text-2xl font-semibold mb-4 text-gold-400">Office Hours</h2>
                <div className="space-y-2 text-violet-200">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM (UTC+5:30)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM (UTC+5:30)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-violet-300 text-sm mt-4">
                  * Emergency support available 24/7 for critical issues
                </p>
              </CosmicCard>

              <CosmicCard variant="neon">
                <h2 className="text-2xl font-semibold mb-4 text-gold-400">Other Resources</h2>
                <div className="space-y-3">
                  <a 
                    href="/faq" 
                    className="block text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    📚 FAQ & Help Center
                  </a>
                  <a 
                    href="/help" 
                    className="block text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    🆘 User Guide
                  </a>
                  <a 
                    href="/community" 
                    className="block text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    👥 Community Forum
                  </a>
                  <a 
                    href="/status" 
                    className="block text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    🔧 System Status
                  </a>
                </div>
              </CosmicCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;