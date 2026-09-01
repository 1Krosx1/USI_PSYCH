import React, { createContext, useContext, useState, ReactNode } from "react";
import { 
  DeptRecord, ChartDataPoint, LedgerItem, MerchBreakdown, 
  DocumentItem, EventItem, NoticeItem, Officer, SiteContent 
} from "../types";

const INITIAL_RECORDS: DeptRecord[] = [
  {
    id: "1",
    title: "Psychological Assessment Tools",
    amount: 12500,
    date: "2023-10-15",
    category: "Procurement",
    description: "Purchase of new standardized testing kits (WAIS-IV, MMPI-3).",
    status: "Completed",
  },
  {
    id: "2",
    title: "Annual Faculty Retreat",
    amount: 3200,
    date: "2023-11-02",
    category: "Expense",
    description: "Venue rental and catering for department strategic planning.",
    status: "Completed",
  }
];

const INITIAL_CHART_DATA: ChartDataPoint[] = [
  { name: "Jul", Expenses: 4000, Procurements: 2400 },
  { name: "Aug", Expenses: 3000, Procurements: 1398 }
];

const INITIAL_LEDGERS: LedgerItem[] = [
  { id: "1", initiative: "Pinning Ceremony 2024", collected: 12000, spent: 11500, status: "Completed" },
  { id: "2", initiative: "Midterm Care Kits", collected: 8000, spent: 8000, status: "Completed" },
  { id: "3", initiative: "Psychology Week Fund", collected: 25000, spent: 5000, status: "Ongoing" }
];

const INITIAL_MERCH: MerchBreakdown[] = [
  { id: "1", itemName: "Department Shirt (Batch 1)", preorders: 100, price: 350, collected: 35000, supplierCost: 280, totalCost: 28000 }
];

const INITIAL_DOCS: DocumentItem[] = [
  { id: "1", title: "September 2024 Financial Report", date: "Oct 2, 2024", size: "2.4 MB", url: "#" },
  { id: "2", title: "Psych Week 2024 Budget Proposal", date: "Sep 15, 2024", size: "1.1 MB", url: "#" },
];

const INITIAL_EVENTS: EventItem[] = [
  { id: "1", title: "Mental Health Awareness Symposium", date: "October 10, 2024", location: "Main Auditorium", description: "Join us for a day of insightful talks and workshops.", type: "Seminar" }
];

const INITIAL_NOTICES: NoticeItem[] = [
  { id: "1", title: "Merch Claiming Schedule", date: "October 5, 2024", priority: "High", content: "Batch 1 department shirts are now available for claiming." }
];

const INITIAL_OFFICERS: Officer[] = [
  { id: "1", name: "Maria Clara", role: "President", photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: "2", name: "Juan Dela Cruz", role: "Vice President", photoUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: "3", name: "Ana Santos", role: "Secretary", photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { id: "4", name: "Miguel Reyes", role: "Treasurer", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
];

const INITIAL_SITE_CONTENT: SiteContent = {
  homeHeroTitle: "Uniting Minds,\nEmpowering Students.",
  homeHeroSubtitle: "Welcome to the official portal of the Association of Psychology Students. Join us in fostering mental health awareness, academic excellence, and community transparency.",
  aboutHistory: "Founded in 1998, the Association of Psychology Students (USI APS) began as a small study group dedicated to helping peers understand complex psychological theories. It has since grown into a massive organization fostering a strong student body.",
  aboutMission: "To foster a supportive and intellectually stimulating environment that empowers psychology students to achieve academic excellence.",
  aboutVision: "To be the premier student organization recognized for shaping compassionate, ethical, and highly competent future psychology professionals.",
  logoUrl: "",
  coverPhotoUrl: "",
  contactOffice: "Room 304, College of Arts and Sciences Building\nMain University Campus",
  contactEmailGeneral: "aps@university.edu.ph",
  contactEmailFinance: "finance.aps@university.edu.ph",
  contactSocialFB: "/USIAPS",
  contactSocialIG: "@usi_aps",
  contactPageDescription: "Have a question, financial grievance, or inquiry about merchandise? Reach out to the APS Executive Board.",
  homeMetric1Number: "842",
  homeMetric1Label: "Current Psychology Students",
  homeMetric2Number: "100%",
  homeMetric2Label: "Financial Transparency",
  homeMetric2Description: "All organizational funds, projects, and merchandise breakdowns are publicly accessible.",
  homeMetric3Number: "24/7",
  homeMetric3Label: "Student Support",
  homeMetric3Description: "Reach out through our portal for academic queries, mental health resources, and event registration."
};

interface DataContextType {
  records: DeptRecord[];
  chartData: ChartDataPoint[];
  ledgers: LedgerItem[];
  merch: MerchBreakdown[];
  docs: DocumentItem[];
  events: EventItem[];
  notices: NoticeItem[];
  officers: Officer[];
  siteContent: SiteContent;
  
  addRecord: (record: Omit<DeptRecord, "id">) => void;
  updateChartData: (data: ChartDataPoint[]) => void;
  
  updateLedger: (id: string, data: Partial<LedgerItem>) => void;
  updateMerch: (id: string, data: Partial<MerchBreakdown>) => void;
  updateDoc: (id: string, data: Partial<DocumentItem>) => void;
  updateEvent: (id: string, data: Partial<EventItem>) => void;
  updateNotice: (id: string, data: Partial<NoticeItem>) => void;
  updateOfficer: (id: string, data: Partial<Officer>) => void;
  updateSiteContent: (data: Partial<SiteContent>) => void;
  
  addLedger: (data: Omit<LedgerItem, "id">) => void;
  addMerch: (data: Omit<MerchBreakdown, "id">) => void;
  addDoc: (data: Omit<DocumentItem, "id">) => void;
  addEvent: (data: Omit<EventItem, "id">) => void;
  addNotice: (data: Omit<NoticeItem, "id">) => void;
  addOfficer: (data: Omit<Officer, "id">) => void;
  
  deleteLedger: (id: string) => void;
  deleteMerch: (id: string) => void;
  deleteDoc: (id: string) => void;
  deleteEvent: (id: string) => void;
  deleteNotice: (id: string) => void;
  deleteOfficer: (id: string) => void;
  
  reorderOfficers: (startIndex: number, endIndex: number) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<DeptRecord[]>(INITIAL_RECORDS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(INITIAL_CHART_DATA);
  const [ledgers, setLedgers] = useState<LedgerItem[]>(INITIAL_LEDGERS);
  const [merch, setMerch] = useState<MerchBreakdown[]>(INITIAL_MERCH);
  const [docs, setDocs] = useState<DocumentItem[]>(INITIAL_DOCS);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [officers, setOfficers] = useState<Officer[]>(INITIAL_OFFICERS);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_SITE_CONTENT);

  const genId = () => Math.random().toString(36).substr(2, 9);

  const addRecord = (record: Omit<DeptRecord, "id">) => setRecords(p => [{ ...record, id: genId() }, ...p]);
  const updateChartData = (data: ChartDataPoint[]) => setChartData(data);

  const updateLedger = (id: string, data: Partial<LedgerItem>) => setLedgers(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateMerch = (id: string, data: Partial<MerchBreakdown>) => setMerch(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateDoc = (id: string, data: Partial<DocumentItem>) => setDocs(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateEvent = (id: string, data: Partial<EventItem>) => setEvents(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateNotice = (id: string, data: Partial<NoticeItem>) => setNotices(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateOfficer = (id: string, data: Partial<Officer>) => setOfficers(p => p.map(i => i.id === id ? { ...i, ...data } : i));
  const updateSiteContent = (data: Partial<SiteContent>) => setSiteContent(p => ({ ...p, ...data }));

  const addLedger = (data: Omit<LedgerItem, "id">) => setLedgers(p => [...p, { ...data, id: genId() }]);
  const addMerch = (data: Omit<MerchBreakdown, "id">) => setMerch(p => [...p, { ...data, id: genId() }]);
  const addDoc = (data: Omit<DocumentItem, "id">) => setDocs(p => [...p, { ...data, id: genId() }]);
  const addEvent = (data: Omit<EventItem, "id">) => setEvents(p => [...p, { ...data, id: genId() }]);
  const addNotice = (data: Omit<NoticeItem, "id">) => setNotices(p => [...p, { ...data, id: genId() }]);
  const addOfficer = (data: Omit<Officer, "id">) => setOfficers(p => [...p, { ...data, id: genId() }]);

  const deleteLedger = (id: string) => setLedgers(p => p.filter(i => i.id !== id));
  const deleteMerch = (id: string) => setMerch(p => p.filter(i => i.id !== id));
  const deleteDoc = (id: string) => setDocs(p => p.filter(i => i.id !== id));
  const deleteEvent = (id: string) => setEvents(p => p.filter(i => i.id !== id));
  const deleteNotice = (id: string) => setNotices(p => p.filter(i => i.id !== id));
  const deleteOfficer = (id: string) => setOfficers(p => p.filter(i => i.id !== id));

  const reorderOfficers = (startIndex: number, endIndex: number) => {
    setOfficers(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return (
    <DataContext.Provider value={{
      records, chartData, ledgers, merch, docs, events, notices, officers, siteContent,
      addRecord, updateChartData,
      updateLedger, updateMerch, updateDoc, updateEvent, updateNotice, updateOfficer, updateSiteContent,
      addLedger, addMerch, addDoc, addEvent, addNotice, addOfficer,
      deleteLedger, deleteMerch, deleteDoc, deleteEvent, deleteNotice, deleteOfficer,
      reorderOfficers
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
