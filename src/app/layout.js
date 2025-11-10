import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
 

export const metadata = {
  title: 'Create Your MemoryBox Account - Start Collecting Memories',
  description: 'Join MemoryBox to create and share beautiful memory collections. Sign up for free and start building your digital memory box today.',
  keywords: 'MemoryBox, sign up, create account, memory sharing, photo collection, digital memories',
  openGraph: {
    title: 'Create Your MemoryBox Account',
    description: 'Start collecting and sharing memories with MemoryBox',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}