"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { BookOpen, MessageSquare, Plus, Sparkles, ArrowRight, Clock, GraduationCap, Zap } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 h-full">
      {/* ── Greeting ── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm max-w-xl">
          Here is what's happening with your learning architecture today. You have <span className="font-semibold text-foreground">3 free AI generations</span> remaining.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* ── Quick Actions (Bento Style) ── */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Link href="/app/chat" className="group relative block bg-card border border-border/60 hover:border-primary/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={64} className="text-primary rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                    <Plus size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">New Curriculum</h3>
                  <p className="text-sm text-muted-foreground mb-4">Prompt the AI architect to design a custom learning path.</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    Start Generation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            >
              <Link href="/app/curricula" className="group relative block bg-card border border-border/60 hover:border-emerald-500/50 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <BookOpen size={64} className="text-emerald-500 -rotate-12" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Saved Library</h3>
                  <p className="text-sm text-muted-foreground mb-4">Access your generated curricula and track your progress.</p>
                  <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
                    View Library <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* ── Recent Activity ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Activity</h2>
              <Link href="/app/curricula" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <div className="bg-card border border-border/60 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5 border border-border/50">
                <GraduationCap size={32} className="text-muted-foreground/60" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No curricula yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                You haven't generated any learning paths yet. Prompt the AI architect to create your first course.
              </p>
              <Link href="/app/chat" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-foreground/90 transition-colors shadow-lg">
                <Sparkles size={16} /> Create Curriculum
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Sidebar Column (Stats) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-6"
        >
          {/* Upgrade Card */}
          {user?.plan === "free" && (
            <div className="bg-gradient-to-br from-indigo-900 to-primary text-white rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-primary/20">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
              <h3 className="font-bold text-lg mb-2 relative z-10 flex items-center gap-2"><Sparkles size={18} className="text-amber-300"/> Upgrade to Pro</h3>
              <p className="text-indigo-100 text-sm mb-5 relative z-10">Get unlimited curricula generation, advanced AI research, and export features.</p>
              <Link href="/pricing" className="block w-full text-center bg-white text-primary px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-50 transition-colors relative z-10">
                View Plans
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-5">At a Glance</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center text-muted-foreground">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-sm font-medium">Total Curricula</span>
                </div>
                <span className="font-bold text-lg">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <GraduationCap size={16} />
                  </div>
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <span className="font-bold text-lg">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Zap size={16} />
                  </div>
                  <span className="text-sm font-medium">AI Tokens</span>
                </div>
                <span className="font-bold text-lg">{user?.plan === "free" ? "3" : "∞"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
