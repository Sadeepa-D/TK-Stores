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
  req: Request<Usagereq>,
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

export { addUsage };
