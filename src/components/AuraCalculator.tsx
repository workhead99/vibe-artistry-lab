import { useMemo, useState } from "react";

const questions = [
  {
    id: "posting",
    q: "How often does your brand post?",
    options: [
      { label: "Never (ghost mode)", pts: -200 },
      { label: "Once a month, on a Tuesday", pts: 120 },
      { label: "Daily, unhinged", pts: 900 },
    ],
  },
  {
    id: "voice",
    q: "Your caption voice is…",
    options: [
      { label: "\u201cWe are thrilled to announce\u201d", pts: -500 },
      { label: "Lowercase and mysterious", pts: 700 },
      { label: "One emoji. That's it.", pts: 400 },
    ],
  },
  {
    id: "comments",
    q: "Do you reply in the comments?",
    options: [
      { label: "Legal said no", pts: -300 },
      { label: "Only to complaints", pts: 100 },
      { label: "We start the fights", pts: 1000 },
    ],
  },
  {
    id: "font",
    q: "Pick a font for your rebrand",
    options: [
      { label: "Helvetica, safe", pts: 200 },
      { label: "Something illegal", pts: 800 },
      { label: "Papyrus (be honest)", pts: -1000 },
    ],
  },
  {
    id: "trend",
    q: "A trend blows up on a Friday night",
    options: [
      { label: "We'll discuss it Monday", pts: -400 },
      { label: "Posted in 4 hours", pts: 600 },
      { label: "We were the trend", pts: 1200 },
    ],
  },
];

function verdict(score: number) {
  if (score <= -800) return { t: "AURA: NEGATIVE", s: "Your feed is a PDF. We can fix this." };
  if (score <= 0) return { t: "AURA: BUFFERING", s: "You post like an intranet. Slight moves needed." };
  if (score < 1500) return { t: "AURA: RISING", s: "Mid, but the good kind. One campaign from lift-off." };
  if (score < 3200) return { t: "AURA: CERTIFIED", s: "The group chat forwards you. Keep cooking." };
  return { t: "AURA: MAXED", s: "You are the algorithm's problem child. Respect." };
}

export function AuraCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answered = Object.keys(answers).length;
  const score = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const done = answered === questions.length;
  const v = verdict(score);
  const pct = Math.max(0, Math.min(100, ((score + 1500) / 5400) * 100));

  return (
    <div className="reveal glass-panel hard-shadow border-2 border-ink p-6 md:p-9">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-4xl md:text-5xl">Aura points calculator</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {answered}/{questions.length} answered
        </span>
      </div>

      <div className="mt-7 grid gap-6">
        {questions.map((q) => (
          <fieldset key={q.id}>
            <legend className="font-mono text-[11px] uppercase tracking-widest">{q.q}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((o) => {
                const active = answers[q.id] === o.pts;
                return (
                  <button
                    key={o.label}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.pts }))}
                    className={`border-2 border-ink px-3 py-1.5 font-mono text-[11px] uppercase backdrop-blur-md ${
                      active ? "bg-shock text-background" : "bg-background/50 hover:bg-acid"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-8 border-2 border-ink bg-background/60 p-5 backdrop-blur-md">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-poster text-5xl md:text-6xl">
            {score > 0 ? "+" : ""}
            {score}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            aura points
          </span>
        </div>
        <div className="mt-3 h-3 w-full border-2 border-ink">
          <div className="h-full bg-acid" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-4 font-display text-2xl uppercase text-shock">{done ? v.t : "AURA: PENDING"}</p>
        <p className="font-mono text-xs text-muted-foreground">
          {done ? v.s : "Answer everything. No skipping, that's a -1000 move."}
        </p>
        {done && (
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="mt-4 border-2 border-ink bg-background/60 px-4 py-2 font-mono text-[11px] uppercase hover:bg-acid"
          >
            Run it back
          </button>
        )}
      </div>
    </div>
  );
}
