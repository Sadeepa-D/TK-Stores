import { Request, Response } from "express";
import prisma from "../config/dbconn";
import { Product, Unit } from "@prisma/client";

interface ProductReq {
  name: string;
  pid : string;
  price: number;
  baseunit: Unit;
  description: string;
}

interface ProductRes<T> {
  message: string;
  data?: T;
}

const addProduct = async (
  req: Request<{}, {}, ProductReq>,
  res: Response<ProductRes<Product>>,
) => {
  try {
    const { name, pid, price, baseunit, description } = req.body;

    if (!name || !pid || !price || !baseunit || !description) {
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
        pid,
        price,
        baseunit,
        description,
      },
    });

    res
      .status(201)
      .json({ message: "Product added successfully", data: product });
  } catch (error) {
    console.error("addProduct error:", error);
    res.status(500).json({ message: "add product server error" });
  }
};

const getAllProducts = async (
  req: Request,
  res: Response<ProductRes<Product[]>>,
) => {
  try {
    const products = await prisma.product.findMany();
    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error("getAllProducts error:", error);
    res.status(500).json({ message: "get products server error" });
  }
};

const updateProduct = async (
  req: Request<{ id: string }, {}, ProductReq>,
  res: Response<ProductRes<Product>>,
) => {
  try {
    const { id } = req.params;
    const { name, price, baseunit, description } = req.body;

    if (!name || !price || !baseunit || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than zero" });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        baseunit,
        description,
      },
    });

    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "update product server error" });
  }
};

const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response<ProductRes<null>>,
) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("deleteProduct error:", error);
    res.status(500).json({ message: "delete product server error" });
  }
};

const activateProduct = async (
  req: Request<{ id: string }>,
  res: Response<ProductRes<Product>>,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: { status: "Active" },
    });

    res
      .status(200)
      .json({ message: "Product activated successfully", data: product });
  } catch (error) {
    console.error("activateProduct error:", error);
    res.status(500).json({ message: "activate product server error" });
  }
};

const deactivateProduct = async (
  req: Request<{ id: string }>,
  res: Response<ProductRes<Product>>,
) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: { id },
      data: { status: "Inactive" },
    });
    res
      .status(200)
      .json({ message: "Product deactivated successfully", data: product });
  } catch (error) {
    console.error("deactivateProduct error:", error);
    res.status(500).json({ message: "deactivate product server error" });
  }
};

export {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  activateProduct,
  deactivateProduct,
};
