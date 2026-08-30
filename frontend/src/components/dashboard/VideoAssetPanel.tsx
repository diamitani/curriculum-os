"use client";

import { Video, Download, Play, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function VideoAssetPanel({ curriculumId, initialStatus = "idle" }: { curriculumId: string, initialStatus?: "idle" | "generating" | "complete" }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoStatus, setVideoStatus] = useState(initialStatus);

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    setVideoStatus("generating");
    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curriculumId: curriculumId,
          content: "Generating video payload"
        })
      });
      if (res.ok) {
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
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
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
  );
}
