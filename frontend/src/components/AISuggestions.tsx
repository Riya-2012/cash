
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AISuggestion {
  id: number;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  type: "saving" | "budget" | "insight";
}

interface AISuggestionsProps {
  className?: string;
}

export function AISuggestions({ className }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([
    {
      id: 1,
      title: "Reduce dining out expenses",
      description: "You spent ₹3,200 on dining out last month. Consider cooking at home more often to save approximately ₹1,500 per month.",
      impact: "high",
      type: "saving"
    },
    {
      id: 2,
      title: "Budget adjustment needed",
      description: "Your entertainment budget is consistently exceeded by 15%. Consider increasing it by ₹500 to make it more realistic.",
      impact: "medium",
      type: "budget"
    },
    {
      id: 3,
      title: "Spending pattern analysis",
      description: "Your highest spending days are typically Fridays and Saturdays. Planning activities in advance could help manage weekend expenses better.",
      impact: "low",
      type: "insight"
    }
  ]);

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="bg-primary/20 p-2 rounded-full mr-2">
            <Info className="h-4 w-4 text-primary" />
          </span>
          AI Suggestions
        </CardTitle>
        <CardDescription>Smart recommendations to improve your finances</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex justify-between mb-1">
              <h4 className="font-medium">{suggestion.title}</h4>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                suggestion.impact === "high" && "bg-red-500/10 text-red-500",
                suggestion.impact === "medium" && "bg-amber-500/10 text-amber-500",
                suggestion.impact === "low" && "bg-green-500/10 text-green-500"
              )}>
                {suggestion.impact} impact
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Suggestions</Button>
      </CardFooter>
    </Card>
  );
}
