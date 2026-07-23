import { Request, Response } from "express";
import prisma from "../config/dbconn";
import { Batch } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const generateBatchNum = async (): Promise<string> => {
  const lastBatch = await prisma.batch.findFirst({
    orderBy: { createdAt: "desc" },
  });
  if (!lastBatch) {
    return "BATCH001";
  }
  const lastId = lastBatch.batchNumber;
  const numericPart = lastId.slice(5);
  const newNumericPart = (parseInt(numericPart) + 1)
    .toString()
    .padStart(3, "0");
  return `BATCH${newNumericPart}`;
};

interface BatchReq {
  pid: string;
  quantity: Decimal;
  manufactureDate: Date;
  expiryDate: Date;
  value: Decimal;
}
interface BatchRes<T> {
  message: string;
  data?: T;
}

const addBatch = async (
  req: Request<{}, {}, BatchReq>,
  res: Response<BatchRes<Batch>>,
) => {
  try {
    const { pid, quantity, manufactureDate, expiryDate, value } = req.body;
    if (!pid || !quantity || !manufactureDate || !expiryDate || !value) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const batchNumber = await generateBatchNum();
    const newBatch = await prisma.batch.create({
      data: {
        batchNumber,
        pid,
        quantity,
        manufactureDate,
        expiryDate,
        value,
      },
    });
    res
      .status(201)
      .json({ message: "Batch added successfully", data: newBatch });
  } catch (error) {
    console.error("Error adding batch:", error);
    res.status(500).json({ message: "add batch server error" });
  }
};

const getAllBatches = async (
  req: Request,
  res: Response<BatchRes<Batch[]>>,
) => {
  try {
    const batches = await prisma.batch.findMany();
    res
      .status(200)
      .json({ message: "Batches retrieved successfully", data: batches });
  } catch (error) {
    console.error("Error retrieving batches:", error);
    res.status(500).json({ message: "get all batches server error" });
  }
};
const deleteBatch = async (req: Request, res: Response<BatchRes<null>>) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.batch.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting batch:", error);
    res.status(500).json({ message: "delete batch server error" });
  }
};
export { addBatch, getAllBatches, deleteBatch };
