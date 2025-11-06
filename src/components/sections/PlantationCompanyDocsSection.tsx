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
import { useWallet } from "@/hooks/useWallet";

export default function PlantationCompanyDocsSection() {
  const {
    isConnected,
    setCompanyDocumentsSubmitted,
    setCompanyTargetsConfigured,
  } = useWallet();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDocumentUpload = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
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
        toast.success("Documents uploaded successfully");
        setTimeout(() => setUploadProgress(0), 2000);
      }
    }, 200);
  };

  const handleConfigureLaunch = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setCompanyTargetsConfigured(true);
    toast.success("Launch targets configured successfully");
  };

  return (
    <section id="plantation-docs" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plantation Company Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Submit your documents and configure your NFT launch targets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Document Submission */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Input
                  id="doc-type"
                  placeholder="e.g., Business Plan, Financial Report"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-file">File Upload</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                </div>
              </div>
              {uploadProgress > 0 && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} />
                  <p className="text-sm text-muted-foreground text-center">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              <Button onClick={handleDocumentUpload} className="w-full">
                Submit Document
              </Button>
            </CardContent>
          </Card>

          {/* Document Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="/assets/document-upload.dim_600x300.png"
                alt="Document Upload"
                className="w-full rounded-lg"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Uploaded Documents
                  </span>
                  <span className="font-medium">12 files</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Verification Status
                  </span>
                  <Badge variant="outline" className="text-green-500">
                    Verified
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
              Set NFT Launch Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-amount">Funding Target (KZTE)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="10000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nft-supply">Total NFT Supply</Label>
                <Input id="nft-supply" type="number" placeholder="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nft-price">NFT Price (KZTE)</Label>
                <Input id="nft-price" type="number" placeholder="10000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="launch-date">Launch Date</Label>
                <Input id="launch-date" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-desc">Project Description</Label>
              <Textarea
                id="project-desc"
                placeholder="Describe your plantation project, goals, and expected returns..."
                rows={4}
              />
            </div>
            <Button className="w-full" onClick={handleConfigureLaunch}>
              Configure Launch
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
