"use client";

export default function ProfileImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/profile-placeholder.svg";
      }}
    />
  );
}
