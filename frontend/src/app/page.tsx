"use client";

import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function LandingPage() {
  return (
    <>
      <MarketingHeader />

      <main>
        {/* HERO SECTION */}
        <section className="ap-hero ap-hero--media">
          <div className="ap-hero__bg">
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
              alt="Studio background" 
              className="ap-hero__bg-img" 
            />
            <div className="ap-hero__overlay"></div>
          </div>
          <div className="ap-hero__rings"></div>

          <div className="ap-hero__content fade-up">
            <div className="ap-eyebrow !text-[var(--ap-gold)]">New Release</div>
            <h1 className="ap-hero__headline">
              Your Music Career is a
              <em>Business.</em>
            </h1>
            <p className="ap-hero__sub">
              The world's first agentic platform for independent musicians. Register your business, claim your royalties, and manage your entire career from one workspace.
            </p>

            <form 
              className="hero-form fade-up fade-up-1 flex max-w-[480px] gap-3 bg-white/5 p-[8px_8px_8px_24px] rounded-full border border-white/15" 
              onSubmit={(e) => e.preventDefault()}
            >
              <input 
                type="email" 
                placeholder="Enter your email..." 
                required 
                className="bg-transparent border-none outline-none text-white flex-1 font-sans placeholder:text-white/50"
              />
              <button type="submit" className="ap-btn ap-btn--primary">
                <span className="relative z-[2]">Run it like one</span>
                <div className="ap-btn__bg"></div>
              </button>
            </form>

            <div className="ap-hero__trust fade-up fade-up-2">
              <span>7 AI Managers</span>
              <span>78K+ Industry Contacts</span>
              <span>100% Rights Ownership</span>
            </div>
          </div>

          <div className="ap-hero__watermark">ARTISPRENEUR</div>
        </section>

        {/* TICKER */}
        <div className="ap-ticker">
          <div className="ap-ticker__track">
            <div className="ap-ticker__row">
              <span>THE MUSIC BUSINESS OS</span>
              <span>✦</span>
              <span>FOR INDEPENDENT ARTISTS</span>
              <span>✦</span>
              <span>REGISTER YOUR BUSINESS</span>
              <span>✦</span>
              <span>CLAIM YOUR ROYALTIES</span>
              <span>✦</span>
              <span>MANAGE YOUR CAREER</span>
              <span>✦</span>
              <span>NO LABEL REQUIRED</span>
              <span>✦</span>
            </div>
            <div className="ap-ticker__row" aria-hidden="true">
              <span>THE MUSIC BUSINESS OS</span>
              <span>✦</span>
              <span>FOR INDEPENDENT ARTISTS</span>
              <span>✦</span>
              <span>REGISTER YOUR BUSINESS</span>
              <span>✦</span>
              <span>CLAIM YOUR ROYALTIES</span>
              <span>✦</span>
              <span>MANAGE YOUR CAREER</span>
              <span>✦</span>
              <span>NO LABEL REQUIRED</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <section className="ap-section ap-section--cream">
          <div className="ap-grid-bg"></div>
          <div className="ap-section__inner">
            
            <div className="ap-section__head fade-up">
              <div className="ap-eyebrow !text-[var(--ap-accent)]">Why It Matters</div>
              <h2 className="ap-section__title">
                The industry profits from what you <em>don't know.</em>
              </h2>
              <p className="mt-6 text-[18px] text-[var(--ap-mute)] max-w-[640px] leading-relaxed">
                Every artist is an entrepreneur — but most were never taught the business. Unclaimed royalties, predatory contracts, and missing paperwork cost independent artists billions every year.
              </p>
            </div>

            <div className="ap-cards fade-up fade-up-1">
              <div className="ap-card">
                <div className="ap-card__tag !text-[var(--ap-accent)] mb-3">01 — ROYALTIES</div>
                <h3 className="ap-card__title">Money is being left on the table.</h3>
                <p className="ap-card__desc">
                  Without PRO registration and proper metadata, your streams, radio plays, and sync placements generate royalties you never see. Registration is step one of getting paid.
                </p>
              </div>
              <div className="ap-card">
                <div className="ap-card__tag !text-[var(--ap-accent)] mb-3">02 — EDUCATION</div>
                <h3 className="ap-card__title">Nobody teaches the business of music.</h3>
                <p className="ap-card__desc">
                  Publishing, splits, licensing, taxes — the knowledge gap is where careers stall. The Academy turns industry fine print into skills you actually use.
                </p>
              </div>
              <div className="ap-card">
                <div className="ap-card__tag !text-[var(--ap-accent)] mb-3">03 — CONTRACTS</div>
                <h3 className="ap-card__title">One bad signature can cost your masters.</h3>
                <p className="ap-card__desc">
                  Handshake deals and unread contracts end careers. Generate, review, and understand every agreement before you sign — with AI reading the fine print.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA BANNER */}
        <section className="ap-section ap-section--dark text-center">
          <div className="ap-section__inner fade-up flex flex-col items-center">
            <div className="ap-eyebrow !text-[var(--ap-gold)] mb-4">Get Started Today</div>
            <h2 className="ap-section__title mb-6 max-w-[800px]">
              Your music career is a<br/><em>business.</em> Run it like one.
            </h2>
            <p className="text-white/60 max-w-[540px] mb-10 leading-relaxed text-lg">
              Get an independent artist profile and guided legal business registration with an Artispreneur account today.
            </p>

            <Link href="/pricing" className="ap-btn ap-btn--gold text-base px-8 py-4">
              <span className="relative z-[2]">Create Free Account</span>
              <div className="ap-btn__bg"></div>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
