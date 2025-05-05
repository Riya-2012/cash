
// import { Header } from "@/components/Header";
// import { PageTitle } from "@/components/PageTitle";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger 
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Plus, AlertTriangle } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import axios from "axios";
// import { useEffect } from "react";
// const Budgets = () => {
//   const [date, setDate] = useState<Date>();

//   // const budgets = [
//   //   {
//   //     id: 1,
//   //     category: "Food",
//   //     allocated: 5000,
//   //     spent: 3800,
//   //     remaining: 1200,
//   //     period: "May 2025",
//   //   },
//   //   {
//   //     id: 2,
//   //     category: "Travel",
//   //     allocated: 10000,
//   //     spent: 9500,
//   //     remaining: 500,
//   //     period: "May 2025",
//   //   },
//   //   {
//   //     id: 3,
//   //     category: "Entertainment",
//   //     allocated: 3000,
//   //     spent: 3200,
//   //     remaining: -200,
//   //     period: "May 2025",
//   //   },
//   // ];
//   const [budgets, setBudgets] = useState([]);
//   useEffect(() => {
//     const fetchBudgets = async () => {
//       try {
//         const res = await axios.get("/api/budgets");
//         setBudgets(res.data);
//       } catch (err) {
//         console.error("Error fetching budgets:", err);
//       }
//     };
//     fetchBudgets();
//   }, []);
//   const [newBudget, setNewBudget] = useState({
//     category: "",
//     allocated: "",
//     period: "",
//     startDate: null,
//     recurring: false,
//     notifications: false,
//   });
//   const handleCreateBudget = async () => {
//     try {
//       await axios.post("/api/budgets", {
//         ...newBudget,
//         allocated: parseFloat(newBudget.allocated),
//         startDate: date,
//       });
//       setNewBudget({
//         category: "",
//         allocated: "",
//         period: "",
//         startDate: null,
//         recurring: false,
//         notifications: false,
//       });
//       setDate(undefined);
//       const updated = await axios.get("/api/budgets");
//       setBudgets(updated.data);
//     } catch (err) {
//       console.error("Error creating budget:", err);
//     }
//   };
    
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Header activeTab="Budgets" />
//       <main className="container px-4 py-8">
//         <PageTitle title="Welcome Back, Riya" subtitle="This is your Financial Overview Report" />
        
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Budget Overview</h2>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Create Budget
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[500px]">
//               <DialogHeader>
//                 <DialogTitle>Create New Budget</DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="category">Category</Label>
//                   <Select>
//                     <SelectTrigger id="category">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="food">Food</SelectItem>
//                       <SelectItem value="travel">Travel</SelectItem>
//                       <SelectItem value="entertainment">Entertainment</SelectItem>
//                       <SelectItem value="utilities">Utilities</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="amount">Budget Amount</Label>
//                   <Input id="amount" type="number" placeholder="0.00" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="period">Budget Period</Label>
//                   <Select>
//                     <SelectTrigger id="period">
//                       <SelectValue placeholder="Select period" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="monthly">Monthly</SelectItem>
//                       <SelectItem value="quarterly">Quarterly</SelectItem>
//                       <SelectItem value="yearly">Yearly</SelectItem>
//                       <SelectItem value="custom">Custom</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="startDate">Start Date</Label>
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant={"outline"}
//                         className={cn(
//                           "w-full justify-start text-left font-normal",
//                           !date && "text-muted-foreground"
//                         )}
//                       >
//                         <span>
//                           {date ? format(date, "PPP") : <span>Pick a date</span>}
//                         </span>
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0 pointer-events-auto">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Switch id="recurring" />
//                   <Label htmlFor="recurring">Make this budget recurring</Label>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Switch id="notifications" />
//                   <Label htmlFor="notifications">Enable budget notifications</Label>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">Create Budget</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
        
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
//           <Card className="animate-fade-in">
//             <CardHeader>
//               <CardTitle>Total Budget</CardTitle>
//               <CardDescription>May 2025</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold mb-2">
//                 {new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                 }).format(18000)}
//               </div>
//               <Progress value={50} className="h-2" />
//               <div className="flex justify-between mt-2 text-sm">
//                 <span>50% used</span>
//                 <span className="text-muted-foreground">₹9,000 / ₹18,000</span>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
//             <CardHeader>
//               <CardTitle>Spent</CardTitle>
//               <CardDescription>May 2025</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-amber-500 mb-2">
//                 {new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                 }).format(16500)}
//               </div>
//               <Progress value={92} className="h-2 bg-muted" />
//               <div className="flex justify-between mt-2 text-sm">
//                 <span>92% of total budget</span>
//                 <span className="text-muted-foreground">₹16,500 / ₹18,000</span>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
//             <CardHeader>
//               <CardTitle>Remaining</CardTitle>
//               <CardDescription>May 2025</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-500 mb-2">
//                 {new Intl.NumberFormat("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                 }).format(1500)}
//               </div>
//               <Progress value={8} className="h-2 bg-muted" />
//               <div className="flex justify-between mt-2 text-sm">
//                 <span>8% remaining</span>
//                 <span className="text-muted-foreground">₹1,500 / ₹18,000</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
        
//         <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
//           <h3 className="text-xl font-semibold mb-6">Category Budgets</h3>
          
//           <div className="space-y-6">
//             {budgets.map((budget) => (
//               <div key={budget.id} className="border-b border-border pb-6">
//                 <div className="flex justify-between mb-2">
//                   <div>
//                     <h4 className="font-semibold">{budget.category}</h4>
//                     <p className="text-sm text-muted-foreground">{budget.period}</p>
//                   </div>
//                   <div className="text-right">
//                     <div className={cn(
//                       "font-semibold",
//                       budget.remaining < 0 ? "text-red-500" : "text-green-500"
//                     )}>
//                       {new Intl.NumberFormat("en-IN", {
//                         style: "currency",
//                         currency: "INR",
//                       }).format(budget.remaining)}
//                     </div>
//                     <p className="text-sm text-muted-foreground">remaining</p>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>{Math.round((budget.spent / budget.allocated) * 100)}% used</span>
//                   <span>
//                     {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: "INR",
//                       maximumFractionDigits: 0,
//                     }).format(budget.spent)} / {new Intl.NumberFormat("en-IN", {
//                       style: "currency",
//                       currency: "INR",
//                       maximumFractionDigits: 0,
//                     }).format(budget.allocated)}
//                   </span>
//                 </div>
                
//                 {budget.remaining < 0 ? (
//                   <div className="relative">
//                     <Progress value={100} className="h-2 bg-red-200" />
//                     <div className="absolute right-0 top-0 bg-red-600 h-2 w-[5%] rounded-r-full"></div>
//                     <div className="flex items-center gap-1 mt-2 text-xs text-red-500">
//                       <AlertTriangle className="h-3 w-3" />
//                       <span>Over budget by {new Intl.NumberFormat("en-IN", {
//                         style: "currency",
//                         currency: "INR",
//                       }).format(Math.abs(budget.remaining))}</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <Progress value={(budget.spent / budget.allocated) * 100} className="h-2" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Budgets;

import { Header } from "@/components/Header";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

const Budgets = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [newBudget, setNewBudget] = useState({
    category: "",
    amount: "",
    period: "",
    startDate: null,
    recurring: false,
    notifications: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/budgets");
        setBudgets(res.data);
      } catch (err) {
        console.error("Error fetching budgets:", err);
      }
    };
    fetchBudgets();
  }, []);

  const handleCreateBudget = async () => {
    if (!newBudget.category || !newBudget.amount || !newBudget.period || !date) {
      setError("Please fill in all fields.");
      return;
    }
  
    const parsedAmount = parseFloat(newBudget.amount);
  
    try {
      await axios.post("http://localhost:5000/api/budgets", {
        ...newBudget,
        amount: parsedAmount,
        allocated: parsedAmount,
        startDate: date.toISOString(),
        userId: "6637bca041e43d066cc4e709", // Temporary fallback before auth
      });
  
      // Reset form
      setNewBudget({
        category: "",
        amount: "",
        period: "",
        startDate: null,
        recurring: false,
        notifications: false,
      });
      setDate(null);
      setError(null);
  
      // Refresh budget list
      const updated = await axios.get("http://localhost:5000/api/budgets?userId=6637bca041e43d066cc4e709");
      setBudgets(updated.data);
    } catch (err) {
      setError("Error creating budget. Please try again later.");
      console.error("Error creating budget:", err);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeTab="Budgets" />
      <main className="container px-4 py-8">
        <PageTitle title="Welcome Back, Riya" subtitle="This is your Financial Overview Report" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Budget Overview</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {error && <div className="text-red-500">{error}</div>}
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newBudget.category} onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Budget Amount</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    value={newBudget.amount} 
                    onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="period">Budget Period</Label>
                  <Select value={newBudget.period} onValueChange={(value) => setNewBudget({ ...newBudget, period: value })}>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <span>
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="recurring" 
                    checked={newBudget.recurring} 
                    onCheckedChange={(checked) => setNewBudget({ ...newBudget, recurring: checked })} 
                  />
                  <Label htmlFor="recurring">Make this budget recurring</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="notifications" 
                    checked={newBudget.notifications} 
                    onCheckedChange={(checked) => setNewBudget({ ...newBudget, notifications: checked })} 
                  />
                  <Label htmlFor="notifications">Enable budget notifications</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleCreateBudget}>Create Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {budgets.map((budget) => (
            <Card key={budget._id || budget.id} className="animate-fade-in">
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
                <CardDescription>{budget.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(budget.amount)}
                </div>
                <Progress value={(budget.spent / budget.amount) * 100} className="h-2" />
                <div className="flex justify-between mt-2 text-sm">
                  <span>{Math.round((budget.spent / budget.amount) * 100)}% used</span>
                  <span className="text-muted-foreground">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(budget.spent)} / {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(budget.amount)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Budgets;
