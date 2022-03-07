
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { MainTheme } from '../styles/MainTheme';
import { useRouter } from 'next/router';

export const Redirector: React.FC<any> = ({
    children,
	...props
}): React.ReactElement => {
    const router = useRouter()

    useEffect(() => {
        router.replace({
            pathname: '/catalogue',
            query: 
        {},
        })
      },[])

    return(
            <></>
    )
}

export default Redirector;