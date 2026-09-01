import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Settings, FileText, CheckCircle2, AlertCircle, LogOut, Upload } from "lucide-react";
import { cn } from "../lib/utils";

export default function AdminDashboard() {
  const { records } = useData();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("All");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const filteredRecords = records.filter(
    (record) => activeTab === "All" || record.category === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header Context */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-[#FFD100] flex items-center justify-center font-bold text-gray-900">
              A
            </div>
            <div>
              <div className="font-bold text-gray-900">Administrator</div>
              <div className="text-xs text-gray-500">Finance Committee</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Link to="/admin/upload" className="flex-1 sm:flex-none flex justify-center items-center px-4 py-2 bg-[#008751] text-white rounded-lg font-bold text-sm hover:bg-[#007043] transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Upload Data
            </Link>
            <button onClick={logout} className="flex-1 sm:flex-none flex justify-center items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Admin Dashboard
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Manage departmental records, update status, and oversee transparency data.
            </p>
          </div>
          <div className="flex space-x-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              <div className="text-sm font-bold text-gray-500">Total Records</div>
              <div className="text-2xl font-extrabold text-gray-900">{records.length}</div>
            </div>
            <div className="flex-1 md:flex-none rounded-xl bg-white p-4 shadow-sm border border-gray-200">
              <div className="text-sm font-bold text-gray-500">Pending Review</div>
              <div className="text-2xl font-extrabold text-orange-600">
                {records.filter(r => r.status !== "Completed").length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Uploads</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {["All", "Expense", "Procurement", "Financial Statement"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-colors",
                    activeTab === tab
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-900 min-w-[600px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-bold">Document</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-bold text-gray-900">{record.title}</div>
                          <div className="text-xs text-gray-500">{record.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{record.category}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {record.amount > 0 ? `₱${record.amount.toLocaleString()}` : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {record.status === "Completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="font-semibold">{record.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                        <Settings className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
