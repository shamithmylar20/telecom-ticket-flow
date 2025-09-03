import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { ChatBox } from "../components/chat/ChatBox";
import { TicketCard } from "../components/tickets/TicketCard";
import { Header } from "../components/layout/Header";
import { chatAPI, type Ticket, type ChatResponse } from "../lib/api";
import { useToast } from "../hooks/use-toast";

type ViewState = "empty" | "processing" | "results";

export default function Chat() {
  const [viewState, setViewState] = useState<ViewState>("empty");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (message: string) => {
    setIsLoading(true);
    setViewState("processing");

    try {
      const result = await chatAPI.sendMessage({
        message,
        user_role: "customer_service",
        user_id: "demo-user-001"
      });

      setResponse(result);
      setViewState("results");
      
      toast({
        title: "Processing Complete",
        description: `Created ${result.tickets_created.length} tickets from SharePoint complaints.`,
      });
    } catch (error) {
      console.error("Chat error:", error);
      setViewState("empty");
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsLoading(false);
    setViewState("empty");
  };

  const handleReset = () => {
    setViewState("empty");
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatePresence mode="wait">
          {viewState === "empty" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[80vh] flex items-center justify-center"
            >
              <div className="w-full max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Ready to Process Complaints
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    TelecomMaster will analyze SharePoint complaints and create organized Jira tickets
                  </p>
                </motion.div>

                <ChatBox
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onCancel={handleCancel}
                />
              </div>
            </motion.div>
          )}

          {viewState === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              {/* Chat box moved to top */}
              <motion.div
                layout
                className="mb-8"
              >
                <ChatBox
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onCancel={handleCancel}
                  disabled={true}
                />
              </motion.div>

              {/* Processing animation */}
              <div className="flex flex-col items-center justify-center py-16">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="mb-6"
                >
                  <Loader2 className="h-12 w-12 text-primary" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    TelecomMaster is Processing Complaints...
                  </h2>
                  <p className="text-muted-foreground max-w-md">
                    Analyzing SharePoint data, categorizing issues, and preparing Jira tickets with proper prioritization
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {viewState === "results" && response && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8"
            >
              {/* Chat box at top */}
              <motion.div
                layout
                className="mb-8"
              >
                <ChatBox
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  placeholder="Process more complaints or refine your request..."
                />
              </motion.div>

              {/* Agent response */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-foreground">{response.agent_name}</span>
                        {response.processing_complete && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className="text-card-foreground leading-relaxed">{response.response}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tickets grid */}
              {response.tickets_created.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-foreground">
                      Created Tickets ({response.tickets_created.length})
                    </h3>
                    <button
                      onClick={handleReset}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Start New Session
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {response.tickets_created.map((ticket, index) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <TicketCard ticket={ticket} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* No tickets message */}
              {response.tickets_created.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center py-12"
                >
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Tickets Created
                  </h3>
                  <p className="text-muted-foreground">
                    No actionable complaints were found in the current SharePoint data.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}