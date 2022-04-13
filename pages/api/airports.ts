import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

//POST /api/flight
//required fields in body: 
export default async function handle(req:NextApiRequest,res:NextApiResponse){
  if (req.method === 'GET'){
    const result = await prisma.airport.findMany();
    res.status(200).json(result);
  }
  else{
    throw new Error(`Unsupported method ${req.method}`);
  }
}