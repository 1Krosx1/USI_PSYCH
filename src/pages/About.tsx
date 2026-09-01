import React from "react";
import { Users, Target, BookOpen, GraduationCap, ChevronUp, ChevronDown, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function About() {
  const { siteContent, updateSiteContent, officers, addOfficer, updateOfficer, deleteOfficer, reorderOfficers } = useData();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

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
              About USI APS
            </h1>
            <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto font-medium">
              The Association of Psychology Students (APS) is the official student organization of the Psychology Department.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 w-full mt-8">
        
        {/* Identity & History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-[#008751]" />
              Our History & Identity
            </h2>
            <EditableText
              as="p"
              className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line"
              value={siteContent.aboutHistory}
              onSave={(val) => updateSiteContent({ aboutHistory: val })}
              multiline
            />
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="h-32 w-32 bg-[#FFD100] rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-gray-900">APS</span>
              </div>
              <p className="text-sm font-semibold text-gray-500">Official Seal Symbolism</p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#FFD100]/10 p-10 rounded-3xl border border-[#FFD100]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="mr-3 h-6 w-6 text-[#008751]" />
              Our Mission
            </h3>
            <EditableText
              as="p"
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              value={siteContent.aboutMission}
              onSave={(val) => updateSiteContent({ aboutMission: val })}
              multiline
            />
          </div>
          <div className="bg-[#008751]/5 p-10 rounded-3xl border border-[#008751]/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="mr-3 h-6 w-6 text-[#008751]" />
              Our Vision
            </h3>
            <EditableText
              as="p"
              className="text-gray-700 leading-relaxed whitespace-pre-line"
              value={siteContent.aboutVision}
              onSave={(val) => updateSiteContent({ aboutVision: val })}
              multiline
            />
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center w-full relative">
              <Users className="mr-3 h-8 w-8 text-[#008751]" />
              Executive Leadership Team
              {isAdmin && (
                <button 
                  onClick={() => addOfficer({ name: "New Officer", role: "Role", photoUrl: "" })}
                  className="absolute right-0 flex items-center bg-[#008751] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#007043]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {officers.map((officer, index) => (
              <div key={officer.id} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow relative group">
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => deleteOfficer(officer.id)} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash className="w-4 h-4" /></button>
                    {index > 0 && <button onClick={() => reorderOfficers(index, index - 1)} className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"><ChevronUp className="w-4 h-4" /></button>}
                    {index < officers.length - 1 && <button onClick={() => reorderOfficers(index, index + 1)} className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"><ChevronDown className="w-4 h-4" /></button>}
                  </div>
                )}
                
                <div className="h-24 w-24 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4 overflow-hidden relative">
                  {officer.photoUrl ? (
                    <img src={officer.photoUrl} alt={officer.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-400">{officer.name.charAt(0)}</span>
                  )}
                  {isAdmin && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white">
                       <ImageUpload onUpload={(val) => updateOfficer(officer.id, { photoUrl: val })} iconOnly />
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900">
                  <EditableText value={officer.name} onSave={(val) => updateOfficer(officer.id, { name: val })} />
                </h3>
                <p className="text-[#008751] font-semibold">
                  <EditableText value={officer.role} onSave={(val) => updateOfficer(officer.id, { role: val })} />
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
