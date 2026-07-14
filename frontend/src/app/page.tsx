import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import {
  GraduationCap, Brain, Search, BookOpen, Zap, Target,
  ArrowRight, Star, CheckCircle, Clock, Sparkles
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Research", desc: "Our agents scour the web for the best learning resources — videos, courses, papers, and tutorials — ranked by credibility." },
  { icon: Search, title: "Smart Indexing", desc: "Every resource is classified by difficulty, format, and source tier. No more guessing which tutorial to start with." },
  { icon: BookOpen, title: "Personalized Curricula", desc: "Tell us what you want to learn, your level, and your goals. We generate a step-by-step learning path just for you." },
  { icon: Target, title: "Gap Detection", desc: "Our engine finds missing prerequisite knowledge and generates custom bridging content so you never hit a wall." },
  { icon: Zap, title: "Instant Generation", desc: "From intent to curriculum in seconds. Start learning immediately with a structured plan." },
  { icon: Clock, title: "Save & Track", desc: "Save your curricula, track progress, and pick up where you left off. Your learning hub, always available." },
];

const tiers = [
  { name: "Free", price: "$0", period: "forever", desc: "Try it out", features: ["3 curricula / month", "Basic resource search", "Standard lesson plans", "Web access"], cta: "Get Started", href: "/signup", featured: false },
  { name: "Pro", price: "$19", period: "/month", desc: "Serious learners", features: ["Unlimited curricula", "Advanced AI research", "Custom content generation", "Save & track progress", "Priority support", "Export to PDF/Markdown"], cta: "Start Pro", href: "/signup?plan=pro", featured: true },
  { name: "Team", price: "$49", period: "/month", desc: "Organizations", features: ["Everything in Pro", "Team dashboards", "Shared curricula", "Admin controls", "API access", "SSO"], cta: "Contact Sales", href: "/signup?plan=team", featured: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Sparkles size={14} />
            AI-Powered Learning Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Learn anything with an{" "}
            <span className="text-primary">AI curriculum architect</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us what you want to learn. Our AI researches the web, builds a structured index, and generates a personalized learning path — complete with lessons, exercises, and milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start Learning Free <ArrowRight size={20} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/50 transition-colors"
            >
              See How It Works
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required • 3 free curricula per month
          </p>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="border-y border-border/50 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
            <span className="ml-1 font-medium text-foreground">4.9/5</span> from 2,400+ learners
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-emerald-400" />
            <span className="font-medium text-foreground">12,000+</span> curricula generated
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap size={14} className="text-primary" />
            <span className="font-medium text-foreground">800+</span> topics covered
          </div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="py-24 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your personal AI learning architect
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powered by the ROSTR multi-agent framework — four specialized AI agents working together to build the perfect curriculum.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-4 bg-card/20" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <div key={t.name} className={`bg-card border rounded-2xl p-8 relative ${t.featured ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}>
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{t.price}</span>
                  <span className="text-muted-foreground">{t.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {t.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={t.href}
                  className={`block text-center py-2.5 rounded-xl font-medium text-sm transition-colors ${t.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border hover:bg-secondary/50"}`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Tell our AI what you want to learn and get a personalized curriculum in seconds.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Create Your First Curriculum <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
