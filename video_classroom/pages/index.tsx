import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Redirector from '../components/Redirector'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <div>
      <h1>Redirecting to homepage...</h1>
      <Redirector></Redirector>
    </div>
  )
}

export default Home
