import { Download, FileText } from "lucide-react";

const MANUAL_FILE_PATH = "/manuals/instrukcia.pdf";
const MANUAL_FILE_NAME = "Руководство пользователя UNOUN";

export default function InstructionSection() {
  return (
    <section id="instruction" className="w-full bg-[#f7f5f2] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Инструкция
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                Скачать руководство
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
              В этом блоке можно скачать PDF с полной инструкцией по
              использованию и уходу за паровой шваброй.
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-8">
            <a
              href={MANUAL_FILE_PATH}
              download
              className="group inline-flex w-full max-w-2xl items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition-all duration-150 hover:border-zinc-300 hover:shadow-md"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
                  <FileText size={22} strokeWidth={1.8} />
                </span>
                <span className="truncate text-left text-base font-medium text-zinc-800 sm:text-[1.75rem] sm:leading-none">
                  {MANUAL_FILE_NAME}
                </span>
              </span>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-transform duration-150 group-hover:scale-105">
                <Download size={20} strokeWidth={1.8} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
