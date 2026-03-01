import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'mess-owner' | 'admin' | 'ngo';
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: 'mess-owner' | 'admin' | 'ngo') => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials - in real app, this would be handled by backend
const DEMO_CREDENTIALS = {
  messOwners: [
    { username: 'leenamess', password: 'leenamess123', displayName: 'Leena mess' },
    { username: 'momskitchen', password: 'momskitchen123', displayName: 'moms kitchen' },
    { username: 'elitemess', password: 'elitemess123', displayName: 'Elite mess' },
    { username: 'gokulmess', password: 'gokulmess123', displayName: 'Gokul mess' },
    { username: 'vakratundamess', password: 'vakratundamess123', displayName: 'vakratunda mess' },
  ],
  admins: [
    { username: 'admin', password: 'admin123' },
  ],
  ngos: [
    { username: 'smilefoundation', password: 'smilefoundation123', displayName: 'Smile Foundation' },
    { username: 'balrakshabharat', password: 'balrakshabharat123', displayName: 'Bal Raksha Bharat' },
    { username: 'helpageindia', password: 'helpageindia123', displayName: 'HelpAge India' },
    { username: 'giveindiafoundation', password: 'giveindiafoundation123', displayName: 'GiveIndia Foundation' },
    { username: 'narayansevasansthan', password: 'narayansevasansthan123', displayName: 'Narayan Seva Sansthan' },
  ],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (username: string, password: string, role: 'mess-owner' | 'admin' | 'ngo'): boolean => {
    if (role === 'admin') {
      const isValid = DEMO_CREDENTIALS.admins.some(
        cred => cred.username === username && cred.password === password
      );
      if (isValid) {
        setUser({ username, role: 'admin' });
        return true;
      }
    } else if (role === 'ngo') {
      const isValid = DEMO_CREDENTIALS.ngos.some(
        cred => cred.username === username && cred.password === password
      );
      if (isValid) {
        setUser({ username, role: 'ngo', displayName: DEMO_CREDENTIALS.ngos.find(cred => cred.username === username)?.displayName });
        return true;
      }
    } else {
      const isValid = DEMO_CREDENTIALS.messOwners.some(
        cred => cred.username === username && cred.password === password
      );
      if (isValid) {
        setUser({ username, role: 'mess-owner', displayName: DEMO_CREDENTIALS.messOwners.find(cred => cred.username === username)?.displayName });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}