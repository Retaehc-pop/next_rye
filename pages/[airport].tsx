import type { NextPage } from "next";
import Layout from "../components/layout";
import Head from "next/head";
import { PrismaClient, Airport,Flight } from "@prisma/client";
import { useState } from "react";
import styles from "../styles/Airport.module.scss";
// import Link from "next/link";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

function Link({ children, href }){ 
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href).then(()=>location.reload())
  }
  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  )

}
export async function getStaticPaths() {
  const allAirport = await prisma.airport.findMany({
    select: {
      name: true,
    },
  });
  const paths = allAirport.map((airport) => {
    return {
      params: { airport: airport.name },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { airport } = params;
  const airportData:Airport = await prisma.airport.findUnique({
    where: {
      name: airport,
    }
  });
  const departureData:Flight[] = await prisma.flight.findMany({
    where:{
      departureId: airportData.name
    }
  });
  const destinationData:Flight[] = await prisma.flight.findMany({
    where:{
      destinationId: airportData.name
    }
  });
  const departure = JSON.parse(JSON.stringify(departureData))
  const destination = JSON.parse(JSON.stringify(destinationData))
  return {
    props: {
      airports: airportData,
      departures: departure,
      destinations: destination
    },
  };
}

const airport: NextPage = ({ airports,departures,destinations }: { airports: Airport,departures:Flight[],destinations:Flight[] }) => {
  const [airport, setAirport] = useState<Airport>(airports);
  const [departure, setDeparture] = useState<Flight[]>(departures);
  const [destination, setDestination] = useState<Flight[]>(destinations);
  const [isDepart,setIsDepart] = useState<boolean>(true);

  const formatDate = (prismadate) =>{
    const date = new Date(prismadate);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}`;
  }
  const section = () =>{
    if(isDepart){
      return departure.map(flight=>(
        <div key={flight.id}>
          <Link href={`/flight/${flight.name}`}>{flight.name}</Link>
          <p>{flight.airline}</p>
          <p>{flight.gate}</p>
          <Link href={`/${flight.departureId}`}>{flight.departureId}</Link>
          <Link href={`/${flight.destinationId}`}>{flight.destinationId}</Link>
          <p>{formatDate(flight.date)}</p>
          <p>{flight.price}</p>
        </div>
      ))
    }
    else{
      return destination.map(flight=>(
        <div key={flight.id}>
          <Link href={`/flight/${flight.name}`}>{flight.name}</Link>
          <p>{flight.airline}</p>
          <p>{flight.gate}</p>
          <Link href={`/${flight.departureId}`}><p>{flight.departureId}</p></Link>
          <Link href={`/${flight.destinationId}`}><p>{flight.destinationId}</p></Link>
          <p>{flight.date.toString()}</p>
          <p>{flight.price}</p>
        </div>
      ))
    }
  }
  return (
    <>
      <Head>
        <title>{airport.name}</title>
        <meta name="description" content="Flight app for RYE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <section className={styles.airport}>
            <h1>{airport.name}</h1>
            <h2>{airport.city},{airport.country}</h2>
          </section>
          <span className={styles.button}>
            <button className={isDepart? styles.selected:styles.notselected} onClick={()=>setIsDepart(true)}>Departure</button>
            <button className={isDepart? styles.notselected:styles.selected} onClick={()=>setIsDepart(false)}>Arrival</button>
          </span>
          <section className={styles.container}>
            <div className={styles.flight}>
              <h1>{isDepart?"Departures":"Arrival"}</h1>
              <div className={styles.title}>
                <p>Flight no.</p>
                <p>Airline</p>
                <p>Gate</p>
                <p>Departure</p>
                <p>Destination</p>
                <p>Time</p>
                <p>Price</p>
              </div>
              {section()}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default airport;
