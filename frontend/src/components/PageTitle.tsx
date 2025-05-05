
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-3xl md:text-4xl font-bold animate-fade">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2 animate-fade">{subtitle}</p>}
    </div>
  );
}
