"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Wallet, Vote, ExternalLink, PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";
import CompanyDetailPage from "./CompanyDetailPage";

interface InvestorSectionProps {
  onCompanyPageView?: (isViewing: boolean) => void;
}

export default function InvestorSection({
  onCompanyPageView,
}: InvestorSectionProps = {}) {
  const { t } = useTranslation();
  const { isConnected } = useWallet();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompany(companyName);
    onCompanyPageView?.(true);
  };

  const handleBack = () => {
    setSelectedCompany(null);
    onCompanyPageView?.(false);
  };

  const mockHoldings = [
    {
      company: "Green Valley Plantation",
      nfts: 15,
      value: 30,
      roi: "+12.5%",
      status: "Active",
    },
    {
      company: "Sunrise Organic Farms",
      nfts: 8,
      value: 16,
      roi: "+8.3%",
      status: "Active",
    },
    {
      company: "Mountain Ridge Agriculture",
      nfts: 22,
      value: 44,
      roi: "+15.7%",
      status: "Harvesting",
    },
  ];

  const mockInvestments = [
    {
      date: "2025-01-10",
      company: "Green Valley",
      amount: 10,
      type: "Purchase",
    },
    {
      date: "2025-01-05",
      company: "Sunrise Organic",
      amount: 5,
      type: "Dividend",
    },
    {
      date: "2024-12-28",
      company: "Mountain Ridge",
      amount: 15,
      type: "Purchase",
    },
  ];

  // Show company detail page if a company is selected
  if (selectedCompany) {
    return (
      <CompanyDetailPage
        companyId={selectedCompany}
        companyName={selectedCompany}
        onBack={handleBack}
      />
    );
  }

  return (
    <section id="investor" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("investor.dashboard")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("investor.dashboardDescription")}
          </p>
        </div>

        {!isConnected ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center space-y-4">
              <Wallet className="h-16 w-16 mx-auto text-muted-foreground" />
              <h3 className="text-2xl font-bold">
                {t("investor.connectWallet")}
              </h3>
              <p className="text-muted-foreground">
                {t("investor.connectWalletDescription")}
              </p>
              <Button size="lg" className="gap-2">
                <Wallet className="h-4 w-4" />
                {t("wallet.connect")}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {t("investor.totalValue")}
                    </span>
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">900,000 KZTE</div>
                  <p className="text-xs text-green-500 mt-1">+12.3% overall</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {t("investor.totalNFTs")}
                    </span>
                    <PieChart className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across 3 companies
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {t("investor.votingPower")}
                    </span>
                    <Vote className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Of total supply
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {t("investor.avgROI")}
                    </span>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">+12.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="holdings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="holdings">
                  {t("investor.nftHoldings")}
                </TabsTrigger>
                <TabsTrigger value="history">
                  {t("investor.investmentHistory")}
                </TabsTrigger>
                <TabsTrigger value="companies">
                  {t("investor.companyPages")}
                </TabsTrigger>
              </TabsList>

              {/* NFT Holdings */}
              <TabsContent value="holdings" className="space-y-4">
                {mockHoldings.map((holding, index) => (
                  <Card
                    key={index}
                    className="hover:border-primary transition-colors cursor-pointer"
                    onClick={() => handleCompanySelect(holding.company)}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold">
                              {holding.company}
                            </h3>
                            <Badge
                              variant={
                                holding.status === "Active"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {holding.status}
                            </Badge>
                          </div>
                          <div className="flex gap-6 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                {t("investor.nftsOwned")}:{" "}
                              </span>
                              <span className="font-medium">
                                {holding.nfts}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {t("investor.value")}:{" "}
                              </span>
                              <span className="font-medium">
                                {(holding.value * 10000).toLocaleString()} KZTE
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                {t("investor.roi")}:{" "}
                              </span>
                              <span className="font-medium text-green-500">
                                {holding.roi}
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={(holding.nfts / 50) * 100}
                            className="h-2"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompanySelect(holding.company);
                          }}
                        >
                          {t("common.viewDetails")}
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Investment History */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("investor.recentTransactions")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockInvestments.map((investment, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <h4 className="font-medium">
                              {investment.company}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {investment.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {(investment.amount * 10000).toLocaleString()}{" "}
                              KZTE
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {investment.type === "Purchase"
                                ? t("investor.purchase")
                                : t("investor.dividend")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Company Pages */}
              <TabsContent value="companies" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {mockHoldings.map((holding, index) => (
                    <Card
                      key={index}
                      className="hover:border-primary transition-colors cursor-pointer"
                      onClick={() => handleCompanySelect(holding.company)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {holding.company}
                          <ExternalLink className="h-4 w-4" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">
                            Company Preview
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("investor.yourNFTs")}:
                            </span>
                            <span className="font-medium">{holding.nfts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("investor.status")}:
                            </span>
                            <Badge variant="outline">
                              {holding.status === "Active"
                                ? t("investor.active")
                                : t("investor.harvesting")}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {t("investor.roi")}:
                            </span>
                            <span className="font-medium text-green-500">
                              {holding.roi}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompanySelect(holding.company);
                          }}
                        >
                          {t("investor.viewCompanyPage")}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  );
}
