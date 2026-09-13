import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { techIconMap } from "@/lib/icons";
import ArchitectureFlow from "@/components/ArchitectureFlow";

// `params` is typed as a Promise to match Next.js 15+, which requires it to
// be awaited. `await`-ing a plain object (as Next.js 14 passes) is also a
// safe no-op, so this works unmodified on either major version.
type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Sisay Tadewos`,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const { sections } = project;

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-content px-6 pb-14 pt-16 md:px-10 md:pt-20">
          <Link
            href="/#work"
            data-cursor="link" className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-ink"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-2.5 py-1 text-[11.5px] text-muted"
              >
                {c}
              </span>
            ))}
            <span className="rounded-full border border-signal/40 bg-signal/10 px-2.5 py-1 text-[11.5px] text-signal">
              {project.status}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-3xl leading-tight text-ink text-balance md:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted">
            {project.oneLiner}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[13.5px] text-faint">
            <span>{project.role}</span>
            <span>{project.org}</span>
            <span>{project.period}</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-14">
            <section>
              <h2 className="font-display text-xl text-ink">Overview</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{sections.overview}</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">Problem</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{sections.problem}</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">Solution</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{sections.solution}</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-ink">My role</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{sections.role}</p>
            </section>

            {sections.challenges.length > 0 && (
              <section>
                <h2 className="font-display text-xl text-ink">Engineering challenges</h2>
                <div className="mt-6 space-y-7">
                  {sections.challenges.map((c) => (
                    <div key={c.heading} className="border-l-2 border-line pl-5">
                      <h3 className="text-[14.5px] font-medium text-ink">{c.heading}</h3>
                      {c.body.map((p, i) => (
                        <p key={i} className="mt-2 text-[14.5px] leading-relaxed text-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sections.decisions.length > 0 && (
              <section>
                <h2 className="font-display text-xl text-ink">Technical decisions</h2>
                <div className="mt-6 space-y-7">
                  {sections.decisions.map((d) => (
                    <div key={d.heading} className="border-l-2 border-signal/40 pl-5">
                      <h3 className="text-[14.5px] font-medium text-ink">{d.heading}</h3>
                      {d.body.map((p, i) => (
                        <p key={i} className="mt-2 text-[14.5px] leading-relaxed text-muted">
                          {p}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-display text-xl text-ink">Results</h2>
              <ul className="mt-5 space-y-3">
                {sections.results.map((r, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-10 md:sticky md:top-24 md:self-start">
            <ArchitectureFlow layers={project.architecture} />

            <div>
              <p className="mb-3 text-[12px] text-faint">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => {
                  const Icon = techIconMap[s];
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[12px] text-muted"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>

            {project.metrics.length > 0 && (
              <div>
                <p className="mb-3 text-[12px] text-faint">Impact</p>
                <div className="grid grid-cols-2 gap-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-line bg-surface px-3 py-2.5">
                      <p className="font-display text-[15px] text-ink">{m.value}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-faint">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 text-[13.5px]">
              {project.links.demo ? (
                <a href={project.links.demo} target="_blank" rel="noreferrer" data-cursor="link" className="text-signal hover:opacity-80">
                  View demo →
                </a>
              ) : (
                <span className="text-faint">[Add project demo URL]</span>
              )}
              {project.links.repo ? (
                <a href={project.links.repo} className="text-signal hover:opacity-80">
                  View repository →
                </a>
              ) : (
                <span className="text-faint">
                  {project.categories.includes("Client Work")
                    ? "Repository private — client engagement"
                    : "[Add repository URL]"}
                </span>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
