"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Shield,
  Sprout,
  Globe,
  Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";
import { getAssetPath } from "@/lib/utils";

export default function HeroSection() {
  const { t } = useTranslation();
  const { isConnected, role } = useWallet();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleConnectWallet = () => {
    // Find and click the wallet button in the header
    const walletButton = document.querySelector(
      'header button[class*="gap-2"]'
    ) as HTMLElement;
    if (walletButton) {
      walletButton.click();
    }
  };

  const stats = [
    { label: t("hero.activePlantations"), value: "24", icon: Sprout },
    { label: t("hero.totalInvestors"), value: "1,247", icon: Users },
    { label: t("hero.nftsMinted"), value: "8,932", icon: TrendingUp },
    { label: t("hero.successRate"), value: "94%", icon: Shield },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isConnected ? (
                <Button
                  size="lg"
                  onClick={handleConnectWallet}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  {t("hero.connectWallet")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <>
                  {role === "investor" && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => scrollToSection("launch")}
                      className="gap-2"
                    >
                      {t("hero.viewLaunches")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-border/50">
                  <CardContent className="p-4 space-y-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getAssetPath("assets/soybean.png")}
                alt="Kazakhstan Soybean Plantation"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>

        {/* Kazakhstan Opportunity */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                {t("hero.whyKazakhstan")}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong>{t("hero.neighborOfChina")}</strong> {t("hero.neighborOfChinaDesc")}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong>{t("hero.largeTerritory")}</strong> {t("hero.largeTerritoryDesc")}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong>{t("hero.trustworthyRelationship")}</strong> {t("hero.trustworthyRelationshipDesc")}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">{t("hero.challengesSolutions")}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    {t("hero.challenges")}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("hero.challenge1")}</li>
                    <li>• {t("hero.challenge2")}</li>
                    <li>• {t("hero.challenge3")}</li>
                    <li>• {t("hero.challenge4")}</li>
                    <li>• {t("hero.challenge5")}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-accent mb-2">{t("hero.solutions")}</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("hero.solution1")}</li>
                    <li>• {t("hero.solution2")}</li>
                    <li>• {t("hero.solution3")}</li>
                    <li>• {t("hero.solution4")}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What Ordasoy DAO Resolves */}
        <div className="mt-20">
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">{t("hero.whatOrdasoyResolves")}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    {t("hero.forFounders")}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("hero.founder1")}</li>
                    <li>• {t("hero.founder2")}</li>
                    <li>• {t("hero.founder3")}</li>
                    <li>• {t("hero.founder4")}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-accent mb-2">
                    {t("hero.forInvestors")}
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• {t("hero.investor1")}</li>
                    <li>• {t("hero.investor2")}</li>
                    <li>• {t("hero.investor3")}</li>
                    <li>• {t("hero.investor4")}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
