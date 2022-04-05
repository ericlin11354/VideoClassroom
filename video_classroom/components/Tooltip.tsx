import styled from "styled-components";
import { 
	useState, 
    useRef, 
} from "react";
import { MainTheme } from '../styles/MainTheme';

interface draggerInfo {
	onSliderChanged: (newFracFull: number) => void;
	onSliderEngaged: (isRelease: boolean) => void;
	fracFull: number;
}

interface draggableBarProps {
	tip: string;
}

export const Tooltip: React.FC<draggableBarProps> = ({
	tip,
	children,
	...props
}): React.ReactElement => {
    const [isEngaged, setIsEngaged] = useState<boolean>(false);

    const handleMouseOver = (e: React.MouseEvent<HTMLElement>): void => {
        setIsEngaged(true)
        console.log('sadasdas')
    };

    const handleMouseAway = (e: React.MouseEvent<HTMLElement>): void => {
        setIsEngaged(false)
    };


	return (
		<TooltipHitbox onMouseEnter={handleMouseOver} onMouseLeave={handleMouseAway} {...props}>
			<Contents>
                {children}
            </Contents>
            <TooltipText isOpen={isEngaged}>{tip}</TooltipText>
		</TooltipHitbox>
	);
};

const TooltipHitbox = styled.div<{}>`
	position: absolute;
    opacity: 1;
    // background-color: #aaaaee;
    top: 0%;
    width: 100%;
    height: 100%;
    border-radius: 0%;
    z-index: 3;
    overflow: visible;
    
    padding: ${MainTheme.dimensions.padding.withBorder};
    
    justify-content: center;
    align-items: center;
    overflow: visible;
    transform: scale(1);    
`;

const Contents = styled.div<{}>`
    margin: 0;
    position: relative;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
`;

const TooltipText = styled.div<{isOpen: boolean}>`
	position: absolute;
    // background-color: #eeaaaa;
    top: 100%;
    left: 0%;
    max-width: 100%;
    width: 10000px;
    height: 10000px;
    border-radius: 0%;
    overflow: visible;
    pointer-events: none;  
    color: #ffffff;

    text-shadow: 0px 0px 8px #000000ff;


    transition: 0.5s;
    max-height: 0%;
    opacity: 0;

    ${({ isOpen }): string =>
    isOpen
    ? `
        max-height: 100%;
        opacity: 1;
        transition: 0.5s ease-out 1;
    `
    : `
    `}
`;

export default Tooltip;
