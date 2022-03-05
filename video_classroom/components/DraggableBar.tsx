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
	draggerInfo: draggerInfo;
}

export const DraggableBar: React.FC<draggableBarProps> = ({
	knobCirc=20,
	defaultFracFull=0,
	barFillProps,
	knobProps,
    draggerInfo,
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

			let fill = (mouseEvent.clientX - barRect.x) / barRect.width
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
		left: `calc(${-knobCirc/2}px + ${fracFull*100}%)`
	}
	const fillPosition = {
		width: `${draggerInfo.fracFull*100}%`
	}

	return (
		<Bar onMouseDown={engageMouse} ref={barRef} {...props}>
			<BarFill style={fillPosition} fracFull={fracFull} {...barFillProps}></BarFill>
			<Knob style={knobPosition} knobCirc={knobCirc} fracFull={fracFull} {...knobProps}></Knob>
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

const BarFill = styled.div<{fracFull: number}>`
	position: relative;
    background-color: blue;
    height: 100%;
    ${({ fracFull }) => ``}
    border-radius: 0%;
`;

const Knob = styled.button<{knobCirc: number, fracFull: number}>`
	position: absolute;
    ${({ knobCirc, fracFull }) => `
        width: ${knobCirc}px;
        height: ${knobCirc}px;
		top: calc(${-knobCirc/2}px + 50%);
    `}
	vertical-align: middle;
    border-radius: 50%;
`;

export default DraggableBar;
