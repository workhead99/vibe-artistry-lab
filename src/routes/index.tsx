import { createFileRoute } from "@tanstack/react-router";
import heroCollage from "@/assets/hero-collage.jpg";
import zineTexture from "@/assets/zine-texture.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import { ContactForm } from "@/components/ContactForm";
import { MemeWall } from "@/components/MemeWall";
import { AuraCalculator } from "@/components/AuraCalculator";
import { useParallax } from "@/hooks/use-parallax";
import { useReveal } from "@/hooks/use-reveal";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FEEDWALKERS — Concept Art, Marketing & Editing Studio" },
      {
        name: "description",
        content:
          "FEEDWALKERS is a concept-art marketing, design and editing agency making meme-fluent campaigns for brands that want Gen Z to actually care.",
      },
      { property: "og:title", content: "FEEDWALKERS — Concept Art & Meme-Fluent Marketing" },
      {
        property: "og:description",
        content:
          "Campaigns, design and edits built for the feed. Concept art energy, meme literacy, zero cringe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marqueeWords = [
  "NO CRINGE",
  "★",
  "BRAINROT AS A SERVICE",
  "★",
  "EDIT. POST. REPEAT.",
  "★",
  "CONCEPT ART ENERGY",
  "★",
];

const services = [
  {
    n: "01",
    title: "Signal Ops",
    body: "Campaigns built backwards from the screenshot people send their group chat. Strategy, but make it postable.",
    tags: ["strategy", "paid social", "launches"],
  },
  {
    n: "02",
    title: "World-Building",
    body: "Identity systems, posters, packaging and web that look like concept art, not like a template someone forgot to rename.",
    tags: ["identity", "posters", "web"],
  },
  {
    n: "03",
    title: "Frame Surgery",
    body: "Short-form edits with frame-level timing. Cuts that hit before the thumb does. Captions that carry the joke.",
    tags: ["short form", "motion", "sound"],
  },
  {
    n: "04",
    title: "Meme R&D",
    body: "A lab for formats, in-jokes and reply-bait. We test the bit before your brand has to say it out loud.",
    tags: ["formats", "community", "reply-bait"],
  },
];


const work = [
  { img: work1, title: "Melted Mascot", client: "Goo Soda", tag: "Identity + Film" },
  { img: work2, title: "Tape Over Everything", client: "Static Club", tag: "Campaign" },
  { img: work3, title: "Inflate The Drop", client: "Nuvo", tag: "Editing" },
];

function Index() {
  const heroRef = useParallax<HTMLImageElement>(0.12);
  const zineRef = useParallax<HTMLImageElement>(0.1);
  const workRefs = [
    useParallax<HTMLDivElement>(0.06),
    useParallax<HTMLDivElement>(0.14),
    useParallax<HTMLDivElement>(0.09),
  ];
  const contactBlobRef = useParallax<HTMLDivElement>(0.25);
  const auraBlobRef = useParallax<HTMLDivElement>(0.18);
  const pageRef = useReveal<HTMLDivElement>();

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground grain-overlay">

      <header className="glass-panel sticky top-0 z-50 border-b-2 border-ink">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3">
          <span className="font-poster text-2xl tracking-tight">FEEDWALKERS™</span>
          <nav className="hidden gap-6 font-mono text-xs uppercase md:flex">
            <a href="#work" className="hover:text-shock">
              work
            </a>
            <a href="#memes" className="hover:text-shock">
              memes
            </a>
            <a href="#aura" className="hover:text-shock">
              aura
            </a>

            <a href="#services" className="hover:text-shock">
              services
            </a>
            <a href="#lore" className="hover:text-shock">
              lore
            </a>
          </nav>
          <a
            href="#contact"
            className="border-2 border-ink bg-acid px-3 py-1.5 font-mono text-xs uppercase text-ink hover:bg-shock hover:text-background"
          >
            start a thing
          </a>
        </div>
      </header>

      <section className="overflow-hidden border-b-2 border-ink px-5 pt-10 pb-6">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            est. terminally online — marketing / design / editing
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="headline-stack font-poster text-[clamp(3.5rem,13vw,11rem)]">
                <span className="reveal block">WE MAKE</span>
                <span className="reveal outline-type block glitch-hover">BRANDS</span>
                <span className="reveal block">
                  GO{" "}
                  <span className="inline-block bg-shock px-3 leading-[0.85] text-background tilt-hover">
                    FERAL
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-lg font-body text-lg leading-snug">
                A concept-art studio for companies who realised the algorithm doesn't read your
                brand guidelines. We build the campaign, draw the world, and cut the edit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="hard-shadow border-2 border-ink bg-acid px-6 py-3 font-display text-xl uppercase text-ink"
                >
                  See the damage
                </a>
                <a
                  href="#contact"
                  className="glass-chip border-2 border-ink px-6 py-3 font-display text-xl uppercase"
                >
                  Send a brief
                </a>
              </div>
            </div>
            <figure className="reveal relative float-slow">
              <img
                ref={heroRef}
                src={heroCollage}
                alt="Chrome and halftone concept art collage in acid green and hot pink"
                width={1280}
                height={1280}
                className="hard-shadow-acid w-full border-2 border-ink object-cover will-change-transform"
              />
              <figcaption className="mt-2 font-mono text-[10px] uppercase text-muted-foreground">
                fig. 01 — internal moodboard, leaked on purpose
              </figcaption>
            </figure>

          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b-2 border-ink bg-ink py-3">
        <div className="marquee-track whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="px-5 font-poster text-3xl uppercase text-background md:text-5xl"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <section id="services" className="border-b-2 border-ink px-5 py-16">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="reveal text-[clamp(2.5rem,7vw,6rem)]">Four things, done loudly</h2>
          <div className="mt-10 grid gap-0 border-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <article
                key={s.n}
                className={`reveal glass-chip tilt-hover p-7 ${i < 3 ? "border-b-2 border-ink lg:border-b-0 lg:border-r-2" : ""} ${i === 0 ? "sm:border-r-2" : ""} ${i === 2 ? "sm:border-r-2" : ""}`}
              >


                <span className="font-mono text-xs text-shock">{s.n}</span>
                <h3 className="mt-3 text-5xl">{s.title}</h3>
                <p className="mt-4 text-base leading-snug text-muted-foreground">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="border-2 border-ink bg-acid px-2 py-0.5 font-mono text-[10px] uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="overflow-hidden border-b-2 border-ink px-5 py-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="reveal text-[clamp(2.5rem,7vw,6rem)]">Selected chaos</h2>
            <p className="font-mono text-xs uppercase text-muted-foreground">2024 — 2026</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {work.map((w, i) => (
              <div key={w.title} ref={workRefs[i]} className="will-change-transform">
                <article className={`reveal tilt-hover ${i === 1 ? "md:mt-16" : ""}`}>

                  <img
                    src={w.img}
                    alt={`${w.title} concept art for ${w.client}`}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="w-full border-2 border-ink object-cover"
                  />
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <h3 className="text-3xl">{w.title}</h3>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">
                      {w.tag}
                    </span>
                  </div>
                  <p className="font-serif text-xl italic">{w.client}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MemeWall />

      <section id="aura" className="overflow-hidden border-b-2 border-ink px-5 py-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)]">
              What's your <span className="font-serif italic normal-case">aura</span>?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-snug">
              Five questions. One number. It decides whether your feed gets screenshotted or
              scrolled past. No email required, we're not monsters.
            </p>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              scoring model: vibes, peer-reviewed
            </p>
          </div>
          <AuraCalculator />
        </div>
      </section>



      <section id="lore" className="overflow-hidden border-b-2 border-ink px-5 py-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden border-2 border-ink">
            <img
              ref={zineRef}
              src={zineTexture}
              alt="Acid green zine collage with pink smiley stickers and tape"
              loading="lazy"
              width={1024}
              height={768}
              className="h-full w-full scale-110 object-cover will-change-transform"
            />
          </div>
          <div>
            <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)]">
              We speak fluent <span className="font-serif italic normal-case">irony</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-snug">
              Half the studio grew up posting, the other half grew up printing. That mix is the
              whole product: work that survives a screenshot and still holds up framed on a wall.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-px border-2 border-ink bg-ink sm:grid-cols-4">
              {[
                ["412M", "views cooked"],
                ["68", "brands rewired"],
                ["0", "stock photos"],
                ["24h", "meme turnaround"],
              ].map(([k, v]) => (
                <div key={v} className="bg-background p-4">
                  <dt className="font-poster text-4xl">{k}</dt>
                  <dd className="font-mono text-[10px] uppercase text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-ink px-5 py-20 text-background">
        <div
          ref={contactBlobRef}
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-shock/40 blur-3xl will-change-transform"
        />
        <div
          ref={auraBlobRef}
          aria-hidden
          className="drift-x pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-acid/30 blur-3xl will-change-transform"

        />
        <div className="relative mx-auto max-w-[1500px]">
          <h2 className="headline-stack font-poster text-[clamp(3rem,11vw,9rem)] text-background">
            <span className="reveal block">got a brief?</span>
            <span className="reveal block text-acid glitch-hover">post it to us</span>
          </h2>


          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="max-w-sm text-lg leading-snug opacity-80">
                Fill it in, drop your deck, and we'll come back with a plan, a price in rupees, and
                at least one idea your legal team will question.
              </p>
              <a
                href="mailto:yk@feedwalkers.com"
                className="mt-8 inline-block border-2 border-acid bg-shock px-6 py-3 font-display text-xl uppercase text-background"
              >
                yk@feedwalkers.com
              </a>

            </div>
            <div className="text-foreground">
              <ContactForm />
            </div>
          </div>

          <p className="mt-14 font-mono text-[10px] uppercase opacity-60">
            © 2026 feedwalkers studio — no cringe, ever
          </p>
        </div>
      </section>
    </div>
  );
}
