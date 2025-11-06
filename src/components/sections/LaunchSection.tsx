"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Clock, CheckCircle, XCircle, Coins } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";
import { getAssetPath } from "@/lib/utils";

export default function LaunchSection() {
  const { t } = useTranslation();
  const { isConnected } = useWallet();
  const [mintQuantity, setMintQuantity] = useState(1);

  const activeLaunches = [
    {
      id: 1,
      name: "Northern Kazakhstan Soybean Plantation",
      image: getAssetPath("assets/soybean-field-launch.dim_600x400.png"),
      description:
        "Soybean plantation in Northern Kazakhstan region. Targets: Buy ground, seeds, irrigation systems, and first harvest.",
      price: 10000,
      raised: 7500000,
      target: 10000000,
      nftsSold: 750,
      nftsTotal: 1000,
      endsIn: "5 days",
      status: "Active",
      targets: [
        { name: t("company.buyGround"), amount: "5,000,000 KZTE", status: "Locked" },
        {
          name: t("company.buySeedsTech"),
          amount: "3,000,000 KZTE",
          status: "Locked",
        },
        {
          name: t("company.irrigationSystems"),
          amount: "2,000,000 KZTE",
          status: "Locked",
        },
      ],
    },
    {
      id: 2,
      name: "Southeast Kazakhstan Soybean Farm",
      image: getAssetPath("assets/soybean-harvest-launch.dim_600x400.png"),
      description:
        "Soybean farm expansion in Southeast Kazakhstan. Focus on drought-tolerant varieties.",
      price: 12000,
      raised: 5400000,
      target: 9000000,
      nftsSold: 450,
      nftsTotal: 750,
      endsIn: "12 days",
      status: "Active",
      targets: [
        { name: t("company.buyGround"), amount: "4,500,000 KZTE", status: "Locked" },
        {
          name: t("company.buySeedsTech"),
          amount: "3,000,000 KZTE",
          status: "Locked",
        },
        {
          name: t("company.irrigationSystems"),
          amount: "1,500,000 KZTE",
          status: "Locked",
        },
      ],
    },
  ];

  const completedLaunches = [
    {
      id: 3,
      name: "Central Kazakhstan Soybean Plantation",
      raised: 12000000,
      target: 10000000,
      status: "Success",
    },
    {
      id: 4,
      name: "West Kazakhstan Soybean Farm",
      raised: 4500000,
      target: 8000000,
      status: "Failed",
    },
  ];

  const handleMint = (launchId: number) => {
    if (!isConnected) {
      toast.error(t("wallet.pleaseConnectWallet"));
      return;
    }
    toast.success(t("launch.mintSuccess"));
  };

  const handleClaim = (launchId: number) => {
    if (!isConnected) {
      toast.error(t("wallet.pleaseConnectWallet"));
      return;
    }
    toast.success(t("launch.claimSuccess"));
  };

  const handleRefund = (launchId: number) => {
    if (!isConnected) {
      toast.error(t("wallet.pleaseConnectWallet"));
      return;
    }
    toast.success(t("launch.refundSuccess"));
  };

  return (
    <section id="launch" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("launch.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("launch.description")}
          </p>
        </div>

        <Tabs defaultValue="active" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="active" className="gap-2">
              <Rocket className="h-4 w-4" />
              {t("launch.activeLaunches")}
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <Clock className="h-4 w-4" />
              {t("launch.completed")}
            </TabsTrigger>
          </TabsList>

          {/* Active Launches */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {activeLaunches.map((launch) => (
                <Card key={launch.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={launch.image}
                      alt={launch.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4">
                      {launch.status === "Active"
                        ? t("investor.active")
                        : launch.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{launch.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {launch.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Targets */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">
                        {t("launch.launchTargets")}:
                      </h4>
                      <div className="space-y-1">
                        {launch.targets?.map((target, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs p-2 bg-muted/30 rounded"
                          >
                            <span className="text-muted-foreground">
                              {target.name}:
                            </span>
                            <span className="font-medium">{target.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t("launch.fundingProgress")}
                        </span>
                        <span className="font-medium">
                          {launch.raised.toLocaleString()} /{" "}
                          {launch.target.toLocaleString()} KZTE
                        </span>
                      </div>
                      <Progress value={(launch.raised / launch.target) * 100} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {launch.nftsSold} / {launch.nftsTotal}{" "}
                          {t("launch.nftsSold")}
                        </span>
                        <span>
                          {t("launch.endsIn")} {launch.endsIn}
                        </span>
                      </div>
                      {launch.nftsSold >= launch.nftsTotal * 0.7 && (
                        <div className="text-xs text-green-500 font-medium mt-1">
                          {t("launch.thresholdReached")}
                        </div>
                      )}
                    </div>

                    {/* Minting Interface */}
                    <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`quantity-${launch.id}`}>
                          {t("launch.quantity")}
                        </Label>
                        <span className="text-sm font-medium">
                          {launch.price.toLocaleString()} {t("launch.kzteEach")}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id={`quantity-${launch.id}`}
                          type="number"
                          min="1"
                          max="10"
                          value={mintQuantity}
                          onChange={(e) =>
                            setMintQuantity(parseInt(e.target.value) || 1)
                          }
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleMint(launch.id)}
                          className="gap-2"
                        >
                          <Coins className="h-4 w-4" />
                          {t("launch.mint")} (
                          {(launch.price * mintQuantity).toLocaleString()} KZTE)
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        {t("launch.nftHoldNote")}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round((launch.raised / launch.target) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("launch.funded")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          {launch.nftsTotal - launch.nftsSold}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("launch.remaining")}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {launch.endsIn.split(" ")[0]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("launch.daysLeft")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Launches */}
          <TabsContent value="completed" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {completedLaunches.map((launch) => (
                <Card key={launch.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle>{launch.name}</CardTitle>
                      {launch.status === "Success" ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t("launch.finalAmount")}
                        </span>
                        <span className="font-medium">
                          {launch.raised.toLocaleString()} /{" "}
                          {launch.target.toLocaleString()} KZTE
                        </span>
                      </div>
                      <Progress
                        value={(launch.raised / launch.target) * 100}
                        className={
                          launch.status === "Success" ? "" : "bg-destructive/20"
                        }
                      />
                    </div>

                    <Badge
                      variant={
                        launch.status === "Success" ? "default" : "destructive"
                      }
                      className="w-full justify-center py-2"
                    >
                      {launch.status === "Success"
                        ? t("launch.successfullyFunded")
                        : t("launch.fundingFailed")}
                    </Badge>

                    {launch.status === "Success" ? (
                      <Button
                        onClick={() => handleClaim(launch.id)}
                        className="w-full gap-2"
                        variant="outline"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {t("launch.claimNFTs")}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRefund(launch.id)}
                        className="w-full gap-2"
                        variant="outline"
                      >
                        <XCircle className="h-4 w-4" />
                        {t("launch.requestRefund")}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Launch Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>{t("launch.notifications")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: t("launch.notification1"),
                      time: t("companyDetail.twoHoursAgo"),
                      type: "success",
                    },
                    {
                      title: t("launch.notification2"),
                      time: t("launch.oneDayAgo"),
                      type: "failed",
                    },
                    {
                      title: t("launch.notification3"),
                      time: t("launch.threeDaysAgo"),
                      type: "info",
                    },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      {notification.type === "success" && (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      )}
                      {notification.type === "failed" && (
                        <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      )}
                      {notification.type === "info" && (
                        <Rocket className="h-5 w-5 text-primary mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
