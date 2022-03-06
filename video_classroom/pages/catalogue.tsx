import type { NextPage } from 'next';
import { 
    Input,
    NavBar,
    Select,
    UserStatusProps,
    VideoRow,
} from '../components';
import React from 'react';
import { Search } from '@styled-icons/bootstrap/Search';
import styled from 'styled-components';

export interface CatalogueProps extends UserStatusProps{
};

const Catalogue: NextPage<CatalogueProps> = ({
    status = 'Admin',
}) => {

    return (
        <PageContainer>
            <NavBar />
            <CatalogueContainer>
                <Filters>
                    <Input placeholder="Search..." icon={Search} />
                    <Select values={['Upload Date', 'Total Views', 'Total Likes']} />
                    <Select values={['All Videos', 'Mandatory', 'Optional']} />
                </Filters>
                <VideoRow />
                <VideoRow />
                <VideoRow />
                <VideoRow />
                <VideoRow />
            </CatalogueContainer>
        </PageContainer>
    );
}

const CatalogueContainer = styled.div`
    display: flex;
    align-items: center;    
    flex-direction: column;
    row-gap: 10px;
    width: 80%;
    margin: 50px 0 0 10px;
`;

const Filters = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 10px;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export default Catalogue;
