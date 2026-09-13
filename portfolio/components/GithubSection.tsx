import { contact } from "@/lib/data";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import Reveal from "@/components/Reveal";

export default function GithubSection() {
  const hasGithub = contact.githubUsername && !contact.githubUsername.startsWith("add-");
  const githubUrl = hasGithub ? `https://github.com/${contact.githubUsername}` : null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl text-ink md:text-4xl">GitHub</h2>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-signal hover:opacity-80"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            @{contact.githubUsername}
            <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>

      <Reveal className="mt-8">
        {githubUrl ? (
          <div className="overflow-x-auto rounded-xl border border-line bg-surface p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/4FD1C5/${contact.githubUsername}`}
              alt={`${contact.githubUsername}'s GitHub contribution graph`}
              loading="lazy"
              className="min-w-[640px]"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line bg-surface p-8 text-center">
            <SiGithub className="mx-auto h-6 w-6 text-faint" aria-hidden="true" />
            <p className="mt-3 text-[13.5px] text-muted">
              Contribution graph connects automatically once{" "}
              <code className="font-mono text-[12.5px]">contact.githubUsername</code> is
              set in <code className="font-mono text-[12.5px]">lib/data.ts</code>.
            </p>
          </div>
        )}
      </Reveal>
    </section>
  );
}
