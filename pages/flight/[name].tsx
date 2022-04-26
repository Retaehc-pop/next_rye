import type { NextPage } from "next";
import styles from "../../styles/Ticket.module.scss";
import Layout from "../../components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Flight, Airport } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faGlobe } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const flight = await prisma.flight.findUnique({
    where: {
      name: String(context.params.name),
    },
  });
  const flight_data = JSON.parse(JSON.stringify(flight));
  const destination = await prisma.airport.findUnique({
    where: {
      airportCode: flight_data.destinationId,
    },
  });
  const departure = await prisma.airport.findUnique({
    where: {
      airportCode: flight_data.departureId,
    },
  });
  return {
    props: {
      flight: flight_data,
      destination: destination,
      departure: departure,
    },
  };
};

const flightId: NextPage = ({
  flight,
  destination,
  departure,
}: {
  flight: Flight;
  destination: Airport;
  departure: Airport;
}) => {
  const departure_time = new Date(flight.date);
  const date = new Date();
  const updated_time = new Date(flight.updatedAt);
      

  return (
    <>
      <Head>
        <title>{flight.name}</title>
        <meta name="description" content="Ticket app for RYE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main} data-airway={flight.airline}>
          <section>
            <div className={styles.header}>
              <div>
                <h1>Boarding pass</h1>
                <span>
                <h2>ECONOMY</h2>
                <p>STATUS : {flight.status} </p>
                </span>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faGlobe}
                  className={styles.icon}
                  size="2x"
                />
                <h3>{flight.airline}</h3>
              </div>
            </div>
            <div className={styles.detail}>
              <section>
                <div>
                  <p>FLIGHT</p>
                  <h1>{flight.name}</h1>
                </div>
                <div>
                  <p>PASSENGER</p>
                  <h1>Rotary Exchange 3350</h1>
                </div>
              </section>
              <section>
              <div>
                <p>DATE</p>
                <h1>
                  {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
                </h1>
                <h3>
                  {("0" + departure_time.getHours()).slice(-2)}:
                  {("0" + departure_time.getMinutes()).slice(-2)}
                </h3>
              </div>
              <div>
                <p>BOARDING GATE</p>
                <h1>{flight.gate}</h1>
              </div>
              </section>
              <section>
                <div>
                  <p>FROM</p>
                  <h2>{flight.departureId}</h2>
                  <p>{departure.city}, {departure.country}</p>
                </div>
                <FontAwesomeIcon icon={faPlane} className={styles.icon}></FontAwesomeIcon>
                <div>
                  <p>DEST</p>
                  <h2>{flight.destinationId}</h2>
                  <p>{destination.city}, {destination.country}</p>

                </div>
              </section>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default flightId;
