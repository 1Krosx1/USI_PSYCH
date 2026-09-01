import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { UploadCloud, FileSpreadsheet, CheckCircle2, ArrowLeft } from "lucide-react";
import { RecordCategory } from "../types";

export default function AdminUpload() {
  const { addRecord } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<RecordCategory>("Expense");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Mock upload & data extraction delay
    setTimeout(() => {
      addRecord({
        title,
        amount: Number(amount) || 0,
        category,
        description,
        date: new Date().toISOString().split("T")[0],
        status: "Completed",
      });
      setIsUploading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        
        <Link to="/admin" className="inline-flex items-center text-gray-500 hover:text-gray-900 font-bold mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Upload Financial Data
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Securely upload Excel or document files to update the transparency database.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful</h3>
              <p className="text-gray-600">The data has been processed and insights updated.</p>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="h-8 w-8 text-[#008751]" />
                </div>
                <div className="text-lg font-bold text-gray-900 text-center">Click to upload or drag and drop</div>
                <div className="text-sm text-gray-500 mt-1">Excel (XLSX, CSV) or Word (DOCX)</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Document Title</label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:outline-none focus:ring-1 focus:ring-[#008751]"
                    placeholder="e.g. Q4 Budget Report"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Total Amount (₱)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:outline-none focus:ring-1 focus:ring-[#008751]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as RecordCategory)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:outline-none focus:ring-1 focus:ring-[#008751] bg-white"
                >
                  <option value="Expense">Expense</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Financial Statement">Financial Statement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Description / Insights</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:outline-none focus:ring-1 focus:ring-[#008751]"
                  placeholder="Provide a brief description of this record..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full rounded-xl bg-[#008751] py-4 px-4 text-center text-lg font-bold text-white transition-all hover:bg-[#007043] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <span>Processing Data...</span>
                  ) : (
                    <>
                      <FileSpreadsheet className="h-5 w-5" />
                      <span>Process & Upload Data</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
