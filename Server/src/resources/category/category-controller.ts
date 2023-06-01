import { Request, Response } from 'express';
import * as yup from 'yup';
import { ProductModel } from '../products/product-model';
import { CategoryModel } from './category-model';

export const CategorySchema = yup.object({
  name: yup.string().required('Category name required'),
});

// CREATE CATEGORY
export async function createCategory(req: Request, res: Response) {
  await CategorySchema.validate(req.body);
  const categoryData = { ...req.body };
  const category = new CategoryModel(categoryData);

  await category.save();
  res.status(201).json(category);
}

// GET ALL CATEGORIES
export async function getAllCategories(req: Request, res: Response) {
  const categories = await CategoryModel.find({});
  res.json(categories);
}

// GET ALL PRORDUCTS WITH SAME CATEGORY
export async function getProductsByCategory(req: Request, res: Response) {
  const categoryId = req.params.categoryId;

  try {
    const products = await ProductModel.find({ categoryIDs: categoryId });
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
}
