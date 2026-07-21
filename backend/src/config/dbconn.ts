import { PrismaClient } from "@prisma/client";

const dbconn = new PrismaClient();
export default dbconn;
