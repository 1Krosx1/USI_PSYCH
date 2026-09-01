import React from "react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";

export default function Footer() {
  const { siteContent } = useData();

  return (
    <footer className="bg-[#FFD100] py-12 border-t border-yellow-500/20 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111827] overflow-hidden">
                {siteContent.logoUrl ? (
                  <img src={siteContent.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <GraduationCap className="h-6 w-6 text-[#008751]" />
                )}
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#111827]">USI APS</span>
            </Link>
            <div className="text-sm text-[#111827]/70 font-medium text-center md:text-left max-w-xs">
              &copy; {new Date().getFullYear()} Association of Psychology Students. All rights reserved.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm font-bold text-[#111827]/80">
            <Link to="/about" className="hover:text-[#008751] transition-colors">About</Link>
            <Link to="/transparency" className="hover:text-[#008751] transition-colors">Transparency</Link>
            <Link to="/shop" className="hover:text-[#008751] transition-colors">Shop</Link>
            <Link to="/events" className="hover:text-[#008751] transition-colors">Events</Link>
            <Link to="/contact" className="hover:text-[#008751] transition-colors">Contact</Link>
            <Link to="/login" className="text-[#008751] hover:text-[#007043] transition-colors ml-4 border-l border-[#111827]/20 pl-4">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
