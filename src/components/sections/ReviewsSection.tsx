"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Review = {
  label: string;
  switchLabel: string;
  source: string;
  scenario: string;
  title: string;
  text: string;
  tag: string;
  images: string[];
};

const OZON_PRODUCT_URL =
  "https://www.ozon.ru/product/parovaya-shvabra-s-nasadkami-dlya-uborki-doma-i-mytya-polov-moshchnaya-2303820453/";

const REVIEWS: Review[] = [
  {
    label: "Отзыв 1",
    switchLabel: "Полы и духовка",
    source: "Отзыв с Ozon",
    scenario: "Полы, духовой шкаф и насадки",
    title: "Хорошо моет полы и быстро справляется со шкафом",
    text:
      "Товар очень понравился. Справляется со своими функциями, полы моет хорошо. Также духовой шкаф отмыл на ура и за короткое время, паровой удар хороший. Буду тестировать насадки для мытья окон. Уверена, что и в этом не разочаруюсь.",
    tag: "Полы и духовой шкаф",
    images: [
      "/images/reviews/review-3-1.jpg",
      "/images/reviews/review-3-2.jpg",
      "/images/reviews/review-3-3.jpg",
    ],
  },
  {
    label: "Отзыв 2",
    switchLabel: "Сложные зоны",
    source: "Отзыв с Ozon",
    scenario: "Труднодоступные места и кухня",
    title: "На сложных участках заметно экономит время",
    text:
      'Швабра пришла хорошо упакованная, без повреждений, инструкция очень понятная. Заказала для очистки труднодоступных мест в доме: для пробы сначала очистила заляпанное зеркало, полку в разводах и стенку шкафа, испачканную двусторонним скотчем. В "ручном" применении она слегка тяжеловата, и трубка не очень длинная, поэтому корпус всё же приходится держать в руках, но довольно быстро и легко всё чистит. Я точно минут 40 сэкономила на местах, которые до этого мыла бы тряпкой или щёткой. На въевшейся грязи приходится подержать подольше, но всё равно это быстрее, чем тереть вручную. Плюс легче чистить углы, изгибы мебели и стыки. На кухне с жирными пятнами сначала опрыскала средством, потом прошлась с паром — так оказалось быстрее. Боялась, что бака будет хватать ненадолго, но даже на режиме обильной подачи пара его хватает на пару-тройку задач. Считаю, что соотношение цены и качества очень хорошее.',
    tag: "Труднодоступные места",
    images: [
      "/images/reviews/review-2-2.jpg",
      "/images/reviews/review-2-3.jpg",
      "/images/reviews/review-2-1.jpg",
    ],
  },
  {
    label: "Отзыв 3",
    switchLabel: "Полы и кухня",
    source: "Отзыв с Ozon",
    scenario: "Первые дни использования",
    title: "Сразу после покупки пошла в работу",
    text:
      "Вчера забрала. Принесла домой и сразу в работу. Перемыла все полы в трёх комнатах, почистила вытяжку, вентиляционные решётки, газовую плиту. Сегодня полностью отмыла плитку в ванной комнате. И всё это с удовольствием и с небольшими усилиями. Покупкой довольна.",
    tag: "Полы, кухня и ванная",
    images: [
      "/images/reviews/review-1-2.jpg",
      "/images/reviews/review-1-1.jpg",
    ],
  },
] as const;

export default function ReviewsSection() {
  const [activeReview, setActiveReview] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const review = REVIEWS[activeReview];
  const galleryImages = review.images.length >= 3
    ? review.images.slice(0, 3)
    : [...review.images, ...Array.from({ length: 3 - review.images.length }, () => review.images[0])];
  const thumbnailIndices = [0, 1, 2].filter((index) => index !== activePhoto).slice(0, 2);

  const goToReview = (index: number) => {
    setActiveReview(index);
    setActivePhoto(0);
  };

  const showPrevReview = () => {
    goToReview((activeReview - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const showNextReview = () => {
    goToReview((activeReview + 1) % REVIEWS.length);
  };

  const showPrevPhoto = () => {
    setActivePhoto((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section id="reviews" className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5">
            <Star size={13} className="fill-zinc-900 text-zinc-900" />
            <span className="text-xs font-semibold text-zinc-700">
              Реальные отзывы покупателей
            </span>
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Реальные фото и впечатления после первых уборок дома
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Собрали живые отзывы с Ozon, где видно не только результат, но и сам
            сценарий использования: полы, кухня, сложные зоны и первые впечатления
            после покупки.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-6 shadow-[0_30px_100px_-60px_rgba(24,24,27,0.35)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600">
                <Quote size={13} className="text-zinc-500" />
                {review.tag}
              </span>
              <div className="flex items-center gap-1 text-zinc-900">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={14} className="fill-zinc-900 text-zinc-900" />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">
                {review.source}
              </p>
              <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                {review.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
                {review.text}
              </p>
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-5">
              <p className="text-base font-semibold text-zinc-900">{review.scenario}</p>
              <p className="mt-1 text-sm text-zinc-500">
                Отзыв {String(activeReview + 1).padStart(2, "0")} из {String(REVIEWS.length).padStart(2, "0")}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={showPrevReview}
                aria-label="Предыдущий отзыв"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors duration-200 hover:border-zinc-900 hover:text-zinc-900"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={showNextReview}
                aria-label="Следующий отзыв"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition-colors duration-200 hover:border-zinc-900 hover:text-zinc-900"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex flex-wrap gap-2">
                {REVIEWS.map((item, index) => (
                  <button
                    key={`${item.label}-${index}`}
                    type="button"
                    onClick={() => goToReview(index)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                      index === activeReview
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                    )}
                  >
                    {item.switchLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-200 bg-zinc-50 p-4 shadow-[0_30px_100px_-60px_rgba(24,24,27,0.28)] sm:p-5">
            <div className="relative overflow-hidden rounded-[28px] bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={galleryImages[activePhoto]}
                  alt={`${review.source} — фото ${activePhoto + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              {galleryImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrevPhoto}
                    aria-label="Предыдущее фото"
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-zinc-700 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    aria-label="Следующее фото"
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-zinc-700 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              ) : null}

              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur-sm">
                Фото {activePhoto + 1} / {galleryImages.length}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {thumbnailIndices.map((index) => (
                <button
                  key={`${galleryImages[index]}-${index}`}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  className={cn(
                    "relative overflow-hidden rounded-[22px] border bg-white text-left transition-all duration-200",
                    "border-zinc-200 hover:border-zinc-400"
                  )}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={galleryImages[index]}
                      alt={`${review.source} — превью ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <Link
            href={OZON_PRODUCT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-6 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:border-zinc-900 hover:bg-white"
          >
            Смотреть отзывы на Ozon
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
