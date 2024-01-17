import { Request, Response } from "express";
import { ProductControllerInterface } from "../interfaces";
import { ProductModel } from "../models/product.model";
import { validateProduct, validatePartialProduct } from "../schemas/products";
export class ProductController implements ProductControllerInterface {
  productModel;

  constructor(productModel: any) {
    this.productModel = new productModel();
  }

  getProducts = async (req: Request, res: Response) => {
    try {
      const allProducts = await ProductModel.getAll();
      return res.json(allProducts);
    } catch (error) {
      console.error("Error en getProducts:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.getProductById(id);
      if (product !== null) {
        return res.json(product);
      } else {
        return res.status(404).json({
          msg: `There isn't a product with id ${id}`,
        });
      }
    } catch (error) {
      console.error("Error in getProductsById:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const isRemoved = await ProductModel.deleteProduct(id);

      if (isRemoved) res.json({ msg: `Product successfully removed` });
      else {
        res.status(404).json({
          msg: `There isn't product with id ${id}`,
        });
      }
    } catch (error) {
      console.error("Error en getProducts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response) => {
    const result = validateProduct(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const newProduct = await ProductModel.createProduct(result.data);
      return res.json(newProduct);
    } catch (error) {
      console.error("Error en getProducts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = validatePartialProduct(req.body);

    if (!result.success) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const updatedProduct = await ProductModel.updateProduct(id, result.data);
      return res.json(updatedProduct);
    } catch (error) {
      console.error("Error en getProducts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
