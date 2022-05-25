import { generateKey } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { getegid } from "process";
import prisma from "../../../lib/prisma";

export default async function handle(req:NextApiRequest,res:NextApiResponse){
  const name = req.query.name;
  console.log(name)
  if (req.method === 'GET'){
    handleGet(name,res);
  } else if (req.method === 'DELETE'){
    handleDelete(name,res);
  } else if (req.method === 'PATCH'){
    handlePatch(name,req,res);
  }   else{
    throw new Error(`Unsupported method ${req.method}`);
  }

}
async function handlePatch(flightName:string | string[],req:NextApiRequest,res:NextApiResponse){
  const request = JSON.parse(req.body);
  
  const d = new Date();
  function setDateTime(date:Date, time) {
        const [hour,minute] = time.split(":")
        date.setDate(29);
        date.setMonth(5);
        date.setFullYear(2022);
        date.setHours(parseInt(hour));
        date.setMinutes(parseInt(minute));
        date.setSeconds(0);
        return date;
      } 

  const date = setDateTime(d,request.date);
  const result = await prisma.flight.update({
      where:{
        name:String(flightName)
      },
      data:{
        gate:request.gate,
        status:request.status,
        date:date
      }
    }
  )
  return res.status(200).send("ok");
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