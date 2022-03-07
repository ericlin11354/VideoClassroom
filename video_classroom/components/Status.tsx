import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { MainTheme } from '../styles/MainTheme';

interface PopupProps {
    color: string;
    icon: SVGElement;
    text: string;
}

export const VideoPlayer: React.FC<PopupProps> = ({
    color,
    children,
    icon,
    text,
	...props
}): React.ReactElement => {
    return(
            <StatusFrame {...props}>
                <IconWrapper>
                    {icon}
                </IconWrapper>
                <TextWrapper>
                    {text}
                </TextWrapper>
            </StatusFrame>
    )
}

const IconWrapper = styled.div<{}>`
    text-align: center;
    height: 70%;
    background-color: ${MainTheme.colors.primary};
`

const TextWrapper = styled.div<{}>`
    text-align: center;
    height: 30%;
    background-color: ${MainTheme.colors.primary};
`

const StatusFrame = styled.div<{}>`
    position: absolute;
    height: 100%;
    aspect-ratio: 1;
`;

export default VideoPlayer;