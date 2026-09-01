import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { EditableText } from "../EditableText";
import { ImageUpload } from "../ImageUpload";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { siteContent, updateSiteContent } = useData();
  const isAdmin = user?.role === "admin";

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Transparency", path: "/transparency" },
    { name: "Shop", path: "/shop" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-[#FFD100] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-[#111827] shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
            {siteContent.logoUrl ? (
              <img src={siteContent.logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-[#008751]" />
            )}
            {isAdmin && (
               <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity z-10 text-white cursor-pointer" onClick={(e) => e.preventDefault()}>
                 <ImageUpload onUpload={(val) => updateSiteContent({ logoUrl: val })} iconOnly />
               </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#111827] leading-none">USI APS</span>
            <span className="text-[10px] sm:text-xs font-semibold text-[#111827]/70 mt-1 hidden sm:block">Association of Psychology Students</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                location.pathname === link.path
                  ? "bg-white/90 text-[#008751] shadow-sm"
                  : "text-[#111827] hover:bg-white/50"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <button
              onClick={logout}
              className="hidden md:flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-transform hover:scale-105 shadow-md"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Edit Mode
            </button>
          ) : (
            <Link
              to="/shop"
              className="hidden md:flex items-center rounded-full bg-[#008751] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#007043] transition-transform hover:scale-105 shadow-md"
            >
              Order Merch
            </Link>
          )}
          <button
            className="md:hidden p-2 text-[#111827] hover:bg-white/50 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FFD100] border-t border-yellow-500/20 px-4 py-4 space-y-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-bold transition-colors",
                location.pathname === link.path
                  ? "bg-white text-[#008751] shadow-sm"
                  : "text-[#111827] hover:bg-white/50"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin ? (
             <button
               onClick={() => {
                 logout();
                 setIsMobileMenuOpen(false);
               }}
               className="w-full flex items-center justify-center mt-4 rounded-xl bg-red-600 px-4 py-3 text-base font-bold text-white hover:bg-red-700 shadow-sm"
             >
               <LogOut className="w-5 h-5 mr-2" />
               Exit Edit Mode
             </button>
          ) : (
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 text-center rounded-xl bg-[#008751] px-4 py-3 text-base font-bold text-white hover:bg-[#007043] shadow-sm"
            >
              Order Merch
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
