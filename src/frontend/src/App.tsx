import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  ChevronDown,
  Clock,
  DollarSign,
  Globe,
  Layout,
  Loader2,
  Menu,
  MessageCircle,
  Palette,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  User,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSubmitContactForm } from "./hooks/useQueries";

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const el of Array.from(els)) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

/* ─── Sticky nav hook ────────────────────────────────────── */
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

/* ─── P1: Reusable premium button primitives ─────────────── */
function PrimaryButton({
  children,
  href,
  className,
  size = "default",
  type,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const sizeClass =
    size === "lg"
      ? "px-8 h-12 text-base"
      : size === "sm"
        ? "px-4 h-8 text-sm"
        : "px-6 h-10 text-sm";

  const inner = (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "btn-primary inline-flex items-center justify-center gap-2 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        sizeClass,
        className,
      )}
    >
      {children}
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}

function GhostButton({
  children,
  href,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "px-8 h-12 text-base"
      : size === "sm"
        ? "px-4 h-8 text-sm"
        : "px-6 h-10 text-sm";

  const inner = (
    <span
      className={cn(
        "btn-ghost-dark inline-flex items-center justify-center gap-2 rounded-lg focus-visible:outline-none",
        sizeClass,
        className,
      )}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}

/* ─── Nav ────────────────────────────────────────────────── */
const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/96 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)] border-b border-black/[0.06]"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-blue-accent flex items-center justify-center shadow-[0_2px_8px_oklch(0.59_0.2_264/0.4)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {/* P0 FIX: tighter tracking, slightly smaller so it doesn't compete with headings */}
          <span
            className={cn(
              "font-display text-[1.15rem] font-black tracking-[-0.04em]",
              scrolled ? "text-navy" : "text-white",
            )}
          >
            AKG <span className="text-blue-accent">DIGITAL</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "text-[0.8125rem] font-medium tracking-wide transition-colors duration-200",
                  scrolled
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-white/60 hover:text-white",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — P1 premium button */}
        <PrimaryButton
          href="#contact"
          size="sm"
          className="hidden lg:inline-flex"
        >
          Get My Website
          <ArrowRight className="w-3.5 h-3.5" />
        </PrimaryButton>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={cn(
            "lg:hidden p-2 rounded-md transition-colors",
            scrolled
              ? "text-navy hover:bg-black/10"
              : "text-white hover:bg-white/10",
          )}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className={cn(
            "lg:hidden backdrop-blur-lg border-t px-6 pb-6",
            scrolled
              ? "bg-white/98 border-black/[0.06]"
              : "bg-navy/98 border-white/[0.06]",
          )}
        >
          <ul className="flex flex-col gap-0.5 pt-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-2.5 text-[0.9375rem] font-medium transition-colors",
                    scrolled
                      ? "text-charcoal/75 hover:text-charcoal"
                      : "text-white/75 hover:text-white",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              type="button"
              className="btn-primary w-full inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-6 h-11 text-sm"
              onClick={() => {
                setOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get My Website
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    // P2 FIX: angled bottom clip creates a flowing transition into the next section
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy clip-bottom-angle"
    >
      {/* Background image + overlays */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-navy/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/90" />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* P2 FIX: right-side atmospheric glow orb */}
      <div
        className="absolute right-[-10%] top-[15%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center pt-32 pb-24">
        {/* Delivery badge */}
        <div className="inline-flex items-center gap-2 bg-blue-accent/[0.13] border border-blue-accent/30 rounded-full px-4 py-1.5 mb-10 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-accent animate-pulse-slow" />
          <span className="text-blue-light text-[0.75rem] font-bold tracking-[0.08em] uppercase">
            48–72hr Delivery
          </span>
          <Clock className="w-3 h-3 text-blue-light opacity-80" />
        </div>

        {/* P0 FIX: fluid hero headline, tighter tracking */}
        <h1 className="hero-headline font-display font-black text-white mb-6 animate-fade-up">
          Professional Websites{" "}
          <span className="text-blue-accent">Delivered in Days,</span> Not
          Weeks.
        </h1>

        {/* P0 FIX: subheadline is clearly subordinate — smaller, lower weight, more opacity */}
        <p className="text-white/60 text-[1.0625rem] sm:text-lg max-w-[540px] mx-auto leading-[1.7] mb-11 animate-fade-up font-normal tracking-[0.005em]">
          We build fast, modern, high-converting websites for growing
          businesses.
        </p>

        {/* P1 FIX: premium button pair */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 animate-fade-up">
          <PrimaryButton href="#contact" size="lg">
            Get My Website
            <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
          <GhostButton href="#services" size="lg">
            View Our Work
          </GhostButton>
        </div>

        {/* Stats row — P0 FIX: clearer label size differentiation */}
        <div className="flex flex-wrap items-center justify-center gap-10 mt-16 pt-10 border-t border-white/[0.07]">
          {[
            { val: "48–72hr", label: "Avg. Delivery" },
            { val: "100%", label: "Client Satisfaction" },
            { val: "50+", label: "Projects Delivered" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              {/* P0: stat value is visually dominant, label clearly subordinate */}
              <div className="font-display text-[1.75rem] font-black text-white tracking-[-0.03em]">
                {val}
              </div>
              <div className="text-white/40 text-[0.75rem] font-semibold tracking-[0.08em] uppercase mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trust"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors"
      >
        <span className="text-[0.625rem] tracking-[0.15em] uppercase font-semibold">
          Scroll
        </span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
}

/* ─── Trust Section ──────────────────────────────────────── */
function TrustSection() {
  const logos = ["TechStartup", "LocalBiz", "BrandCo", "Studio X", "Growthly"];

  return (
    // P2 FIX: no clip here — receives the angled top from hero's clip-bottom-angle
    <section id="trust" className="bg-surface-soft py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo row */}
        <div className="reveal text-center mb-14">
          {/* P0 FIX: true eyebrow class, not a bold paragraph */}
          <span className="eyebrow">Trusted by Growing Businesses</span>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {logos.map((name) => (
              <div
                key={name}
                className="bg-white/80 border border-border/60 rounded-full px-5 py-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
              >
                <span className="font-display font-bold text-[0.8125rem] text-charcoal/45 tracking-[0.04em]">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground text-[0.9375rem] max-w-lg mx-auto leading-[1.7]">
            From startups to established local businesses — we build websites
            that work.
          </p>
        </div>

        {/* Founder card — P2 FIX: richer shadow depth, ring detail */}
        <div className="reveal reveal-delay-2 bg-white border border-border/50 rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.04),_0_16px_48px_rgba(0,0,0,0.07)] p-8 md:p-10 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            {/* P2 FIX: double ring treatment — outer glow + inner ring */}
            <div className="relative w-24 h-24 md:w-[116px] md:h-[116px]">
              <div className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-blue-accent/60 to-blue-accent/10 blur-[2px]" />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white/80">
                <img
                  src="/assets/generated/founder-avatar.dim_400x400.png"
                  alt="Advik Kumar Gupta"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1.5 mb-2 justify-center md:justify-start">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-accent" />
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                Meet the Founder
              </span>
            </div>
            {/* P0 FIX: founder name is section-level h3, clearly dominant */}
            <h3 className="font-display text-[1.625rem] font-black text-navy tracking-[-0.03em] leading-tight mb-0.5">
              Advik Kumar Gupta
            </h3>
            <p className="text-[0.8125rem] font-semibold text-muted-foreground mb-4 tracking-wide">
              Founder & Lead Developer, AKG DIGITAL
            </p>
            <p className="text-charcoal/65 leading-[1.75] text-[0.9375rem]">
              I personally handle every project from strategy to launch — no
              middlemen, no delays. Just clean, fast websites that help your
              business grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ───────────────────────────────────── */
const services = [
  {
    icon: Globe,
    title: "Business Website",
    desc: "A complete, professional site that represents your brand and converts visitors into customers.",
  },
  {
    icon: Layout,
    title: "Landing Pages",
    desc: "High-converting single-page designs built to capture leads and drive action.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Sites",
    desc: "Showcase your work with a clean, modern portfolio that leaves an impression.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    desc: "Modernize your outdated site with a fresh design that reflects your current brand.",
  },
  {
    icon: Wrench,
    title: "Website Maintenance",
    desc: "Keep your site fast, secure, and up-to-date with ongoing support.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* P0 FIX: section header with clear hierarchy — eyebrow → large heading → short sub */}
        <div className="reveal text-center mb-16">
          <span className="eyebrow">Our Expertise</span>
          <h2 className="section-headline font-display font-black text-navy mb-4">
            What We Build
          </h2>
          <p className="text-muted-foreground max-w-[420px] mx-auto text-[0.9375rem] leading-[1.75]">
            Every service is crafted with precision, speed, and your business
            goals at the center.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={cn(
                // P2 FIX: richer card elevation on hover — layered shadow not just a simple shadow
                "reveal group bg-surface-soft border border-border/60 rounded-xl p-7 hover:border-blue-accent/30 transition-all duration-300",
                "hover:shadow-[0_4px_6px_rgba(0,0,0,0.04),_0_16px_40px_rgba(59,130,246,0.08)] hover:-translate-y-0.5",
                `reveal-delay-${Math.min(i + 1, 5)}`,
              )}
            >
              {/* P1 FIX: icon container has inner highlight like btn-primary */}
              <div className="w-11 h-11 rounded-lg bg-blue-accent/[0.09] flex items-center justify-center mb-5 group-hover:bg-blue-accent/[0.15] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
                <Icon className="w-5 h-5 text-blue-accent" />
              </div>
              {/* P0: card title clearly dominant over description */}
              <h3 className="font-display text-[1.125rem] font-black text-navy tracking-[-0.025em] mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-[0.875rem] leading-[1.7]">
                {desc}
              </p>
            </div>
          ))}

          {/* Spacer card with CTA */}
          <div className="reveal reveal-delay-5 bg-navy rounded-xl p-7 flex flex-col justify-between">
            <div>
              <p
                className="eyebrow eyebrow-dark"
                style={{ display: "inline-flex" }}
              >
                Custom Projects
              </p>
              <h3 className="font-display text-[1.125rem] font-black text-white tracking-[-0.025em] mb-2 mt-3">
                We handle bespoke work too.
              </h3>
              <p className="text-white/55 text-[0.875rem] leading-[1.7]">
                Have a unique requirement? Let's talk and find the right
                solution.
              </p>
            </div>
            <div className="mt-6">
              <PrimaryButton
                href="#contact"
                size="sm"
                className="w-full justify-center"
              >
                Start a Conversation
                <ArrowRight className="w-3.5 h-3.5" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us Section ──────────────────────────────── */
const whyUs = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "Most projects are live within 48 to 72 hours of approval.",
  },
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    desc: "Transparent, fixed pricing. No hidden fees, no surprises.",
  },
  {
    icon: Palette,
    title: "Modern Design Standards",
    desc: "Every site is built to current design and performance standards.",
  },
  {
    icon: Target,
    title: "Conversion-Focused",
    desc: "We design with your business goals in mind — not just aesthetics.",
  },
  {
    icon: User,
    title: "Direct Founder Access",
    desc: "Work directly with Advik, the founder. No account managers or handoffs.",
  },
];

function WhyUsSection() {
  return (
    // P2 FIX: angled top entry to create flowing dark→dark transition
    <section
      id="why-us"
      className="bg-navy py-20 lg:py-28 relative overflow-hidden clip-top-angle"
    >
      {/* Atmospheric orbs */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="eyebrow eyebrow-dark">Our Difference</span>
          {/* P0 FIX: heading clearly larger than card titles below */}
          <h2 className="section-headline font-display font-black text-white mb-4 mt-1">
            Built Different
          </h2>
          <p className="text-white/50 max-w-[400px] mx-auto text-[0.9375rem] leading-[1.75]">
            Five principles that set every AKG DIGITAL project apart.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyUs.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={cn(
                // P2 FIX: glass card with refined border luminosity
                "reveal group bg-white/[0.035] border border-white/[0.07] rounded-xl p-7",
                "hover:bg-white/[0.06] hover:border-blue-accent/25 transition-all duration-300 hover:-translate-y-0.5",
                `reveal-delay-${Math.min(i + 1, 5)}`,
              )}
            >
              <div className="w-11 h-11 rounded-lg bg-blue-accent/[0.14] flex items-center justify-center mb-5 group-hover:bg-blue-accent/[0.22] transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Icon className="w-5 h-5 text-blue-accent" />
              </div>
              <h3 className="font-display text-[1.0625rem] font-black text-white tracking-[-0.025em] mb-2">
                {title}
              </h3>
              <p className="text-white/50 text-[0.875rem] leading-[1.7]">
                {desc}
              </p>
            </div>
          ))}

          {/* P1 FIX: CTA card uses premium button inside */}
          <div className="reveal reveal-delay-5 bg-blue-accent rounded-xl p-7 flex flex-col justify-center items-start relative overflow-hidden">
            {/* Inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] to-transparent pointer-events-none rounded-xl" />
            <CheckCircle className="w-9 h-9 text-white/90 mb-4 relative z-10" />
            <h3 className="font-display text-[1.0625rem] font-black text-white tracking-[-0.025em] mb-2 relative z-10">
              Ready to get started?
            </h3>
            <p className="text-white/75 text-[0.875rem] leading-[1.7] mb-5 relative z-10">
              Join businesses that chose quality, speed, and transparency.
            </p>
            <a href="#contact" className="relative z-10">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-white text-blue-accent hover:bg-white/92 active:scale-[0.98] font-bold rounded-lg px-4 h-8 text-sm transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
              >
                Let's Talk
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ────────────────────────────────────── */
const pricingPlans = [
  {
    name: "Starter",
    price: "₹4,999",
    tagline:
      "Perfect for personal brands and small businesses just getting started.",
    featured: false,
    features: [
      "Up to 3 pages",
      "Mobile responsive",
      "Contact form",
      "Basic SEO setup",
      "3 revisions",
      "Delivered in 72 hrs",
    ],
  },
  {
    name: "Growth",
    price: "₹9,999",
    tagline: "For growing businesses that need a complete web presence.",
    featured: true,
    features: [
      "Up to 6 pages",
      "Mobile responsive",
      "Contact form + WhatsApp integration",
      "Blog/news section",
      "On-page SEO",
      "5 revisions",
      "Delivered in 5 days",
      "1 month support",
    ],
  },
  {
    name: "Premium",
    price: "₹17,999",
    tagline:
      "For businesses that want a high-end, fully custom digital presence.",
    featured: false,
    features: [
      "Up to 12 pages",
      "Custom design system",
      "E-commerce ready",
      "Advanced SEO",
      "Unlimited revisions",
      "Priority delivery",
      "3 months support",
    ],
  },
];

function PricingSection() {
  return (
    // P2 FIX: radial atmospheric glow frames the section, esp. the featured card
    <section
      id="pricing"
      className="relative bg-surface-soft py-20 lg:py-28 overflow-hidden"
    >
      {/* Subtle center glow behind featured card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-headline font-display font-black text-navy mb-4 mt-1">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-[400px] mx-auto text-[0.9375rem] leading-[1.75]">
            No hidden fees. No surprise invoices. What you see is what you pay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {pricingPlans.map(
            ({ name, price, tagline, featured, features }, i) => (
              <div
                key={name}
                className={cn(
                  "reveal flex flex-col rounded-xl border transition-all duration-300 relative",
                  `reveal-delay-${i + 1}`,
                  featured
                    ? // P2 FIX: featured card has richer multi-layer shadow + inner highlight
                      "bg-navy border-blue-accent/60 shadow-[0_0_0_1px_oklch(0.59_0.2_264/0.2),_0_8px_16px_rgba(0,0,0,0.12),_0_32px_64px_oklch(0.59_0.2_264/0.18)] md:scale-[1.035] md:-translate-y-1"
                    : "bg-white border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),_0_16px_40px_rgba(59,130,246,0.07)] hover:-translate-y-0.5",
                )}
              >
                {/* P2 FIX: featured card inner top highlight */}
                {featured && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
                )}

                {featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="btn-primary inline-flex items-center rounded-full px-4 py-1 text-[0.6875rem] font-bold tracking-[0.08em] uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    "p-7 pb-0 relative z-10",
                    featured ? "pt-10" : "",
                  )}
                >
                  {/* P0 FIX: plan name visually dominant, price even larger */}
                  <h3
                    className={cn(
                      "font-display font-black tracking-[-0.025em] text-[1.0625rem] mb-1",
                      featured ? "text-white" : "text-navy",
                    )}
                  >
                    {name}
                  </h3>
                  <p
                    className={cn(
                      "text-[0.8125rem] leading-[1.65] mb-5",
                      featured ? "text-white/55" : "text-muted-foreground",
                    )}
                  >
                    {tagline}
                  </p>
                  {/* Price — most visually dominant element in the card */}
                  <div
                    className={cn(
                      "font-display font-black tracking-[-0.04em] leading-none mb-6",
                      featured
                        ? "text-white text-[2.75rem]"
                        : "text-navy text-[2.5rem]",
                    )}
                  >
                    {price}
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 flex-1 px-7 mb-7 relative z-10">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="w-[15px] h-[15px] mt-[3px] flex-shrink-0 text-blue-accent" />
                      <span
                        className={cn(
                          "text-[0.875rem] leading-snug",
                          featured ? "text-white/75" : "text-charcoal/65",
                        )}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="px-7 pb-7 relative z-10">
                  {featured ? (
                    <PrimaryButton
                      href="#contact"
                      className="w-full justify-center"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </PrimaryButton>
                  ) : (
                    <a href="#contact" className="block">
                      <Button
                        className={cn(
                          "w-full font-bold transition-all duration-200 h-10 text-sm",
                          "bg-navy hover:bg-navy/90 text-white active:scale-[0.98]",
                        )}
                      >
                        Get Started
                        <ArrowRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ),
          )}
        </div>

        <p className="reveal text-center text-muted-foreground text-[0.8125rem] mt-8">
          All prices include design, development, and basic deployment.{" "}
          <a
            href="#contact"
            className="text-blue-accent hover:underline font-semibold"
          >
            Need a custom quote?
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ───────────────────────────────── */
const testimonials = [
  {
    quote:
      "AKG DIGITAL delivered our website in under 3 days. The design was clean, professional, and exactly what we envisioned. Highly recommend.",
    name: "Riya Sharma",
    role: "Founder, BloomStudios",
    initials: "RS",
  },
  {
    quote:
      "Working directly with Advik made the process smooth and stress-free. He understood our brand immediately and delivered beyond expectations.",
    name: "Arjun Mehta",
    role: "CEO, NexaSpace",
    initials: "AM",
  },
  {
    quote:
      "We needed a fast turnaround for a product launch and AKG DIGITAL came through. The site looks great and performs even better.",
    name: "Priya Nair",
    role: "Marketing Director, Elevate Co.",
    initials: "PN",
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="eyebrow">Social Proof</span>
          <h2 className="section-headline font-display font-black text-navy mb-4 mt-1">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-[380px] mx-auto text-[0.9375rem] leading-[1.75]">
            Real feedback from businesses we've helped grow online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(({ quote, name, role, initials }, i) => (
            <div
              key={name}
              className={cn(
                // P2 FIX: elevated hover shadow, clean border
                "reveal bg-surface-soft border border-border/50 rounded-xl p-7",
                "shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)]",
                "hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),_0_16px_40px_rgba(59,130,246,0.07)] hover:border-blue-accent/20 hover:-translate-y-0.5",
                "transition-all duration-300 flex flex-col",
                `reveal-delay-${i + 1}`,
              )}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <Star
                    key={k}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* P0 FIX: quote as open-quote typographic treatment */}
              <blockquote className="text-charcoal/75 text-[0.9375rem] leading-[1.75] flex-1 mb-6">
                "{quote}"
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                {/* P1 FIX: avatar has inner highlight matching btn-primary treatment */}
                <div className="w-9 h-9 rounded-full bg-blue-accent flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] text-white font-display font-black text-[0.8125rem]">
                  {initials}
                </div>
                <div>
                  <div className="font-display font-black text-navy text-[0.875rem] tracking-[-0.015em]">
                    {name}
                  </div>
                  <div className="text-muted-foreground text-[0.75rem] mt-0.5">
                    {role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ────────────────────────────────────────── */
const faqs = [
  {
    q: "How long does it take to build my website?",
    a: "Most projects are delivered within 48 to 72 hours after content and payment are received. Larger projects may take 5 to 7 days. We always agree on a timeline upfront.",
  },
  {
    q: "What are your payment terms?",
    a: "We require 50% upfront to begin work and the remaining 50% upon delivery. All payments are processed securely.",
  },
  {
    q: "How many revisions do I get?",
    a: "Revision count depends on your package (3, 5, or unlimited). We work collaboratively to make sure you're satisfied with the final result.",
  },
  {
    q: "Do you help with hosting and domain setup?",
    a: "Yes. We guide you through selecting and setting up your hosting and domain. Optional managed hosting is also available on request.",
  },
  {
    q: "Can I update the website myself after it's built?",
    a: "Absolutely. We can build your site on a CMS so you can manage content easily, or provide basic training if needed.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-surface-soft py-20 lg:py-28">
      <div className="max-w-[680px] mx-auto px-6">
        <div className="reveal text-center mb-14">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-headline font-display font-black text-navy mb-4 mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto text-[0.9375rem] leading-[1.75]">
            Everything you need to know before we get started.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          {faqs.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={q}
                className={cn(
                  "reveal bg-white border rounded-xl overflow-hidden transition-all duration-200",
                  `reveal-delay-${Math.min(i + 1, 5)}`,
                  isOpen
                    ? "border-blue-accent/30 shadow-[0_2px_8px_rgba(59,130,246,0.08)]"
                    : "border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
                )}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-[1.125rem] text-left hover:bg-surface-soft/80 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {/* P0 FIX: question text clearly dominant over answer */}
                  <span className="font-display font-black text-navy text-[0.9375rem] tracking-[-0.015em]">
                    {q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 flex-shrink-0 text-blue-accent transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 border-t border-border/30">
                    <p className="text-muted-foreground text-[0.875rem] leading-[1.75] pt-4">
                      {a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ────────────────────────────────────── */
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending, isError } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New Website Enquiry from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );
    window.open(
      `mailto:advikkumargupta5@gmail.com?subject=${subject}&body=${body}`,
      "_blank",
    );
    mutate(
      { name: formData.name, email: formData.email, message: formData.message },
      {
        onSuccess: () => {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
        },
      },
    );
  };

  return (
    // P2 FIX: dark navy section flows naturally from the light FAQ section above
    <section
      id="contact"
      className="bg-navy py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Atmospheric orbs */}
      <div
        className="absolute top-0 left-1/3 w-[480px] h-[480px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[320px] h-[320px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.59 0.2 264 / 0.09) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-14">
          <span className="eyebrow eyebrow-dark">Contact</span>
          <h2 className="section-headline font-display font-black text-white mb-4 mt-1">
            Let's Build Something Great.
          </h2>
          <p className="text-white/55 max-w-[400px] mx-auto text-[0.9375rem] leading-[1.75]">
            Tell us about your project and we'll get back to you within 24
            hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form — P2 FIX: slightly elevated card with inner highlight */}
          <div className="reveal bg-white/[0.035] border border-white/[0.07] rounded-xl p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-accent/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-blue-accent" />
                </div>
                <h3 className="font-display text-[1.5rem] font-black text-white tracking-[-0.03em]">
                  Message Sent!
                </h3>
                <p className="text-white/55 text-[0.875rem] leading-[1.75] max-w-sm">
                  Thanks for reaching out. We'll get back to you within 24
                  hours. Looking forward to working together.
                </p>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 mt-2 h-9 text-sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[0.8125rem] font-semibold text-white/70 mb-2 tracking-[0.01em]"
                  >
                    Full Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="bg-white/[0.06] border-white/[0.10] text-white placeholder:text-white/25 focus-visible:ring-blue-accent focus-visible:border-blue-accent/40 h-11 text-[0.9375rem]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[0.8125rem] font-semibold text-white/70 mb-2 tracking-[0.01em]"
                  >
                    Email Address
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    className="bg-white/[0.06] border-white/[0.10] text-white placeholder:text-white/25 focus-visible:ring-blue-accent focus-visible:border-blue-accent/40 h-11 text-[0.9375rem]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[0.8125rem] font-semibold text-white/70 mb-2 tracking-[0.01em]"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    className="bg-white/[0.06] border-white/[0.10] text-white placeholder:text-white/25 focus-visible:ring-blue-accent focus-visible:border-blue-accent/40 resize-none text-[0.9375rem]"
                  />
                </div>

                {isError && (
                  <p className="text-red-400 text-[0.875rem]">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* P1 FIX: premium submit button */}
                {isPending ? (
                  <Button
                    type="submit"
                    disabled
                    className="h-11 font-bold text-sm"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </Button>
                ) : (
                  <PrimaryButton
                    type="submit"
                    className="w-full justify-center h-11"
                  >
                    Send Message
                    <Send className="w-4 h-4" />
                  </PrimaryButton>
                )}
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="reveal reveal-delay-2 flex flex-col gap-7">
            <div>
              <h3 className="font-display text-[1.5rem] font-black text-white tracking-[-0.03em] mb-3">
                Prefer a direct chat?
              </h3>
              <p className="text-white/55 leading-[1.75] text-[0.9375rem] mb-6">
                If you'd rather talk through your project over WhatsApp, we're
                happy to connect. Reach out and we'll respond quickly.
              </p>
              <a
                href="https://wa.me/918826299639"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#22bf5e] active:scale-[0.98] text-white font-bold rounded-lg px-6 h-11 text-sm transition-all duration-150 shadow-[0_2px_12px_rgba(37,211,102,0.3)] w-full sm:w-auto justify-center sm:justify-start"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Info blocks — P2 FIX: consistent card treatment with form panel */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: Clock,
                  title: "Response Time",
                  desc: "Within 24 hours on business days.",
                },
                {
                  icon: ShieldCheck,
                  title: "Direct Access",
                  desc: "You'll speak directly with Advik, the founder.",
                },
                {
                  icon: Zap,
                  title: "Fast Kickoff",
                  desc: "Projects can start within 24 hours of payment.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-accent/[0.14] flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon className="w-5 h-5 text-blue-accent" />
                  </div>
                  <div>
                    <div className="font-display font-black text-white text-[0.875rem] tracking-[-0.015em]">
                      {title}
                    </div>
                    <div className="text-white/45 text-[0.8125rem] mt-0.5 leading-snug">
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-[oklch(0.095_0.028_264)] border-t border-white/[0.05] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-accent flex items-center justify-center shadow-[0_2px_8px_oklch(0.59_0.2_264/0.35)]">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-[1.0625rem] font-black text-white tracking-[-0.04em]">
                AKG <span className="text-blue-accent">DIGITAL</span>
              </span>
            </a>
            {/* P0 FIX: tagline clearly subordinate — smaller, caps, wide tracking */}
            <p className="text-white/35 text-[0.6875rem] font-bold tracking-[0.14em] uppercase">
              Fast. Modern. Reliable.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-7 gap-y-2">
              {[
                { label: "Services", href: "#services" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/40 hover:text-white/80 text-[0.8125rem] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-[0.75rem]">
          <span>© {year} AKG DIGITAL. All rights reserved.</span>
          <a
            href={caffeineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/50 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <ServicesSection />
        <WhyUsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
