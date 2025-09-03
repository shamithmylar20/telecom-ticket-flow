import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: "P1" | "P2" | "P3" | "P4";
  className?: string;
}

const priorityConfig = {
  P1: {
    label: "P1 Critical",
    className: "bg-priority-critical text-white border-priority-critical/20"
  },
  P2: {
    label: "P2 High", 
    className: "bg-priority-high text-white border-priority-high/20"
  },
  P3: {
    label: "P3 Medium",
    className: "bg-priority-medium text-white border-priority-medium/20"
  },
  P4: {
    label: "P4 Low",
    className: "bg-priority-low text-white border-priority-low/20"
  }
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border transition-colors",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}