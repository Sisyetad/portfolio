import { contact } from "@/lib/data";
import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiUpwork } from "react-icons/si";
import VisitorCounter from "@/components/VisitorCounter";

export default function SiteFooter() {
  const hasGithub = contact.githubUsername && !contact.githubUsername.startsWith("add-");
  const githubUrl = hasGithub ? `https://github.com/${contact.githubUsername}` : null;

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl leading-snug text-ink text-balance md:text-3xl">
              Have a system worth building properly?
            </p>
            <p className="mt-2 text-[14.5px] text-muted">
              Available for collaboration and development work.
            </p>
            <a
              href={`mailto:${contact.email}`}
              data-cursor="link"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-[14px] font-medium text-bg transition-transform hover:scale-[1.02]"
            >
              <FiMail className="h-4 w-4" aria-hidden="true" />
              Let&rsquo;s Work &mdash; {contact.email}
            </a>
          </div>

          <div className="text-[14px] text-muted">
            <p className="mb-3 text-ink">Elsewhere</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                {githubUrl ? (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                  >
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-faint">
                    <SiGithub className="h-4 w-4" aria-hidden="true" />
                    [Add GitHub username]
                  </span>
                )}
              </li>
              <li>
                <a
                  href={contact.upwork}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <SiUpwork className="h-4 w-4" aria-hidden="true" />
                  Upwork
                </a>
              </li>
              <li>
                <a href="/blog" data-cursor="link" className="transition-colors hover:text-ink">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="text-[14px] text-muted">
            <p className="mb-3 text-ink">Based in</p>
            <p>{contact.location}</p>
            <p className="mt-1">{contact.phone}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[12px] text-faint md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© {new Date().getFullYear()} Sisay Tadewos.</p>
            <VisitorCounter />
          </div>
          <div className="flex items-center gap-4">
            <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
            {/* easter egg — deliberately unlabeled and low-contrast */}
            <a
              href="/play"
              data-cursor="link"
              aria-label="?"
              className="text-faint/70 transition-colors hover:text-signal"
            >
              ·
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
