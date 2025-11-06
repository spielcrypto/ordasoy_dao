"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Bell, Search, MessageSquare } from "lucide-react";

export default function PlantationCompanyManagementSection() {
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
    <section id="plantation-management" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plantation Management Portal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your project timeline, post updates, connect with providers,
            and communicate with investors
          </p>
        </div>

        <Tabs defaultValue="timeline" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="updates" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Updates</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Providers</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
          </TabsList>

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
          </TabsContent>

          {/* Investor Chat */}
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Investor Chat
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
                            What is the expected timeline for the first harvest?
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Investor • 2 hours ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                          C
                        </div>
                        <div className="flex-1 bg-primary/10 p-3 rounded-lg">
                          <p className="text-sm">
                            We expect the first harvest in September 2025, based
                            on our current timeline and target completion dates.
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Company • 1 hour ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
