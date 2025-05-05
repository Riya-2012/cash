import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/Header";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MoreVertical } from "lucide-react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", parentCategory: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/categories?search=${search}`);
      const data = Array.isArray(res.data) ? res.data : res.data.categories || [];
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // Set to empty array on error
    }
  };
  
  

  useEffect(() => {
    fetchCategories();
  }, [search]);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/categories/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/categories", form);
    }
    setDialogOpen(false);
    setForm({ name: "", type: "", parentCategory: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setForm({
      name: category.name,
      type: category.type,
      parentCategory: category.parentCategory || "",
    });
    setEditingId(category._id);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    fetchCategories();
  };

  const handleBulkDelete = async () => {
    await axios.post("http://localhost:5000/api/categories/delete-multiple", { ids: selectedIds });
    setSelectedIds([]);
    fetchCategories();
  };

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header activeTab="Categories" />
      <main className="container px-4 py-8">
        <PageTitle
          title="Welcome Back, Riya"
          subtitle="This is your Financial Overview Report"
        />

        <div className="bg-card rounded-xl p-6 shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Categories Page</h2>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <Button variant="destructive" onClick={handleBulkDelete}>
                  Delete Selected
                </Button>
              )}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingId ? "Edit Category" : "Add Category"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Enter category name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Category Type</Label>
                      <Select
                        value={form.type}
                        onValueChange={(value) =>
                          setForm({ ...form, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="parent">Parent Category</Label>
                      <Input
                        id="parent"
                        value={form.parentCategory}
                        onChange={(e) =>
                          setForm({ ...form, parentCategory: e.target.value })
                        }
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                      {editingId ? "Update" : "Add"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Filter name..."
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
                      onChange={(e) =>
                        setSelectedIds(
                          e.target.checked ? categories.map((c) => c._id) : []
                        )
                      }
                      checked={
                        selectedIds.length === categories.length &&
                        categories.length > 0
                      }
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-border/50 hover:bg-muted/50"
                  >
                    <td className="py-3 pl-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(category._id)}
                        onChange={() => toggleSelection(category._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3">{category.name}</td>
                    <td className="py-3">{category.type}</td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(category._id)}
                            className="text-red-500"
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

export default Categories;
