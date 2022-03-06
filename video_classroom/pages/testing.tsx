import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import styled from "styled-components";
import ChatBox from '../components/Video/ChatBox'
import moment from 'moment';
import ChatBubble, { ChatBubbleProps } from "../components/Video/ChatBubble";
import { CommentData, getTestComments, newComment } from '../components/CommentData';

const Testing: NextPage = () => {
  return (
    <TestDiv>
		<ChatBox MsgList={getTestComments()}>
		</ChatBox>
    </TestDiv>
  )
}

const TestDiv = styled.div<{}>`
	
`;

export default Testing
