import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { MainTheme } from '../styles/MainTheme';

interface PopupProps {
    isOpen: boolean;
    setIsOpenFunc: (newIsOpen: boolean) => void,
}

export const VideoPlayer: React.FC<PopupProps> = ({
    isOpen,
    setIsOpenFunc,
    children,
	...props
}): React.ReactElement => {

    const toggleFunc = (e: React.MouseEvent<HTMLElement>) => {
		setIsOpenFunc(!isOpen)
	}

    return(
        <PopupSuperWrapper>
                <PopupFrame isOpen={isOpen} {...props}>
                    {children}
                </PopupFrame>
        </PopupSuperWrapper>
    )
}

const PopupSuperWrapper = styled.div<{}>`
    pointer-events: none;
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
`

const PopupFrame = styled.div<{isOpen: boolean}>`
    position:absolute;
    background-color: ${MainTheme.colors.primary};
    padding: ${MainTheme.dimensions.padding.container};

    z-index: 3;

    transition: 0.5s;
    opacity: 0;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: all;

    ${({ isOpen }): string =>
    isOpen
    ? `
        opacity: 1;
        transition: 0.5s ease-out 1;
        top: 50%;
    `
    : `
    `}
`;

export default VideoPlayer;