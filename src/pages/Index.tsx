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
  Globe,
  LineChart,
  Mail,
  MessageSquare,
  Play,
  Plug,
  Star,
  Workflow,
  Zap,
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const root = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 24 });
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
  }, [lang]);

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

/* ---------------- Language Toggle ---------------- */
const LanguageToggle = ({ compact = false }: { compact?: boolean }) => {
  const { lang, toggle, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.aria}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur-md transition-all hover:text-foreground hover:border-primary/40 ${compact ? "" : ""}`}
    >
      <Globe className="h-3.5 w-3.5" />
      <span className={lang === "en" ? "text-foreground" : ""}>{t.langToggle.en}</span>
      <span className="text-muted-foreground/50">/</span>
      <span className={lang === "fr" ? "text-foreground" : ""}>{t.langToggle.fr}</span>
    </button>
  );
};

/* ---------------- Navbar ---------------- */
const Navbar = () => {
  const { t } = useLanguage();
  const links: [string, string][] = [
    [t.nav.problem, "#problem"],
    [t.nav.solution, "#solution"],
    [t.nav.how, "#how"],
    [t.nav.useCases, "#use-cases"],
    [t.nav.results, "#proof"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container-tight flex h-16 items-center justify-between">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Nexlo
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href="#cta"
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.7)] sm:inline-flex"
          >
            {t.nav.cta}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
};

/* ---------------- Hero ---------------- */
const Hero = () => {
  const { t } = useLanguage();
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
      <div className="container-tight relative">
        <div data-hero className="mx-auto max-w-4xl text-center">
          <span className="pill">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t.hero.pill}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            <span className="text-gradient">{t.hero.title1}</span>
            <br />
            <span className="font-display italic text-gradient-primary">{t.hero.title2}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#cta"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:translate-y-[-1px] sm:w-auto"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-card sm:w-auto"
            >
              <Play className="h-3.5 w-3.5 fill-foreground" />
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {t.hero.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {b}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-visual className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute -inset-x-8 -top-10 h-72 bg-gradient-primary opacity-20 blur-3xl" aria-hidden />
          <div className="relative animate-float rounded-2xl border border-border/70 bg-card/40 p-2 shadow-card backdrop-blur-xl">
            <img
              src={heroDashboard}
              alt={t.hero.imgAlt}
              width={1920}
              height={1080}
              className="w-full rounded-xl"
            />
          </div>
          <FloatingChip className="left-2 top-8 sm:-left-6" icon={<Bot className="h-4 w-4" />}>
            {t.hero.chip1}
          </FloatingChip>
          <FloatingChip className="right-2 bottom-10 sm:-right-6" icon={<Zap className="h-4 w-4 text-primary" />}>
            {t.hero.chip2}
          </FloatingChip>
        </div>
      </div>
    </section>
  );
};

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
const Logos = () => {
  const { t } = useLanguage();
  return (
    <section className="border-y border-border/40 bg-card/30 py-10">
      <div className="container-tight">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t.logos.eyebrow}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base font-semibold text-muted-foreground/80">
          {["OpenAI", "Anthropic", "n8n", "Zapier", "Make", "Supabase", "Slack", "HubSpot"].map((l) => (
            <span key={l} className="transition-colors hover:text-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Problem ---------------- */
const Problem = () => {
  const { t } = useLanguage();
  const icons = [Clock, Workflow, LineChart];
  return (
    <section id="problem" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow={t.problem.eyebrow}
          title={
            <>
              {t.problem.titleA} <span className="font-display italic text-gradient-primary">{t.problem.titleB}</span>
            </>
          }
          subtitle={t.problem.subtitle}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.problem.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={item.title} className="reveal glass-card p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Solution ---------------- */
const Solution = () => {
  const { t } = useLanguage();
  const icons = [Bot, Plug, Cpu];
  return (
    <section id="solution" className="relative py-28">
      <div className="container-tight">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="pill">{t.solution.pill}</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              {t.solution.titleA} <span className="font-display italic text-gradient-primary">{t.solution.titleB}</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t.solution.desc}</p>
            <a href="#cta" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              {t.solution.bookCta} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="reveal space-y-3">
            {t.solution.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <div key={p.title} className="glass-card flex gap-4 p-5 transition-all hover:border-primary/40 hover:shadow-glow">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- How it works ---------------- */
const HowItWorks = () => {
  const { t } = useLanguage();
  return (
    <section id="how" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow={t.how.eyebrow}
          title={
            <>
              {t.how.titleA} <span className="font-display italic text-gradient-primary">{t.how.titleB}</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <div key={s.title} className="reveal relative glass-card overflow-hidden p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl italic text-gradient-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < t.how.steps.length - 1 && (
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
  const { t } = useLanguage();
  const icons = [Zap, MessageSquare, Workflow, LineChart];
  return (
    <section id="use-cases" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow={t.useCases.eyebrow}
          title={
            <>
              {t.useCases.titleA} <span className="font-display italic text-gradient-primary">{t.useCases.titleB}</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {t.useCases.cases.map((c, i) => {
            const Icon = icons[i];
            return (
              <div key={c.title} className="reveal group glass-card relative overflow-hidden p-7 transition-all hover:-translate-y-1 hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.tag}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------- Benefits ---------------- */
const Benefits = () => {
  const { t } = useLanguage();
  return (
    <section className="py-28">
      <div className="container-tight">
        <div className="reveal glass-card relative overflow-hidden p-10 sm:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="pill">{t.benefits.pill}</span>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                {t.benefits.titleA}
                <br />
                <span className="font-display italic text-gradient-primary">{t.benefits.titleB}</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">{t.benefits.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {t.benefits.stats.map((s) => (
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
  const { t } = useLanguage();
  return (
    <section id="proof" className="py-28">
      <div className="container-tight">
        <SectionHeader
          eyebrow={t.proof.eyebrow}
          title={
            <>
              {t.proof.titleA} <span className="font-display italic text-gradient-primary">{t.proof.titleB}</span>
            </>
          }
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.proof.quotes.map((q) => (
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
const FinalCTA = () => {
  const { t } = useLanguage();
  return (
    <section id="cta" className="py-28">
      <div className="container-tight">
        <div className="reveal relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card to-secondary p-12 text-center shadow-card sm:p-20">
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" aria-hidden />
          <div className="relative">
            <span className="pill">{t.finalCta.pill}</span>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              {t.finalCta.titleA} <br className="hidden sm:block" />
              <span className="font-display italic text-gradient-primary">{t.finalCta.titleB}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t.finalCta.desc}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:hello@nexlo.ai"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:translate-y-[-1px]"
              >
                {t.finalCta.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="text-sm text-muted-foreground">{t.finalCta.or}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Footer ---------------- */
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container-tight">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="font-semibold">Nexlo</span>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t.footer.desc}</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground">{t.footer.links.problem}</a>
            <a href="#solution" className="hover:text-foreground">{t.footer.links.solution}</a>
            <a href="#how" className="hover:text-foreground">{t.footer.links.how}</a>
            <a href="#proof" className="hover:text-foreground">{t.footer.links.proof}</a>
            <a href="mailto:hello@nexlo.ai" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="h-3.5 w-3.5" /> hello@nexlo.ai
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nexlo. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

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