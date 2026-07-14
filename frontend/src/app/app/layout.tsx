"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import {
  GraduationCap, LayoutDashboard, MessageSquare, BookOpen,
  Settings, LogOut, CreditCard, ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/app", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/app/chat", icon: MessageSquare, label: "New Curriculum" },
  { href: "/app/curricula", icon: BookOpen, label: "My Curricula" },
  { href: "/app/settings", icon: Settings, label: "Settings" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card/30 flex flex-col flex-shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <Link href="/app" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap size={15} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-sm">CurriculumOS</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <p className="text-[10px] uppercase tracking-wide text-primary font-semibold">{user.plan}</p>
          </div>
          <Link href="/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
            <CreditCard size={16} /> Upgrade
          </Link>
          <button onClick={() => { localStorage.removeItem("curriculumos_token"); window.location.href = "/"; }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap size={15} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-sm">CurriculumOS</span>
        </Link>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/app" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`p-2 rounded-lg ${active ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <item.icon size={16} />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
