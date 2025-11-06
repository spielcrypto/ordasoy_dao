import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Ordasoy DAO Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
