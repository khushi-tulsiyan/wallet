# EventWallet 💰

A secure digital wallet application built with Next.js, Auth0, and Razorpay. Features a sleek yellow and black design with smooth animations powered by Framer Motion.

## 🚀 Features

- **Secure Authentication**: Auth0 integration with Google and Email providers
- **Digital Wallet**: View balance, recharge wallet, and track transactions
- **Payment Processing**: Razorpay integration for secure payments
- **Transaction History**: Complete transaction tracking and history
- **Responsive Design**: Beautiful yellow/black theme with smooth animations
- **ERPNext Integration**: Ready for ERPNext event logging (stretch goal)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- **Authentication**: Auth0
- **Database**: SQLite (local) / PostgreSQL (production)
- **Payments**: Razorpay
- **Styling**: Tailwind CSS with custom yellow/black theme

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Auth0 account
- Razorpay account (test mode)

## 🚀 Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd eventwallet
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```

3. **Configure your environment variables in `.env.local`:**
   ```env
   # Auth0 Configuration
   AUTH0_SECRET=your-auth0-secret-here
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_CLIENT_SECRET=your-auth0-client-secret

   # Razorpay Configuration
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_SECRET=your-razorpay-secret

   # Database Configuration
   DATABASE_URL=./database.sqlite
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Setup Instructions

### Auth0 Setup

1. **Create an Auth0 account** at [auth0.com](https://auth0.com)

2. **Create a new application:**
   - Go to Applications → Create Application
   - Choose "Regular Web Application"
   - Name it "EventWallet"

3. **Configure application settings:**
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

4. **Enable social connections:**
   - Go to Authentication → Social
   - Enable Google (requires Google OAuth setup)
   - Enable Database connections for email/password

5. **Get your credentials:**
   - Copy Domain, Client ID, and Client Secret to your `.env.local`

### Razorpay Setup

1. **Create a Razorpay account** at [razorpay.com](https://razorpay.com)

2. **Get test credentials:**
   - Go to Settings → API Keys
   - Generate test API keys
   - Copy Key ID and Key Secret to your `.env.local`

3. **Test payment flow:**
   - Use test card numbers provided by Razorpay
   - Test with small amounts (₹1, ₹10, etc.)

## 🎨 Design System

The application uses a custom yellow and black color scheme:

- **Primary Yellow**: `#FFD700` - Used for buttons, highlights, and accents
- **Black Background**: `#0A0A0A` - Main background color
- **Light Black**: `#1A1A1A` - Card backgrounds
- **Gray Text**: `#9CA3AF` - Secondary text

### Animations

- **Framer Motion**: Smooth page transitions and component animations
- **Hover Effects**: Interactive button and card animations
- **Loading States**: Elegant loading spinners and transitions

## 📁 Project Structure

```
eventwallet/
├── app/
│   ├── api/
│   │   ├── auth/[...auth0]/     # Auth0 authentication routes
│   │   ├── wallet/              # Wallet API endpoints
│   │   └── erpnext/             # ERPNext integration
│   ├── components/              # Reusable UI components
│   ├── dashboard/               # Dashboard page
│   ├── login/                   # Login page
│   └── globals.css              # Global styles
├── lib/
│   ├── database.js              # Database connection
│   └── models.js                # Database models
├── .env.example                 # Environment variables template
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication
- `GET /api/auth/login` - Redirect to Auth0 login
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Wallet
- `GET /api/wallet/balance` - Get wallet balance
- `POST /api/wallet/recharge` - Initiate payment
- `POST /api/wallet/update` - Update balance after payment
- `GET /api/wallet/transactions` - Get transaction history

### ERPNext Integration
- `POST /api/erpnext/push` - Log events for ERPNext integration

## 🧪 Testing Payments

### Test Card Numbers (Razorpay Test Mode)

- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test Flow

1. Sign in to the application
2. Go to Dashboard
3. Click "Recharge Wallet"
4. Enter amount (try ₹1 for testing)
5. Use test card details
6. Complete payment
7. Verify balance update

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push**

### Other Platforms

- **Railway**: Easy deployment with PostgreSQL
- **Heroku**: Add PostgreSQL addon
- **DigitalOcean**: Use App Platform

## 🔒 Security Features

- **Auth0 Authentication**: Industry-standard OAuth 2.0
- **Payment Security**: Razorpay's secure payment processing
- **Database Security**: SQLite with prepared statements
- **Environment Variables**: Sensitive data in environment files

## 🎯 Future Enhancements

- [ ] **Multi-currency support**
- [ ] **Transaction categories**
- [ ] **Export transaction history**
- [ ] **Push notifications**
- [ ] **Mobile app (React Native)**
- [ ] **Advanced analytics dashboard**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- **Documentation**: Check this README
- **Issues**: Create a GitHub issue
- **Email**: support@eventwallet.com

## 🙏 Acknowledgments

- **Auth0** for authentication services
- **Razorpay** for payment processing
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations

---

**Happy Coding! 🚀**