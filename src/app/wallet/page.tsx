'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, CreditCard, Gift, Heart, TrendingUp, History, Plus, Minus, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Transaction {
  id: string
  type: 'purchase' | 'donation' | 'earning' | 'refund'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface DonationPool {
  id: string
  name: string
  description: string
  totalRaised: number
  goal: number
  contributors: number
}

export default function WalletPage() {
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [donationPools, setDonationPools] = useState<DonationPool[]>([])
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedPool, setSelectedPool] = useState<DonationPool | null>(null)
  const [donationAmount, setDonationAmount] = useState(0)

  useEffect(() => {
    loadWalletData()
  }, [])

  const loadWalletData = () => {
    // Load balance from localStorage or API
    const savedBalance = localStorage.getItem('walletBalance')
    if (savedBalance) {
      setBalance(parseFloat(savedBalance))
    }

    // Mock transactions
    setTransactions([
      {
        id: '1',
        type: 'purchase',
        amount: -10,
        description: 'Premium Unlock',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: '2',
        type: 'donation',
        amount: -5,
        description: 'Donation to Community Pool',
        date: '2024-01-14',
        status: 'completed'
      },
      {
        id: '3',
        type: 'earning',
        amount: 2,
        description: 'Referral Bonus',
        date: '2024-01-13',
        status: 'completed'
      }
    ])

    // Mock donation pools
    setDonationPools([
      {
        id: '1',
        name: 'Community Pool',
        description: 'Help others unlock premium features',
        totalRaised: 1250,
        goal: 5000,
        contributors: 45
      },
      {
        id: '2',
        name: 'Astrology Research',
        description: 'Support NASA/JPL validation research',
        totalRaised: 800,
        goal: 2000,
        contributors: 23
      }
    ])
  }

  const handleDonation = async () => {
    if (!selectedPool || donationAmount <= 0) {
      toast.error('Please select a pool and enter amount')
      return
    }

    try {
      // Simulate donation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'donation',
        amount: -donationAmount,
        description: `Donation to ${selectedPool.name}`,
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
      }

      setTransactions(prev => [newTransaction, ...prev])
      setBalance(prev => prev - donationAmount)
      localStorage.setItem('walletBalance', (balance - donationAmount).toString())

      toast.success('Donation successful!')
      setShowDonationModal(false)
      setSelectedPool(null)
      setDonationAmount(0)
    } catch (error) {
      toast.error('Donation failed')
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <CreditCard className="w-5 h-5" />
      case 'donation': return <Heart className="w-5 h-5" />
      case 'earning': return <TrendingUp className="w-5 h-5" />
      case 'refund': return <ArrowDownLeft className="w-5 h-5" />
      default: return <Wallet className="w-5 h-5" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-red-500'
      case 'donation': return 'text-pink-500'
      case 'earning': return 'text-green-500'
      case 'refund': return 'text-blue-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient-primary flex items-center">
              <Wallet className="w-8 h-8 mr-3" />
              Wallet & Donations
            </h1>
            <p className="text-gray-600 mt-2">Manage your balance and support the community</p>
          </div>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </button>
        </div>

        {/* Balance Card */}
        <div className="card p-6 mb-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Balance</h2>
              <div className="text-4xl font-bold">${balance.toFixed(2)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Available Credits</div>
              <div className="text-lg">Use for purchases or donations</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Pools */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Gift className="w-5 h-5 mr-2" />
              Donation Pools
            </h2>
            <div className="space-y-4">
              {donationPools.map((pool) => (
                <motion.div
                  key={pool.id}
                  whileHover={{ scale: 1.02 }}
                  className="card p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setSelectedPool(pool)
                    setShowDonationModal(true)
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{pool.name}</h3>
                    <span className="text-sm text-gray-500">{pool.contributors} contributors</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{pool.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>${pool.totalRaised} / ${pool.goal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-violet-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(pool.totalRaised / pool.goal) * 100}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {Math.round((pool.totalRaised / pool.goal) * 100)}% funded
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <History className="w-5 h-5 mr-2" />
              Recent Transactions
            </h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${getTransactionColor(transaction.type)}`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        <AnimatePresence>
          {showDonationModal && selectedPool && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="card p-6 max-w-md w-full mx-4"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Donate to {selectedPool.name}
                </h3>
                
                <p className="text-gray-600 mb-4">{selectedPool.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="Enter amount"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    {[5, 10, 25, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          donationAmount === amount
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowDonationModal(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDonation}
                    className="btn btn-primary flex-1"
                  >
                    Donate ${donationAmount}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}



