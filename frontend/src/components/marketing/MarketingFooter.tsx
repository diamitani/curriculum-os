"use client";

import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="ap-foot">
      <div className="ap-foot__grid">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded">
              A
            </div>
            <span className="font-sans font-bold text-lg tracking-tight">ARTISPRENEUR</span>
          </div>
          <p className="ap-foot__brand-line">The music business operating system for independent artists.</p>
          <p className="font-mono text-[10px] text-[var(--ap-gold)] mt-3 uppercase tracking-widest">
            Art Means Business.
          </p>
        </div>
        <div>
          <div className="ap-foot__col-title">Platform</div>
          <Link href="/platform" className="ap-foot__link">The Agent</Link>
          <Link href="/platform" className="ap-foot__link">Directory</Link>
          <Link href="/platform" className="ap-foot__link">Academy</Link>
          <Link href="/platform" className="ap-foot__link">EPKs</Link>
        </div>
        <div>
          <div className="ap-foot__col-title">Use Cases</div>
          <Link href="/use-cases" className="ap-foot__link">Make it official</Link>
          <Link href="/use-cases" className="ap-foot__link">Get booked</Link>
          <Link href="/use-cases" className="ap-foot__link">Look the part</Link>
        </div>
        <div>
          <div className="ap-foot__col-title">Company</div>
          <Link href="/pricing" className="ap-foot__link">Pricing</Link>
          <Link href="#" className="ap-foot__link">About Us</Link>
          <Link href="#" className="ap-foot__link">Contact</Link>
        </div>
      </div>
      
      <div className="ap-foot__bar">
        <div>&copy; {year} ARTISPRENEUR. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4">
          <Link href="#" className="text-white hover:text-[var(--ap-gold)] transition-colors"><Twitter size={16} /></Link>
          <Link href="#" className="text-white hover:text-[var(--ap-gold)] transition-colors"><Instagram size={16} /></Link>
        </div>
        <span className="ap-foot__status">ALL SYSTEMS OPERATIONAL</span>
      </div>
    </footer>
  );
}
