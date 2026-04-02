import SplashScreen from "@/components/sections/SplashScreen";
import HeroSection from "@/components/sections/HeroSection";
import DescriptionSection from "@/components/sections/DescriptionSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import NozzlesSection from "@/components/sections/NozzlesSection";
import AccessoriesPreviewSection from "@/components/sections/AccessoriesPreviewSection";
import SpecsSection from "@/components/sections/SpecsSection";
import LandingCtaSection from "@/components/sections/LandingCtaSection";
import InstructionSection from "@/components/sections/InstructionSection";
import FaqSection from "@/components/sections/FaqSection";
import FadeInSection from "@/components/ui/FadeInSection";
import type { HeroSectionProps } from "@/components/sections/HeroSection";

type SteamMopLandingPageProps = {
  showSplash?: boolean;
  showReviews?: boolean;
  heroProps?: HeroSectionProps;
};

export default function SteamMopLandingPage({
  showSplash = true,
  showReviews = true,
  heroProps,
}: SteamMopLandingPageProps) {
  return (
    <>
      {showSplash ? <SplashScreen /> : null}

      <FadeInSection delay={0}>
        <HeroSection {...heroProps} />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <DescriptionSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <UseCasesSection />
      </FadeInSection>

      {showReviews ? (
        <FadeInSection delay={0.1}>
          <ReviewsSection />
        </FadeInSection>
      ) : null}

      <FadeInSection delay={0.1}>
        <NozzlesSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <AccessoriesPreviewSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <SpecsSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <LandingCtaSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <InstructionSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <FaqSection />
      </FadeInSection>
    </>
  );
}
