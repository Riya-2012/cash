
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDown, ArrowUp, Wallet, CreditCard, PiggyBank } from "lucide-react";

const statCardVariants = cva(
  "data-card flex flex-col animate-fade-in",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        income: "bg-[#0D2F2A] border border-[#1b5a4f]/30 text-white",
        expense: "bg-[#2D1519] border border-[#5a2431]/30 text-white",
        remaining: "bg-[#192447] border border-[#2a4080]/30 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  dateRange?: string;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon?: "wallet" | "credit-card" | "piggy-bank";
}

export function StatCard({
  className,
  variant,
  title,
  value,
  dateRange,
  change,
  icon,
  ...props
}: StatCardProps) {
  const iconMap = {
    "wallet": <Wallet className="h-5 w-5 opacity-80" />,
    "credit-card": <CreditCard className="h-5 w-5 opacity-80" />,
    "piggy-bank": <PiggyBank className="h-5 w-5 opacity-80" />,
  };
  
  const selectedIcon = icon ? iconMap[icon] : null;

  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value;
  };

  return (
    <div className={cn(statCardVariants({ variant, className }))} {...props}>
      <div className="flex justify-between items-start mb-2">
        <div className="text-muted-foreground text-sm">{title}</div>
        {selectedIcon && (
          <div className={cn(
            "rounded-full p-2",
            variant === "income" && "bg-[#1b5a4f]/30",
            variant === "expense" && "bg-[#5a2431]/30",
            variant === "remaining" && "bg-[#2a4080]/30",
            variant === "default" && "bg-secondary"
          )}>
            {selectedIcon}
          </div>
        )}
      </div>
      {dateRange && <div className="text-xs text-muted-foreground mb-2">{dateRange}</div>}
      <div className="text-2xl font-bold mb-1">{formatValue(value)}</div>
      {change && (
        <div className="flex items-center text-sm">
          <span
            className={cn(
              "flex items-center",
              change.trend === "up" ? "text-green-400" : "",
              change.trend === "down" ? "text-red-400" : "",
              change.trend === "neutral" ? "text-yellow-400" : ""
            )}
          >
            {change.trend === "up" && <ArrowUp className="mr-1 h-3 w-3" />}
            {change.trend === "down" && <ArrowDown className="mr-1 h-3 w-3" />}
            {Math.abs(change.value)}% from last period
          </span>
        </div>
      )}
    </div>
  );
}
