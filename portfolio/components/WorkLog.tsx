"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/data";

const statusStyles: Record<Project["status"], string> = {
  "In Production": "text-signal border-signal/40 bg-signal/10",
  Completed: "text-muted border-line bg-surface2",
  "Research Prototype": "text-amber border-amber/40 bg-amber/10",
};

function StatusTag({ status }: { status: Project["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      {status === "In Production" && (
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}

export default function WorkLog({ projects }: { projects: Project[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(projects[0]?.slug ?? null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {projects.map((project, i) => {
        const isOpen = openSlug === project.slug;
        return (
          <div key={project.slug}>
            <button
              type="button"
              onClick={() => setOpenSlug(isOpen ? null : project.slug)}
              aria-expanded={isOpen}
              data-cursor="project"
              data-cursor-label="View"
              className="group flex w-full flex-col gap-3 py-7 text-left md:flex-row md:items-center md:gap-8 md:py-8"
            >
              <span className="font-mono text-[13px] text-faint md:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <StatusTag status={project.status} />
                  <span className="text-[12px] text-faint">{project.period}</span>
                </div>
                <h3 className="font-display text-xl text-ink transition-colors group-hover:text-signal md:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-1.5 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                  {project.oneLiner}
                </p>
              </div>

              <div className="hidden shrink-0 flex-wrap gap-1.5 md:flex md:w-56 md:justify-end">
                {project.categories.slice(0, 2).map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <span
                className={`hidden shrink-0 text-muted transition-transform md:inline-block ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div className={`details-panel ${isOpen ? "is-open" : ""}`}>
              <div>
                <div className="grid gap-8 pb-9 pl-0 md:grid-cols-[1fr_1fr] md:pl-[3.25rem]">
                  <div>
                    <p className="mb-2 text-[13px] text-faint">{project.org}</p>
                    <p className="text-[14.5px] leading-relaxed text-muted">
                      {project.sections.solution}
                    </p>
                    <Link
                      href={`/projects/${project.slug}`}
                      data-cursor="link"
                      className="mt-4 inline-flex items-center gap-2 text-[13.5px] text-signal transition-opacity hover:opacity-80"
                    >
                      Read the full case study
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <div>
                    <p className="mb-3 text-[13px] text-faint">Architecture</p>
                    <ol className="space-y-1.5">
                      {project.architecture.slice(0, 5).map((layer, idx) => (
                        <li
                          key={layer.label}
                          className="flex items-center gap-2.5 font-mono text-[12.5px] text-muted"
                        >
                          <span className="text-faint">{idx + 1}</span>
                          {layer.label}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.metrics.slice(0, 3).map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-line bg-surface px-3 py-2"
                        >
                          <p className="font-display text-base text-ink">{m.value}</p>
                          <p className="text-[11px] text-faint">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
