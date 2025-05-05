
import { Header } from "@/components/Header";
import { PageTitle } from "@/components/PageTitle";
import { StatCard } from "@/components/StatCard";
import { AreaChart } from "@/components/AreaChart";
import { PieChart } from "@/components/PieChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");

  // Sample data for charts
  const areaChartData = [
    { name: "25 February", income: 2500, expense: 1500 },
    { name: "01 March", income: 3000, expense: 1700 },
    { name: "04 March", income: 2700, expense: 1900 },
    { name: "07 March", income: 8700, expense: 2000 },
    { name: "10 March", income: 4500, expense: 2700 },
    { name: "13 March", income: 3600, expense: 1800 },
    { name: "16 March", income: 3500, expense: 2100 },
    { name: "19 March", income: 3800, expense: 2200 },
    { name: "23 March", income: 2900, expense: 1600 },
  ];

  const pieChartData = [
    { name: "Travel", value: 900 },
    { name: "Food", value: 77 },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "13 March, 2025",
      category: "Travel",
      payee: "Myself",
      amount: -899,
      account: "Bank",
    },
    {
      id: 2,
      date: "12 March, 2025",
      category: "Travel",
      payee: "Myself",
      amount: 890,
      account: "Bank",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeTab="Overview" />
      <main className="container px-4 py-8">
        <PageTitle
          title="Welcome Back, Riya"
          subtitle="This is your Financial Overview Report"
        />
        
        <div className="mb-6">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="bank">Bank</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="credit">Credit Card</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            variant="remaining"
            title="Remaining"
            value={8613}
            dateRange="Feb 21 - Mar 23, 2025"
            change={{ value: 78, trend: "down" }}
            icon="piggy-bank"
          />
          <StatCard
            variant="income"
            title="Income"
            value={9590}
            dateRange="Feb 21 - Mar 23, 2025"
            change={{ value: 81, trend: "down" }}
            icon="wallet"
          />
          <StatCard
            variant="expense"
            title="Expenses"
            value={-977}
            dateRange="Feb 21 - Mar 23, 2025"
            change={{ value: 90, trend: "down" }}
            icon="credit-card"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="lg:col-span-2">
            <div className="chart-container">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Transactions</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Area Chart</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Area Chart</DropdownMenuItem>
                    <DropdownMenuItem>Bar Chart</DropdownMenuItem>
                    <DropdownMenuItem>Line Chart</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AreaChart title="" data={areaChartData} className="border-0 shadow-none p-0" />
            </div>
          </div>
          <div>
            <div className="chart-container h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">Pie Chart</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Pie Chart</DropdownMenuItem>
                    <DropdownMenuItem>Donut Chart</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <PieChart title="" data={pieChartData} className="border-0 shadow-none p-0" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
            <Button size="sm" variant="outline">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Payee</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium">Account</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.category}</td>
                    <td className="py-3">{transaction.payee}</td>
                    <td className={`py-3 text-right ${
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(transaction.amount)}
                    </td>
                    <td className="py-3">{transaction.account}</td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">•••</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
