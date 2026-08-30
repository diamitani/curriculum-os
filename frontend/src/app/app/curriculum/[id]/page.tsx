import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { VideoAssetPanel } from "@/components/dashboard/VideoAssetPanel";

export const dynamic = "force-dynamic";

export default async function CurriculumDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch the Curriculum
  const { data: curriculum } = await supabase
    .from("curricula")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!curriculum || curriculum.author_id !== user.id) {
    notFound();
  }

  // Fetch the Modules
  const { data: modules } = await supabase
    .from("modules")
    .select("*")
    .eq("curriculum_id", params.id)
    .order("order_index", { ascending: true });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/app/curricula" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to My Courses
      </Link>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">{curriculum.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Generated on {new Date(curriculum.created_at).toLocaleDateString()} • {modules?.length || 0} Modules
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-secondary text-foreground px-4 py-2 rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Download size={16} /> Export LMS
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Curriculum Overview</h3>
            <p className="text-sm text-muted-foreground mb-6">{curriculum.description}</p>
            
            <div className="space-y-4">
              {(!modules || modules.length === 0) ? (
                <p className="text-sm text-muted-foreground italic">No modules generated yet.</p>
              ) : (
                modules.map((mod, index) => (
                  <div key={mod.id} className="p-4 border border-border/50 rounded-xl bg-secondary/10">
                    <h4 className="font-medium text-sm mb-1">Module {index + 1}: {mod.title}</h4>
                    <p className="text-xs text-muted-foreground">Estimated duration: {mod.estimated_duration_mins} mins</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <VideoAssetPanel curriculumId={params.id} />
        </div>
      </div>
    </div>
  );
}
