// import { useEffect, useState } from "react";
// import { Header } from "@/components/Header";
// import { PageTitle } from "@/components/PageTitle";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, MoreVertical } from "lucide-react";
// import axios from "axios";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// const Accounts = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [name, setName] = useState("");
//   const [type, setType] = useState("");
//   const [balance, setBalance] = useState("");
//   const [search, setSearch] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
// const allSelected = selectedAccounts.length === accounts.length;

//   // Fetch accounts
//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/accounts");
//       setAccounts(res.data || []); // ensure array
//     } catch (err) {
//       console.error("Error fetching accounts", err);
//     }
//   };

//   const addAccount = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/accounts", { name, type, balance });
//       fetchAccounts();
//       setName(""); setType(""); setBalance("");
//     } catch (err) {
//       console.error("Error adding account", err);
//     }
//   };

//   const deleteAccount = async (id: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/accounts/${id}`);
//       fetchAccounts();
//     } catch (err) {
//       console.error("Error deleting account", err);
//     }
//   };

//   const filteredAccounts = accounts.filter((a) =>
//     a.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <Header activeTab="Accounts" />
//       <main className="container px-4 py-8">
//         <PageTitle
//           title="Welcome Back, Riya"
//           subtitle="This is your Financial Overview Report"
//         />

//         <div className="bg-card rounded-xl p-6 shadow-lg">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold">Accounts Page</h2>
//             <Dialog>
//   <DialogTrigger asChild>
//     <Button className="gap-2">
//       <Plus className="h-4 w-4" />
//       Add New
//     </Button>
//   </DialogTrigger>

//   <DialogContent className="sm:max-w-[425px]">
//     <DialogHeader>
//       <DialogTitle>{isEditing ? "Edit Account" : "Add New Account"}</DialogTitle>
//     </DialogHeader>

//     <div className="grid gap-4 py-4">
//       {/* Name Input */}
//       <div className="grid gap-2">
//         <Label htmlFor="name">Account Name</Label>
//         <Input
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter account name"
//         />
//       </div>

//       {/* Type Select */}
//       <div className="grid gap-2">
//         <Label htmlFor="type">Account Type</Label>
//         <Select value={type} onValueChange={(value) => setType(value)}>
//           <SelectTrigger id="type">
//             <SelectValue placeholder="Select type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="cash">Cash</SelectItem>
//             <SelectItem value="bank">Bank</SelectItem>
//             <SelectItem value="credit">Credit Card</SelectItem>
//             <SelectItem value="investment">Investment</SelectItem>
//             <SelectItem value="loan">Loan</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Balance Input */}
//       <div className="grid gap-2">
//         <Label htmlFor="balance">Initial Balance</Label>
//         <Input
//           id="balance"
//           type="number"
//           value={balance}
//           onChange={(e) => setBalance(e.target.value)}
//           placeholder="0.00"
//         />
//       </div>
//     </div>

//     <DialogFooter>
//       <Button
//         onClick={async () => {
//           if (isEditing && editId) {
//             // edit
//             await axios.put(`/api/accounts/${editId}`, {
//               name,
//               type,
//               balance,
//             });
//           } else {
//             // add new
//             await axios.post("/api/accounts", {
//               name,
//               type,
//               balance,
//             });
//           }

//           fetchAccounts();
//           setName("");
//           setType("");
//           setBalance("");
//           setIsEditing(false);
//           setEditId(null);
//         }}
//       >
//         {isEditing ? "Update Account" : "Add Account"}
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>

//           </div>

//           <div className="mb-6">
//             <Input
//               placeholder="Filter by name..."
//               className="max-w-md"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left border-b border-border">
//                   <th className="pb-3 pl-4">
//                     <input type="checkbox" className="rounded border-gray-300" />
//                   </th>
//                   <th className="pb-3 font-medium">Name</th>
//                   <th className="pb-3 font-medium">Type</th>
//                   <th className="pb-3 font-medium">Balance</th>
//                   <th className="pb-3 font-medium text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAccounts.map((account) => (
//                   <tr key={account._id} className="border-b border-border/50 hover:bg-muted/50">
//                     <td className="py-3 pl-4">
//                       <input type="checkbox" className="rounded border-gray-300" />
//                     </td>
//                     <td className="py-3">{account.name}</td>
//                     <td className="py-3 capitalize">{account.type}</td>
//                     <td className="py-3">₹{parseFloat(account.balance).toFixed(2)}</td>
//                     <td className="py-3 text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="sm">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent>
//                           <DropdownMenuItem>Edit</DropdownMenuItem>
//                           <DropdownMenuItem
//                             onClick={() => deleteAccount(account._id)}
//                             className="text-red-600"
//                           >
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Accounts;
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MoreVertical } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const allSelected = selectedAccounts.length === accounts.length;

  // Fetch accounts
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/accounts");
      setAccounts(res.data || []);
    } catch (err) {
      console.error("Error fetching accounts", err);
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/accounts/${id}`);
      fetchAccounts();
    } catch (err) {
      console.error("Error deleting account", err);
    }
  };

  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeTab="Accounts" />
      <main className="container px-4 py-8">
        <PageTitle
          title="Welcome Back, Riya"
          subtitle="This is your Financial Overview Report"
        />

        <div className="bg-card rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Accounts Page</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  {isEditing ? "Edit Account" : "Add New"}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Edit Account" : "Add New Account"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Account Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter account name"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="type">Account Type</Label>
                    <Select value={type} onValueChange={(value) => setType(value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank">Bank</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="loan">Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="balance">Initial Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    onClick={async () => {
                      if (isEditing && editId) {
                        await axios.put(`http://localhost:5000/api/accounts/${editId}`, {
                          name,
                          type,
                          balance,
                        });
                      } else {
                        await axios.post("http://localhost:5000/api/accounts", {
                          name,
                          type,
                          balance,
                        });
                      }
                      fetchAccounts();
                      setName("");
                      setType("");
                      setBalance("");
                      setIsEditing(false);
                      setEditId(null);
                    }}
                  >
                    {isEditing ? "Update Account" : "Add Account"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Filter by name..."
              className="max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="pb-3 pl-4">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAccounts(accounts.map((a) => a._id));
                        } else {
                          setSelectedAccounts([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Balance</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account._id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedAccounts.includes(account._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAccounts([...selectedAccounts, account._id]);
                          } else {
                            setSelectedAccounts(
                              selectedAccounts.filter((id) => id !== account._id)
                            );
                          }
                        }}
                      />
                    </td>
                    <td className="py-3">{account.name}</td>
                    <td className="py-3 capitalize">{account.type}</td>
                    <td className="py-3">₹{parseFloat(account.balance).toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setIsEditing(true);
                              setEditId(account._id);
                              setName(account.name);
                              setType(account.type);
                              setBalance(account.balance);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteAccount(account._id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Accounts;
