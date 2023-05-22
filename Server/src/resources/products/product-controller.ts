// getAllProducts()
// getProductById()
// createProduct()
// updateProduct()
// deleteProduct()
// productQuantity()

import { Request, Response } from 'express';
import * as Yup from 'yup';
import { ProductModel } from './product-model';

const productSchema = Yup.object().shape({
  categoryIDs: Yup.array().of(Yup.string()),
  title: Yup.string().required(),
  imageID: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  stockLevel: Yup.number().required(),
  imageURL: Yup.string().required(),
  isArchived: Yup.boolean().required(),
});

export async function getAllProducts(req: Request, res: Response) {
  console.log('Placeholder för getAllProducts');
}

export async function getProductById(req: Request, res: Response) {
  console.log('Placeholder för getProductById');
}

import { ValidationError } from 'yup';

export async function createProduct(req: Request, res: Response) {
  try {
    await productSchema.validate(req.body);
    const createdProduct = await ProductModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof ValidationError) {
      res.status(400).json(error.errors);
    } else {
      res.status(500).json({ message: 'Error creating product' });
    }
  }
}

export async function updateProduct(req: Request, res: Response) {
  console.log('Placeholder för updateProduct');
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      const responseObj = req.params.id + " not found";
      res.status(404).json(responseObj);
      return;
    }
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(204).json(product);
  } catch (error) {
    res.status(404).json({
      message: "Error finding the product",
      error: (error as any).message,
    });
  }
}



export async function productQuantity(req: Request, res: Response) {
  console.log('Placeholder för productQuantity');
}
