import { useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(100),
  email: z.string().trim().email("That email looks fake").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Add a reachable number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Numbers only, please"),
  budget: z.string().min(1, "Pick a budget"),
  service: z.string().min(1, "Pick a service"),
  about: z.string().trim().min(10, "Give us a little more").max(1000),
});

const budgets = [
  "₹1,000",
  "₹5,000",
  "₹5,000 – ₹12,500",
  "₹15,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹75,000",
  "₹1,00,000 and above",
];

const servicesList = ["Signal Ops", "World-Building", "Frame Surgery", "Meme R&D", "All of it"];


const fieldClass =
  "w-full border-2 border-ink bg-background/60 px-4 py-3 font-mono text-sm text-foreground backdrop-blur-md outline-none placeholder:text-muted-foreground focus:border-shock focus:bg-background/80";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Check the highlighted fields");
      return;
    }

    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      setFileName(null);
      toast.success("Brief received — we'll reply within 24h");
    }, 700);
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? (
      <p className="mt-1 font-mono text-[10px] uppercase text-shock">{errors[k]}</p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-panel hard-shadow border-2 border-ink p-6 md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest">
            Your name
          </label>
          <input id="name" name="name" maxLength={100} placeholder="Riya Sharma" className={`mt-2 ${fieldClass}`} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest">
            Email
          </label>
          <input id="email" name="email" maxLength={255} placeholder="you@brand.com" className={`mt-2 ${fieldClass}`} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="phone" className="font-mono text-[10px] uppercase tracking-widest">
            Contact number
          </label>
          <input id="phone" name="phone" maxLength={20} placeholder="+91 98XXX XXXXX" className={`mt-2 ${fieldClass}`} />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="budget" className="font-mono text-[10px] uppercase tracking-widest">
            Budget (INR)
          </label>
          <select id="budget" name="budget" defaultValue="" className={`mt-2 ${fieldClass}`}>
            <option value="">Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <Err k="budget" />
        </div>
        <div className="md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest">What do you need?</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {servicesList.map((s) => (
              <label
                key={s}
                className="cursor-pointer border-2 border-ink bg-background/50 px-3 py-1.5 font-mono text-[11px] uppercase backdrop-blur-md has-[:checked]:bg-acid"
              >
                <input type="radio" name="service" value={s} className="sr-only" />
                {s}
              </label>
            ))}
          </div>
          <Err k="service" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="about" className="font-mono text-[10px] uppercase tracking-widest">
            About you / the brief
          </label>
          <textarea
            id="about"
            name="about"
            rows={4}
            maxLength={1000}
            placeholder="Who you are, what you're launching, and how unhinged we're allowed to get."
            className={`mt-2 ${fieldClass}`}
          />
          <Err k="about" />
        </div>
        <div className="md:col-span-2">
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Upload a deck / moodboard (optional)
          </span>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="border-2 border-ink bg-background/60 px-4 py-2 font-mono text-[11px] uppercase backdrop-blur-md hover:bg-acid"
            >
              Choose file
            </button>
            <span className="font-mono text-[11px] text-muted-foreground">
              {fileName ?? "No file selected"}
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            name="attachment"
            accept=".pdf,.png,.jpg,.jpeg,.zip,.mp4"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="hard-shadow mt-8 w-full border-2 border-ink bg-shock px-8 py-4 font-display text-2xl uppercase text-background disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send the brief"}
      </button>
    </form>
  );
}
