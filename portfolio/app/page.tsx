import Link from "next/link";
import WorkLog from "@/components/WorkLog";
import Reveal from "@/components/Reveal";
import GithubSection from "@/components/GithubSection";
import ProfileImage from "@/components/ProfileImage";
import { techIconMap } from "@/lib/icons";
import {
  projects,
  experience,
  education,
  stack,
  philosophy,
  contact,
  profileImageUrl,
} from "@/lib/data";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_20%_0%,black,transparent)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-content px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
          <div className="rise-in max-w-3xl">
            <p className="mb-6 font-mono text-[13px] text-signal">
              Full-Stack Engineer &amp; AI Engineer
            </p>
            <h1 className="font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight text-ink text-balance md:text-[3.4rem]">
              I build the backend, the agents, and the safety rails around them.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted md:text-[17px]">
              I design and ship production systems that combine conventional
              backend engineering with LLMs, RAG, and multi-agent workflows —
              most recently a national-scale, offline-first AI platform used
              by roughly five thousand health workers with no reliable
              internet connection.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#work"
                data-cursor="link"
                className="rounded-full bg-signal px-6 py-3 text-[14px] font-medium text-bg transition-transform hover:scale-[1.02]"
              >
                View Projects
              </Link>
              <a
                href={`mailto:${contact.email}`}
                data-cursor="link"
                className="rounded-full border border-line px-6 py-3 text-[14px] text-ink transition-colors hover:border-signal hover:text-signal"
              >
                Let&rsquo;s Talk
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="text-[14px] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={contact.upwork}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="text-[14px] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Upwork
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {[
              { label: "Health workers served, offline-first", value: "~5,000" },
              { label: "Unsafe AI outputs caught pre-delivery", value: "~98%" },
              { label: "Concurrent requests, 99.9% uptime", value: "500+" },
              { label: "Median API response time", value: "<200ms" },
            ].map((s) => (
              <div key={s.label} className="bg-bg px-5 py-5">
                <p className="font-display text-2xl text-ink">{s.value}</p>
                <p className="mt-1 text-[12px] leading-snug text-faint">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="work" className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">Selected work</h2>
            <p className="mt-3 max-w-lg text-[15px] text-muted">
              Three systems, in the order I&rsquo;d walk a CTO through them.
              Expand a row for the shape of the architecture, or open the
              full case study.
            </p>
          </div>
        </div>

        <WorkLog projects={featured} />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What I build                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl text-ink md:text-4xl">What I build</h2>
          <Reveal className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {[
              {
                title: "AI systems",
                body: "LLMs, RAG pipelines, multi-agent orchestration, hybrid semantic + graph retrieval, and the deterministic guardrails that make model output trustworthy enough for production.",
                tags: ["LangGraph", "RAG", "Vector search", "Agent routing"],
              },
              {
                title: "Backend systems",
                body: "APIs and services designed for real load: async processing, background workers, real-time channels, and failure modes that are handled on purpose, not by accident.",
                tags: ["FastAPI", "Django", "Celery", "WebSockets"],
              },
              {
                title: "Full-stack applications",
                body: "Product surfaces — web, mobile, and internal tooling — built against a single shared API so business logic lives in one place instead of three.",
                tags: ["Next.js", "React", "Flutter", "TypeScript"],
              },
              {
                title: "System architecture",
                body: "Boundaries between domain logic and infrastructure that let a system take on new capability without breaking what already works in production.",
                tags: ["Clean Architecture", "DDD", "Event-driven", "Microservices"],
              },
            ].map((block) => (
              <div key={block.title} className="border-t border-line pt-6">
                <h3 className="font-display text-lg text-ink">{block.title}</h3>
                <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-muted">
                  {block.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {block.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Engineering philosophy                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          How I approach engineering
        </h2>
        <Reveal className="mt-12 grid gap-8 md:grid-cols-2">
          {philosophy.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              <div>
                <h3 className="text-[15px] font-medium text-ink">{p.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Experience timeline                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="experience" className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
          <h2 className="font-display text-3xl text-ink md:text-4xl">Experience</h2>

          <div className="mt-12 border-l border-line pl-8">
            {experience.map((role) => (
              <div key={`${role.org}-${role.period}`} className="relative pb-14 last:pb-0">
                <span
                  className="absolute -left-[2.32rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-signal"
                  aria-hidden="true"
                />
                <p className="font-mono text-[12.5px] text-faint">{role.period}</p>
                <h3 className="mt-2 font-display text-xl text-ink">{role.role}</h3>
                <p className="mt-1 text-[14px] text-muted">
                  {role.org} · {role.location}
                </p>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                  {role.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-faint"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${role.projectSlug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-signal hover:opacity-80"
                >
                  Related case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 border-t border-line pt-10 md:grid-cols-2">
            {education.map((e) => (
              <div key={e.degree}>
                <p className="font-mono text-[12.5px] text-faint">{e.period}</p>
                <h3 className="mt-1.5 text-[15px] font-medium text-ink">{e.degree}</h3>
                <p className="mt-1 text-[13.5px] text-muted">{e.org}</p>
                {e.detail && <p className="mt-1 text-[13px] text-faint">{e.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Technical stack                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-display text-3xl text-ink md:text-4xl">Technical stack</h2>
        <Reveal className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group) => (
            <div key={group.group}>
              <h3 className="text-[13px] font-medium text-faint">{group.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const Icon = techIconMap[item];
                  return (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[12.5px] text-muted"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      <GithubSection />

      {/* ---------------------------------------------------------------- */}
      {/* About                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="border-t border-line">
        <div className="mx-auto grid max-w-content gap-10 px-6 py-20 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-28">
          <div>
            <h2 className="font-display text-3xl text-ink md:text-4xl">About</h2>
            <div className="mt-8 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl border border-line bg-surface">
              <ProfileImage
                src={profileImageUrl}
                alt="Sisay Tadewos"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-2xl space-y-5 text-[15.5px] leading-relaxed text-muted">
            <p>
              I work at the point where backend engineering and AI engineering
              meet — the part of a system where an LLM call stops being a
              demo and has to become something you can actually depend on.
              That means grounding, validation, retrieval design, and the
              unglamorous plumbing that keeps a system correct when the
              network, the data, or the model itself misbehaves.
            </p>
            <p>
              Most of my recent work has been under real constraints:
              intermittent connectivity, thousands of concurrent users, and
              decisions where a wrong answer has actual consequences. I like
              that kind of constraint — it forces the engineering to be
              honest rather than aesthetic.
            </p>
            <p>
              Outside of shipped systems, I spend time in research —
              currently generative programming and structured generation —
              and in pulling apart why a given architecture works, not just
              that it does.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
