import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LandingPage2 from '../components/landingPage'
import Header from '../components/header'
import RequestRide2 from '../components/requestRide'
import CancelRide2 from '../components/cancelRide'
import AcceptRide2 from '../components/acceptRide'
import {useMoralis} from "react-moralis"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div className={styles.container}>
      <Header />
      {isWeb3Enabled ?
      <div>
        <LandingPage2 />
        <br></br>
        <br></br>
        <br></br>
        <RequestRide2 />
        <br></br>
        <br></br>
        <br></br>
        <CancelRide2 />
        <br></br>
        <br></br>
        <br></br>
        <AcceptRide2 />
      </div> :
      <div>CONNECT ACCOUNT!</div>
      }
    </div>
  )
}
