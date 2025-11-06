"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wallet, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import WalletConnection from "./WalletConnection";
import LanguageSelector from "./LanguageSelector";
import { useWallet } from "@/hooks/useWallet";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showWallet, setShowWallet] = useState(false);
  const { isConnected, address, role } = useWallet();

  const navItems = [
    ...(!isConnected ? [{ id: "home", label: t("header.home") }] : []),
    ...(role === "company"
      ? [
          { id: "plantation-docs", label: t("header.documentsLaunch") },
          { id: "plantation-management", label: t("header.management") },
        ]
      : role === "investor"
        ? [
            { id: "investor", label: t("header.investor") },
            { id: "launch", label: t("header.launch") },
          ]
        : []),
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/ordasoy_logo.png"
              alt="Ordasoy DAO"
              className="h-10 w-10"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ordasoy DAO
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="font-medium"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:inline-flex"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            onClick={() => setShowWallet(true)}
            className="hidden sm:inline-flex gap-2"
            variant={isConnected ? "outline" : "default"}
          >
            <Wallet className="h-4 w-4" />
            {isConnected ? formatAddress(address!) : t("wallet.connect")}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start font-medium"
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  onClick={() => {
                    setShowWallet(true);
                    setIsOpen(false);
                  }}
                  className="justify-start gap-2 mt-4"
                  variant={isConnected ? "outline" : "default"}
                >
                  <Wallet className="h-4 w-4" />
                  {isConnected ? formatAddress(address!) : t("wallet.connect")}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <WalletConnection open={showWallet} onOpenChange={setShowWallet} />
    </header>
  );
}
