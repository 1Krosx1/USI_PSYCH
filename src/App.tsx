/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Transparency from "./pages/Transparency";
import Shop from "./pages/Shop";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
// Keeping the admin routes in place if needed in the future
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUpload from "./pages/AdminUpload";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex min-h-screen flex-col font-sans text-gray-900 bg-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Legacy Admin Routes (Kept for architecture stability) */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/upload" element={<AdminUpload />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
