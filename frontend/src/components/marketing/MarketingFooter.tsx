import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <div className="space-y-2">
              <Link href="/features" className="block text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
              <Link href="/how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">How It Works</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground">About</Link>
              <a href="https://github.com/diamitani/curriculum-os" target="_blank" rel="noopener" className="block text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <div className="space-y-2">
              <span className="block text-sm text-muted-foreground">Privacy Policy</span>
              <span className="block text-sm text-muted-foreground">Terms of Service</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">CurriculumOS</h4>
            <p className="text-sm text-muted-foreground">
              AI-powered personalized learning paths. Research, index, and generate curricula for anything you want to learn.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CurriculumOS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
