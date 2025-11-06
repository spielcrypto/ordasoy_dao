"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Target,
  Calendar,
  Vote,
  Bell,
  Search,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";
import { getAssetPath } from "@/lib/utils";

export default function PlantationSection() {
  const { t } = useTranslation();
  const { isConnected } = useWallet();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentUpload = () => {
    if (!isConnected) {
      toast.error(t("wallet.pleaseConnectWallet"));
      return;
    }

    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        toast.success(t("company.documentsUploadedSuccess"));
        setTimeout(() => setUploadProgress(0), 2000);
      }
    }, 200);
  };

  const mockUpdates = [
    { date: "2025-01-15", title: "Q1 Harvest Report", status: "Published" },
    {
      date: "2025-01-10",
      title: "New Equipment Installed",
      status: "Published",
    },
    { date: "2025-01-05", title: "Expansion Plans Approved", status: "Draft" },
  ];

  return (
    <section id="plantation" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("company.portal")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("company.launchCampaignDescription")}
          </p>
        </div>

        <Tabs defaultValue="documents" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
            <TabsTrigger value="documents" className="gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">
                {t("company.uploadDocuments")}
              </span>
            </TabsTrigger>
            <TabsTrigger value="targets" className="gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">
                {t("company.setLaunchTargets")}
              </span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t("company.timeline")}</span>
            </TabsTrigger>
            <TabsTrigger value="voting" className="gap-2">
              <Vote className="h-4 w-4" />
              <span className="hidden sm:inline">
                {t("companyDetail.daoVoting")}
              </span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">{t("company.updates")}</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">{t("company.providers")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Document Submission */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    {t("company.uploadDocuments")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-type">
                      {t("company.documentType")}
                    </Label>
                    <Input
                      id="doc-type"
                      placeholder="e.g., Business Plan, Financial Report"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-file">{t("company.fileUpload")}</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {t("company.clickToUpload")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("company.fileTypes")}
                      </p>
                    </div>
                  </div>
                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} />
                      <p className="text-sm text-muted-foreground text-center">
                        {t("company.uploading")} {uploadProgress}%
                      </p>
                    </div>
                  )}
                  <Button onClick={handleDocumentUpload} className="w-full">
                    {t("company.submitDocument")}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("company.documentPreview")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={getAssetPath("assets/document-upload.dim_600x300.png")}
                    alt={t("company.documentPreview")}
                    className="w-full rounded-lg"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("company.uploadedDocuments")}
                      </span>
                      <span className="font-medium">
                        12 {t("common.files")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("company.verificationStatus")}
                      </span>
                      <Badge variant="outline" className="text-green-500">
                        {t("company.verified")}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* NFT Launch Targets */}
          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("company.setLaunchTargets")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-amount">
                      {t("company.fundingTarget")}
                    </Label>
                    <Input
                      id="target-amount"
                      type="number"
                      placeholder="10000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nft-supply">
                      {t("company.totalNFTSupply")}
                    </Label>
                    <Input id="nft-supply" type="number" placeholder="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nft-price">{t("company.nftPrice")}</Label>
                    <Input id="nft-price" type="number" placeholder="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="launch-date">
                      {t("company.launchDate")}
                    </Label>
                    <Input id="launch-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-desc">
                    {t("company.projectDescription")}
                  </Label>
                  <Textarea
                    id="project-desc"
                    placeholder={t("company.describeProject")}
                    rows={4}
                  />
                </div>
                <Button className="w-full">
                  {t("company.configureLaunch")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("company.projectTimeline")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      phase: t("company.target1"),
                      date: "Jan 15, 2025",
                      deadline: "Feb 15, 2025",
                      status: "Completed",
                      unlocked: "500,000 KZTE",
                      total: "500,000 KZTE",
                    },
                    {
                      phase: t("company.target2"),
                      date: "Feb 16, 2025",
                      deadline: "Mar 16, 2025",
                      status: "In Progress",
                      unlocked: "300,000 KZTE",
                      total: "800,000 KZTE",
                    },
                    {
                      phase: t("company.target3"),
                      date: "Mar 17, 2025",
                      deadline: "Apr 17, 2025",
                      status: "Locked",
                      unlocked: "0 KZTE",
                      total: "1,200,000 KZTE",
                    },
                    {
                      phase: t("company.target4"),
                      date: "Jun 2025",
                      deadline: "Sep 2025",
                      status: "Locked",
                      unlocked: "0 KZTE",
                      total: "1,500,000 KZTE",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          item.status === "Completed"
                            ? "bg-green-500"
                            : item.status === "In Progress"
                              ? "bg-primary"
                              : "bg-muted"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.phase}</h4>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  {t("company.deadline")}:{" "}
                                </span>
                                <span className="font-medium">
                                  {item.deadline}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  {t("company.unlocked")}:{" "}
                                </span>
                                <span className="font-medium text-green-500">
                                  {item.unlocked}
                                </span>
                                <span className="text-muted-foreground">
                                  {" "}
                                  / {item.total}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              item.status === "Completed"
                                ? "default"
                                : item.status === "In Progress"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {item.status === "Completed"
                              ? t("company.completed")
                              : item.status === "In Progress"
                                ? t("company.inProgress")
                                : t("company.locked")}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DAO Voting */}
          <TabsContent value="voting" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {t("companyDetail.targetDeadlineExtension")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("companyDetail.deadlineReached")}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {t("companyDetail.target")}: {t("company.target2")}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t("company.deadline")}: Mar 16, 2025 (
                      {t("companyDetail.reached")})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("company.unlockedFunds")}: 300,000 KZTE / 800,000 KZTE
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("companyDetail.votes")}
                      </span>
                      <span className="font-medium">
                        847 / 1200 {t("companyDetail.votes").toLowerCase()}
                      </span>
                    </div>
                    <Progress value={(847 / 1200) * 100} className="mb-4" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {t("companyDetail.extendDeadline")}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      {t("company.recoverInvestment")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Burn NFT Section (if recovery vote passed) */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  {t("company.recoverInvestment")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t("company.recoveryVotePassed")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("company.yourNFTs")}:
                    </span>
                    <span className="font-medium">15 NFTs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("companyDetail.lockedFundsRemaining")}:
                    </span>
                    <span className="font-medium">500,000 KZTE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("company.recoveryAmount")}:
                    </span>
                    <span className="font-medium text-green-500">
                      ~83.3% of NFT price
                    </span>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  {t("company.burnNFTsRecover")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Updates */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("company.postUpdate")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-title">
                    {t("company.updateTitle")}
                  </Label>
                  <Input
                    id="update-title"
                    placeholder={t("company.updatePlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-content">{t("company.content")}</Label>
                  <Textarea
                    id="update-content"
                    placeholder={t("company.shareUpdates")}
                    rows={4}
                  />
                </div>
                <Button className="w-full">{t("company.publishUpdate")}</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("company.recentUpdates")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                    >
                      <div>
                        <h4 className="font-medium">{update.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {update.date}
                        </p>
                      </div>
                      <Badge
                        variant={
                          update.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {update.status === "Published"
                          ? t("company.published")
                          : t("company.draft")}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Provider Search */}
          <TabsContent value="providers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  {t("company.findProviders")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={t("company.searchProviders")}
                    className="flex-1"
                  />
                  <Button>{t("common.search")}</Button>
                </div>
                <div className="space-y-3">
                  {[
                    "Agricultural Equipment Supplier",
                    "Organic Certification Consultant",
                    "Irrigation Systems Provider",
                  ].map((provider, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer"
                    >
                      <h4 className="font-medium">{provider}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("company.verifiedProvider")} • 4.8★{" "}
                        {t("company.rating")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {t("company.investorChat")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  {t("company.openChatRoom")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
