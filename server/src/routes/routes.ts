import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRouter {
  private productsRouter: Router;
  private productController: ProductController;

  constructor(productModel: any) {
    this.productsRouter = Router();
    this.productController = new ProductController(productModel);
    this.createRoutes();
  }

  createRoutes() {
    // get's
    this.productsRouter.get("/:id", this.productController.getProductById);
    this.productsRouter.get("/", this.productController.getProducts);

    // delete
    this.productsRouter.delete("/:id", this.productController.delete);

    // post
    this.productsRouter.post("/", this.productController.create);

    // update
    this.productsRouter.put("/:id", this.productController.update);
  }

  getRouter() {
    return this.productsRouter;
  }
}
