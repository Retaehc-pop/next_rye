import type { NextPage } from 'next'
import styles from '../../styles/Ticket.module.scss'
import Layout from '../../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { PrismaClient, Flight } from '@prisma/client'

const prisma = new PrismaClient()

export async function getStaticPaths(){
  const allFlight = await prisma.flight.findMany({
    select: {
      name: true,
    },
  });
  const paths = allFlight.map((flight) => {
    return {
      params: { name: flight.name },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }){
  const { name } = params;

  const flightData:Flight = await prisma.flight.findUnique({
    where:{
      name: name
    }
  });

  const flight = JSON.parse(JSON.stringify(flightData))
  return {
    props:{
      flight: flight
    }
  }

}



const flightId: NextPage = ({flight}:{flight:Flight}) => {
  const departure_time = new Date(flight.date)
  const updated_time = new Date(flight.updatedAt)
  return (
    <>
    <Head>
      <title>{flight.name}</title>
      <meta name="description" content="Ticket app for RYE" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <main className={styles.main}>
        <p>last updated{updated_time.getHours()}:{updated_time.getMinutes()}</p>
          <span>
            <h1>{flight.name}</h1>
            <p>{flight.status? "available":"cancelled"}</p>
          </span>
          <span>
            <h3>From</h3>
            <p>{flight.departureId}</p>
          </span>
          <span>
            <h3>To</h3>
            <p>{flight.destinationId}</p>
          </span>
          <span>
            <h3>Gate</h3>
            <p>{flight.gate}</p>
          </span>
          <span>
            <h3>Departure Time</h3>
            <p>{departure_time.getHours()}:{departure_time.getMinutes()}</p>
          </span>
          <span>
            <h3>seat</h3>
            <p>{flight.seat}</p>
          </span>
      </main>
    </Layout>
    </>
  )
}
export default flightId