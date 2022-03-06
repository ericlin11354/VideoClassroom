import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
	knobDiam?: number;
	defaultFracFull?: number;
	barFillProps?: {};
	knobProps?: {};
}

export const LoginPanel: React.FC<VideoPlayerProps> = ({
	knobDiam=10,
	defaultFracFull=0,
	barFillProps,
	knobProps,
	children,
	...props
}): React.ReactElement => {

    return(
        <LoginFrame>
            <Title>
                Log in
            </Title>
            <LineForm type={'text'}>
            </LineForm>
            <LineForm type={'password'}>
            </LineForm>
            <Switcher>
            </Switcher>
        </LoginFrame>
    )
}

const Title = styled.div<{}>`
`;
const Switcher = styled.div<{}>`
`;
const LineForm = styled.input<{}>`
`;
const LoginFrame = styled.div<{}>`
	// position: absolute;
	position: relative;
    width: 50vw;
    height: 50vh;
    background-color: #ffffff;
    
    overflow: auto;
`;

export default LoginPanel;