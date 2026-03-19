import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  badge,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-zinc-100 bg-white pt-28 md:pt-36",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <div className="max-w-3xl">
          {badge ? (
            <div className="mb-5 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
              <span className="text-xs font-semibold text-zinc-600">{badge}</span>
            </div>
          ) : null}

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {eyebrow}
          </p>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
