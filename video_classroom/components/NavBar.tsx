import { 
    Button,
    Select,
} from '.';
import { Exit } from '@styled-icons/icomoon/Exit';
import { MainTheme } from '../styles/MainTheme';
import { PersonCircle } from '@styled-icons/bootstrap/PersonCircle';
import React from 'react';
import { RecordCircle } from '@styled-icons/bootstrap/RecordCircle';
import styled from 'styled-components';
import { Upload } from '@styled-icons/boxicons-regular/Upload';

export interface NavBarProps extends React.HTMLAttributes<HTMLDivElement>{

}

export const NavBar: React.FC<NavBarProps> = ({

}): React.ReactElement => (
    <Container>
        <LeftContainer>
            <img src="https://assets.hongkiat.com/uploads/psd-text-svg/logo-example.jpg" />
            <Select values={['CSC309', 'CSC343', 'CSC384']} />
            <Button icon={RecordCircle}>Record</Button>
        </LeftContainer>
        <RightContainer>
            <Button icon={Upload} />
            <Button icon={PersonCircle} />
            <Button icon={Exit} />
        </RightContainer>
    </Container>
)

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
    column-gap: 10px;
    width: 50%;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    column-gap: 10px;
    width: 50%;
`;

export default NavBar;