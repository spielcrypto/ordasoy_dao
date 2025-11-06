"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Check, Copy, Building2, Users } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useWallet, UserRole } from "@/hooks/useWallet";

interface WalletConnectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WalletConnection({
  open,
  onOpenChange,
}: WalletConnectionProps) {
  const { t } = useTranslation();
  const { isConnected, address, role, connect, disconnect, setRole } =
    useWallet();
  const [copied, setCopied] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleConnect = () => {
    if (!selectedRole) {
      toast.error(t("wallet.pleaseSelectRole"));
      return;
    }
    connect(selectedRole);
    toast.success(
      `${t("wallet.connectedAs")} ${selectedRole === "company" ? t("wallet.company") : t("wallet.investor")}`
    );
    onOpenChange(false);
  };

  const handleRoleChange = (newRole: UserRole) => {
    if (isConnected) {
      setRole(newRole);
      toast.success(
        `${t("wallet.roleChanged")} ${newRole === "company" ? t("wallet.company") : t("wallet.investor")}`
      );
    } else {
      setSelectedRole(newRole);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info(t("wallet.disconnected"));
    onOpenChange(false);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success(t("wallet.addressCopied"));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {isConnected ? t("wallet.connected") : t("wallet.connect")}
          </DialogTitle>
          <DialogDescription>
            {isConnected
              ? t("wallet.connectedDescription")
              : t("wallet.connectDescription")}
          </DialogDescription>
        </DialogHeader>

        {isConnected ? (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {t("wallet.connectedAddress")}
                  </p>
                  <p className="text-sm font-mono truncate">{address}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("wallet.role")}:{" "}
                    {role === "company"
                      ? t("wallet.company")
                      : t("wallet.investor")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyAddress}
                  className="ml-2 flex-shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t("wallet.changeRole")}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={role === "investor" ? "default" : "outline"}
                  onClick={() => handleRoleChange("investor")}
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  {t("wallet.investor")}
                </Button>
                <Button
                  variant={role === "company" ? "default" : "outline"}
                  onClick={() => handleRoleChange("company")}
                  className="gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  {t("wallet.company")}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <img
                src="/assets/phantom.png"
                alt={t("wallet.phantomWallet")}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {t("wallet.phantomWallet")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("wallet.simulatedConnection")}
                </p>
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full"
            >
              {t("wallet.disconnectWallet")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("wallet.selectRole")}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedRole === "investor" ? "default" : "outline"}
                  onClick={() => setSelectedRole("investor")}
                  className="gap-2 h-auto py-4 flex-col"
                >
                  <Users className="h-6 w-6" />
                  <span>{t("wallet.investor")}</span>
                </Button>
                <Button
                  variant={selectedRole === "company" ? "default" : "outline"}
                  onClick={() => setSelectedRole("company")}
                  className="gap-2 h-auto py-4 flex-col"
                >
                  <Building2 className="h-6 w-6" />
                  <span>{t("wallet.company")}</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleConnect}
              className="w-full gap-2"
              disabled={!selectedRole}
            >
              <Wallet className="h-4 w-4" />
              {t("wallet.connect")}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("wallet.simulatedConnection")}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
