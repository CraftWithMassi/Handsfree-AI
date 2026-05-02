import { useEffect, useState } from "react";
import { X, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/i18n/LanguageContext";

interface AuditFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ENDPOINT = "https://crafter-api.onrender.com/api/lead";

const AuditFormModal = ({ open, onClose }: AuditFormModalProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [business, setBusiness] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().trim().min(2).max(100),
    whatsapp: z
      .string()
      .trim()
      .min(6)
      .max(25)
      .regex(/^[+0-9\s().-]+$/),
    business: z.string().trim().min(2).max(150),
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const parsed = schema.safeParse({ name, whatsapp, business });
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(parsed.error.issues[0]?.message ?? t.auditForm.error);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, source: "nexlo-landing" }),
      });
      if (!res.ok) throw new Error("Network");
      setStatus("success");
      setName("");
      setWhatsapp("");
      setBusiness("");
    } catch {
      setStatus("error");
      setErrorMsg(t.auditForm.error);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-form-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border/70 bg-card/95 p-7 shadow-card backdrop-blur-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.auditForm.close}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{t.auditForm.success}</h3>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              {t.auditForm.close}
            </button>
          </div>
        ) : (
          <>
            <h3 id="audit-form-title" className="text-2xl font-semibold tracking-tight">
              {t.auditForm.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.auditForm.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="af-name" className="text-xs font-medium text-muted-foreground">
                  {t.auditForm.name}
                </label>
                <input
                  id="af-name"
                  type="text"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.auditForm.namePlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label htmlFor="af-whatsapp" className="text-xs font-medium text-muted-foreground">
                  {t.auditForm.whatsapp}
                </label>
                <input
                  id="af-whatsapp"
                  type="tel"
                  required
                  maxLength={25}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={t.auditForm.whatsappPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label htmlFor="af-business" className="text-xs font-medium text-muted-foreground">
                  {t.auditForm.business}
                </label>
                <input
                  id="af-business"
                  type="text"
                  required
                  maxLength={150}
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder={t.auditForm.businessPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {status === "error" && errorMsg && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:translate-y-[-1px] disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.auditForm.submitting}
                  </>
                ) : (
                  <>
                    {t.auditForm.submit}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">{t.auditForm.privacy}</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuditFormModal;