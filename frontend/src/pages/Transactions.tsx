// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Header } from '@/components/Header';
// import { PageTitle } from '@/components/PageTitle';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Calendar } from '@/components/ui/calendar';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { format } from 'date-fns';
// import {
//   Calendar as CalendarIcon,
//   Plus,
//   Upload,
//   Download,
//   MoreVertical,
// } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [date, setDate] = useState(new Date());
//   const [type, setType] = useState('');
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [account, setAccount] = useState('');
//   const [payee, setPayee] = useState('');
//   const [note, setNote] = useState('');
//   const [search, setSearch] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [selectedTransactions, setSelectedTransactions] = useState([]);
//   const [file, setFile] = useState(null);

//   const allSelected = selectedTransactions.length === transactions.length;

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const [tx, cats, accts] = await Promise.all([
//       axios.get('http://localhost:5000/api/transactions'),
//       axios.get('http://localhost:5000/api/categories'),
//       axios.get('http://localhost:5000/api/accounts'),
//     ]);
//     setTransactions(tx.data);
//     setCategories(cats.data);
//     setAccounts(accts.data);
//   };

//   const resetForm = () => {
//     setDate(new Date());
//     setType('');
//     setAmount('');
//     setCategory('');
//     setAccount('');
//     setPayee('');
//     setNote('');
//     setIsEditing(false);
//     setEditId(null);
//   };

//   const handleSaveTransaction = async () => {
//     const txData = { type, amount, category, account, date, payee, note };
//     try {
//       if (isEditing && editId) {
//         await axios.put(`http://localhost:5000/api/transactions/${editId}`, txData);
//       } else {
//         await axios.post('http://localhost:5000/api/transactions', txData);
//       }
//       resetForm();
//       fetchData();
//     } catch (err) {
//       console.error('Error saving transaction', err);
//     }
//   };

//   const handleEdit = (tx) => {
//     setType(tx.type);
//     setAmount(tx.amount);
//     setCategory(tx.category._id);
//     setAccount(tx.account._id);
//     setDate(new Date(tx.date));
//     setPayee(tx.payee);
//     setNote(tx.note);
//     setIsEditing(true);
//     setEditId(tx._id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/transactions/${id}`);
//       fetchData();
//     } catch (err) {
//       console.error('Error deleting transaction', err);
//     }
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTransactions([]);
//     } else {
//       setSelectedTransactions(transactions.map((tx) => tx._id));
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/import-export/export', {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'transactions.csv');
//       document.body.appendChild(link);
//       link.click();
//     } catch (err) {
//       console.error('Error exporting data', err);
//     }
//   };

//   const handleImport = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       await axios.post('http://localhost:5000/api/import-export/import', formData);
//       setFile(null);
//       fetchData();
//     } catch (err) {
//       console.error('Error importing file', err);
//     }
//   };

//   const filteredTransactions = transactions.filter((tx) =>
//     tx.payee?.toLowerCase().includes(search.toLowerCase()) ||
//     tx.note?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <Header />
//       <PageTitle title="Transactions" />
//       <div className="flex items-center gap-4 my-4">
//         <Input
//           placeholder="Search transactions"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Button variant="outline" onClick={handleSelectAll}>
//           {allSelected ? 'Unselect All' : 'Select All'}
//         </Button>
//         <Button variant="outline" asChild>
//           <label className="cursor-pointer">
//             <Upload className="mr-2 h-4 w-4" />
//             Import
//             <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
//           </label>
//         </Button>
//         <Button onClick={handleImport}>Upload</Button>
//         <Button onClick={handleExport}>
//           <Download className="mr-2 h-4 w-4" /> Export
//         </Button>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button className="ml-auto">
//               <Plus className="mr-2 h-4 w-4" /> Add Transaction
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>{isEditing ? 'Edit' : 'Add'} Transaction</DialogTitle>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <Label>Type</Label>
//               <Select value={type} onValueChange={setType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="income">Income</SelectItem>
//                   <SelectItem value="expense">Expense</SelectItem>
//                   <SelectItem value="transfer">Transfer</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Label>Amount</Label>
//               <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

//               <Label>Category</Label>
//               <Select value={category} onValueChange={setCategory}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Label>Account</Label>
//               <Select value={account} onValueChange={setAccount}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select account" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {accounts.map((acc) => (
//                     <SelectItem key={acc._id} value={acc._id}>
//                       {acc.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Label>Date</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className={cn('w-full justify-start text-left')}>
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {format(date, 'PPP')}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   <Calendar mode="single" selected={date} onSelect={setDate} />
//                 </PopoverContent>
//               </Popover>

//               <Label>Payee</Label>
//               <Input value={payee} onChange={(e) => setPayee(e.target.value)} />

//               <Label>Note</Label>
//               <Input value={note} onChange={(e) => setNote(e.target.value)} />
//             </div>
//             <DialogFooter>
//               <Button onClick={handleSaveTransaction}>
//                 {isEditing ? 'Update' : 'Save'}
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Transactions Table */}
//       <div className="mt-6 border rounded-lg overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-muted">
//             <tr>
//               <th className="p-3">#</th>
//               <th>Payee</th>
//               <th>Type</th>
//               <th>Amount</th>
//               <th>Category</th>
//               <th>Account</th>
//               <th>Date</th>
//               <th className="text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((tx, index) => (
//               <tr key={tx._id} className="border-t">
//                 <td className="p-3">
//                   <input
//                     type="checkbox"
//                     checked={selectedTransactions.includes(tx._id)}
//                     onChange={() =>
//                       setSelectedTransactions((prev) =>
//                         prev.includes(tx._id)
//                           ? prev.filter((id) => id !== tx._id)
//                           : [...prev, tx._id]
//                       )
//                     }
//                   />
//                 </td>
//                 <td>{tx.payee || '-'}</td>
//                 <td>{tx.type}</td>
//                 <td>₹{tx.amount}</td>
//                 <td>{tx.category?.name}</td>
//                 <td>{tx.account?.name}</td>
//                 <td>{format(new Date(tx.date), 'PPP')}</td>
//                 <td className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                       <DropdownMenuItem onClick={() => handleEdit(tx)}>Edit</DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handleDelete(tx._id)}>Delete</DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Transactions;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/Header';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Plus,
  Upload,
  Download,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [payee, setPayee] = useState('');
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [file, setFile] = useState(null);

  const allSelected = selectedTransactions.length === transactions.length;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [tx, cats, accts] = await Promise.all([
      axios.get('http://localhost:5000/api/transactions'),
      axios.get('http://localhost:5000/api/categories'),
      axios.get('http://localhost:5000/api/accounts'),
    ]);
    setTransactions(tx.data);
    setCategories(cats.data);
    setAccounts(accts.data);
  };

  const resetForm = () => {
    setDate(new Date());
    setType('');
    setAmount('');
    setCategory('');
    setAccount('');
    setPayee('');
    setNote('');
    setIsEditing(false);
    setEditId(null);
  };

  const handleSaveTransaction = async () => {
    const txData = { type, amount, category, account, date, payee, note };
    try {
      if (isEditing && editId) {
        await axios.put(`http://localhost:5000/api/transactions/${editId}`, txData);
      } else {
        await axios.post('http://localhost:5000/api/transactions', txData);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error('Error saving transaction', err);
    }
  };

  const handleEdit = (tx) => {
    setType(tx.type);
    setAmount(tx.amount);
    setCategory(tx.category._id);
    setAccount(tx.account._id);
    setDate(new Date(tx.date));
    setPayee(tx.payee);
    setNote(tx.note);
    setIsEditing(true);
    setEditId(tx._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting transaction', err);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map((tx) => tx._id));
    }
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.payee?.toLowerCase().includes(search.toLowerCase()) ||
    tx.note?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle Import functionality
  const handleImport = async () => {
    if (!file) {
      alert('Please select a file to import.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming the backend API supports file upload at '/api/import'
      const response = await axios.post('http://localhost:5000/api/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh the data after the import
      fetchData();
      alert('File imported successfully!');
    } catch (err) {
      console.error('Error importing file:', err);
      alert('Error importing file.');
    }
  };

  // Handle Export functionality
  const handleExport = async () => {
    try {
      // Fetch all transactions data for export
      const response = await axios.get('http://localhost:5000/api/transactions');
      const transactions = response.data;

      // Convert transactions to CSV format (or JSON if preferred)
      const csv = [
        ['Payee', 'Type', 'Amount', 'Category', 'Account', 'Date'], // Header row
        ...transactions.map(tx => [
          tx.payee,
          tx.type,
          tx.amount,
          tx.category?.name || '',
          tx.account?.name || '',
          format(new Date(tx.date), 'PPP'), // Format date
        ]),
      ]
        .map(row => row.join(','))
        .join('\n');

      // Create a Blob with CSV data
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting file:', err);
      alert('Error exporting file.');
    }
  };

  return (
    <div className="p-6">
      <Header />
      <PageTitle title="Transactions" />
      <div className="flex items-center gap-4 my-4">
        <Input
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline" onClick={handleSelectAll}>
          {allSelected ? 'Unselect All' : 'Select All'}
        </Button>
        <Button variant="outline" asChild>
          <label className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Import
            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </Button>
        <Button onClick={handleImport}>Upload</Button>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit' : 'Add'} Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>

              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem key={acc._id} value={acc._id}>
                      {acc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn('w-full justify-start text-left')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>

              <Label>Payee</Label>
              <Input value={payee} onChange={(e) => setPayee(e.target.value)} />

              <Label>Note</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveTransaction}>
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transactions Table */}
      <div className="mt-6 border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3">#</th>
              <th>Payee</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Account</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
              <tr key={tx._id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td>{tx.payee}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
                <td>{tx.category?.name}</td>
                <td>{tx.account?.name}</td>
                <td>{format(new Date(tx.date), 'PPP')}</td>
                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleEdit(tx)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(tx._id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
