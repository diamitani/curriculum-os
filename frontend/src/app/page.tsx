"use client";

import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap, Brain, Search, BookOpen, Zap, Target,
  ArrowRight, Star, CheckCircle, Clock, Sparkles, Layers, Activity
} from "lucide-react";
import { useRef } from "react";

const bentoFeatures = [
  { 
    title: "Autonomous RAG Engine", 
    desc: "Our agents securely crawl the web for verified knowledge, constructing a credible curriculum in seconds.",
    icon: Search,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.1
  },
  { 
    title: "Contextual Memory", 
    desc: "Never repeat yourself. The AI remembers your pacing, past lessons, and learning style.",
    icon: Brain,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    colSpan: "col-span-1",
    delay: 0.2
  },
  { 
    title: "Micro-learning Generation", 
    desc: "Breaks down massive subjects into 5-minute bite-sized pieces for maximum retention.",
    icon: Zap,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    colSpan: "col-span-1",
    delay: 0.3
  },
  { 
    title: "Curriculum Orchestration", 
    desc: "Multi-agent framework that structures prerequisites, bridges knowledge gaps, and designs exercises.",
    icon: Layers,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    colSpan: "col-span-1 md:col-span-2",
    delay: 0.4
  }
];

const tiers = [
  { name: "Starter", price: "$0", period: "forever", desc: "For casual learners exploring new topics.", features: ["3 AI curricula / month", "Standard generation speed", "Web access", "Community support"], cta: "Get Started Free", href: "/signup", featured: false },
  { name: "Pro", price: "$29", period: "/month", desc: "For serious professionals and students.", features: ["Unlimited curricula generation", "GPT-4o & Claude 3.5 access", "Contextual memory", "Export to PDF/Markdown", "Priority support"], cta: "Upgrade to Pro", href: "/signup?plan=pro", featured: true },
  { name: "Teams", price: "$99", period: "/month", desc: "For organizations training their staff.", features: ["Everything in Pro", "Team collaboration", "Shared knowledge bases", "Admin analytics", "SSO integration"], cta: "Contact Sales", href: "/signup?plan=team", featured: false },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans">
      <MarketingHeader />

      {/* ── Dynamic Hero Section ── */}
      <section ref={heroRef} className="relative pt-32 pb-32 px-4 flex items-center justify-center min-h-[90vh]">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-20" />
        
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm font-medium mb-8 text-primary shadow-sm"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-foreground/80">Introducing CurriculumOS v2.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6 text-foreground"
          >
            Master any subject with <br className="hidden md:block" />
            an <span className="text-gradient-primary">AI Architect</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Stop searching for tutorials. Our multi-agent system crawls the web, structures a personalized curriculum, and guides you step-by-step to mastery.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/signup"
              className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">Start Building Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 glass px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/40 transition-colors"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Social Proof Marquee ── */}
      <section className="border-y border-border bg-card/30 py-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">Trusted by lifelong learners at</p>
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock logos for visual fidelity */}
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Activity size={24}/> Acme Corp</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Zap size={24}/> Vertex</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><Brain size={24}/> Nueralink</div>
            <div className="flex items-center gap-2 font-display font-bold text-xl"><BookOpen size={24}/> EduTech</div>
          </div>
        </div>
      </section>

      {/* ── Bento Grid Features ── */}
      <section className="py-32 px-4 relative" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">
              A premium engine for <span className="text-muted-foreground">serious learners.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Built on the ROSTR framework, our agents handle the cognitive load of curriculum design so you can focus purely on learning.
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
                className={`glass rounded-3xl p-8 relative overflow-hidden group hover:border-primary/30 transition-colors ${f.colSpan}`}
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
      <section className="py-32 px-4 bg-card/20 relative" id="pricing">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 tracking-tight">Invest in your intellect.</h2>
            <p className="text-xl text-muted-foreground font-light">Simple pricing that scales with your ambition.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {tiers.map((t, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={t.name} 
                className={`bg-card rounded-3xl p-8 relative transition-all duration-300 ${t.featured ? "border-2 border-primary shadow-2xl shadow-primary/20 md:-translate-y-4 md:scale-105 z-10" : "border border-border/60 hover:border-border"}`}
              >
                {t.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
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
                  className={`block text-center py-4 rounded-xl font-bold text-sm transition-all duration-300 ${t.featured ? "bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/10" : "glass hover:bg-secondary/50"}`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10 glass rounded-[3rem] p-16 border-white/20 shadow-2xl"
        >
          <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Zap size={32} className="text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-display tracking-tight mb-6 text-foreground">
            Stop searching. Start learning.
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light">
            Deploy an autonomous AI architect to build your personalized curriculum today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
          >
            Create Your First Curriculum <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      <MarketingFooter />
    </div>
  );
}
