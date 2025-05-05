import Category from "../models/categoryModel.js";

// Create
export const createCategory = async (req, res) => {
  try {
    const { name, type, parentCategory } = req.body;
    const category = new Category({ name, type, parentCategory });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getCategories = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const categories = await Category.find(filter);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, parentCategory } = req.body;
    const updated = await Category.findByIdAndUpdate(
      id,
      { name, type, parentCategory },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Single
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Multiple
export const deleteMultipleCategories = async (req, res) => {
  try {
    const { ids } = req.body;
    await Category.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Categories deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
