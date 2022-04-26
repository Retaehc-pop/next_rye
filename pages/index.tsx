import type { NextPage, GetServerSideProps } from "next";
import { Airport } from "@prisma/client";
import { useState } from "react";
import Layout from "../components/layout";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import prisma from "../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await prisma.airport.findMany();
  return { props: { airports: result } };
};

const Home: NextPage = ({ airports }: { airports: Airport[] }) => {
  const [airport, setAirport] = useState<Airport[]>(airports);
  const [search, setSearch] = useState<string>("");
  return (
    <div>
      <Head>
        <title>RYE</title>
        <meta name="description" content="Flight app for RYE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <FontAwesomeIcon icon={faGear} className={styles.icon} />
            Welcome to RYE Airport
          </h1>
          <h1> Choose your Airport </h1>
          <section className={styles.airport}>
            {airport.map((airport) => (
              <Link href={`/${airport.airportCode}`} key={airport.id} passHref>
                <div>
                  <h3>{airport.airportCode}</h3>
                  <p>{airport.city}, {airport.country}</p>
                </div>
              </Link>
            ))}
          </section>
          <section className={styles.ticket}>
            <h1>Search your ticket here</h1>
            <span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <h3>
                <Link href={`/flight/${search}`}>Search</Link>
              </h3>
            </span>
          </section>
        </main>
      </Layout>
    </div>
  );
};

export default Home;
