'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import AskOjasviChat from '@/components/AskOjasviChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en" className="dark">
      <head>
        <title>Ojasvi | From problem to production</title>
        <meta name="description" content="Founder of StageConnect · AI/ML builder · VIT '27. I find the problem first, then build the AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0a0a0c] text-[#e3e3e3] antialiased selection:bg-blue-500/20 selection:text-white font-sans min-h-screen">
        {/* Subtle Industrial Custom Cursor */}
        <CustomCursor />

        {isLandingPage ? (
          // Layer A: The Depot Landing Yard (with first-load preloader)
          <div className="min-h-screen w-full">
            <Preloader />
            {children}
            <AskOjasviChat />
          </div>
        ) : (
          // Layer B: The Studio (AI Studio dark workspace with left sidebar and top bar)
          <div className="flex min-h-screen">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0">
              <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
            <AskOjasviChat />
          </div>
        )}
      </body>
    </html>
  );
}
