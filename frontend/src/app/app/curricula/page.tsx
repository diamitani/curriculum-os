import Link from "next/link";
import { BookOpen, Plus, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CurriculaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: curricula } = await supabase
    .from("curricula")
    .select("*")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

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

      {(!curricula || curricula.length === 0) ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">No saved curricula</h3>
          <p className="text-sm text-muted-foreground mb-6">Curricula you generate and save will appear here.</p>
          <Link href="/app/chat" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus size={16} /> Generate Your First Curriculum
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {curricula.map((course) => (
            <Link key={course.id} href={`/app/curriculum/${course.id}`} className="block bg-card border border-border hover:border-primary/50 transition-colors rounded-2xl p-6 shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description || "No description provided."}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock size={14}/> {new Date(course.updated_at).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-md capitalize font-medium ${course.status === 'published' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                  {course.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
