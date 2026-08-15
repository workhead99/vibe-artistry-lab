const memes = [
  { top: "client:", bottom: "\u201cmake it pop\u201d", note: "we made it explode" },
  { top: "brief said:", bottom: "minimal & bold", note: "delivered: maximal & bald" },
  { top: "engagement rate", bottom: "0.4%", note: "aura: -900" },
  { top: "legal team:", bottom: "absolutely not", note: "posted anyway" },
  { top: "\u201cgo viral\u201d", bottom: "budget: \u20b91,000", note: "we still cooked" },
  { top: "competitor's font", bottom: "helvetica again", note: "free real estate" },
];

const lexicon = [
  ["ratio'd", "when the reply beats the post"],
  ["lore drop", "brand backstory nobody asked for, everybody saved"],
  ["cooked", "finished, in the good or bad way"],
  ["aura", "the invisible score your feed radiates"],
  ["npc post", "content with zero opinions"],
  ["mid", "the only true insult left"],
];

export function MemeWall() {
  return (
    <section id="memes" className="overflow-hidden border-b-2 border-ink px-5 py-16">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="reveal text-[clamp(2.5rem,7vw,6rem)]">Meme material</h2>
          <p className="font-mono text-xs uppercase text-muted-foreground">
            harvested from real slack threads
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {memes.map((m, i) => (
            <article
              key={m.bottom}
              className={`reveal tilt-hover glass-chip hard-shadow border-2 border-ink p-6 ${
                i % 3 === 1 ? "lg:mt-8" : ""
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {m.top}
              </p>
              <p className="mt-2 font-poster text-3xl uppercase leading-[0.95]">{m.bottom}</p>
              <p className="mt-4 border-t-2 border-ink pt-3 font-serif text-lg italic text-shock">
                {m.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {lexicon.map(([term, def]) => (
            <div key={term} className="bg-background p-5">
              <p className="font-display text-2xl uppercase">{term}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{def}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
