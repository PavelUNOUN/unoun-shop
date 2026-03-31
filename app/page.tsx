import SplashScreen from "@/components/sections/SplashScreen";
import HeroSection from "@/components/sections/HeroSection";
import DescriptionSection from "@/components/sections/DescriptionSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import NozzlesSection from "@/components/sections/NozzlesSection";
import AccessoriesPreviewSection from "@/components/sections/AccessoriesPreviewSection";
import SpecsSection from "@/components/sections/SpecsSection";
import LandingCtaSection from "@/components/sections/LandingCtaSection";
import InstructionSection from "@/components/sections/InstructionSection";
import FaqSection from "@/components/sections/FaqSection";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Home() {
  return (
    <>
      {/* Splash — полноэкранный вводный экран со шваброй и паром */}
      <SplashScreen />

      {/* Hero — без delay, появляется сразу при загрузке */}
      <FadeInSection delay={0}>
        <HeroSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <DescriptionSection />
      </FadeInSection>

      <FadeInSection delay={0.1}>
        <UseCasesSection />
      </FadeInSection>

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
