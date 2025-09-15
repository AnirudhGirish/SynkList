"use client";
import React, { useState } from "react";
import Modal from "./components/modal/Modal";
import JoinWaitlistForm from "./components/modal/JoinWaitlist";
import Hero from "./components/hero/Hero";
import IntegrationsMarquee from "./components/sections/IntegrationsMarquee";

import ProblemShowcase from "./components/sections/PrblmShowcase";
import FeatureMatrix from "./components/sections/FeatureMatrix";
import SecurityPanel from "./components/sections/Security";
import EarlyAccessBenefits from "./components/sections/Early";
import CompetitiveEdge from "./components/sections/Competetive";
import SystemFlowDiagram from "./components/sections/Connection";
import HowItWorks from "./components/sections/Working";
import ScrollToTopCircle from "@/components/Scroll";
import KeyScroller from "@/components/KeyScroll";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <KeyScroller disabled={isModalOpen} amountPx={260}/>
      <Hero onOpenWaitlist={() => setIsModalOpen(true)} />

      <SystemFlowDiagram />
      <CompetitiveEdge onOpenWaitlist={() => setIsModalOpen(true)} />
      <IntegrationsMarquee />
      <div className="hidden lg:block">
        <HowItWorks onOpenWaitlist={() => setIsModalOpen(true)} />
      </div>
      <SecurityPanel />
      <ProblemShowcase onOpenWaitlist={() => setIsModalOpen(true)} />
      <FeatureMatrix />
      <EarlyAccessBenefits onOpenWaitlist={() => setIsModalOpen(true)} />

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <JoinWaitlistForm />
      </Modal>
      <div className="hidden lg:block">
        <ScrollToTopCircle />
      </div>
    </div>
  );
};

export default Home;
