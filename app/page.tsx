import { BeforeAfter } from "@/components/before-after";
import { Challenge } from "@/components/challenge";
import { DougVideo } from "@/components/doug-video";
import { FinalClose } from "@/components/final-close";
import { Hero } from "@/components/hero";
import { Divider } from "@/components/layout-bits";
import { OperatingSystem } from "@/components/operating-system";
import { ProgramProof } from "@/components/program-proof";
import { ProofRibbon } from "@/components/proof-ribbon";
import { QualificationForm } from "@/components/qualification-form";
import { Scope } from "@/components/scope";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { WhoThisIsFor } from "@/components/who-this-is-for";

export default function Home() {
  return (
    <>
      <a
        href="#review"
        className="skip-link sr-only left-4 top-4 z-[60] rounded-md bg-primary px-3 py-2 text-primary-foreground focus:z-[60]"
      >
        Skip to qualification
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <ProofRibbon />
        <DougVideo />
        <Divider />
        <Challenge />
        <OperatingSystem />
        <ProgramProof />
        <BeforeAfter />
        <Scope />
        <WhoThisIsFor />
        <QualificationForm />
        <FinalClose />
      </main>
      <SiteFooter />
      <StickyCta />
    </>
  );
}
