import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { FileText, Download, DollarSign, PackageOpen, LayoutDashboard, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function Transparency() {
  const { siteContent, updateSiteContent, ledgers, merch, docs, addLedger, updateLedger, deleteLedger, addMerch, updateMerch, deleteMerch, addDoc, updateDoc, deleteDoc } = useData();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState<"dashboard" | "ledgers" | "merch" | "documents">("dashboard");

  const fundsData = [
    { name: "Membership Fees", value: 45000 },
    { name: "Merch Sales", value: 25000 },
    { name: "Donations/Sponsors", value: 10000 },
  ];

  const expensesData = [
    { name: "Events & Seminars", value: 30000 },
    { name: "Student Care Kits", value: 15000 },
    { name: "Merch Production", value: 18000 },
    { name: "Admin/Office", value: 5000 },
  ];

  const COLORS = ["#FFD100", "#008751", "#2563eb", "#eab308"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 group">
        <div className="absolute inset-0 z-0">
          <img 
            src={siteContent.coverPhotoUrl || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000"} 
            alt="University Cover" 
            className="w-full h-full object-cover opacity-30 object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-white/80 to-white/40"></div>
          {isAdmin && (
             <div className="absolute top-4 right-4 z-50 bg-white p-3 rounded-lg shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center cursor-pointer hover:bg-gray-50 text-gray-700">
               <ImageUpload onUpload={(val) => updateSiteContent({ coverPhotoUrl: val })} label="Change Cover Photo" />
             </div>
          )}
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12 w-full">
          <div className="mb-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Financial Transparency
            </h1>
            <p className="mt-4 text-lg text-gray-800 max-w-3xl font-medium">
              Open, accountable, and clear. Review organizational funds, expenditures, and official financial documents.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 w-full mt-4">
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "dashboard", label: "Overview Dashboard", icon: LayoutDashboard },
            { id: "ledgers", label: "Contribution Ledgers", icon: DollarSign },
            { id: "merch", label: "Merch Breakdown", icon: PackageOpen },
            { id: "documents", label: "Official Docs", icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                activeTab === tab.id 
                  ? "bg-[#FFD100] text-gray-900 shadow-sm" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <tab.icon className={`w-4 h-4 mr-2 ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Incoming Funds (Semester)</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={fundsData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {fundsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Outgoing Expenses (Semester)</h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expensesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Ledgers View */}
        {activeTab === "ledgers" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Specific Initiative Ledgers</h2>
              {isAdmin && (
                <button 
                  onClick={() => addLedger({ initiative: "New Initiative", collected: 0, spent: 0, status: "Ongoing" })}
                  className="flex items-center bg-[#008751] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#007043]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-4 font-bold text-gray-900">Initiative / Event</th>
                    <th className="p-4 font-bold text-gray-900">Total Collected</th>
                    <th className="p-4 font-bold text-gray-900">Total Spent</th>
                    <th className="p-4 font-bold text-gray-900">Balance</th>
                    <th className="p-4 font-bold text-gray-900">Status</th>
                    {isAdmin && <th className="p-4 font-bold text-gray-900">Manage</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ledgers.map(ledger => (
                    <tr key={ledger.id} className="hover:bg-gray-50 group">
                      <td className="p-4 font-medium text-gray-900">
                        <EditableText value={ledger.initiative} onSave={(val) => updateLedger(ledger.id, { initiative: val })} />
                      </td>
                      <td className="p-4 text-green-600 font-bold">
                        ₱<EditableText value={ledger.collected.toString()} onSave={(val) => updateLedger(ledger.id, { collected: Number(val) })} />
                      </td>
                      <td className="p-4 text-red-500 font-bold">
                        ₱<EditableText value={ledger.spent.toString()} onSave={(val) => updateLedger(ledger.id, { spent: Number(val) })} />
                      </td>
                      <td className="p-4 font-bold">₱{(ledger.collected - ledger.spent).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${ledger.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          <EditableText value={ledger.status} onSave={(val) => updateLedger(ledger.id, { status: val as any })} />
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="p-4">
                          <button onClick={() => deleteLedger(ledger.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                            <Trash className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Merch Breakdown */}
        {activeTab === "merch" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  Merchandise Breakdown
                  {isAdmin && (
                    <button 
                      onClick={() => addMerch({ itemName: "New Item", preorders: 0, price: 0, collected: 0, supplierCost: 0, totalCost: 0 })}
                      className="ml-4 flex items-center bg-[#008751] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#007043]"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                  )}
                </h2>
                <p className="text-gray-600 mt-1">Cost vs Payments transparency report.</p>
              </div>
              <div className="bg-[#FFD100]/20 text-gray-900 px-4 py-2 rounded-xl font-bold border border-[#FFD100]/50">
                Total Profit for Org: <span className="text-[#008751]">₱{merch.reduce((acc, curr) => acc + (curr.collected - curr.totalCost), 0).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {merch.map(m => (
                <div key={m.id} className="border border-gray-200 rounded-2xl p-6 relative group">
                  {isAdmin && (
                    <button onClick={() => deleteMerch(m.id)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                  <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2 pr-8">
                    <EditableText value={m.itemName} onSave={(val) => updateMerch(m.id, { itemName: val })} />
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-gray-600">Total Pre-orders</span><span className="font-bold"><EditableText value={m.preorders.toString()} onSave={(val) => updateMerch(m.id, { preorders: Number(val) })} /> pcs</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Selling Price</span><span className="font-bold">₱<EditableText value={m.price.toString()} onSave={(val) => updateMerch(m.id, { price: Number(val) })} />/pc</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Total Collected</span><span className="font-bold text-green-600">₱<EditableText value={m.collected.toString()} onSave={(val) => updateMerch(m.id, { collected: Number(val) })} /></span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-100"><span className="text-gray-600">Supplier Cost</span><span className="font-bold text-red-500">₱<EditableText value={m.supplierCost.toString()} onSave={(val) => updateMerch(m.id, { supplierCost: Number(val) })} />/pc</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Total Production Cost</span><span className="font-bold text-red-500">₱<EditableText value={m.totalCost.toString()} onSave={(val) => updateMerch(m.id, { totalCost: Number(val) })} /></span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Official Documents & Audits</h2>
              {isAdmin && (
                <button 
                  onClick={() => addDoc({ title: "New Document", date: "Date", size: "Size", url: "#" })}
                  className="flex items-center bg-[#008751] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#007043]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </div>
            <div className="space-y-4">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#008751] hover:bg-[#008751]/5 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-white transition-colors">
                      <FileText className="w-6 h-6 text-[#008751]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        <EditableText value={doc.title} onSave={(val) => updateDoc(doc.id, { title: val })} />
                      </h3>
                      <p className="text-sm text-gray-500">
                        Uploaded <EditableText value={doc.date} onSave={(val) => updateDoc(doc.id, { date: val })} /> &middot; <EditableText value={doc.size} onSave={(val) => updateDoc(doc.id, { size: val })} />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4 mr-2 text-[#008751]" />
                      Download PDF
                    </button>
                    {isAdmin && (
                      <button onClick={() => deleteDoc(doc.id)} className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg">
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
