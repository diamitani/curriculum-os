"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { BookOpen, MessageSquare, Plus, ArrowRight, Clock, GraduationCap } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
        <p className="text-muted-foreground mt-1">Your learning dashboard</p>
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link href="/app/chat" className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Plus size={20} className="text-primary" />
          </div>
          <h3 className="font-semibold mb-1">Create New Curriculum</h3>
          <p className="text-sm text-muted-foreground">Tell the AI what you want to learn</p>
        </Link>
        <Link href="/app/curricula" className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
            <BookOpen size={20} className="text-emerald-400" />
          </div>
          <h3 className="font-semibold mb-1">View Saved Curricula</h3>
          <p className="text-sm text-muted-foreground">Continue where you left off</p>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Curricula</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{user?.plan === "free" ? "3" : "∞"}</p>
          <p className="text-xs text-muted-foreground">Remaining</p>
        </div>
      </div>

      {/* Recent curricula (placeholder) */}
      <div>
        <h2 className="font-semibold mb-4">Recent Curricula</h2>
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">No curricula yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Create your first curriculum and start learning something new today.
          </p>
          <Link href="/app/chat" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
            <MessageSquare size={16} /> Create Your First Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
