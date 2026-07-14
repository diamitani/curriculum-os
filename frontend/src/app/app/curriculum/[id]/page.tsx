"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CurriculumDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/app/curricula" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft size={14} /> Back to curricula
      </Link>
      <div className="bg-card border border-border rounded-2xl p-12 text-center">
        <h2 className="font-semibold mb-2">Curriculum #{id}</h2>
        <p className="text-sm text-muted-foreground">Full curriculum details will load here when connected to the backend.</p>
      </div>
    </div>
  );
}
