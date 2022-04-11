import type { NextApiRequest,NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest,res:NextApiResponse)=>{
  if (req.method !== "GET") {
    return res.status(405).json({message:"Method not allowed"});
  }
  const airport = await prisma.airport.findMany();


  res.json(airport)
}