import z from "zod";
import { ProductModelInterface } from "../interfaces";

const productSchema = z.object({
  name: z.string({
    invalid_type_error: "Product name must be a string",
    required_error: "Product name is required",
  }),
  description: z.string({
    invalid_type_error: "Product description must be a string",
  }),
  price: z.number().positive(),
  stock: z.number().positive().min(0),
});

export function validateProduct(input: ProductModelInterface) {
  return productSchema.safeParse(input);
}

export function validatePartialProduct(input: ProductModelInterface) {
  return productSchema.partial().safeParse(input);
}
