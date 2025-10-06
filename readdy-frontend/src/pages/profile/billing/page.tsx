import { useState } from 'react';
import Navigation from '../../../components/feature/Navigation';
import StarfieldBackground from '../../../components/feature/StarfieldBackground';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function ProfileBilling() {
  const [userRole, setUserRole] = useState<'guest' | 'free' | 'premium' | 'admin'>('premium');
  const [activeTab, setActiveTab] = useState('overview');

  const billingTabs = [
    { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'subscription', label: 'Subscription', icon: 'ri-vip-crown-line' },
    { id: 'history', label: 'History', icon: 'ri-history-line' },
    { id: 'methods', label: 'Payment Methods', icon: 'ri-bank-card-line' }
  ];

  const billingHistory = [
    {
      id: 1,
      date: '2024-01-20',
      description: 'Premium Subscription - Monthly',
      amount: '$9.99',
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2023-12-20',
      description: 'Premium Subscription - Monthly',
      amount: '$9.99',
      status: 'paid',
      invoice: 'INV-2023-012'
    },
    {
      id: 3,
      date: '2023-11-20',
      description: 'Premium Subscription - Monthly',
      amount: '$9.99',
      status: 'paid',
      invoice: 'INV-2023-011'
    },
    {
      id: 4,
      date: '2023-10-20',
      description: 'Premium Upgrade',
      amount: '$9.99',
      status: 'paid',
      invoice: 'INV-2023-010'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false
    }
  ];

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic daily horoscope',
        'Limited zodiac readings',
        '3 dream analyses per month',
        'Community access'
      ],
      current: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      features: [
        'Unlimited horoscopes & readings',
        'AI-powered dream analysis',
        'Complete numerology reports',
        'Compatibility insights',
        'Personal cosmic journal',
        'Priority support'
      ],
      current: true,
      popular: true
    },
    {
      id: 'cosmic',
      name: 'Cosmic Master',
      price: '$19.99',
      period: 'month',
      features: [
        'Everything in Premium',
        'Advanced astrology systems',
        'Personal astrologer consultations',
        'Custom birth chart analysis',
        'Exclusive cosmic events',
        'API access for developers'
      ],
      current: false
    }
  ];

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Billing & Subscription
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Manage your subscription, payment methods, and billing history
              </p>
            </div>
          </div>
        </section>

        {/* Billing Navigation */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full p-1 overflow-x-auto">
              {billingTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Billing Content */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Current Plan */}
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Current Plan</h2>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <i className="ri-vip-crown-fill text-2xl text-white"></i>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">Premium Plan</h3>
                          <p className="text-gray-300">$9.99/month</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">
                        Unlock the full power of cosmic insights with unlimited readings, AI-powered analysis, and premium features.
                      </p>
                      <div className="flex space-x-3">
                        <Button variant="primary" size="sm">
                          <i className="ri-arrow-up-line mr-2"></i>
                          Upgrade Plan
                        </Button>
                        <Button variant="ghost" size="sm">
                          <i className="ri-settings-4-line mr-2"></i>
                          Manage
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Next billing date</span>
                        <span className="text-white font-medium">February 20, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Billing cycle</span>
                        <span className="text-white font-medium">Monthly</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Payment method</span>
                        <span className="text-white font-medium">•••• 4242</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Auto-renewal</span>
                        <span className="text-green-400 font-medium">Enabled</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Usage Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-star-line text-xl text-white"></i>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">45</div>
                    <p className="text-gray-300 text-sm">Readings This Month</p>
                    <div className="mt-2 text-xs text-green-400">Unlimited</div>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-moon-line text-xl text-white"></i>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <p className="text-gray-300 text-sm">Dream Analyses</p>
                    <div className="mt-2 text-xs text-green-400">Unlimited</div>
                  </Card>

                  <Card className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-download-line text-xl text-white"></i>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">8</div>
                    <p className="text-gray-300 text-sm">Reports Downloaded</p>
                    <div className="mt-2 text-xs text-green-400">Unlimited</div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="primary" className="w-full">
                      <i className="ri-download-line mr-2"></i>
                      Download Invoice
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <i className="ri-bank-card-line mr-2"></i>
                      Update Payment
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <i className="ri-pause-line mr-2"></i>
                      Pause Subscription
                    </Button>
                    <Button variant="ghost" className="w-full text-red-400 border-red-400 hover:bg-red-400/10">
                      <i className="ri-close-line mr-2"></i>
                      Cancel Plan
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Choose Your Cosmic Journey</h2>
                  <p className="text-gray-300">Select the plan that best fits your spiritual exploration needs</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {subscriptionPlans.map((plan) => (
                    <Card key={plan.id} className={`p-8 text-center relative ${plan.current ? 'border-2 border-purple-500' : ''} ${plan.popular ? 'scale-105' : ''}`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      {plan.current && (
                        <div className="absolute -top-4 right-4">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Current
                          </span>
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline justify-center space-x-1">
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          <span className="text-gray-400">/{plan.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <i className="ri-check-line text-green-400"></i>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={plan.current ? 'ghost' : plan.popular ? 'cosmic' : 'primary'}
                        className="w-full"
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : plan.id === 'free' ? 'Downgrade' : 'Upgrade'}
                      </Button>
                    </Card>
                  ))}
                </div>

                {/* Billing Cycle Toggle */}
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Save with Annual Billing</h3>
                  <p className="text-gray-300 mb-6">Get 2 months free when you switch to annual billing</p>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-gray-300">Monthly</span>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                    <span className="text-white">Annual</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Save 20%</span>
                  </div>
                </Card>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <Card className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Billing History</h2>
                  <Button variant="ghost" size="sm">
                    <i className="ri-download-line mr-2"></i>
                    Export All
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Description</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Invoice</th>
                        <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item) => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-4 px-4 text-white">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-gray-300">{item.description}</td>
                          <td className="py-4 px-4 text-white font-medium">{item.amount}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'paid' 
                                ? 'bg-green-500/20 text-green-300' 
                                : 'bg-red-500/20 text-red-300'
                            }`}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300 font-mono text-sm">{item.invoice}</td>
                          <td className="py-4 px-4">
                            <div className="flex space-x-2">
                              <button className="text-purple-400 hover:text-purple-300 transition-colors">
                                <i className="ri-download-line"></i>
                              </button>
                              <button className="text-gray-400 hover:text-white transition-colors">
                                <i className="ri-eye-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="ghost">
                    <i className="ri-arrow-down-line mr-2"></i>
                    Load More History
                  </Button>
                </div>
              </Card>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-8">
                <Card className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                    <Button variant="primary" size="sm">
                      <i className="ri-add-line mr-2"></i>
                      Add Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                            <i className={`ri-${method.brand === 'visa' ? 'visa' : 'mastercard'}-line text-white`}></i>
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                            </p>
                            <p className="text-gray-400 text-sm">Expires {method.expiry}</p>
                          </div>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button variant="ghost" size="sm">
                              Set Default
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <i className="ri-edit-line"></i>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <i className="ri-delete-bin-line"></i>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Security Notice */}
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <i className="ri-shield-check-line text-xl text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Secure Payments</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Your payment information is encrypted and securely processed. We never store your full card details on our servers.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <i className="ri-lock-line"></i>
                          <span>256-bit SSL</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <i className="ri-shield-line"></i>
                          <span>PCI Compliant</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <i className="ri-bank-line"></i>
                          <span>Bank-level Security</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}