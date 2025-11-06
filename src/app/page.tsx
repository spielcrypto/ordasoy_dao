"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PlantationCompanyDocsSection from "@/components/sections/PlantationCompanyDocsSection";
import PlantationCompanyManagementSection from "@/components/sections/PlantationCompanyManagementSection";
import InvestorSection from "@/components/sections/InvestorSection";
import LaunchSection from "@/components/sections/LaunchSection";
import { useWallet } from "@/hooks/useWallet";

export default function Home() {
  const {
    isConnected,
    role,
    companyDocumentsSubmitted,
    companyTargetsConfigured,
  } = useWallet();
  const [isViewingCompanyPage, setIsViewingCompanyPage] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Show Home section only when not connected */}
        {!isConnected && <HeroSection />}

        {/* Show sections based on role */}
        {isConnected && role === "investor" ? (
          <>
            <InvestorSection onCompanyPageView={setIsViewingCompanyPage} />
            {/* Hide Launch section when viewing company page */}
            {!isViewingCompanyPage && <LaunchSection />}
          </>
        ) : isConnected && role === "company" ? (
          <>
            {companyDocumentsSubmitted && companyTargetsConfigured ? (
              <PlantationCompanyManagementSection />
            ) : (
              <PlantationCompanyDocsSection />
            )}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
