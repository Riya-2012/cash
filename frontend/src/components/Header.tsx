
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, User } from "lucide-react";

interface HeaderProps {
  className?: string;
  activeTab?: string;
}

export function Header({ className, activeTab }: HeaderProps) {
  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Accounts", path: "/accounts" },
    { name: "Categories", path: "/categories" },
    { name: "Budgets", path: "/budgets" },
  ];

  return (
    <header className={cn("bg-background py-4 px-6 md:px-8 w-full flex items-center justify-between", className)}>
      <div className="flex items-center gap-10">
        <Logo />
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary",
                item.name === activeTab
                  ? "text-primary font-semibold"
                  : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 mt-1 p-0" align="end">
            <div className="p-3 border-b">
              <p className="font-medium">Riya Sharma</p>
              <p className="text-sm text-muted-foreground">riyasharma150819@gmail.com</p>
            </div>
            <div className="p-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-destructive" asChild>
                <Link to="/login">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
