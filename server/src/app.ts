import express from "express";
import { ProductRouter } from "./routes";
import { Connection } from "./connection";
import { corsMiddleware } from "./middleware/cors";
import Dotenv from "dotenv";
import { ProductModel } from "./models/product.model";

export class App {
  private app = express();
  private productRouter: ProductRouter;
  private connection: Connection;
  private port = process.env.PORT || "3000";

  constructor({ ProductModel }: any) {
    this.productRouter = new ProductRouter(ProductModel);
    this.connection = new Connection();
    this.appConnect();
    this.appMiddlewares();
    this.app.disable("x-powered-by");
    this.app.use(corsMiddleware());
    this.appRoutes();
    this.appListen();
  }

  appRoutes() {
    this.app.use("/api/products", this.productRouter.getRouter());
  }

  appListen() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port http://localhost:${this.port}`)
    );
  }

  appMiddlewares() {
    this.app.use(express.json());
  }

  async appConnect() {
    await this.connection.testConnection();
  }
}

// we configure the variables of ambient
Dotenv.config();
const server = new App({ ProductModel });
