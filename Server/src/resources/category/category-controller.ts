import { Request, Response } from "express";
import { ProductModel } from "../products/product-model";
import { CategoryModel } from "./category-model";


// CREATE CATEGORY
export async function createCategory(req: Request, res: Response) {
    console.log(req.body)
    const categoryData = {...req.body}
    const category = new CategoryModel(categoryData);

    //      try {
    //    await CategorySchema.validate(req.body);
    //  } catch (error) {
    //    if (error instanceof yup.ValidationError) {
    //      res.status(400).json(`"${error.path}" not found`);
    //      return;
    //    }}
    
    await category.save();
    res.status(201).json(category);
}

// GET CATEGORY
export async function getCategory(req: Request, res: Response) {
    const category = req.params.category;
    console.log(req.params.category);
    
    const products = await ProductModel.find({ categories: category });
    console.log(products);
    res.json(products);
}
   
// GET ALL CATEGORIES
export async function getAllCategories(req: Request, res: Response) {
    const categories = await CategoryModel.find({});
    res.json(categories);
}

// GET SPECIFIC CATEGORY
// export async function getCategoryById(req: Request, res: Response) {
//     console.log('Placeholder for getCategoryById');
// }

// GET ALL PRORDUCTS WITH SAME CATEGORY
export async function getAllContentOfCategory(req: Request, res: Response) {
    const categoryId = req.params.categoryId; // Assuming the parameter is categoryId
    
    try {
      const products = await ProductModel.find({ categoryIDs: categoryId });
      res.json(products);
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ message: 'Error retrieving products' });
    }
  }
  
   


