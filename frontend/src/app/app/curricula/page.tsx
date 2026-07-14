"use client";

import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";

export default function CurriculaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Curricula</h1>
          <p className="text-muted-foreground mt-1">Your saved learning paths</p>
        </div>
        <Link href="/app/chat" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> New
        </Link>
      </div>
      <div className="bg-card border border-border rounded-2xl p-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
          <BookOpen size={24} className="text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-2">No saved curricula</h3>
        <p className="text-sm text-muted-foreground mb-6">Curricula you generate and save will appear here.</p>
        <Link href="/app/chat" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Generate Your First Curriculum
        </Link>
      </div>
    </div>
  );
}
