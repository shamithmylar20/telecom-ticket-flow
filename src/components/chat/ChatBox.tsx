import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ChatBoxProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  onCancel?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatBox({ 
  onSubmit, 
  isLoading, 
  onCancel, 
  disabled = false,
  placeholder = "Tell TelecomMaster to process customer complaints and create tickets...",
  className 
}: ChatBoxProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSubmit(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      layout
      className={cn(
        "w-full max-w-4xl mx-auto",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
            className={cn(
              "w-full resize-none rounded-2xl border border-border bg-card/50 backdrop-blur-sm",
              "px-6 py-4 text-base text-card-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
              "transition-all duration-200 shadow-sm hover:shadow-md",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              isLoading && "opacity-75"
            )}
          />
          
          {/* Character count */}
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {message.length}/500
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isLoading && onCancel && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onCancel}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={!message.trim() || isLoading || disabled}
              className="min-w-[120px]"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}