import { Request, Response } from "express";
import dbcon from "../config/dbconn";
import { Usage } from "@prisma/client";

interface Usagereq {
  batchId: string;
  quantity: number;
  usageDate: Date;
}
interface Usageres<T> {
  message: string;
  data?: T;
}

const addUsage = async (
  req: Request<{}, {}, Usagereq>,
  res: Response<Usageres<Usage>>,
) => {
  try {
    const { batchId, quantity, usageDate } = req.body;
    if (!batchId || !quantity || !usageDate) {
      return res.status(400).json({
        message: "batchId, quantity, and usageDate are required",
      });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        message: "quantity must be greater than 0",
      });
    }

    const newUsage = await dbcon.usage.create({
      data: {
        batchId,
        quantity,
        usageDate,
      },
    });
    res.status(201).json({
      message: "Usage added successfully",
      data: newUsage,
    });
  } catch (error) {
    console.error("Error adding usage:", error);
    res.status(500).json({
      message: "addusage server error",
    });
  }
};
const getAllUsages = async (req: Request, res: Response<Usageres<Usage[]>>) => {
  try {
    const usages = await dbcon.usage.findMany();
    res.status(200).json({
      message: "Usages fetched successfully",
      data: usages,
    });
  } catch (error) {
    console.error("Error fetching usages:", error);
    res.status(500).json({
      message: "getAllUsages server error",
    });
  }
};
const deleteUsage = async (
  req: Request<{ id: string }>,
  res: Response<Usageres<null>>,
) => {
  try {
    const { id } = req.params;
    await dbcon.usage.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Usage deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting usage:", error);
    res.status(500).json({
      message: "deleteUsage server error",
    });
  }
};
const updateUsage = async (
  req: Request<{ id: string }, {}, Usagereq>,
  res: Response<Usageres<Usage>>,
) => {
  try {
    const { id } = req.params;
    const { batchId, quantity, usageDate } = req.body;

    const updatedUsage = await dbcon.usage.update({
      where: { id },
      data: {
        batchId,
        quantity,
        usageDate,
      },
    });
    res.status(200).json({
      message: "Usage updated successfully",
      data: updatedUsage,
    });
  } catch (error) {
    console.error("Error updating usage:", error);
    res.status(500).json({
      message: "updateUsage server error",
    });
  }
};

export { addUsage, getAllUsages, deleteUsage, updateUsage };
