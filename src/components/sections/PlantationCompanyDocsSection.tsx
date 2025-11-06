"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Target } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useWallet } from "@/hooks/useWallet";
import { getAssetPath } from "@/lib/utils";

export default function PlantationCompanyDocsSection() {
  const { t } = useTranslation();
  const {
    isConnected,
    setCompanyDocumentsSubmitted,
    setCompanyTargetsConfigured,
  } = useWallet();
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
        setCompanyDocumentsSubmitted(true);
        toast.success(t("company.documentsUploadedSuccess"));
        setTimeout(() => setUploadProgress(0), 2000);
      }
    }, 200);
  };

  const handleConfigureLaunch = () => {
    if (!isConnected) {
      toast.error(t("wallet.pleaseConnectWallet"));
      return;
    }

    setCompanyTargetsConfigured(true);
    toast.success(t("company.launchTargetsConfiguredSuccess"));
  };

  return (
    <section id="plantation-docs" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("company.portal")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("company.portalDescription")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Document Submission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {t("company.uploadDocuments")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-type">{t("company.documentType")}</Label>
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

          {/* Document Preview */}
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
                  <span className="font-medium">12 {t("common.files")}</span>
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

        {/* NFT Launch Targets */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t("company.setLaunchTargets")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-amount">{t("company.fundingTarget")}</Label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="10000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nft-supply">{t("company.totalNFTSupply")}</Label>
                <Input id="nft-supply" type="number" placeholder="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nft-price">{t("company.nftPrice")}</Label>
                <Input id="nft-price" type="number" placeholder="10000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="launch-date">{t("company.launchDate")}</Label>
                <Input id="launch-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-desc">{t("company.projectDescription")}</Label>
              <Textarea
                id="project-desc"
                placeholder={t("company.describeProject")}
                rows={4}
              />
            </div>
            <Button className="w-full" onClick={handleConfigureLaunch}>
              {t("company.configureLaunch")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
