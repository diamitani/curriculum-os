"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, LayoutDashboard, MessageSquare, BookOpen,
  Settings, LogOut, CreditCard, Search, Bell, Sparkles, ChevronDown
} from "lucide-react";

const navItems = [
  { href: "/app", icon: LayoutDashboard, label: "Overview" },
  { href: "/app/chat", icon: MessageSquare, label: "AI Architect" },
  { href: "/app/curricula", icon: BookOpen, label: "My Library" },
  { href: "/app/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: "0.15s" }} />
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex text-foreground font-sans">
      {/* ── Premium Sidebar ── */}
      <aside className="w-64 border-r border-border bg-card/40 backdrop-blur-3xl flex flex-col flex-shrink-0 hidden md:flex sticky top-0 h-screen z-20">
        
        {/* Workspace Switcher */}
        <div className="p-4 border-b border-border/50">
          <button className="w-full flex items-center justify-between bg-secondary/30 hover:bg-secondary/50 border border-border/50 px-3 py-2 rounded-xl transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <GraduationCap size={16} className="text-white" />
              </div>
              <div className="text-left">
                <span className="block font-semibold text-sm leading-none mb-1 text-foreground">CurriculumOS</span>
                <span className="block text-[11px] text-muted-foreground font-medium">{user.plan.toUpperCase()} PLAN</span>
              </div>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Main Menu</p>
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }`}
                >
                  {active && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon size={18} className={`relative z-10 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">Recent Chats</p>
            <div className="space-y-1">
               <Link href="/app/chat" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="truncate">React Architecture</span>
               </Link>
               <Link href="/app/chat" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span className="truncate">Advanced Rust</span>
               </Link>
            </div>
          </div>
        </nav>

        {/* User Profile & Usage */}
        <div className="p-4 border-t border-border/50 bg-secondary/10">
          <div className="bg-card border border-border/60 rounded-xl p-3 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Usage</span>
              <span className="text-xs font-medium text-muted-foreground">3 / 10</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[30%] rounded-full"></div>
            </div>
            <Link href="/pricing" className="mt-3 flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold py-1.5 rounded-lg transition-colors">
              <Sparkles size={12} /> Upgrade Plan
            </Link>
          </div>

          <button onClick={() => { localStorage.removeItem("curriculumos_token"); window.location.href = "/"; }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center">
            <GraduationCap size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm">CurriculumOS</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`p-2 rounded-lg transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                <item.icon size={18} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className={`hidden md:flex items-center justify-between px-8 py-4 sticky top-0 z-10 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm' : 'bg-transparent'}`}>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground capitalize">
              {pathname === "/app" ? "Overview" : pathname.split("/").pop()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 bg-secondary/50 border border-border/50 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/70"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-block bg-background border border-border rounded px-1.5 text-[10px] font-mono text-muted-foreground">⌘</kbd>
                <kbd className="hidden sm:inline-block bg-background border border-border rounded px-1.5 text-[10px] font-mono text-muted-foreground">K</kbd>
              </div>
            </div>
            <button className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs shadow-md border-2 border-background cursor-pointer">
              {user.email?.[0].toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Canvas */}
        <main className="flex-1 overflow-y-auto md:pt-0 pt-16 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  );
}
