'use client';

import { motion } from 'framer-motion';

export default function WalletCard({ balance, onRecharge }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black-light p-6 rounded-lg border border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Wallet Balance</h2>
        <div className="w-10 h-10 bg-yellow rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-yellow mb-2">
          ₹{balance.toFixed(2)}
        </div>
        <p className="text-gray-400 text-sm">Available Balance</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRecharge}
        className="w-full bg-yellow text-black py-3 rounded-lg font-semibold hover:bg-yellow-dark transition-colors flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Recharge Wallet</span>
      </motion.button>

      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Secure payments powered by Razorpay
        </p>
      </div>
    </motion.div>
  );
}



