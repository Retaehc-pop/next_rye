import type { NextPage } from "next";
import styles from "../../styles/Ticket.module.scss";
import Layout from "../../components/layout";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Flight } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`/api/flight/${context.params.name}`, {
    method: "GET",
  });
  const flight = await res.json();
  return {
    props: {
      flight: flight,
    },
  };
};

const flightId: NextPage = ({ flight }: { flight: Flight }) => {
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
              <h2>{flight.departureId}</h2>
            </span>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faPlane} />
            </span>
            <span className={styles.destination}>
              <h2>{flight.destinationId}</h2>
            </span>
            <div className={styles.info}>
              <span>
                <p>Board</p>
                <h3>
                  {("0" + departure_time.getHours()).slice(-2)}:
                  {("0" + departure_time.getMinutes()).slice(-2)}
                </h3>
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
              <p>
                {flight.status
                  ? `updated: ${("0" + updated_time.getHours()).slice(-2)}:${(
                      "0" + updated_time.getMinutes()
                    ).slice(-2)}:${("0" + updated_time.getSeconds()).slice(-2)}`
                  : "cancelled"}
              </p>
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
