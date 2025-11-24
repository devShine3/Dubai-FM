import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatBot from './components/ChatBot';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dubai FM ERP",
  description: "Premium Facility Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <h1 className="text-2xl font-bold tracking-tight text-blue-400">Dubai FM</h1>
              <p className="text-xs text-slate-400 mt-1">Enterprise Edition</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <a href="/" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
                <span>📊</span> <span className="font-medium">Dispatcher Board</span>
              </a>
              <a href="/jobs/new" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all">
                <span>➕</span> <span className="font-medium">New Job</span>
              </a>
              <a href="/invoices" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all">
                <span>💰</span> <span className="font-medium">Invoices</span>
              </a>
              <div className="pt-4 mt-4 border-t border-slate-800">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Apps</p>
                <a href="/technician" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all">
                  <span>📱</span> <span className="font-medium">Technician App</span>
                </a>
                <a href="/portal" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-all">
                  <span>🏠</span> <span className="font-medium">Customer Portal</span>
                </a>
              </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-slate-400">Manager</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto h-screen relative">
            {children}
            <ChatBot />
          </main>
        </div>
      </body>
    </html>
  );
}
