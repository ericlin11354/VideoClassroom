import React, { useEffect, useState } from 'react'
import { Search } from '@styled-icons/bootstrap/Search';
import styled from 'styled-components'
import { Input, NavBar } from '../components/';
import { isUserAdmin, isUserLoggedIn } from '../helpers/permHelper';

export interface UsersProps extends React.HTMLAttributes<HTMLDivElement> {

}

export const Users: React.FC<UsersProps> = ({
    ...props
}): React.ReactElement => {

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);
    const [users, setUsers] = useState([]);

    /** Search User functionality goes here */
    const searchVideos = () => {
        /** Backend GET request included here */
    }

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        setIsAdmin(isUserAdmin())
    })

    /** Map users to ReactNodes */
    const displayUsers = (): React.ReactNode[] => {
        return (
            users.map((user, index) => 
                (
                    <StyledDiv>
                        {/* <SmallText children={user.name}/> */}
                    </StyledDiv>
                )
            )
        )
    };

    return (
        <PageContainer {...props} >
            <NavBar />
            <CatalogueContainer>
                <StyledInput onChange={searchVideos} placeholder="Search..." icon={Search} />
                <VideoList>
                    {displayUsers()}
                </VideoList>
            </CatalogueContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
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