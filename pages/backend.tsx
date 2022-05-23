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
        <section>
          <h1>All Flight Edit</h1>
          <input type="time"></input>
        </section>
      </main>
    </Layout>
    </>
  )
}
// const Backend: NextPage = ({ flights }: { flights: Flight[] }) => {
//   const [allFlights, setAllFlights] = useState<Flight[]>(flights);
//   const [select,setSelect] = useState<string>("");
//   const [flight,setFlight] = useState<string>("");
//   const [time,setTime] = useState<string>("");
//   const [gate,setGate] = useState<string>("");
//   const [status,setStatus] = useState<string>("");
//   const [uniqueTime,setUniqueTime] = useState<string>("");

//   async function updateTime(time){
//     fetch(`/api/flight?time=${time}`,{method:"PATCH"}).then(
//       res => alert(res)
//     )
//     return 
//   }
//   function updateData(flight){
//     let index = -1;
//     for (let i = 0; i < allFlights.length; i++) {
//       if (flight === allFlights[i].name){
//         index = allFlights.indexOf(allFlights[i]);
//       }

//     }
//     console.log(index)
//     console.log(flight)
//     if (index === -1){
//       setGate("");
//       setStatus("");
//       setUniqueTime("00:00");
//       return
//     }
//     else{
//       setGate(flights[index].gate);
//       setStatus(flights[index].status);
//       setUniqueTime(String(new Date(flights[index].date).getHours())+":"+String(new Date(flights[index].date).getMinutes()));
//       return
//     }
//   }
//   async function updateUnique(flight:string,status:string,gate:string,uniquetime:string){
//     const body = {
//       flight: flight,
//       status: status,
//       gate: gate,
//       date: uniquetime
//     }
//     fetch(`/api/flight/${flight}`,
//     {
//       method:"PATCH",
//       body:JSON.stringify(body),
//     }).then(
//       res => alert(res)
//     )
//     return 
//   }
//   return (
//     <>
//     <Head>
//       <title>RYE</title>
//       <meta name="description" content="Flight app for RYE" />
//       <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main className={styles.main}>
//         <section className={styles.select}>
//           <input value={flight} onChange={(e)=>{
//             setFlight(e.target.value.toUpperCase());
//             updateData(e.target.value.toUpperCase());
//             }}></input>
//           <div>
//             <h1>{flight}</h1>
//             <span>
//               <p>status</p>
//               <input value={status} onChange={(e)=>setStatus(e.target.value)}></input>
//             </span>
//             <span>
//               <p>Gate</p>
//               <input value={gate} onChange={(e)=>setGate(e.target.value)}></input>
//             </span>
//             <span>
//               <p>Time</p>
//               <input type="time" value={uniqueTime} onChange={(e)=>setUniqueTime(e.target.value)}></input>
//             </span>
//           </div>
//           <div>
//             <button onClick={()=>updateUnique(flight,status,gate,uniqueTime)}>update {flight} data</button>
//           </div>
//         </section>
//         <section className={styles.time}>
//           <div>
//           <h1>Set Start time for all flight</h1>
//           </div>
//           <div>
//             <p>set start time </p>
//             <input type="time" onChange={e=>setTime(e.target.value)} value={time}></input>
//             <button onClick={()=>updateTime(time)}>enter</button>
//             <h1>{`/api/flight?time=${time}`}</h1>
//           </div>
//         </section>
//       </main>
//     </>
//   )
// }

export default Backend;