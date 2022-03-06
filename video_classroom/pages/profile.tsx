import { 
    Button,
    ProfileComment,
    Heading,
    HistoryText,
    LabelText,
    NavBar,
    Video
} from '../components';
import { MainTheme } from '../styles/MainTheme';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const Profile: NextPage = () => {
    return (
        <PageContainer>
            <NavBar />
            <ProfileContainer>
                <ProfilePicture src="https://external-preview.redd.it/W-uPL4Yr42_zNV_FFtpOZ0pRwxjZup6_aM90LdCis6k.jpg?auto=webp&s=26f5d20887104f3b8202ed5e1747d7da51135f05" />
                <ProfileInfo>
                    <Column>
                        <Name bold={true} size="h3">Jianjia Chen</Name>
                        <Heading bold={true} size="h6" color={MainTheme.colors.text} >3rd-year CS Specialist</Heading>
                        <Heading size="small" >Sometimes, I dream about cheese...</Heading>
                    </Column>
                    <Column>
                        <LabelText label="Birthdate" >01/02/2003</LabelText>
                        <LabelText label="Reviews" >420 (4.5 stars)</LabelText>
                        <LabelText label="Past Courses" clickable={true}>CSC309, CSC343...</LabelText>
                    </Column>
                </ProfileInfo>
                <EditProfileButton>Edit Profile</EditProfileButton>
            </ProfileContainer>
            <CommentHistory>
                <ProfileComment />
                <ProfileComment />
                <ProfileComment />
            </CommentHistory>
        </PageContainer>
    );
};

const Column = styled.div`
    width: 30%;
    height: 100%;
`;

const CommentHistory = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${MainTheme.dimensions.padding.container};
    border: 1px solid ${MainTheme.colors.stroke};
    width: 61%;
    height: 100%;
    margin: 20px 0 0 20px;
    row-gap: 20px;
`;

const EditProfileButton = styled(Button)`
    height: 10%;
`;

const Name = styled(Heading)`
    margin: -5px 0 0 0;
`;

const PageContainer = styled.div`
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 30px;
    padding: ${MainTheme.dimensions.padding.container};
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid ${MainTheme.colors.stroke};
    padding: ${MainTheme.dimensions.padding.container};
    width: 50%;
`;

const ProfilePicture = styled.img`
    border-radius: 50%;
    height: 200px;
    width: 200px;
`;

const StyledHistoryText = styled(HistoryText)`
    margin: -10px 0 0 0;
`;


export default Profile;