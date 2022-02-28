import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import styled from "styled-components";
import VideoPlayer from '../components/VideoPlayer'

const Video: NextPage = () => {
  return (
    <div>
		<VideoPlayer>
		</VideoPlayer>
    </div>
  )
}

export default Video
