import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import CosmicBackground from '../../components/ui/CosmicBackground';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Terms() {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', title: 'Terms of Service', icon: 'ri-file-text-line' },
    { id: 'privacy', title: 'Privacy Policy', icon: 'ri-shield-check-line' },
    { id: 'faq', title: 'FAQ', icon: 'ri-question-line' }
  ];

  const faqItems = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Daily Secrets?',
          answer: 'Daily Secrets is a comprehensive cosmic guidance platform that combines traditional astrology with modern AI technology to provide personalized insights, readings, and spiritual guidance.'
        },
        {
          question: 'How accurate are the readings?',
          answer: 'Our readings combine ancient astrological wisdom with advanced AI algorithms and are validated by certified experts. We maintain a 94% accuracy rating based on user feedback and continuous refinement.'
        },
        {
          question: 'What astrological systems do you support?',
          answer: 'We support five major systems: Western, Vedic (Indian), Chinese, Sri Lankan, and our proprietary Hybrid AI system that combines insights from all traditions.'
        }
      ]
    },
    {
      category: 'Premium Features',
      questions: [
        {
          question: 'What\'s included in the premium subscription?',
          answer: 'Premium includes unlimited readings, access to all astrological systems, expert consultations, advanced birth chart analysis, dream interpretation, compatibility reports, and exclusive community features.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or long-term commitments.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 7-day free trial and a 30-day money-back guarantee for annual subscriptions. If you\'re not satisfied, contact our support team for a full refund.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          question: 'How do you protect my personal information?',
          answer: 'We use bank-level encryption (AES-256) to protect your data. Your birth information and readings are stored securely and never shared with third parties without your explicit consent.'
        },
        {
          question: 'Do you share my data with advertisers?',
          answer: 'No, we never sell or share your personal information with advertisers or third parties. Your cosmic journey is private and confidential.'
        },
        {
          question: 'Can I delete my account and data?',
          answer: 'Yes, you can permanently delete your account and all associated data at any time from your account settings. This action is irreversible.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What devices are supported?',
          answer: 'Daily Secrets works on all modern web browsers, iOS and Android mobile apps, and tablets. We recommend using the latest browser versions for the best experience.'
        },
        {
          question: 'How do I contact support?',
          answer: 'You can reach our support team 24/7 through the in-app chat, email at support@dailysecrets.com, or through the contact form in your account settings.'
        },
        {
          question: 'Do you offer expert consultations?',
          answer: 'Yes, premium members get access to certified astrologers, numerologists, and spiritual guides for personalized one-on-one consultations via video, phone, or chat.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      <Navigation userRole="guest" />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Legal & Support
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Everything you need to know about using Daily Secrets
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${section.icon} text-sm`}></i>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        {activeSection === 'terms' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Terms of Service</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using Daily Secrets, you accept and agree to be bound by the terms and provision of this agreement. 
                      If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">2. Service Description</h3>
                    <p>
                      Daily Secrets provides astrological readings, numerological calculations, dream analysis, and spiritual guidance 
                      through a combination of traditional wisdom and modern AI technology. Our services are for entertainment and 
                      personal growth purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">3. User Responsibilities</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate birth information for precise readings</li>
                      <li>Use the service responsibly and not for harmful purposes</li>
                      <li>Respect other community members and experts</li>
                      <li>Keep your account credentials secure</li>
                      <li>Not share premium content with non-subscribers</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">4. Premium Subscriptions</h3>
                    <p>
                      Premium subscriptions provide access to advanced features and expert consultations. Subscriptions are billed 
                      monthly or annually and automatically renew unless cancelled. You may cancel at any time from your account settings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">5. Intellectual Property</h3>
                    <p>
                      All content, including readings, interpretations, and educational materials, is the intellectual property of 
                      Daily Secrets and our expert contributors. Unauthorized reproduction or distribution is prohibited.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">6. Limitation of Liability</h3>
                    <p>
                      Daily Secrets provides guidance for personal growth and entertainment. We are not responsible for decisions 
                      made based on our readings. Always consult qualified professionals for medical, legal, or financial advice.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">7. Privacy and Data Protection</h3>
                    <p>
                      We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, 
                      use, and protect your personal information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">8. Modifications to Terms</h3>
                    <p>
                      We reserve the right to modify these terms at any time. Users will be notified of significant changes, 
                      and continued use of the service constitutes acceptance of the modified terms.
                    </p>
                  </div>

                  <div className="bg-purple-600/20 rounded-xl p-6 mt-8">
                    <p className="text-sm text-gray-300">
                      <strong>Last updated:</strong> January 2024<br />
                      <strong>Contact:</strong> legal@dailysecrets.com<br />
                      <strong>Address:</strong> Daily Secrets Inc., 123 Cosmic Way, San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Privacy Policy */}
        {activeSection === 'privacy' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Information We Collect</h3>
                    <p className="mb-3">We collect information you provide directly to us, such as:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Birth date, time, and location for astrological calculations</li>
                      <li>Name and email address for account creation</li>
                      <li>Payment information for premium subscriptions</li>
                      <li>Communication preferences and settings</li>
                      <li>Content you create (journal entries, community posts)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">How We Use Your Information</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Generate personalized astrological readings and insights</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Process payments and manage subscriptions</li>
                      <li>Send important updates about your account or our services</li>
                      <li>Improve our services through analytics and user feedback</li>
                      <li>Facilitate expert consultations and community interactions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Information Sharing</h3>
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                      except in the following limited circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                      <li>With certified experts for consultation purposes (with your permission)</li>
                      <li>With service providers who assist in operating our platform</li>
                      <li>When required by law or to protect our rights and safety</li>
                      <li>In connection with a business transfer or acquisition</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Data Security</h3>
                    <p>
                      We implement industry-standard security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                      <li>AES-256 encryption for data transmission and storage</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Secure payment processing through certified providers</li>
                      <li>Limited access to personal data on a need-to-know basis</li>
                      <li>Regular backups with encrypted storage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Your Rights and Choices</h3>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-3">
                      <li>Access and review your personal information</li>
                      <li>Correct inaccurate or incomplete data</li>
                      <li>Delete your account and associated data</li>
                      <li>Opt out of marketing communications</li>
                      <li>Request a copy of your data in a portable format</li>
                      <li>Restrict certain uses of your information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Cookies and Tracking</h3>
                    <p>
                      We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                      and provide personalized content. You can control cookie settings through your browser preferences.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">International Users</h3>
                    <p>
                      If you are accessing our services from outside the United States, please note that your information 
                      may be transferred to and processed in the United States, where our servers are located.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Children's Privacy</h3>
                    <p>
                      Our services are not intended for children under 13. We do not knowingly collect personal information 
                      from children under 13. If you believe we have collected such information, please contact us immediately.
                    </p>
                  </div>

                  <div className="bg-blue-600/20 rounded-xl p-6 mt-8">
                    <p className="text-sm text-gray-300">
                      <strong>Questions about privacy?</strong> Contact our Data Protection Officer at privacy@dailysecrets.com<br />
                      <strong>Last updated:</strong> January 2024
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* FAQ */}
        {activeSection === 'faq' && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {faqItems.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <i className="ri-question-line text-white"></i>
                      </div>
                      {category.category}
                    </h2>
                    
                    <div className="space-y-6">
                      {category.questions.map((item, index) => (
                        <div key={index} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                          <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Contact Support */}
              <Card className="p-8 mt-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
                  <p className="text-gray-300 mb-6">
                    Our cosmic support team is here to help you 24/7
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-chat-3-line text-xl text-white"></i>
                      </div>
                      <h4 className="text-white font-medium mb-2">Live Chat</h4>
                      <p className="text-gray-300 text-sm">Available 24/7 in your account</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-mail-line text-xl text-white"></i>
                      </div>
                      <h4 className="text-white font-medium mb-2">Email Support</h4>
                      <p className="text-gray-300 text-sm">support@dailysecrets.com</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="ri-book-line text-xl text-white"></i>
                      </div>
                      <h4 className="text-white font-medium mb-2">Help Center</h4>
                      <p className="text-gray-300 text-sm">Comprehensive guides & tutorials</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button variant="cosmic" size="lg">
                      <i className="ri-customer-service-line mr-2"></i>
                      Contact Support
                    </Button>
                    <Button variant="ghost" size="lg">
                      <i className="ri-book-open-line mr-2"></i>
                      Visit Help Center
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}