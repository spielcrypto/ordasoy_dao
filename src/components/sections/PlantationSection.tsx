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
import { useWallet } from "@/hooks/useWallet";
import { getAssetPath } from "@/lib/utils";

export default function PlantationSection() {
  const { isConnected } = useWallet();
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
        toast.success("Documents uploaded successfully");
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
            Plantation Company Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Launch your NFT fundraising campaign, manage documentation, and
            engage with your investor community
          </p>
        </div>

        <Tabs defaultValue="documents" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
            <TabsTrigger value="documents" className="gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="targets" className="gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Launch Targets</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="voting" className="gap-2">
              <Vote className="h-4 w-4" />
              <span className="hidden sm:inline">DAO Voting</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Updates</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Providers</span>
            </TabsTrigger>
          </TabsList>

          {/* Document Submission */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>Document Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={getAssetPath("assets/document-upload.dim_600x300.png")}
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
          </TabsContent>

          {/* NFT Launch Targets */}
          <TabsContent value="targets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Set NFT Launch Targets</CardTitle>
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
                <Button className="w-full">Configure Launch</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline & Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      phase: "Target 1: Buy Ground for Plantation",
                      date: "Jan 15, 2025",
                      deadline: "Feb 15, 2025",
                      status: "Completed",
                      unlocked: "500,000 KZTE",
                      total: "500,000 KZTE",
                    },
                    {
                      phase: "Target 2: Buy Seeds and Technologies",
                      date: "Feb 16, 2025",
                      deadline: "Mar 16, 2025",
                      status: "In Progress",
                      unlocked: "300,000 KZTE",
                      total: "800,000 KZTE",
                    },
                    {
                      phase: "Target 3: Install Irrigation Systems",
                      date: "Mar 17, 2025",
                      deadline: "Apr 17, 2025",
                      status: "Locked",
                      unlocked: "0 KZTE",
                      total: "1,200,000 KZTE",
                    },
                    {
                      phase: "Target 4: First Harvest",
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
                                  Deadline:{" "}
                                </span>
                                <span className="font-medium">
                                  {item.deadline}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Unlocked:{" "}
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
                            {item.status}
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
                  <CardTitle>Target Deadline Extension Vote</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Target 2 deadline has been reached. NFT holders must vote to
                    extend deadline or recover investment.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      Target: Buy Seeds and Technologies
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Deadline: Mar 16, 2025 (Reached)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Unlocked Funds: 300,000 KZTE / 800,000 KZTE
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Votes</span>
                      <span className="font-medium">847 / 1200 votes</span>
                    </div>
                    <Progress value={(847 / 1200) * 100} className="mb-4" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Extend Deadline (+30 days)
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Recover Investment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Burn NFT Section (if recovery vote passed) */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Recover Investment
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  If the recovery vote passed, you can burn your NFTs to recover
                  a percentage of the investment based on locked funds
                  remaining.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your NFTs:</span>
                    <span className="font-medium">15 NFTs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Locked Funds Remaining:
                    </span>
                    <span className="font-medium">500,000 KZTE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Recovery Amount:
                    </span>
                    <span className="font-medium text-green-500">
                      ~83.3% of NFT price
                    </span>
                  </div>
                </div>
                <Button variant="destructive" className="w-full">
                  Burn NFTs & Recover Investment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Updates */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Company Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-title">Update Title</Label>
                  <Input
                    id="update-title"
                    placeholder="e.g., Monthly Progress Report"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-content">Content</Label>
                  <Textarea
                    id="update-content"
                    placeholder="Share updates with your investors..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">Publish Update</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
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
                        {update.status}
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
                  Find Service Providers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search for equipment, consultants, suppliers..."
                    className="flex-1"
                  />
                  <Button>Search</Button>
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
                        Verified provider • 4.8★ rating
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
                  Investor Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Open Chat Room
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
