const PLACEHOLDER = "[add_telegram_channel_username]";

export default function TelegramEmbed({ handle }: { handle: string }) {
  if (!handle || handle === PLACEHOLDER) {
    return (
      <div className="flex h-[520px] flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 text-center">
        <p className="text-[13.5px] text-muted">
          Telegram channel not connected yet.
        </p>
        <p className="mt-2 max-w-xs text-[12.5px] text-faint">
          Set <code className="font-mono">telegramChannel.handle</code> in{" "}
          <code className="font-mono">lib/data.ts</code> to your public
          channel username to show live posts here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <iframe
        src={`https://t.me/s/${handle}`}
        title={`@${handle} on Telegram`}
        loading="lazy"
        className="h-[560px] w-full bg-surface"
      />
    </div>
  );
}
