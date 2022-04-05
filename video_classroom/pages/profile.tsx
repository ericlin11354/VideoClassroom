import { 
    Button,
    ProfileComment,
    Heading,
    HistoryText,
    Input,
    LabelText,
    NavBar,
    UserStatusProps,
    Video,
} from '../components';
import { MainTheme } from '../styles/MainTheme';
import type { NextPage } from 'next';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { CommentData, commentsMongoToClass } from '../components/CommentData';

export interface ProfileProps extends UserStatusProps {
};

// const Person = {
//     name: 'Jianjia Chen',
//     title: '3rd-year CS Specialist',
//     description: 'Sometimes, I dream about cheese...',
//     birthdate: '01/02/2003',
//     reviews: '420 (4.5 stars)',
//     courses: 'CSC309, CSC343'
// }

const Profile: NextPage<ProfileProps> = ({
    status = 'Admin',
}) => {
    const router = useRouter()
    const { username } = router.query;
    const [userData, setUserData] = useState<any>({});
    const [comments, setComments] = useState<any>([]);

    
    const getUserData = (): void => {
        if (username){
            const url = process.env.SERVER_URL + '/api/users/' + username;
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
                // console.log(resBody)
    
                setUserData(resBody)
    
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    
    const getUserComments = (): void => {
        if (username){
            const url = process.env.SERVER_URL + '/api/comment/userComments/' + username;
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
                // console.log(resBody)
    
                setComments(commentsMongoToClass(resBody.comments, true))
    
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    
    useEffect(() => {
        getUserData()
        getUserComments()
        
    }, [username])

    const [isEditing, setIsEditing] = useState(false);
    // const [name, setName] = useState(Person.name);
    // const [title, setTitle] = useState(Person.title);
    // const [description, setDescription] = useState(Person.description);
    // const [birthdate, setBirthdate] = useState(Person.birthdate);
    // const [courses, setCourses] = useState(Person.courses);

    const refName = useRef() as RefObject<HTMLInputElement>;
    const refTitle = useRef() as RefObject<HTMLInputElement>;
    const refDescription = useRef() as RefObject<HTMLInputElement>;
    const refBirthdate = useRef() as RefObject<HTMLInputElement>;
    const refCourses = useRef() as RefObject<HTMLInputElement>;

    const canEdit = username && sessionStorage.getItem('username') === username

    const updateProfile = (): void => {
        // setName(refName.current?.value ? refName.current.value : Person.name);
        // setTitle(refTitle.current?.value ? refTitle.current.value : Person.title);
        // setDescription(refDescription.current?.value ? refDescription.current.value : Person.description);
        // setBirthdate(refBirthdate.current?.value ? refBirthdate.current.value : Person.birthdate);
        // setCourses(refCourses.current?.value ? refCourses.current.value : Person.courses);
        setIsEditing(false);

        const data = {
            name: refName.current?.value || '',
            title: refTitle.current?.value || '',
            description: refDescription.current?.value || '',
            birthdate: refBirthdate.current?.value || '',
            // courses: refDescription.current?.value || '',
        }

        // console.log(data)

        const url = process.env.SERVER_URL + '/api/users/edit/';
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
                console.log(res)
                return false
            }

            const resBody = await res.json()

            getUserData()

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <PageContainer>
            <NavBar />
            <ProfileContainer>
                <ProfilePicture src="https://external-preview.redd.it/W-uPL4Yr42_zNV_FFtpOZ0pRwxjZup6_aM90LdCis6k.jpg?auto=webp&s=26f5d20887104f3b8202ed5e1747d7da51135f05" />
                <ProfileInfo>
                    {!isEditing ? (
                    <>
                        <Column>
                            <Name bold={true} size="h3">{userData.name || ''}</Name>
                            <Title bold={true} size="h6" color={MainTheme.colors.text} >{userData.title || ''}</Title>
                            <Heading size="small" >{userData.description || ''}</Heading>
                        </Column>
                        <Column>
                            <LabelText label="Birthdate" >{userData.birthdate || ''}</LabelText>
                            {/* <LabelText label="Reviews" >{userData.reviews}</LabelText> */}
                            {/* <LabelText label="Past Courses">{userData.courses}</LabelText> */}
                        </Column>
                    </>
                    ) : (
                    <>  
                        <Column>
                            <Input inputRef={refName} label="Name" placeholder='Name...' />
                            <Input inputRef={refTitle} label="Title" placeholder='Title...' />
                            <Input inputRef={refDescription} label="About Me" placeholder='About Me...' />
                        </Column>
                        <Column>
                            <Input inputRef={refBirthdate} label="Birthdate" placeholder='Birthdate...' />
                            {/* <Input inputRef={refCourses} label="Courses" placeholder='Courses...' /> */}
                            <Button onClick={() => updateProfile()}>Submit Changes</Button>
                        </Column>
                    </>
                    )}
                </ProfileInfo>
                {canEdit && !isEditing && <EditProfileButton onClick={() => setIsEditing(true)} >Edit Profile</EditProfileButton>}
            </ProfileContainer>
            <CommentHistory>
                
                {comments.map((comment: CommentData, i: number) => (
                    <ProfileComment key={comment.id} comment={comment}/>
                ))}
            </CommentHistory>
        </PageContainer>
    );
};

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
    row-gap: 10px;
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

const Title = styled(Heading)`
    margin: -10px 0 0 0;
`;


export default Profile;