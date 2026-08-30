"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Video, Download, Play, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CurriculumDetailPage() {
  const { id } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoStatus, setVideoStatus] = useState<"idle" | "generating" | "complete">("idle");

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setVideoStatus("generating");
    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curriculumId: id,
          content: "Module 1: Introduction to Advanced Concepts" // Mock content
        })
      });
      if (res.ok) {
        // Mock a 5 second rendering time for UI purposes
        setTimeout(() => {
          setVideoStatus("complete");
          setIsGenerating(false);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/app/curricula" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to My Courses
      </Link>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">Advanced Sales Mastery</h1>
          <p className="text-muted-foreground mt-1 text-sm">Generated on Aug 29, 2026 • 12 Modules</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-secondary text-foreground px-4 py-2 rounded-xl font-medium text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Download size={16} /> Export LMS
          </button>
          
          <button 
            onClick={handleGenerateVideo}
            disabled={isGenerating || videoStatus === "complete"}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
          >
            {isGenerating ? (
              <><Loader2 size={16} className="animate-spin" /> Rendering MP4...</>
            ) : videoStatus === "complete" ? (
              <><CheckCircle2 size={16} /> Video Ready</>
            ) : (
              <><Video size={16} /> Generate Video Asset</>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Curriculum Overview</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((mod) => (
                <div key={mod} className="p-4 border border-border/50 rounded-xl bg-secondary/10">
                  <h4 className="font-medium text-sm mb-1">Module {mod}: Foundational Principles</h4>
                  <p className="text-xs text-muted-foreground">Estimated reading time: 15 mins</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Video Asset Panel */}
          <div className="bg-gradient-to-b from-indigo-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Video size={100} className="rotate-12" />
            </div>
            
            <h3 className="font-semibold text-lg mb-2 relative z-10">Programmatic Video</h3>
            <p className="text-indigo-200 text-sm mb-6 relative z-10">
              Turn this curriculum into a branded, fully narrated 1080p MP4. Powered by Monarch Engine.
            </p>

            {videoStatus === "idle" && (
              <div className="w-full aspect-video bg-black/40 rounded-xl border border-white/10 flex items-center justify-center relative z-10">
                <span className="text-xs font-medium text-indigo-300">No video generated yet</span>
              </div>
            )}

            {videoStatus === "generating" && (
              <div className="w-full aspect-video bg-black/40 rounded-xl border border-white/10 flex flex-col items-center justify-center relative z-10 gap-3">
                <Loader2 size={24} className="animate-spin text-indigo-400" />
                <span className="text-xs font-medium text-indigo-300">Intake &rarr; Storyboard &rarr; TTS &rarr; Render</span>
              </div>
            )}

            {videoStatus === "complete" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full aspect-video bg-black rounded-xl border border-indigo-400/30 flex items-center justify-center relative z-10 group cursor-pointer overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all z-10">
                  <Play size={20} fill="white" />
                </div>
              </motion.div>
            )}
            
            {videoStatus === "complete" && (
              <button className="w-full mt-4 bg-white text-indigo-900 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm relative z-10 flex justify-center items-center gap-2">
                <Download size={16} /> Download Final MP4
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
