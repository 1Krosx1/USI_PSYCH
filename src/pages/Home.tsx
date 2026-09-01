import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ShoppingBag, PieChart, Users, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { siteContent, updateSiteContent } = useData();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col">
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
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <EditableText
                as="h1"
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 whitespace-pre-line"
                value={siteContent.homeHeroTitle}
                onSave={(val) => updateSiteContent({ homeHeroTitle: val })}
                multiline
              />
              
              <div className="mt-8">
                <EditableText
                  as="p"
                  className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium"
                  value={siteContent.homeHeroSubtitle}
                  onSave={(val) => updateSiteContent({ homeHeroSubtitle: val })}
                  multiline
                />
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/transparency"
                  className="w-full sm:w-auto group flex items-center justify-center space-x-2 rounded-full bg-[#008751] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#007043] hover:scale-105 shadow-lg shadow-green-900/20"
                >
                  <PieChart className="w-5 h-5 mr-1" />
                  <span>Transparency Report</span>
                </Link>
                <Link
                  to="/shop"
                  className="w-full sm:w-auto group flex items-center justify-center space-x-2 rounded-full bg-[#FFD100] px-8 py-4 text-lg font-bold text-gray-900 hover:bg-[#eab308] transition-all hover:scale-105 shadow-md"
                >
                  <ShoppingBag className="w-5 h-5 mr-1" />
                  <span>Merch Shop</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics & Highlights */}
      <section className="bg-[#FFD100] py-20 border-y border-yellow-500/20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-yellow-500/30">
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <Users className="w-12 h-12 text-gray-900 mb-4" />
              <EditableText
                as="div"
                className="text-5xl font-extrabold text-gray-900 mb-2"
                value={siteContent.homeMetric1Number}
                onSave={(val) => updateSiteContent({ homeMetric1Number: val })}
              />
              <EditableText
                as="div"
                className="text-lg font-bold text-gray-800"
                value={siteContent.homeMetric1Label}
                onSave={(val) => updateSiteContent({ homeMetric1Label: val })}
              />
            </div>
            
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <EditableText
                as="div"
                className="text-5xl font-extrabold text-gray-900 mb-2"
                value={siteContent.homeMetric2Number}
                onSave={(val) => updateSiteContent({ homeMetric2Number: val })}
              />
              <EditableText
                as="div"
                className="text-lg font-bold text-gray-800"
                value={siteContent.homeMetric2Label}
                onSave={(val) => updateSiteContent({ homeMetric2Label: val })}
              />
              <EditableText
                as="p"
                className="mt-3 text-sm text-gray-700 max-w-xs mx-auto"
                value={siteContent.homeMetric2Description}
                onSave={(val) => updateSiteContent({ homeMetric2Description: val })}
                multiline
              />
            </div>
            
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
              <EditableText
                as="div"
                className="text-5xl font-extrabold text-gray-900 mb-2"
                value={siteContent.homeMetric3Number}
                onSave={(val) => updateSiteContent({ homeMetric3Number: val })}
              />
              <EditableText
                as="div"
                className="text-lg font-bold text-gray-800"
                value={siteContent.homeMetric3Label}
                onSave={(val) => updateSiteContent({ homeMetric3Label: val })}
              />
              <EditableText
                as="p"
                className="mt-3 text-sm text-gray-700 max-w-xs mx-auto"
                value={siteContent.homeMetric3Description}
                onSave={(val) => updateSiteContent({ homeMetric3Description: val })}
                multiline
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section Teaser */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Built for the Student Body</h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            The Association of Psychology Students is dedicated to serving the needs of the psychology community. From ensuring that every peso collected goes directly to student welfare, to creating safe spaces for discourse and learning.
          </p>
          <Link to="/about" className="inline-flex items-center text-[#008751] font-bold text-lg hover:text-[#007043] group">
            Learn more about our mission
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
