import { Outlet } from 'react-router';
import { DonationProvider } from './context/DonationContext';
import { NGOProvider } from './context/NGOContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';

export default function Root() {
  return (
    <AuthProvider>
      <DonationProvider>
        <NGOProvider>
          <Outlet />
          <Toaster />
        </NGOProvider>
      </DonationProvider>
    </AuthProvider>
  );
}