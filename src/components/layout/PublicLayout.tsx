import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { ThreeTickers } from '../common/ThreeTickers';
import { Footer } from '../common/Footer';
import { AiAssistant } from '../common/AiAssistant';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <ThreeTickers />
      <main className="flex-1">
        <Outlet />
      </main>
      <AiAssistant />
      <Footer />
    </div>
  );
};
