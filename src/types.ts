export type Role = "admin" | "public";

export interface User {
  id: string;
  name: string;
  role: Role;
}

export type RecordCategory = "Expense" | "Procurement" | "Financial Statement";
export type RecordStatus = "Completed" | "Pending" | "Ongoing";

export interface DeptRecord {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: RecordCategory;
  description: string;
  status: RecordStatus;
  documentUrl?: string;
}

export interface ChartDataPoint {
  name: string;
  Expenses: number;
  Procurements: number;
}

export interface LedgerItem {
  id: string;
  initiative: string;
  collected: number;
  spent: number;
  status: RecordStatus;
}

export interface MerchBreakdown {
  id: string;
  itemName: string;
  preorders: number;
  price: number;
  collected: number;
  supplierCost: number;
  totalCost: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  size: string;
  url: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  priority: string;
  content: string;
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
}

export interface SiteContent {
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  aboutHistory: string;
  aboutMission: string;
  aboutVision: string;
  logoUrl: string;
  coverPhotoUrl: string;
  contactOffice: string;
  contactEmailGeneral: string;
  contactEmailFinance: string;
  contactSocialFB: string;
  contactSocialIG: string;
  contactPageDescription: string;
  homeMetric1Number: string;
  homeMetric1Label: string;
  homeMetric2Number: string;
  homeMetric2Label: string;
  homeMetric2Description: string;
  homeMetric3Number: string;
  homeMetric3Label: string;
  homeMetric3Description: string;
}
