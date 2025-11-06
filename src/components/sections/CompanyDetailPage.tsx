"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Calendar,
  Vote,
  MessageSquare,
  CheckCircle,
  Clock,
  Lock,
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";

interface CompanyDetailPageProps {
  companyId: string;
  companyName: string;
  onBack: () => void;
}

export default function CompanyDetailPage({
  companyId,
  companyName,
  onBack,
}: CompanyDetailPageProps) {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");

  // Mock data for the company
  const companyData = {
    name: companyName,
    description:
      "Soybean plantation in Northern Kazakhstan region. Focus on sustainable agriculture and high-yield varieties.",
    image: getAssetPath("assets/soybean-field-launch.dim_600x400.png"),
    investorNfts: 15,
    totalNfts: 1000,
    status: "Active",
    roi: "+12.5%",
    targets: [
      {
        id: 1,
        name: t("company.target1"),
        date: "Jan 15, 2025",
        deadline: "Feb 15, 2025",
        status: "Completed",
        unlocked: "5,000,000 KZTE",
        total: "5,000,000 KZTE",
      },
      {
        id: 2,
        name: t("company.target2"),
        date: "Feb 16, 2025",
        deadline: "Mar 16, 2025",
        status: "In Progress",
        unlocked: "3,000,000 KZTE",
        total: "3,000,000 KZTE",
      },
      {
        id: 3,
        name: t("company.target3"),
        date: "Mar 17, 2025",
        deadline: "Apr 17, 2025",
        status: "Locked",
        unlocked: "0 KZTE",
        total: "2,000,000 KZTE",
      },
      {
        id: 4,
        name: t("company.target4"),
        date: "Jun 2025",
        deadline: "Sep 2025",
        status: "Locked",
        unlocked: "0 KZTE",
        total: "1,500,000 KZTE",
      },
    ],
    activeVote: {
      id: 1,
      title: t("companyDetail.targetDeadlineExtension"),
      description: t("companyDetail.deadlineReached"),
      target: t("company.target2"),
      deadline: "Mar 16, 2025",
      votes: 847,
      totalVotes: 1200,
      status: "Active",
    },
    updates: [
      {
        id: 1,
        title: "Q1 Harvest Report",
        date: "2025-01-15",
        content:
          "We've completed the first phase of our plantation expansion. Ground acquisition is finished and we're moving forward with seed procurement.",
        comments: [
          {
            author: "Investor_123",
            date: "2025-01-16",
            content: "Great progress! Looking forward to the next phase.",
          },
        ],
      },
      {
        id: 2,
        title: "New Equipment Installed",
        date: "2025-01-10",
        content:
          "We've successfully installed advanced irrigation systems in the northern section of the plantation.",
        comments: [],
      },
    ],
  };

  return (
    <section className="py-20">
      <div className="container">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("companyDetail.backToPortfolio")}
        </Button>

        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={companyData.image}
                  alt={companyData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {companyData.name}
                  </h1>
                  <p className="text-muted-foreground">
                    {companyData.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("companyDetail.yourNFTs")}
                    </p>
                    <p className="text-2xl font-bold">
                      {companyData.investorNfts}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("investor.status")}
                    </p>
                    <Badge variant="default" className="mt-1">
                      {companyData.status === "Active"
                        ? t("investor.active")
                        : companyData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("investor.roi")}
                    </p>
                    <p className="text-2xl font-bold text-green-500">
                      {companyData.roi}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("companyDetail.ownership")}
                    </p>
                    <p className="text-2xl font-bold">
                      {(
                        (companyData.investorNfts / companyData.totalNfts) *
                        100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
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
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t("company.updates")}</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t("company.chat")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("company.projectTimeline")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {companyData.targets.map((target) => (
                    <div key={target.id} className="flex items-start gap-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                          target.status === "Completed"
                            ? "bg-green-500"
                            : target.status === "In Progress"
                              ? "bg-primary"
                              : "bg-muted"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{target.name}</h4>
                              {target.status === "Completed" && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {target.status === "In Progress" && (
                                <Clock className="h-4 w-4 text-primary" />
                              )}
                              {target.status === "Locked" && (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  {t("company.deadline")}:{" "}
                                </span>
                                <span className="font-medium">
                                  {target.deadline}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  {t("company.unlocked")}:{" "}
                                </span>
                                <span className="font-medium text-green-500">
                                  {target.unlocked}
                                </span>
                                <span className="text-muted-foreground">
                                  {" "}
                                  / {target.total}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              target.status === "Completed"
                                ? "default"
                                : target.status === "In Progress"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {target.status === "Completed"
                              ? t("company.completed")
                              : target.status === "In Progress"
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
            {companyData.activeVote && (
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
                      {t("companyDetail.target")}:{" "}
                      {companyData.activeVote.target}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t("company.deadline")}: {companyData.activeVote.deadline}{" "}
                      ({t("companyDetail.reached")})
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("companyDetail.votes")}
                      </span>
                      <span className="font-medium">
                        {companyData.activeVote.votes} /{" "}
                        {companyData.activeVote.totalVotes}{" "}
                        {t("companyDetail.votes").toLowerCase()}
                      </span>
                    </div>
                    <Progress
                      value={
                        (companyData.activeVote.votes /
                          companyData.activeVote.totalVotes) *
                        100
                      }
                      className="mb-4"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {t("companyDetail.extendDeadline")}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      {t("companyDetail.recoverInvestment")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Company Updates */}
          <TabsContent value="updates" className="space-y-6">
            <div className="space-y-4">
              {companyData.updates.map((update) => (
                <Card key={update.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {update.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {update.date}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{update.content}</p>
                    {update.comments.length > 0 && (
                      <div className="space-y-3 pt-4 border-t">
                        <h5 className="font-semibold text-sm">
                          {t("companyDetail.comments")}
                        </h5>
                        {update.comments.map((comment, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-muted/50 rounded-lg space-y-1"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">
                                {comment.author}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {comment.date}
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="pt-4 border-t space-y-2">
                      <Textarea
                        placeholder={t("companyDetail.addComment")}
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button size="sm">
                        {t("companyDetail.postComment")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Investor Chat */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {t("company.investorChat")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 h-96 overflow-y-auto p-4 bg-muted/30 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                          I
                        </div>
                        <div className="flex-1 bg-background p-3 rounded-lg">
                          <p className="text-sm">
                            {t("companyDetail.chatMessage1")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("companyDetail.investor")} •{" "}
                            {t("companyDetail.twoHoursAgo")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                          C
                        </div>
                        <div className="flex-1 bg-primary/10 p-3 rounded-lg">
                          <p className="text-sm">
                            {t("companyDetail.chatMessage2")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("wallet.company")} •{" "}
                            {t("companyDetail.oneHourAgo")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                          I
                        </div>
                        <div className="flex-1 bg-background p-3 rounded-lg">
                          <p className="text-sm">
                            {t("companyDetail.chatMessage3")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t("companyDetail.investor")} •{" "}
                            {t("companyDetail.thirtyMinutesAgo")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder={t("companyDetail.typeMessage")}
                    className="flex-1"
                  />
                  <Button>{t("common.send")}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
