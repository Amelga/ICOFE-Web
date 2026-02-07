
export enum UserRole {
  PUBLIC = 'PUBLIC',
  FRANCHISEE = 'FRANCHISEE',
  ADMIN = 'ADMIN',
  OPERATIONS = 'OPERATIONS',
  AFFILIATE = 'AFFILIATE',
  SUPERVISOR = 'SUPERVISOR'
}

export interface Kiosk {
  id: string;
  location: string;
  status: 'active' | 'maintenance' | 'offline';
  cupsSoldToday: number;
  revenueToday: number;
  consumables: {
    coffeeBeans: number; // percentage
    milk: number;
    cups: number;
    water: number;
  };
  lastService: string;
}

export interface FranchiseeData {
  id: string;
  name: string;
  joinDate: string;
  totalInvested: number;
  kiosks: Kiosk[];
  monthlySalary: number;
  referralBonuses: number;
  totalCupsSold: number;
}

export interface SaleRecord {
  timestamp: string;
  amount: number;
  product: string;
}