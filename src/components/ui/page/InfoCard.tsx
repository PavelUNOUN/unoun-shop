import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function InfoCard({
  title,
  description,
  eyebrow,
  className,
  children,
}: InfoCardProps) {
  return (
    <article
      className={cn(
        "rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_-52px_rgba(24,24,27,0.35)]",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
          {eyebrow}
        </p>
      ) : null}

      <h3 className="text-xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
        {description}
      </p>

      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}
