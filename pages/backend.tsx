import type { NextPage,GetServerSideProps,NextApiRequest,NextApiResponse } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState,useEffect } from "react";
import prisma from "../lib/prisma";
import { Airport,Flight } from "@prisma/client";
import styles from "../styles/Backend.module.scss";
import Layout from "../components/layout";


export const getServerSideProps: GetServerSideProps = async () => {
  const result = await prisma.flight.findMany();
  const res = JSON.parse(JSON.stringify(result));
  return { props: { flights: res } };
};


const Backend: NextPage<{flights: Flight[]}> = ({flights}) => {
  const [name,setName] = useState("");
  const [setting,setSetting] = useState({
    departure: "",
    destination: "",
    gate: "",
    date: "10:00",
    status: "",
  });
  function updateData(){
    let flight = name
    console.log(flight)
    let index = -1;
    for (let i = 0; i < flights.length; i++) {
      if (flight === flights[i].name){
        index = flights.indexOf(flights[i]);
        break
      }
    }
    if (index !== -1){
      setSetting({
        departure: flights[index].departureId,
        destination: flights[index].destinationId,
        gate: flights[index].gate,
        date: `${new Date(flights[index].date).getHours()}:${new Date(flights[index].date).getMinutes()}`,
        status: flights[index].status,
      });
      return
    }

    else{
      setSetting({
        departure: "",
        destination: "",
        gate: "",
        date: "",
        status: "",
      });
    }
    return
  }

  async function updateFlight(name,setting){
    const body = {
            flight: name,
            status: setting.status,
            gate: setting.gate,
            date: setting.date
          }
          await fetch(`/api/flight/${name}`,
          {
            method:"PATCH",
            body:JSON.stringify(body),
          }).then(
            res => alert(res)
          )
          return 
  }
  function updateSetting(key,value){
    setSetting({
      ...setting,
      [key]: value
    })
  }
  return(
    <>
    <Head>
      <title>Backend</title>
    </Head>
    <Layout>
      <main className={styles.main}>
        <section>
          <h1>Edit Single Flight</h1>
          <div>
            <span>
            <input value={name} onChange={(e)=>{
              setName(e.target.value.toUpperCase())
              }}></input>
              <button onClick={()=>updateData()}>fetch data</button>
            </span>
            <span>
              <h4>Gate</h4>
              <input value={setting.gate} onChange={(e)=>{updateSetting("gate",e.target.value)}}/>
            </span>
            <span>
              <h4>Status</h4>
              <input value={setting.status} onChange={(e)=>{updateSetting("status",e.target.value)}}/>
            </span>
            <span>
              <h4>Date/Time</h4>
              <h4>{setting.date}</h4>
              <input type="time" value={setting.date} onChange={(e)=>{updateSetting("date",e.target.value)}}/>
            </span>
            <button onClick={()=>updateFlight(name,setting)}>update flight</button>
          </div>
        </section>
      </main>
    </Layout>
    </>
  )
}

export default Backend;