import { getSession } from '@auth0/nextjs-auth0';
import { User, Transaction } from '../../../lib/models';

export async function POST(request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { transactionId } = await request.json();

    if (!transactionId) {
      return Response.json({ error: 'Transaction ID is required' }, { status: 400 });
    }

    // Find user in database
    const user = User.findByAuth0Id(session.user.sub);
    
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Find transaction
    const transaction = Transaction.findByPaymentId(transactionId);
    
    if (!transaction) {
      return Response.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Log the wallet recharge event for ERPNext integration
    const erpnextEvent = {
      event_type: 'wallet_recharge',
      user_id: user.id,
      user_email: user.email,
      transaction_id: transaction.id,
      amount: transaction.amount,
      currency: 'INR',
      payment_id: transaction.razorpay_payment_id,
      status: transaction.status,
      timestamp: new Date().toISOString(),
      description: transaction.description
    };

    // In a real implementation, you would send this to ERPNext
    // For now, we'll just log it
    console.log('ERPNext Event:', JSON.stringify(erpnextEvent, null, 2));

    // Simulate ERPNext API call
    try {
      // This would be your actual ERPNext API endpoint
      // const erpnextResponse = await fetch('https://your-erpnext-instance.com/api/method/your_custom_method', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer your-erpnext-token'
      //   },
      //   body: JSON.stringify(erpnextEvent)
      // });

      // For demo purposes, we'll simulate a successful response
      const simulatedResponse = {
        success: true,
        message: 'Event logged successfully',
        erpnext_reference: `ERP-${Date.now()}`,
        event_id: erpnextEvent.transaction_id
      };

      return Response.json(simulatedResponse);
    } catch (error) {
      console.error('ERPNext integration error:', error);
      return Response.json({ 
        error: 'Failed to push event to ERPNext',
        details: error.message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in ERPNext push:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}



