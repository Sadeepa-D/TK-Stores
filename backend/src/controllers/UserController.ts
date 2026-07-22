import { Request, Response } from "express";
import prisma from "../config/dbconn";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json("Invalid email address");
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("login error:", error);
    res.status(500).json({ message: "login server error" });
  }
};

const viewUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("viewUsers error:", error);
    res.status(500).json({ message: "view users server error" });
  }
};

const suspendedUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.update({
      where: { id: userId },
      data: { status: "Suspended" },
    });
    res.status(200).json({ message: "User suspended successfully" });
  } catch (error) {
    console.error("suspendedUser error:", error);
    res.status(500).json({ message: "suspended user server error" });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.delete({ where: { id: userId } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({ message: "delete user server error" });
  }
};
const activeUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await prisma.user.update({
      where: { id: userId },
      data: { status: "Active" },
    });
    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error("activeUser error:", error);
    res.status(500).json({ message: "active user server error" });
  }
};

export {
  registerUser,
  login,
  viewUsers,
  suspendedUser,
  deleteUser,
  activeUser,
};
