import React, { useState } from "react";
import { ShoppingBag, Search, CheckCircle2, AlertCircle, Package, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function Shop() {
  const { siteContent, updateSiteContent } = useData();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState<"catalog" | "tracker">("catalog");
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: 1, name: "Official Department Shirt (2024)", price: 350, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600", category: "Apparel" },
    { id: 2, name: "APS ID Lanyard", price: 150, image: "https://images.unsplash.com/photo-1599813217730-80414abcc9bc?auto=format&fit=crop&q=80&w=600", category: "Accessories" },
    { id: 3, name: "Mental Health Awareness Pin", price: 50, image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=600", category: "Accessories" },
    { id: 4, name: "Psychology Sticker Pack", price: 80, image: "https://images.unsplash.com/photo-1582298538104-58e578c773a4?auto=format&fit=crop&q=80&w=600", category: "Stationery" },
  ];

  const mockTracker = [
    { uid: "2021-04921", status: "Ready for Pickup", releasedAt: "Oct 5, 2024 - 10:00 AM" },
    { uid: "2022-11024", status: "Paid - In Production", releasedAt: "Pending" },
    { uid: "2020-03112", status: "Ready for Pickup", releasedAt: "Oct 5, 2024 - 11:30 AM" },
  ];

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
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12 w-full text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            APS Merch Shop
          </h1>
          <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto font-medium">
            Order official Association of Psychology Students merchandise. All proceeds go toward our student welfare programs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 w-full mt-4">
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-3xl sm:rounded-full border border-gray-200 flex flex-col sm:inline-flex sm:flex-row shadow-sm w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("catalog")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-colors w-full sm:w-auto ${activeTab === "catalog" ? "bg-[#FFD100] text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              Product Catalog & Order
            </button>
            <button
              onClick={() => setActiveTab("tracker")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-colors w-full sm:w-auto mt-1 sm:mt-0 ${activeTab === "tracker" ? "bg-[#FFD100] text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              Claiming Status Tracker
            </button>
          </div>
        </div>

        {activeTab === "catalog" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Product Grid */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group">
                    <div className="h-48 overflow-hidden bg-gray-100 relative">
                      <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-bold text-[#008751] uppercase tracking-wider mb-1">{p.category}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{p.name}</h3>
                      <div className="text-xl font-extrabold text-gray-900">₱{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Form & Guidelines */}
            <div>
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm sticky top-28">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShoppingBag className="mr-2 h-6 w-6 text-[#008751]" />
                  Pre-Order Form
                </h2>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Full Name</label>
                    <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none" placeholder="Juan Dela Cruz" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Section / Year</label>
                    <input type="text" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none" placeholder="e.g. BS Psych 3A" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Select Item</label>
                    <select className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none bg-white">
                      {products.map(p => (
                        <option key={p.id}>{p.name} - ₱{p.price}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1">Size (If applicable)</label>
                    <select className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none bg-white">
                      <option>N/A</option>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                      <option>XL</option>
                    </select>
                  </div>
                  <button type="button" className="w-full rounded-xl bg-[#008751] text-white font-bold py-3 hover:bg-[#007043] transition-colors mt-4">
                    Submit Pre-Order
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">Payment Guidelines</h3>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                    <li>Pay directly to the APS Treasurer at the Dept Office.</li>
                    <li>Gcash payments must be sent to 09123456789. Send receipt via FB page.</li>
                    <li>Keep your digital/physical stub for claiming.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="mr-2 h-6 w-6 text-[#008751]" />
                Check Your Order Status
              </h2>
              
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search your UID (e.g. 2021-04921)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-gray-200 py-4 pl-12 pr-4 text-gray-900 focus:border-[#FFD100] outline-none transition-colors font-medium"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-gray-200 text-gray-500 text-sm">
                    <tr>
                      <th className="pb-4 font-bold">Student UID</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4 font-bold">Date Released</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {mockTracker.filter(t => t.uid.toLowerCase().includes(searchQuery.toLowerCase())).map((track, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-bold text-gray-900">{track.uid}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            track.status.includes('Ready') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {track.status.includes('Ready') ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                            {track.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-600 font-medium">{track.releasedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
