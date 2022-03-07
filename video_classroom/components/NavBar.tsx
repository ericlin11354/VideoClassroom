import { 
    Button,
    Input,
    Select,
    UploadPanel,
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
import { UserStatusProps, Video } from './Objects';
import router, { useRouter } from 'next/router';

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement>, UserStatusProps{
    onCourseChange?: Function;
    // temporary implementation for adding a video due to lack of server.
    addVideo?: Function;
}

export const NavBar: React.FC<NavBarProps> = ({
    status = 'Admin',
    onCourseChange = () => null,
    addVideo = () => null,
}): React.ReactElement => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [currentCourses, setCurrentCourses] = useState<string[]>(['CSC309', 'MAT137']);
    const refNewCourse = useRef() as RefObject<HTMLInputElement>;

    const router = useRouter();
    const { cid } = router.query;

    const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
		setIsLoginOpen(!isLoginOpen);
        setIsUploadOpen(false);
	};

    const handleUploadClick = (e: React.MouseEvent<HTMLElement>) => {
        setIsUploadOpen(!isUploadOpen);
        setIsLoginOpen(false);
    }

    const addClass = () => {
        let name = refNewCourse.current?.value;
        // console.log(name);
        if (name && name != '' && !currentCourses.includes(name)) {
            let temp = [...currentCourses];
            temp.push(name);
            setCurrentCourses(temp);
        }
    };

    const changeCourse = (newSelection: string) => {

        router.replace({
            pathname: '/catalogue',
            query: 
            {
                cid: newSelection
            },
        })

        onCourseChange();
    };

    return(
        <Container>
            <LeftContainer>
                <Logo src="https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg" />
                <Select values={currentCourses} setSelected={changeCourse} />
                {status == 'Admin' && <Button icon={RecordCircle}>Record</Button>}
                <Input inputRef={refNewCourse} placeholder="Join a class..." />
                <Button onClick={addClass} >Add Class</Button>
            </LeftContainer>
            <RightContainer>
                {status == 'Admin' && <Button icon={Upload} onClick={handleUploadClick} />}
                <Button icon={PersonCircle} onClick={() => window.location.replace("profile")} />
                <Button icon={Exit} onClick={handleLoginClick}/>
            </RightContainer>
            <Popup isOpen={isLoginOpen || isUploadOpen} setIsOpenFunc={setIsLoginOpen}>
                {isLoginOpen && <LoginPanel></LoginPanel>}
                {isUploadOpen && <UploadPanel onSubmitClick={addVideo} />}
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