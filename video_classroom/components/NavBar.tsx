import { 
    Button,
    Input,
    Select,
    UploadPanel,
} from '.';
import { Exit } from '@styled-icons/icomoon/Exit';
import { MainTheme } from '../styles/MainTheme';
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { RecordCircle } from '@styled-icons/bootstrap/RecordCircle';
import styled from 'styled-components';
import { Upload } from '@styled-icons/boxicons-regular/Upload';
import { PlusCircle } from '@styled-icons/bootstrap/PlusCircle';
import Popup from './Popup';
import LoginPanel from './LoginPanel';
import { UserStatusProps, Video } from './Objects';
import router, { useRouter } from 'next/router';
import { addVideoToDB } from '../scripts/video_script';
import { getUsername, isUserAdmin } from '../helpers/permHelper';

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
    const [courses, setCourses] = useState<string[]>(['CSC309', 'MAT137']);
    const refNewCourse = useRef() as RefObject<HTMLInputElement>;

    // const router = useRouter();
    // const { cid } = router.query;
        
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(Boolean);
    
    useEffect(() => {
        setUsername(getUsername())
        setIsAdmin(isUserAdmin())
    })

    const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
        if (username !== ''){
            //log out

            const url = process.env.SERVER_URL + '/api/users/login';
            const data = {
                username: '',
                password: '',
            }
            const request = new Request(url, {
                method: 'post', 
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
            
            const response = fetch(request)
            .then(async function(res) {
                if (!res.ok) {
                    return false
                }
    
                sessionStorage.setItem('username', '')
                sessionStorage.setItem('permission', '')
                window.location.reload()
    
            }).catch((error) => {
                console.log(error)
            })

        } else {
            setIsLoginOpen(!isLoginOpen);
            setIsUploadOpen(false);
        }
	};

    const handleUploadClick = (e: React.MouseEvent<HTMLElement>) => {
        // addVideoToDB(); // FOR TESTING PURPOSES
        setIsUploadOpen(!isUploadOpen);
        setIsLoginOpen(false);
    }

    const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
        router.replace({
            pathname: '/profile',
            query: 
            {
                username: username
            },
        })
    }

    const addClass = () => {
        let name = refNewCourse.current?.value;
        // console.log(name);
        if (name && name != '' && !courses.includes(name)) {
            let temp = [...courses];
            temp.push(name);
            setCourses(temp);
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

        // onCourseChange();
    };

    return(
        <Container>
            <LeftContainer>
                <Logo src="https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg" onClick={() => window.location.replace("catalogue")}/>
                {/* <Select values={courses} setSelected={changeCourse} /> */}
                {/* {status == 'Admin' && <Button icon={RecordCircle}>Record</Button>} */}
                {/* <Input inputRef={refNewCourse} placeholder="Join a class..." /> */}
                {/* <Button onClick={addClass} >Add Class</Button> */}
            </LeftContainer>
            <RightContainer>
                { username !== '' && isAdmin && <Button tip={'Manage Users'} onClick={() => window.location.replace("users")} children='Users' />}
                { username !== '' && isAdmin && <Button tip={'Upload a Video'} icon={Upload} onClick={handleUploadClick} />}
                {
                    username !== '' && <Button tip={'View Profile'} icon={PersonCircle} onClick={handleProfileClick} />
                }
                <Button tip={'Login / Signup'} icon={Exit} onClick={handleLoginClick} />
            </RightContainer>
            <Popup isOpen={isLoginOpen} setIsOpenFunc={setIsLoginOpen}>
                <LoginPanel></LoginPanel>
            </Popup>
            <Popup isOpen={isUploadOpen} setIsOpenFunc={setIsUploadOpen}>
                <UploadPanel />
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
    cursor: pointer;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 10px;
    width: 50%;
`;

export default NavBar;