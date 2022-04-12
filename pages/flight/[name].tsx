import type { NextPage } from "next";
import styles from "../../styles/Ticket.module.scss";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { PrismaClient, Flight, Airport } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
const prisma = new PrismaClient();

export async function getStaticPaths() {
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

export async function getStaticProps({ params }) {
  const { name } = params;

  const flightData: Flight = await prisma.flight.findUnique({
    where: {
      name: name,
    },
  });

  const departureDatas: Airport = await prisma.airport.findUnique({
    where: {
      name: flightData.departureId,
    },
  });
  const destinationDatas: Airport = await prisma.airport.findUnique({
    where: {
      name: flightData.destinationId,
    },
  });
  const flight = JSON.parse(JSON.stringify(flightData));
  return {
    props: {
      flight: flight,
      departure: departureDatas,
      destination: destinationDatas,
    },
  };
}

const flightId: NextPage = ({
  flight,
  departure,
  destination,
}: {
  flight: Flight;
  departure: Airport;
  destination: Airport;
}) => {
  const departure_time = new Date(flight.date);
  const updated_time = new Date(flight.updatedAt);
  return (
    <>
      <Head>
        <title>{flight.name}</title>
        <meta name="description" content="Ticket app for RYE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <section>
            <span className={styles.airline}>
              <h1>{flight.airline}</h1>
            </span>
            <span className={styles.departure}>
              <p>{departure.city}</p>
              <h2>{flight.departureId}</h2>
            </span>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faPlane}/>
            </span>
            <span className={styles.destination}>
              <p>{destination.city}</p>
              <h2>{flight.destinationId}</h2>
            </span>
            <div className={styles.info}>
              <span>
                <p>Board</p>
                <h3>{("0"+departure_time.getHours()).slice(-2)}:{("0"+departure_time.getMinutes()).slice(-2)}</h3>
              </span>
              <span>
                <p>Gate</p>
                <h3>{flight.gate}</h3>
              </span>
              <span>
                <p>duration</p>
                <h3>{flight.duration} hr</h3>
              </span>
              <span>
                <p>Seat</p>
                <h3>{flight.seat}</h3>
              </span>
            </div>
            <span className={styles.status}>
            <p>{flight.status? `updated: ${("0"+updated_time.getHours()).slice(-2)}:${("0"+updated_time.getMinutes()).slice(-2)}:${("0"+updated_time.getSeconds()).slice(-2)}`:"cancelled"}</p>
            </span>
            <span className={styles.price}>
              <p>Price</p>
              <h3>{flight.price}</h3>
            </span>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default flightId;
