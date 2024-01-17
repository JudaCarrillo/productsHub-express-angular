import { Connection } from "../connection";
import { DataTypes } from "sequelize";
import { ProductModelInterface } from "../interfaces";

export class ProductModel {
  insConnection: Connection;
  static product: any;

  constructor() {
    this.insConnection = new Connection();
    this.createProductModel();
  }

  createProductModel() {
    const sequelize = this.insConnection.exportSequelize();
    ProductModel.product = sequelize.define(
      "products",
      {
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
        price: {
          type: DataTypes.DECIMAL,
        },
        stock: {
          type: DataTypes.INTEGER,
        },
      },
      {
        createdAt: false,
        updatedAt: false,
      }
    );
  }

  static async getAll() {
    try {
      const result = await ProductModel.product.findAll();
      return result;
    } catch (error) {
      console.error("Error in getProducts:", error);
      throw error;
    }
  }

  static async getProductById(idProduct: string) {
    if (/[^\d]/.test(idProduct)) {
      throw new Error(`Invalid product id: ${idProduct}`);
    }

    try {
      const product = await ProductModel.product.findByPk(idProduct);
      if (!product) {
        throw new Error(`Product with id ${idProduct} not found`);
      }
      return product;
    } catch (error) {
      console.error("Error in getProductById:", error);
      throw error;
    }
  }

  static async deleteProduct(idProduct: string) {
    if (/[^\d]/.test(idProduct)) {
      throw new Error(`Invalid product id: ${idProduct}`);
    }

    try {
      const product = await ProductModel.getProductById(idProduct);

      if (!product) {
        return false;
      }

      await ProductModel.product.destroy({
        where: {
          id: idProduct,
        },
      });
      return true;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      throw error;
    }
  }

  static async createProduct(body: ProductModelInterface) {
    try {
      const newProduct = await ProductModel.product.create(body);
      return newProduct;
    } catch (error) {
      console.error("Error in createProduct:", error);
      throw error;
    }
  }

  static async updateProduct(idProduct: string, body: any) {
    if (/[^\d]/.test(idProduct)) {
      throw new Error(`Invalid product id: ${idProduct}`);
    }

    try {
      const existingProduct = await ProductModel.product.findByPk(idProduct);
      if (!existingProduct) {
        throw new Error(`Product with id ${idProduct} not found`);
      }

      await ProductModel.product.update(body, {
        where: {
          id: idProduct,
        },
      });

      const updatedProduct = await ProductModel.product.findByPk(idProduct);
      return updatedProduct;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      throw error;
    }
  }
}
