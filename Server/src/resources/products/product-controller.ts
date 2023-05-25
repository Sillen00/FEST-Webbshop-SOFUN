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
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting all products:', error);
    res.status(500).json({ message: 'Error getting all products' });
  }
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
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { title, description, price },
      { new: true } //behövs för att skicka tillbaka den uppdaterade produkten
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
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
