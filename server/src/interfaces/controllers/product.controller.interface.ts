import { Request, Response } from "express";

export interface ProductControllerInterface {
  getProducts(req: Request, res: Response): any;
  getProductById(req: Request, res: Response): any;
  delete(req: Request, res: Response): any;
  create(req: Request, res: Response): any;
  update(req: Request, res: Response): any;
}
