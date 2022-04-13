import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

//POST /api/flight
//required fields in body: 
export default async function handle(req:NextApiRequest,res:NextApiResponse){
  const flightData = JSON.parse(req.body);
  if (req.method === 'POST'){
    const result = await prisma.flight.create({
      data:flightData
    });
    res.status(200).json(result);
  }
  else{
    throw new Error(`Unsupported method ${req.method}`);
  }
}