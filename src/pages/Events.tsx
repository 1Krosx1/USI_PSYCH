import React from "react";
import { Calendar, Bell, MapPin, Clock, Plus, Trash, Image as ImageIcon } from "lucide-react";
import { useData } from "../context/DataContext";
import { EditableText } from "../components/EditableText";
import { ImageUpload } from "../components/ImageUpload";
import { useAuth } from "../context/AuthContext";

export default function Events() {
  const { siteContent, updateSiteContent, events, notices, addEvent, updateEvent, deleteEvent, addNotice, updateNotice, deleteNotice } = useData();
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
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12 w-full text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Events & Announcements
          </h1>
          <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto font-medium">
            Stay updated with the latest activities, seminars, and official notices from the Association of Psychology Students.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 w-full mt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calendar className="mr-2 h-6 w-6 text-[#008751]" />
                Upcoming Events
              </h2>
              {isAdmin && (
                <button 
                  onClick={() => addEvent({ title: "New Event", date: "Date", location: "Location", description: "Description", type: "Event" })}
                  className="flex items-center bg-[#008751] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#007043]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </div>
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 relative group">
                  {isAdmin && (
                    <button onClick={() => deleteEvent(event.id)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash className="w-4 h-4" />
                    </button>
                  )}
                  
                  <div className="flex-shrink-0 w-32 h-32 bg-[#FFD100]/20 rounded-xl flex flex-col items-center justify-center text-center p-2 border border-[#FFD100]/50 overflow-hidden">
                    <span className="text-sm font-semibold text-gray-600 uppercase">
                      <EditableText value={event.date} onSave={(val) => updateEvent(event.id, { date: val })} />
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2 pr-6">
                      <h3 className="text-xl font-bold text-gray-900">
                        <EditableText value={event.title} onSave={(val) => updateEvent(event.id, { title: val })} />
                      </h3>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                        <EditableText value={event.type} onSave={(val) => updateEvent(event.id, { type: val })} />
                      </span>
                    </div>
                    <div className="text-gray-600 mb-4 text-sm whitespace-pre-line">
                      <EditableText value={event.description} onSave={(val) => updateEvent(event.id, { description: val })} multiline />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#008751]" />
                        <EditableText value={event.location} onSave={(val) => updateEvent(event.id, { location: val })} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notice Board */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="mr-2 h-6 w-6 text-[#008751]" />
                Notice Board
              </h2>
              {isAdmin && (
                <button 
                  onClick={() => addNotice({ title: "New Notice", date: "Date", priority: "Normal", content: "Content" })}
                  className="flex items-center bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              )}
            </div>
            <div className="bg-[#FFD100] rounded-3xl p-1 shadow-sm">
              <div className="bg-white rounded-[22px] p-6 h-full">
                <div className="space-y-6">
                  {notices.map((notice) => (
                    <div key={notice.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 relative group">
                      {isAdmin && (
                        <button onClick={() => deleteNotice(notice.id)} className="absolute top-0 right-0 p-1 bg-red-100 text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash className="w-3 h-3" />
                        </button>
                      )}
                      <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
                        <EditableText value={notice.date} onSave={(val) => updateNotice(notice.id, { date: val })} />
                      </span>
                      <h4 className="text-lg font-bold text-gray-900 mt-1 mb-2 pr-6">
                        <EditableText value={notice.title} onSave={(val) => updateNotice(notice.id, { title: val })} />
                      </h4>
                      <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        <EditableText value={notice.content} onSave={(val) => updateNotice(notice.id, { content: val })} multiline />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
