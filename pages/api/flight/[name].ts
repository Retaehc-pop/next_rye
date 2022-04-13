import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(req:NextApiRequest,res:NextApiResponse){
  const name = req.query.name;
  console.log(name)
  if (req.method === 'GET'){
    handleGet(name,res);
  } else if (req.method === 'DELETE'){
    handleDelete(name,res);
  } else{
    throw new Error(`Unsupported method ${req.method}`);
  }

}
async function handleGet(flightName:string | string[],res:NextApiResponse){
  const flight = await prisma.flight.findUnique({
    where:{
      name:String(flightName)
    }
  });
  if (!flight){
    res.status(404).send("Flight not found");
    return;
  }
  res.status(200).json(flight);
}

async function handleDelete(flightName:string | string[],res:NextApiResponse){
  const flight = await prisma.flight.delete({
    where:{
      name:String(flightName)
  }})
  res.status(200).json(flight);
}