import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';

export const metadata = {
  title: 'EventWallet - Digital Wallet',
  description: 'A secure digital wallet for managing your funds',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}




