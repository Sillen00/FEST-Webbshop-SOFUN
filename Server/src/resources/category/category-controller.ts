import { Request, Response } from "express";
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


