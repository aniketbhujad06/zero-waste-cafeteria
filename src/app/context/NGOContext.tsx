import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NGORequirement {
  id: string;
  ngoName: string;
  username: string;
  lunchQuantity: string;
  dinnerQuantity: string;
  updatedAt: string;
}

interface NGOContextType {
  requirements: NGORequirement[];
  addOrUpdateRequirement: (requirement: Omit<NGORequirement, 'id' | 'updatedAt'>) => void;
  getRequirementByUser: (username: string) => NGORequirement | undefined;
}

const NGOContext = createContext<NGOContextType | undefined>(undefined);

// Sample data for initial load
const SAMPLE_REQUIREMENTS: NGORequirement[] = [
  {
    id: '1',
    ngoName: 'Smile Foundation',
    username: 'smilefoundation',
    lunchQuantity: '50 plates',
    dinnerQuantity: '50 plates',
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: '2',
    ngoName: 'Bal Raksha Bharat',
    username: 'balrakshabharat',
    lunchQuantity: '75 plates',
    dinnerQuantity: '80 plates',
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    ngoName: 'HelpAge India',
    username: 'helpageindia',
    lunchQuantity: '40 plates',
    dinnerQuantity: '40 plates',
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '4',
    ngoName: 'GiveIndia Foundation',
    username: 'giveindiafoundation',
    lunchQuantity: '100 plates',
    dinnerQuantity: '100 plates',
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: '5',
    ngoName: 'Narayan Seva Sansthan',
    username: 'narayansevasansthan',
    lunchQuantity: '60 plates',
    dinnerQuantity: '65 plates',
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
];

export function NGOProvider({ children }: { children: React.ReactNode }) {
  const [requirements, setRequirements] = useState<NGORequirement[]>(() => {
    const saved = localStorage.getItem('ngoRequirements');
    if (saved) {
      const existing = JSON.parse(saved);
      // Merge sample data with existing data, avoid duplicates
      const sampleIds = SAMPLE_REQUIREMENTS.map(r => r.id);
      const filtered = existing.filter((r: NGORequirement) => !sampleIds.includes(r.id));
      return [...SAMPLE_REQUIREMENTS, ...filtered];
    }
    // Initialize with sample data on first load
    return SAMPLE_REQUIREMENTS;
  });

  useEffect(() => {
    localStorage.setItem('ngoRequirements', JSON.stringify(requirements));
  }, [requirements]);

  const addOrUpdateRequirement = (requirement: Omit<NGORequirement, 'id' | 'updatedAt'>) => {
    setRequirements(prev => {
      const existing = prev.find(r => r.username === requirement.username);
      
      if (existing) {
        // Update existing
        return prev.map(r =>
          r.username === requirement.username
            ? { ...requirement, id: r.id, updatedAt: new Date().toISOString() }
            : r
        );
      } else {
        // Add new
        const newRequirement: NGORequirement = {
          ...requirement,
          id: Date.now().toString(),
          updatedAt: new Date().toISOString(),
        };
        return [...prev, newRequirement];
      }
    });
  };

  const getRequirementByUser = (username: string) => {
    return requirements.find(r => r.username === username);
  };

  return (
    <NGOContext.Provider value={{ requirements, addOrUpdateRequirement, getRequirementByUser }}>
      {children}
    </NGOContext.Provider>
  );
}

export function useNGO() {
  const context = useContext(NGOContext);
  if (!context) {
    throw new Error('useNGO must be used within NGOProvider');
  }
  return context;
}