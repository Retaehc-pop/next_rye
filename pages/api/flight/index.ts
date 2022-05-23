import type { NextApiRequest, NextApiResponse } from "next";
import { StringifyOptions } from "querystring";
import prisma from "../../../lib/prisma";

//POST /api/flight
//required fields in body: 
export default async function handle(req:NextApiRequest,res:NextApiResponse){
  
  if (req.method === 'POST'){
    const flightData = JSON.parse(req.body);
    const result = await prisma.flight.create({
      data:flightData
    });
    res.status(200).json(result);
  }
  if (req.method === 'PATCH'){
    handleUpdate(req,res)
  }
}

async function handleUpdate(req:NextApiRequest,res:NextApiResponse){
  const time = req.query.time;
  const d = new Date();
  function setDateTime(date:Date, time) {
        const [hour,minute] = time.split(":")
        date.setHours(parseInt(hour));
        date.setMinutes(parseInt(minute));
        date.setSeconds(0);
        return date;
      } 
  const date = setDateTime(d,time);
  const result = await prisma.flight.updateMany({
    data:{
      date:date
    }
    }
  )
  return res.status(200).send("ok");
}