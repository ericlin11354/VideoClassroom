import React, { useEffect, useState } from 'react'
import { Search } from '@styled-icons/bootstrap/Search';
import styled from 'styled-components'
import { Button, Input, NavBar, SmallText } from '../components/';
import { isUserAdmin, isUserLoggedIn } from '../helpers/permHelper';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { Eye } from 'styled-icons/bootstrap';
import router from 'next/router';
import { LoginPanel } from '../components/LoginPanel';
import Popup from '../components/Popup';

export interface UsersProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const Users: React.FC<UsersProps> = ({
    ...props
}): React.ReactElement => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<any>([]);
    
    /** Search User functionality goes here */
    const searchVideos = () => {
        /** Backend GET request included here */
    }

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        setIsAdmin(isUserAdmin())
    })
    
    const getUsers = (): void => {
        const url = process.env.SERVER_URL + '/api/users/';
        const request = new Request(url, {
            method: 'get', 
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

            const resBody = await res.json()
            setUsers(resBody)

        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {

        getUsers()

    }, [isLoggedIn, isAdmin])


    const toggleAddUser = (e: React.MouseEvent<HTMLElement>): void => {
        setIsLoginOpen(!isLoginOpen)
    }

    type eventFunction = (e: React.MouseEvent<HTMLElement>) => void;
    const getDeleteUser = (user: any): eventFunction => {
        
        const deleteUser = (e: React.MouseEvent<HTMLElement>): void => {
            const url = process.env.SERVER_URL + '/api/users/';
            const data = {
                username: user.username,
            }
            const request = new Request(url, {
                method: 'delete', 
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
                
                
                getUsers()
    
                sessionStorage.setItem('username', '')
                sessionStorage.setItem('permission', '')
                window.location.reload()
    
            }).catch((error) => {
                console.log(error)
            })
        }

        return (deleteUser)
    }

    const getViewUser = (user: any): eventFunction => {
        
        const viewUser = (e: React.MouseEvent<HTMLElement>): void => {
            router.replace({
                pathname: '/profile/',
                query: 
                {
                    username: user.username
                },
            })
        }

        return (viewUser)
    }



    /** Map users to ReactNodes */
    const displayUsers = (): React.ReactNode[] => {
        return (
            users.map((user: any, index: number) => 
                (
                    <StyledDiv>
                        <SmallText children={user.username}/>
                        <StyledButton iconSize={'20px'} tip='View Profile' icon={Eye} onClick={getViewUser(user)}> </StyledButton>
                        {isAdmin && <StyledButton iconSize={'20px'} tip='Delete User' icon={Close} onClick={getDeleteUser(user)}> </StyledButton>}
                    </StyledDiv>
                )
            )
        )
    };

    return (
        <>
            <PopupContainer>
                <Popup isOpen={isLoginOpen} setIsOpenFunc={setIsLoginOpen}>
                    <LoginPanel signupOnly={true}></LoginPanel>
                </Popup>
            </PopupContainer>
            <PageContainer {...props} >
                <NavBar />
                <CatalogueContainer>
                    <StyledInput onChange={searchVideos} placeholder="Search..." icon={Search} />
                    <VideoList>
                        {displayUsers()}
                        {isAdmin && <AddUserButton tip='Add User' onClick={toggleAddUser}> Add User </AddUserButton>}
                    </VideoList>
                </CatalogueContainer>
                
            </PageContainer>
        </>
    )
}

const StyledButton = styled(Button)`
    width: 40px;
    margin-left: 10px;
    margin-right: 10px;
`;

const AddUserButton = styled(Button)`
    margin-left: 10px;
    margin-right: 10px;
`;

const PageContainer = styled.div`
`;

const PopupContainer = styled.div`
    height: 0px;
    position: absolute;
    z-index: 5;
`;

const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const StyledInput = styled(Input)`
    width: 30%;
`;


const CatalogueContainer = styled.div`
    display: flex; 
    flex-direction: column;
    row-gap: 10px;
    width: 90%;
    margin: 100px 0 0 10px;
    height: 100%;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #efefef;

        &-thumb {
            background-color: rgba(0,0,0,0.2);
            border-radius: 999px;
        }
    }
`;

const StyledDiv = styled.div`

`;

export default Users;