import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Bot, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  const isChat = location.pathname === "/chat";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                TelecomMaster
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                AI Agent
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {isChat ? (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            ) : (
              <Button variant="hero" size="sm" asChild>
                <Link to="/chat">
                  Start Processing
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}