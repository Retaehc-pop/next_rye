import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Flight.module.scss";
import { useState } from "react";

export default function Flight(){
  const [search,setSearch] = useState<string>('');
  return(
    <>
    <Head>
      <title>Ticket</title>
      <meta name="description" content="Ticket app for RYE" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <main className={styles.main}>
        <h1>Ticket</h1>
        <input value={search} onChange={e=>setSearch(e.target.value)}/>
        <h3><Link href={`/flight/${search}`}>Search</Link></h3>
      </main>
    </Layout>
    </>
  );
}