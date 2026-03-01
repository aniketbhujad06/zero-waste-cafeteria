import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FoodDonation {
  id: string;
  messName: string;
  username: string; // Track which user created this
  foodItems: string;
  quantity: string;
  status: 'pending' | 'done';
  submittedAt: string;
}

interface DonationContextType {
  donations: FoodDonation[];
  addDonation: (donation: Omit<FoodDonation, 'id' | 'status' | 'submittedAt'>) => void;
  markAsDone: (id: string) => void;
  getDonationsByUser: (username: string) => FoodDonation[];
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

// Sample data for initial load
const SAMPLE_DONATIONS: FoodDonation[] = [
  {
    id: '1',
    messName: 'Leena mess',
    username: 'leenamess',
    foodItems: 'Rice, Dal, Vegetable Curry',
    quantity: '15 plates',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    messName: 'moms kitchen',
    username: 'momskitchen',
    foodItems: 'Chapati, Paneer Sabzi, Curd',
    quantity: '20 plates',
    status: 'pending',
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    messName: 'Elite mess',
    username: 'elitemess',
    foodItems: 'Biryani, Raita, Salad',
    quantity: '25 plates',
    status: 'done',
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '4',
    messName: 'Gokul mess',
    username: 'gokulmess',
    foodItems: 'Sambar Rice, Papad, Pickle',
    quantity: '18 plates',
    status: 'done',
    submittedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
];

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<FoodDonation[]>(() => {
    const saved = localStorage.getItem('foodDonations');
    if (saved) {
      const existing = JSON.parse(saved);
      // Merge sample data with existing data, avoid duplicates
      const sampleIds = SAMPLE_DONATIONS.map(d => d.id);
      const filtered = existing.filter((d: FoodDonation) => !sampleIds.includes(d.id));
      return [...SAMPLE_DONATIONS, ...filtered];
    }
    // Initialize with sample data on first load
    return SAMPLE_DONATIONS;
  });

  useEffect(() => {
    localStorage.setItem('foodDonations', JSON.stringify(donations));
  }, [donations]);

  const addDonation = (donation: Omit<FoodDonation, 'id' | 'status' | 'submittedAt'>) => {
    const newDonation: FoodDonation = {
      ...donation,
      id: Date.now().toString(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setDonations(prev => [...prev, newDonation]);
  };

  const markAsDone = (id: string) => {
    setDonations(prev =>
      prev.map(donation =>
        donation.id === id ? { ...donation, status: 'done' } : donation
      )
    );
  };

  const getDonationsByUser = (username: string) => {
    return donations.filter(donation => donation.username === username);
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation, markAsDone, getDonationsByUser }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within DonationProvider');
  }
  return context;
}