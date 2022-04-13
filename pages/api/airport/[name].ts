import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handle(req:NextApiRequest,res:NextApiResponse){
  const name = req.query.name;
  if (req.method === "GET"){
    handleGet(name,res);
  } else if (req.method === "DELETE"){
    handleDelete(name,res);
  } else{
    throw new Error(`Unsupported method ${req.method}`);
  }
}

async function handleGet(name:string | string[],res:NextApiResponse){
  const airport = await prisma.airport.findUnique({
    where:{
      name:String(name)
    }
  });
  if (!airport){
    res.status(404).send("Flight not found");
    return;
  }
  res.status(200).json(airport);
}
async function handleDelete(name:string | string[],res:NextApiResponse){
  const airport = await prisma.airport.delete({
    where:{
      name:String(name)
  }})
  res.status(200).json(airport);
}
