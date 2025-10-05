import React from 'react';
import { Metadata } from 'next';
import CosmicCard from '@/components/ui/CosmicCard';
import SkipLink from '@/components/accessibility/SkipLink';

export const metadata: Metadata = {
  title: 'FAQ - Daily Secrets',
  description: 'Frequently Asked Questions about Daily Secrets astrology and numerology platform.',
  keywords: 'faq, questions, help, astrology, numerology, support',
};

const FAQPage: React.FC = () => {
  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Daily Secrets?',
          answer: 'Daily Secrets is a comprehensive astrology and numerology platform that provides accurate cosmic guidance through Swiss Ephemeris calculations, NASA/JPL validation, and AI-powered insights. We support multiple astrological systems including Western, Vedic, Chinese, and Sri Lankan traditions.'
        },
        {
          question: 'How accurate are the calculations?',
          answer: 'Our calculations maintain ±0.1° tolerance accuracy through Swiss Ephemeris integration and real-time NASA/JPL validation. This ensures the highest precision in all astronomical calculations.'
        },
        {
          question: 'Is Daily Secrets free to use?',
          answer: 'Daily Secrets offers both free and premium tiers. Free users get basic daily insights and limited features, while premium users unlock unlimited insights, AI chat, dream analysis, and advanced features.'
        }
      ]
    },
    {
      category: 'Astrology',
      questions: [
        {
          question: 'Which astrology systems do you support?',
          answer: 'We support Western (Tropical), Vedic (Sidereal), Chinese (12-year animal cycle), and Sri Lankan traditional astrology systems. Our platform automatically detects your preferred system based on your region.'
        },
        {
          question: 'How do I get my birth chart?',
          answer: 'Simply provide your birth date, time, and location. Our system will generate an accurate birth chart using Swiss Ephemeris calculations with NASA/JPL validation.'
        },
        {
          question: 'What if I don\'t know my exact birth time?',
          answer: 'While exact birth time provides the most accurate results, you can still get valuable insights with approximate times. We recommend using 12:00 PM as a default if your exact birth time is unknown.'
        },
        {
          question: 'Can I get compatibility readings?',
          answer: 'Yes! Premium users can access detailed compatibility reports that analyze relationship dynamics through multiple astrological and numerological systems.'
        }
      ]
    },
    {
      category: 'Numerology',
      questions: [
        {
          question: 'What numerology systems do you offer?',
          answer: 'We provide Pythagorean, Chaldean, and Chinese numerology systems. Each system offers unique insights into your life path, destiny, and personality traits.'
        },
        {
          question: 'How do you calculate Life Path numbers?',
          answer: 'Life Path numbers are calculated by reducing your birth date to a single digit (except for master numbers 11, 22, 33). For example, if you were born on 15/03/1990, we add 1+5+0+3+1+9+9+0 = 28, then 2+8 = 10, then 1+0 = 1.'
        },
        {
          question: 'What are master numbers?',
          answer: 'Master numbers (11, 22, 33) are special numbers in numerology that are not reduced to single digits. They represent higher spiritual vibrations and special abilities.'
        }
      ]
    },
    {
      category: 'AI Features',
      questions: [
        {
          question: 'How does the AI chat work?',
          answer: 'Our AI chat uses local processing with WebLLM and Transformers.js, ensuring your conversations remain private. The AI provides personalized cosmic guidance based on your astrological and numerological profile.'
        },
        {
          question: 'What is dream analysis?',
          answer: 'Dream analysis uses AI to interpret your dreams through astrological and numerological lenses, providing insights into your subconscious patterns and spiritual messages.'
        },
        {
          question: 'Is my data secure with AI features?',
          answer: 'Yes! All AI processing happens locally on your device using WebLLM. Your personal data never leaves your device, ensuring complete privacy and security.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What browsers are supported?',
          answer: 'Daily Secrets works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Daily Secrets is a Progressive Web App (PWA) that works seamlessly on mobile devices. You can install it on your home screen for an app-like experience.'
        },
        {
          question: 'How do I export my data?',
          answer: 'Premium users can export their data in PDF format or download their complete profile data. Go to Settings > Data & Privacy > Export Data.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account at any time. Go to Settings > Data & Privacy > Delete Account. This will permanently remove all your data from our servers.'
        }
      ]
    },
    {
      category: 'Billing & Subscriptions',
      questions: [
        {
          question: 'How do I upgrade to Premium?',
          answer: 'Click the "Upgrade to Premium" button in your dashboard or go to the Premium page. You can pay securely through Stripe with various payment methods.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription at any time from your account settings. Your premium features will remain active until the end of your current billing period.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for new subscribers. Contact our support team if you\'re not satisfied with your premium experience.'
        }
      ]
    }
  ];

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gold-400 to-silver-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <CosmicCard key={categoryIndex} variant="glass">
                <h2 className="text-2xl font-semibold mb-6 text-gold-400">{category.category}</h2>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-violet-700/30 pb-4 last:border-b-0">
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">{faq.question}</h3>
                      <p className="text-violet-200">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CosmicCard>
            ))}

            <CosmicCard variant="neon">
              <h2 className="text-2xl font-semibold mb-4 text-gold-400">Still Have Questions?</h2>
              <p className="text-violet-200 mb-4">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="btn bg-gold-400 text-violet-900 hover:bg-gold-500 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/help" 
                  className="btn bg-violet-800/50 text-violet-200 hover:bg-violet-700/50 transition-colors"
                >
                  Help Center
                </a>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;