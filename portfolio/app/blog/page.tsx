import { telegramChannel, blogHighlights, contact } from "@/lib/data";
import TelegramEmbed from "@/components/TelegramEmbed";
import ShareRow from "@/components/ShareRow";

export const metadata = {
  title: "Blog — Sisay Tadewos",
  description: "Build notes and engineering updates, posted first to Telegram.",
};

export default function BlogPage() {
  const channelUrl = `https://t.me/${telegramChannel.handle}`;

  return (
    <div>
      <header className="border-b border-line">
        <div className="mx-auto max-w-content px-6 pb-14 pt-16 md:px-10 md:pt-20">
          <p className="font-mono text-[13px] text-signal">Build log</p>
          <h1 className="mt-4 font-display text-3xl text-ink md:text-5xl">
            Notes from whatever I&rsquo;m building
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted">
            Short, unpolished updates — architecture decisions, bugs that
            taught me something, and progress on active projects. Posted
            first to Telegram, mirrored here.
          </p>
          <a
            href={channelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-[14px] font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Follow {telegramChannel.displayName} on Telegram
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 className="font-display text-xl text-ink">Highlighted posts</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Curated updates worth reading even if you don&rsquo;t follow the
              channel. Each one links back to the original Telegram post.
            </p>

            {blogHighlights.length === 0 ? (
              <div className="mt-8 rounded-xl border border-dashed border-line p-6 text-[13.5px] leading-relaxed text-faint">
                No highlighted posts yet. Add entries to{" "}
                <code className="font-mono text-[12.5px] text-muted">
                  blogHighlights
                </code>{" "}
                in <code className="font-mono text-[12.5px] text-muted">lib/data.ts</code>{" "}
                once the channel is live — this section renders automatically.
              </div>
            ) : (
              <div className="mt-8 space-y-8">
                {blogHighlights.map((post) => (
                  <article key={post.telegramUrl} className="border-t border-line pt-6">
                    <p className="font-mono text-[12px] text-faint">{post.date}</p>
                    <h3 className="mt-2 text-[15.5px] font-medium text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <ShareRow url={post.telegramUrl} title={post.title} />
                  </article>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Live from Telegram</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              This panel streams the public channel directly — new posts show
              up here with no rebuild needed.
            </p>
            <div className="mt-8">
              <TelegramEmbed handle={telegramChannel.handle} />
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-faint">
              Setup note: replace{" "}
              <code className="font-mono text-[11.5px]">
                telegramChannel.handle
              </code>{" "}
              in <code className="font-mono text-[11.5px]">lib/data.ts</code> with your
              public channel&rsquo;s username (the part after t.me/). The
              channel must be public for the embed to render.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-6 py-16 text-center md:px-10 md:py-20">
          <h2 className="font-display text-2xl text-ink md:text-3xl">
            Prefer a direct line?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] text-muted">
            Reach out for project work, technical collaboration, or just to
            talk through a system design.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-6 inline-flex items-center gap-2 text-[14.5px] text-signal hover:opacity-80"
          >
            {contact.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
