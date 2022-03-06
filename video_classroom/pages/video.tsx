import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import styled from "styled-components";
import VideoPlayer from '../components/Video/VideoPlayer'
import { useRouter } from 'next/router'
import { NavBar } from '../components';

const Video: NextPage = () => {
	const router = useRouter()
	const { vid } = router.query

	let videoName = vid
	if (typeof videoName != 'string'){
		return (<div></div>)
	}

	return (
		<div>
			<NavBar></NavBar>
			<VideoPlayer vid={videoName}>
			</VideoPlayer>
		</div>
	)
}

export default Video
