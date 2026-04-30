import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  LineChart,
  Mail,
  MessageSquare,
  Play,
  Plug,
  Sparkles,
  Star,
  Workflow,
  Zap,
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from("[data-hero] > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.1,
      });
      gsap.from("[data-hero-visual]", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.4,
      });

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen font-sans text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Problem />
        <Solution />
        <HowItWorks />
        <UseCases />
        <Benefits />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

/* ---------------- Navbar ---------------- */
const Navbar = () => (
  <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
    <div className="container-tight flex h-16 items-center justify-between">
      <a href="#top" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
          <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-semibold tracking-tight">Nexlo</span>
      </a>
      <nav className="hidden items-center gap-8 md:flex">
        {[
          ["Problem", "#problem"],
          ["Solution", "#solution"],
          ["How it works", "#how"],
          ["Use cases", "#use-cases"],
          ["Results", "#proof"],
        ].map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#cta"
        className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.7)]"
      >
        Free audit
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  </header>
);

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
    <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
    <div className="container-tight relative">
      <div data-hero className="mx-auto max-w-4xl text-center">
        <span className="pill">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Now booking June engagements
        </span>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="text-gradient">Automate your business</span>
          <br />
          <span className="font-display italic text-gradient-primary">with AI agents.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          I build custom AI workflows that handle your repetitive work — so your team
          stops drowning in tasks and starts focusing on growth.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#cta"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:translate-y-[-1px] sm:w-auto"
          >
            Get a Free Automation Audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-card sm:w-auto"
          >
            <Play className="h-3.5 w-3.5 fill-foreground" />
            See how it works
          </a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {["No commitment", "Reply within 24h", "100% custom builds"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hero visual */}
      <div data-hero-visual className="relative mx-auto mt-20 max-w-5xl">
        <div className="absolute -inset-x-8 -top-10 h-72 bg-gradient-primary opacity-20 blur-3xl" aria-hidden />
        <div className="relative animate-float rounded-2xl border border-border/70 bg-card/40 p-2 shadow-card backdrop-blur-xl">
          <img
            src={heroDashboard}
            alt="AI workflow automation dashboard showing connected agents and tasks"
            width={1920}
            height={1080}
            className="w-full rounded-xl"
          />
        </div>
        {/* Floating chips */}
        <FloatingChip className="left-2 top-8 sm:-left-6" icon={<Bot className="h-4 w-4" />}>
          Agent dispatched
        </FloatingChip>
        <FloatingChip className="right-2 bottom-10 sm:-right-6" icon={<Zap className="h-4 w-4 text-primary" />}>
          412 tasks/day
        </FloatingChip>
      </div>
    </div>
  </section>
);

const FloatingChip = ({
  children,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`absolute hidden items-center gap-2 rounded-full border border-border/70 bg-card/90 px-3.5 py-2 text-xs font-medium shadow-card backdrop-blur-xl sm:inline-flex ${className}`}
  >
    {icon}
    {children}
  </div>
);

/* ---------------- Logos strip ---------------- */
const Logos = () => (
  <section className="border-y border-border/40 bg-card/30 py-10">
    <div className="container-tight">
      <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Building automations on top of
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base font-semibold text-muted-foreground/80">
        {["OpenAI", "Anthropic", "n8n", "Zapier", "Make", "Supabase", "Slack", "HubSpot"].map(
          (l) => (
            <span key={l} className="transition-colors hover:text-foreground">
              {l}
            </span>
          )
        )}
      </div>
    </div>
  </section>
);

/* ---------------- Problem ---------------- */
const Problem = () => {
  const items = [
    { icon: Clock, title: "Hours lost to repetitive tasks", desc: "Your team copies, pastes, and updates the same things every single day." },
    { icon: Workflow, title: "Tools that don't talk to each other", desc: "Data lives in 7 different apps. Nothing flows. Mistakes pile up." },
    { icon: LineChart, title: "Growth blocked by manual work", desc: "You can't scale because every new client = more grunt work." },
  ];
  return (
    <section id="problem" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow="The problem"
          title={<>You didn't start your business <span className="font-display italic text-gradient-primary">to do admin.</span></>}
          subtitle="Most operators waste 30–40% of their week on work a machine could handle."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="reveal glass-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Solution ---------------- */
const Solution = () => {
  const points = [
    { icon: Bot, title: "Automate repetitive tasks", desc: "AI agents handle the work no one wants to do — accurately, every time." },
    { icon: Plug, title: "Connect every tool you use", desc: "Your CRM, inbox, docs, and database all working as one system." },
    { icon: Cpu, title: "Run 24/7, with zero burnout", desc: "Workflows that don't sleep, don't forget, and don't take vacation." },
  ];
  return (
    <section id="solution" className="relative py-28">
      <div className="container-tight">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="pill">The solution</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              AI agents that quietly run your business <span className="font-display italic text-gradient-primary">in the background.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Custom-built systems tailored to your workflows. No bloated SaaS.
              No "one-size-fits-all". Just the exact automation you need.
            </p>
            <a href="#cta" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Book a free audit <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="reveal space-y-3">
            {points.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card flex gap-4 p-5 transition-all hover:border-primary/40 hover:shadow-glow">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- How it works ---------------- */
const HowItWorks = () => {
  const steps = [
    { n: "01", title: "Analyze your business", desc: "We map your workflows and find the highest-leverage automations to build first." },
    { n: "02", title: "Build custom AI workflows", desc: "I design and ship the agents and integrations — usually within 2–4 weeks." },
    { n: "03", title: "Deploy & optimize", desc: "Hand-off, training, and ongoing tuning so the system gets smarter over time." },
  ];
  return (
    <section id="how" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow="How it works"
          title={<>Three steps from chaos to <span className="font-display italic text-gradient-primary">calm.</span></>}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="reveal relative glass-card overflow-hidden p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl italic text-gradient-primary">{s.n}</span>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 text-muted-foreground/50 md:block" />
                )}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Use Cases ---------------- */
const UseCases = () => {
  const cases = [
    { icon: Zap, title: "Lead generation", desc: "Scrape, qualify, enrich, and reach out — fully on autopilot.", tag: "Sales" },
    { icon: MessageSquare, title: "Customer support AI", desc: "Agents that answer 80% of tickets in seconds, not hours.", tag: "Support" },
    { icon: Workflow, title: "Internal workflows", desc: "Onboarding, approvals, handoffs — running themselves.", tag: "Ops" },
    { icon: LineChart, title: "Data & reporting", desc: "Pull, clean, and turn raw data into reports automatically.", tag: "Analytics" },
  ];
  return (
    <section id="use-cases" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow="Use cases"
          title={<>Built for the work you'd <span className="font-display italic text-gradient-primary">rather not do.</span></>}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {cases.map(({ icon: Icon, title, desc, tag }) => (
            <div key={title} className="reveal group glass-card relative overflow-hidden p-7 transition-all hover:-translate-y-1 hover:border-primary/40">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{tag}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Benefits ---------------- */
const Benefits = () => {
  const stats = [
    { value: "10–20h", label: "Saved per week" },
    { value: "60%", label: "Lower operating cost" },
    { value: "3×", label: "Faster turnaround" },
    { value: "24/7", label: "Always-on agents" },
  ];
  return (
    <section className="py-28">
      <div className="container-tight">
        <div className="reveal glass-card relative overflow-hidden p-10 sm:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="pill">The outcome</span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Less doing.<br />
                <span className="font-display italic text-gradient-primary">More building.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Stop trading hours for output. Get a system that scales without
                hiring, without burnout, and without breaking the bank.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-6">
                  <div className="text-3xl font-semibold tracking-tight text-gradient-primary sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Social proof ---------------- */
const SocialProof = () => {
  const quotes = [
    {
      quote: "Saved our ops team 15+ hours a week within the first month. The ROI was obvious by week two.",
      name: "Sarah Chen",
      role: "COO, Northwind Agency",
    },
    {
      quote: "We replaced three contractors with one AI workflow. Faster, cheaper, and weirdly more reliable.",
      name: "Marcus Rivera",
      role: "Founder, Tideline Studio",
    },
    {
      quote: "Felt like hiring a senior engineer for the price of a SaaS subscription. Zero regrets.",
      name: "Priya Patel",
      role: "Head of Growth, Lumen",
    },
  ];
  return (
    <section id="proof" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow="Results"
          title={<>Operators are quietly <span className="font-display italic text-gradient-primary">winning back time.</span></>}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="reveal glass-card flex h-full flex-col p-7">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                "{q.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">
                  {q.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Final CTA ---------------- */
const FinalCTA = () => (
  <section id="cta" className="py-28">
    <div className="container-tight">
      <div className="reveal relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card to-secondary p-12 text-center shadow-card sm:p-20">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" aria-hidden />
        <div className="relative">
          <span className="pill">Free 30-min audit</span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Find out exactly what to <br className="hidden sm:block" />
            <span className="font-display italic text-gradient-primary">automate first.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            I'll review your workflows and send you a personal action plan —
            even if we never work together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@nexlo.ai"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:translate-y-[-1px]"
            >
              Book your free call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="text-sm text-muted-foreground">or email hello@nexlo.ai</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="border-t border-border/40 py-12">
    <div className="container-tight">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-semibold">Nexlo</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Custom AI automation for founders, agencies, and operators tired of doing things by hand.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <a href="#problem" className="hover:text-foreground">Problem</a>
          <a href="#solution" className="hover:text-foreground">Solution</a>
          <a href="#how" className="hover:text-foreground">Process</a>
          <a href="#proof" className="hover:text-foreground">Results</a>
          <a href="mailto:hello@nexlo.ai" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Mail className="h-3.5 w-3.5" /> hello@nexlo.ai
          </a>
        </div>
      </div>
      <div className="mt-10 border-t border-border/40 pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nexlo. Built by one human + many agents.
      </div>
    </div>
  </footer>
);

/* ---------------- Helpers ---------------- */
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <div className="reveal mx-auto max-w-2xl text-center">
    <span className="pill">{eyebrow}</span>
    <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
  </div>
);

export default Index;
