import type { NextPage } from 'next';
import { 
    Input,
    NavBar,
    Select,
    UserStatusProps,
    Video,
    VideoRow,
} from '../components';
import React, { ChangeEventHandler, EventHandler, FormEventHandler, useState } from 'react';
import { Search } from '@styled-icons/bootstrap/Search';
import styled from 'styled-components';

const videoList: Video[] = [
    {
        title: "Formal definition of a limit",
        description: "By the end of this lesson, you will absolutely love epsilons and deltas",
        num_comments: 69,
        num_likes: 42,
        date: new Date('2021-04-20'),
        video_len: '42:00',
        status: {
            professor_answered: true,
            student_answered: true,
            unresolved_answers: true,
        },
        thumbnail: 'https://external-preview.redd.it/W-uPL4Yr42_zNV_FFtpOZ0pRwxjZup6_aM90LdCis6k.jpg?auto=webp&s=26f5d20887104f3b8202ed5e1747d7da51135f05',
        src: 'cat.mp4',
        visibility: 'Everyone',
    },
    {
        title: 'Fourier Series',
        description: 'Wait, you re-created the Mona Lisa with a function!?',
        num_likes: 100,
        num_comments: 22,
        date: new Date('2021-06-09'),
        video_len: '6:90',
        status: {
            professor_answered: false,
            student_answered: true,
            unresolved_answers: true,
        },
        thumbnail: 'https://static.wikia.nocookie.net/67d15606-ebf8-46a7-bffe-1db81f6b7d6a',
        src: 'rick.mp4',
        visibility: 'TAProfs',
    },
    {
        title: 'Speedrunning all of First-Year Derivatives',
        description: 'There you. 1.5 months of First-year calculus right there.',
        num_likes: 0,
        num_comments: 1,
        date: new Date('2021-01-09'),
        video_len: '12:34',
        status: {
            professor_answered: true,
            student_answered: false,
            unresolved_answers: true,
        },
        thumbnail: 'https://i1.sndcdn.com/artworks-Uii8SMJvNPxy8ePA-romBoQ-t500x500.jpg',
        src: 'amongus.mp4',
        visibility: 'Everyone',
    }
];

export interface CatalogueProps extends UserStatusProps{
};

const Catalogue: NextPage<CatalogueProps> = ({
    status = 'Admin',
}) => {
    // since we mutate the list of videos, we need keep track of mutated videos when filtering/searching
    const [videos, setVideos] = useState<Video[]>(videoList);
    const [currentVideos, setCurrentVideos] = useState<Video[]>(videos);

    const [courses, setCourses] = useState<string[]>(['CSC309', 'MAT137']);

    const displayVideos = (): React.ReactNode[] => {
        return (
            currentVideos.map((video, index) => <VideoRow key={index} video={video} removeClick={() => removeVideo(index)}/>)
        )
    }

    const removeVideo = (index: number) => {
        const temp = [...videos];
        const removed = temp.splice(index, 1)[0];
        // console.log(removed);
        setVideos(temp);
        setCurrentVideos(temp);
    }

    const searchVideos: React.FormEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTitle = event.target.value;
        // console.log(searchTitle);

        if (searchTitle != '') {
            const temp = [...videos];
            const newList = []
            for (let i=0; i<temp.length; i++) {
                if (temp[i].title.toLowerCase().includes(searchTitle.toLowerCase())) {
                    newList.push(temp[i]);
                }
            }
            setCurrentVideos(newList);
        }
        else {
            setCurrentVideos(videos);
        }
    };

    const sortVideos = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('hi');
        console.log(event.target.value);
    }

    return (
        <PageContainer>
            <NavBar courses={courses} />
            <CatalogueContainer>
                <Filters>
                    <Input onChange={searchVideos} placeholder="Search..." icon={Search} />
                    <Select values={['Upload Date', 'Total Views', 'Total Likes']} />
                    <Select values={['All Videos', 'TAProfs']} />
                </Filters>
                <VideoList>
                    {displayVideos()}
                </VideoList>
            </CatalogueContainer>
        </PageContainer>
    );
}

const CatalogueContainer = styled.div`
    display: flex; 
    flex-direction: column;
    row-gap: 10px;
    width: 80%;
    margin: 200px 0 0 10px;
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

const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export default Catalogue;
