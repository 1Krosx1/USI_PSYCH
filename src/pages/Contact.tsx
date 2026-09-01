import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { siteContent, updateSiteContent } = useData();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Contact Us
            </h1>
            <EditableText
              as="p"
              className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto whitespace-pre-line font-medium"
              value={siteContent.contactPageDescription}
              onSave={(val) => updateSiteContent({ contactPageDescription: val })}
              multiline
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 w-full mt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Official Directory</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#FFD100]/20 p-4 rounded-xl border border-[#FFD100]/50">
                  <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">APS Office</h3>
                  <EditableText
                    as="p"
                    className="text-gray-700 mt-1 whitespace-pre-line"
                    value={siteContent.contactOffice}
                    onSave={(val) => updateSiteContent({ contactOffice: val })}
                    multiline
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#FFD100]/20 p-4 rounded-xl border border-[#FFD100]/50">
                  <Mail className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Email Addresses</h3>
                  <div className="text-gray-700 flex items-center gap-1">
                    <span className="text-sm font-bold w-16">General:</span> 
                    <EditableText value={siteContent.contactEmailGeneral} onSave={(val) => updateSiteContent({ contactEmailGeneral: val })} />
                  </div>
                  <div className="text-gray-700 flex items-center gap-1">
                    <span className="text-sm font-bold w-16">Finance:</span> 
                    <EditableText value={siteContent.contactEmailFinance} onSave={(val) => updateSiteContent({ contactEmailFinance: val })} />
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-[#FFD100]/20 p-4 rounded-xl border border-[#FFD100]/50">
                  <MessageSquare className="h-6 w-6 text-gray-900" />
                </div>
                <div className="ml-4 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Social Media</h3>
                  <div className="text-gray-700 flex items-center gap-1">
                    <span className="text-sm font-bold w-16">Facebook:</span> 
                    <EditableText value={siteContent.contactSocialFB} onSave={(val) => updateSiteContent({ contactSocialFB: val })} />
                  </div>
                  <div className="text-gray-700 flex items-center gap-1">
                    <span className="text-sm font-bold w-16">Instagram:</span> 
                    <EditableText value={siteContent.contactSocialIG} onSave={(val) => updateSiteContent({ contactSocialIG: val })} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send an Inquiry</h2>
            {submitted ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center bg-green-50 rounded-2xl border border-green-200">
                <Send className="h-12 w-12 text-[#008751] mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 mt-2">We will get back to you within 1-2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                    <input required type="text" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none transition-colors" placeholder="Juan Dela Cruz" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Student Number / Year</label>
                    <input required type="text" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none transition-colors" placeholder="e.g. 2021-0001 (3rd Year)" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
                  <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none transition-colors bg-white">
                    <option>General Inquiry</option>
                    <option>Merchandise / Sizing Question</option>
                    <option>Financial Grievance / Report</option>
                    <option>Event Participation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                  <textarea required rows={4} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#008751] focus:ring-1 focus:ring-[#008751] outline-none transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full rounded-xl bg-[#008751] text-white font-bold py-4 hover:bg-[#007043] transition-colors flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
