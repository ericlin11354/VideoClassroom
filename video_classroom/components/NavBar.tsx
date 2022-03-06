import { 
    Button,
    Input,
    Select,
} from '.';
import { Exit } from '@styled-icons/icomoon/Exit';
import { MainTheme } from '../styles/MainTheme';
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';
import React, { RefObject, useRef, useState } from 'react';
import { RecordCircle } from '@styled-icons/bootstrap/RecordCircle';
import styled from 'styled-components';
import { Upload } from '@styled-icons/boxicons-regular/Upload';
import { PlusCircle } from '@styled-icons/bootstrap/PlusCircle';
import Popup from './Popup';
import LoginPanel from './LoginPanel';
import { UserStatusProps } from './Objects';

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement>, UserStatusProps{
    courses?: string[];
}

export const NavBar: React.FC<NavBarProps> = ({
    status = 'Admin',
    courses = [],
}): React.ReactElement => {
    const [isLoginOpen, setIsOpen] = useState<boolean>(false);
    const [currentCourses, setCurrentCourses] = useState<string[]>(courses);
    const refNewCourse = useRef() as RefObject<HTMLInputElement>;

    const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
		setIsOpen(!isLoginOpen)
	};

    const addClass = () => {
        let name = refNewCourse.current?.value;
        // console.log(name);
        if (name && name != '' && !currentCourses.includes(name)) {
            let temp = [...currentCourses];
            temp.push(name);
            setCurrentCourses(temp);
        }
    };

    return(
        <Container>
            <LeftContainer>
                <Logo src="https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg" />
                <Select values={currentCourses} />
                {status == 'Admin' && <Button icon={RecordCircle}>Record</Button>}
                <Input inputRef={refNewCourse} placeholder="Join a class..." />
                <Button onClick={addClass} >Add Class</Button>
            </LeftContainer>
            <RightContainer>
                {status == 'Admin' && <Button icon={Upload} />}
                <Button icon={PersonCircle} onClick={() => window.location.replace("profile")} />
                <Button icon={Exit} onClick={handleLoginClick}/>
            </RightContainer>
            <Popup isOpen={isLoginOpen} setIsOpenFunc={setIsOpen}>
                <LoginPanel></LoginPanel>
            </Popup>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
    background-color: ${MainTheme.colors.primary};
    padding: ${MainTheme.dimensions.padding.container};
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    width: 50%;
`;

const Logo = styled.img`
    height: 100%;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 10px;
    width: 50%;
`;

export default NavBar;