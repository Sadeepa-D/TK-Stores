import { Request, Response } from "express";
import prisma from "../config/dbconn";

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, baseunit, description } = req.body;

    if (!name || !price || !baseunit || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than zero" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        baseunit,
        description,
      },
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("addProduct error:", error);
    res.status(500).json({ message: "add product server error" });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.error("getAllProducts error:", error);
    res.status(500).json({ message: "get products server error" });
  }
};

export default {
  addProduct,
  getAllProducts,
};
