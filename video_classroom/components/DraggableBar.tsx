import styled from "styled-components";
import { 
	useState, 
    useRef, 
} from "react";

interface draggerInfo {
	onSliderChanged: (newFracFull: number) => void;
	onSliderEngaged: (isRelease: boolean) => void;
	fracFull: number;
}

interface draggableBarProps {
	knobCirc?: number;
	defaultFracFull?: number;
	barFillProps?: {};
	knobProps?: {};
	isVertical?: boolean;
	draggerInfo: draggerInfo;
}

export const DraggableBar: React.FC<draggableBarProps> = ({
	knobCirc=20,
	defaultFracFull=0,
	barFillProps,
	knobProps,
    draggerInfo,
	isVertical=false,
	children,
	...props
}): React.ReactElement => {
    // const [fracFull, setFracFull] = useState<number>(defaultFracFull);
    const [isEngaged, setIsEngaged] = useState<boolean>(false);

	const barRef = useRef<HTMLDivElement>(null);

	const fracFull = draggerInfo.fracFull

	const updateFillFromMouseEvent = (mouseEvent: any) => {
		if (barRef && barRef.current){
			const barRect = barRef.current.getBoundingClientRect()

			let fill = isVertical && (barRect.y + barRect.height - mouseEvent.clientY) / barRect.height || (mouseEvent.clientX - barRect.x) / barRect.width
			fill =  Math.min(Math.max(fill, 0), 1)
			draggerInfo.onSliderChanged(fill)
		}
	}

    const handleMouseMove = (e:MouseEvent) => {
		updateFillFromMouseEvent(e)
	}

    const disengageMouse = (event: MouseEvent) => {
		if (barRef && barRef.current){
			draggerInfo.onSliderEngaged(true)
			setIsEngaged(false)
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', disengageMouse);
		}
	}
	
    const engageMouse = (event: React.MouseEvent<HTMLElement>) => {
		if (barRef && barRef.current){
			setIsEngaged(true)
			updateFillFromMouseEvent(event)

			draggerInfo.onSliderEngaged(false)

			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', disengageMouse);

			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', disengageMouse);
		}

    };

	const knobPosition = {
		left: isVertical && `calc(50% - ${knobCirc/2}px)` || `calc(${-knobCirc/2}px + ${fracFull*100}%)`,
		bottom: isVertical && `calc(${-knobCirc/2}px + ${fracFull*100}%)` || `-50%`,
	}
	const fillPosition = {
		width: isVertical && `100%` || `${draggerInfo.fracFull*100}%`,
		height: isVertical && `${draggerInfo.fracFull*100}%` || `100%`,
		top: isVertical && `calc(100% - ${draggerInfo.fracFull*100}%)` || ``,
	}

	return (
		<Bar onMouseDown={engageMouse} ref={barRef} {...props}>
			<BarFill style={fillPosition} fracFull={fracFull} isVertical={isVertical} {...barFillProps}></BarFill>
			<Knob style={knobPosition} knobCirc={knobCirc} fracFull={fracFull} isVertical={isVertical} {...knobProps}></Knob>
		</Bar>
	);
};

const Bar = styled.div<{}>`
	position: relative;
    background-color: grey;
    width: 100%;
    height: 100%;
    border-radius: 0%;
`;

const BarFill = styled.div<{isVertical?: boolean, fracFull: number}>`
	position: relative;
    background-color: blue;
    height: 100%;
    ${({ fracFull }) => ``}
    border-radius: 0%;
    ${({ isVertical}) => 
	isVertical
	? `
		vertical-align: bottom;
	`
	: ``}
`;

const Knob = styled.button<{isVertical?:boolean, knobCirc: number, fracFull: number}>`
	position: absolute;
    ${({ knobCirc }) => `
		width: ${knobCirc}px;
		height: ${knobCirc}px;
	`}
    ${({ isVertical, knobCirc, fracFull }) => 
	isVertical
	? `
		left: calc(${-knobCirc/2}px + 50%);
		text-align: center;
	`
	: `
		top: calc(${-knobCirc/2}px + 50%);
		vertical-align: middle;
	`}
    border-radius: 50%;
`;

export default DraggableBar;
