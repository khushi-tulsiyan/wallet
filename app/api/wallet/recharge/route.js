import { getSession } from '@auth0/nextjs-auth0';
import { User, Wallet, Transaction } from '../../../lib/models';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function POST(request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { amount } = await request.json();
    
    if (!amount || amount <= 0) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Find user in database
    const user = User.findByAuth0Id(session.user.sub);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's wallet
    const wallet = Wallet.findByUserId(user.id);
    
    if (!wallet) {
      return Response.json({ error: 'Wallet not found' }, { status: 404 });
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        user_id: user.id,
        wallet_id: wallet.id,
        type: 'wallet_recharge'
      }
    };

    const order = await razorpay.orders.create(orderOptions);

    // Create transaction record
    const transaction = Transaction.create({
      userId: user.id,
      walletId: wallet.id,
      amount: amount,
      type: 'credit',
      description: 'Wallet Recharge',
      razorpayPaymentId: null,
      status: 'pending'
    });

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating recharge order:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}



