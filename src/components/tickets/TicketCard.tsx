import { motion } from "framer-motion";
import { CheckSquare, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriorityBadge } from "../ui/PriorityBadge";

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    priority: "P1" | "P2" | "P3" | "P4";
    category: string;
    team: string;
    status: string;
    complaint_id: string;
  };
  className?: string;
}

export function TicketCard({ ticket, className }: TicketCardProps) {
  const isTask = ticket.category !== "Bug";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative bg-card border border-border rounded-2xl p-6",
        "shadow-sm hover:shadow-md transition-all duration-200",
        "hover:border-primary/20 hover:bg-card/95",
        className
      )}
    >
      {/* Header row with icon, ID, and priority */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {isTask ? (
              <CheckSquare className="h-4 w-4 text-primary" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-destructive" />
            )}
            <span className="text-sm font-mono text-primary font-medium">
              {ticket.id}
            </span>
          </div>
        </div>
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-card-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
        {ticket.title}
      </h3>

      {/* Metadata row */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <span className="font-medium">Status:</span>
          <span className={cn(
            "px-2 py-0.5 rounded-md text-xs font-medium",
            ticket.status === "Open" && "bg-destructive/10 text-destructive",
            ticket.status === "In Progress" && "bg-primary/10 text-primary",
            ticket.status === "Resolved" && "bg-green-500/10 text-green-600"
          )}>
            {ticket.status}
          </span>
        </div>
        <div>
          <span className="font-medium">Team:</span> {ticket.team}
        </div>
        <div>
          <span className="font-medium">Category:</span> {ticket.category}
        </div>
      </div>

      {/* Description/Complaint ID */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Source Complaint:</span> {ticket.complaint_id}
      </div>

      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl pointer-events-none" />
    </motion.div>
  );
}