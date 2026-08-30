"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap, Brain, Search, BookOpen, Zap, Target,
  ArrowRight, Star, CheckCircle, Clock, Sparkles, Layers, Activity, Users, DollarSign, ShieldCheck
} from "lucide-react";
import { useRef, useState } from "react";

const bentoFeatures = [
  { 
    title: "Anti-Hallucination Engine", 
    desc: "Built on our proprietary RAG DAL framework. We crawl verified, Tier-1 sources to construct factually pristine courses. Zero hallucinations.",
    icon: ShieldCheck,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.1
  },
  { 
    title: "Audience Personalization", 
    desc: "Dynamically tailor the course pacing and tone to your specific users' goals, skill sets, and industry.",
    icon: Users,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    colSpan: "col-span-1",
    delay: 0.2
  },
  { 
    title: "Export & Monetize", 
    desc: "Instantly export massive generated curriculums into sellable assets (PDF, Markdown, or LMS formats).",
    icon: DollarSign,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    colSpan: "col-span-1",
    delay: 0.3
  },
  { 
    title: "Multi-Agent Orchestration", 
    desc: "Our autonomous agents handle the cognitive load of curriculum design—structuring prerequisites and bridging knowledge gaps automatically.",
    icon: Layers,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.4
  }
];

const tiers = [
  { name: "Learner / Starter", price: "$0", period: "forever", desc: "For new learners or creators building their first course.", features: ["3 AI course generations / month", "Standard source verification", "Markdown exports", "Community support"], cta: "Get Started Free", href: "/signup", featured: false },
  { name: "Pro Creator", price: "$49", period: "/month", desc: "For serious content creators and sales trainers.", features: ["Unlimited course generation", "GPT-4o & Claude 3.5 access", "Advanced Anti-Hallucination RAG", "Export to LMS / PDF", "Priority support"], cta: "Upgrade to Pro", href: "/signup?plan=pro", featured: true },
  { name: "Agency", price: "$199", period: "/month", desc: "For training organizations and agencies.", features: ["Everything in Pro", "White-label exports", "Team collaboration (up to 5)", "Custom knowledge base ingestion", "API access"], cta: "Contact Sales", href: "/signup?plan=team", featured: false },
];

export default function LandingPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    // Save prompt to session storage to persist across auth redirect
    sessionStorage.setItem("pendingPrompt", prompt);
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans">
      <MarketingHeader />

      {/* ── Dynamic Hero Section ── */}
      <section ref={heroRef} className="relative pt-32 pb-32 px-4 flex items-center justify-center min-h-[90vh]">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none opacity-40" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none opacity-30" />
        
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-5xl mx-auto text-center w-full"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-8 text-primary shadow-sm border border-border/50"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-foreground/80">The Unified OS for Learners & Creators</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6 text-foreground"
          >
            Build and sell courses with <br className="hidden md:block" />
            <span className="text-gradient-primary">Verified AI Knowledge</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            For content creators and sales trainers. Deploy an autonomous AI architect to build custom curriculums tailored to your audience's goals. No hallucinations, just education.
          </motion.p>
          
          {/* ── Hero Chat Input ── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <form 
              onSubmit={handleHeroSubmit}
              className="relative flex items-center w-full bg-white shadow-2xl shadow-indigo-500/10 rounded-2xl border border-border/80 p-2 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50"
            >
              <Search className="absolute left-4 text-muted-foreground" size={20} />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What course do you want to build today?"
                className="w-full bg-transparent border-none focus:outline-none pl-12 pr-32 py-4 text-base md:text-lg font-medium text-foreground placeholder:text-muted-foreground/60"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-foreground text-background px-6 rounded-xl font-semibold flex items-center gap-2 hover:bg-foreground/90 transition-transform active:scale-95"
              >
                Generate <ArrowRight size={16} />
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
              <CheckCircle size={12} className="text-emerald-500" />
              BYOK supported. Connect your own OpenAI/Anthropic keys inside.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Social Proof Marquee ── */}
      <section className="border-y border-border bg-secondary/30 py-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">Trusted by top 1% content creators and trainers</p>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Activity size={24}/> CreatorCamp</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Zap size={24}/> SalesFlow</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Brain size={24}/> ExpertInstitute</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Users size={24}/> Mastery Inc.</div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section className="py-32 px-4 relative" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">
              A premium engine for <span className="text-muted-foreground">serious creators.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Built on the ROSTR framework, our agents handle the cognitive load of curriculum design so you can focus on building your audience and selling your expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((f, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: f.delay }}
                key={f.title} 
                className={`bg-white rounded-3xl p-8 relative overflow-hidden group hover:border-primary/30 transition-colors shadow-sm border border-border/80 ${f.colSpan}`}
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${f.color} group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold font-display mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{f.desc}</p>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-500">
                  <f.icon size={160} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-32 px-4 bg-secondary/20 relative" id="pricing">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">Invest in your business.</h2>
            <p className="text-xl text-muted-foreground font-light">Simple pricing that scales with your sales volume.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {tiers.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={t.name} 
                className={`bg-white rounded-3xl p-8 relative transition-all duration-300 ${t.featured ? "border-2 border-primary shadow-2xl shadow-primary/20 md:-translate-y-4 md:scale-105 z-10" : "border border-border/80 hover:border-border"}`}
              >
                {t.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="font-semibold text-xl mb-2 text-foreground">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 h-10">{t.desc}</p>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-display tracking-tight text-foreground">{t.price}</span>
                  <span className="text-muted-foreground font-medium">{t.period}</span>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-foreground/80">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={t.href}
                  className={`block text-center py-4 rounded-xl font-bold text-sm transition-all duration-300 ${t.featured ? "bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/10" : "bg-secondary/50 hover:bg-secondary"}`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
