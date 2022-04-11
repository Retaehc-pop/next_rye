import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

export default async function handle(req,res){
  const newflight = await prisma.flight.findMany({
    where:{
      id:req.params.id,
    }
  })
  res.json(newflight)
}