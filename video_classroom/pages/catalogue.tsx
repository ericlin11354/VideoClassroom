import type { NextPage } from 'next';
import { 
    Input,
    NavBar,
    Select,
    UserStatusProps,
    Video,
    VideoRow,
} from '../components';
import React, { ChangeEventHandler, EventHandler, FormEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { Search } from '@styled-icons/bootstrap/Search';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { isUserAdmin, isUserLoggedIn } from '../helpers/permHelper';

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
        num_likes: 21,
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
        num_likes: 1000,
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

const videoList2: Video[] = [
    {
        title: "Top 10 Javascript Betrayls [GONE WRONG] ",
        description: "Remember to like and subscribe!",
        num_comments: 0,
        num_likes: 1,
        date: new Date('2020-04-20'),
        video_len: '100:00',
        status: {
            professor_answered: false,
            student_answered: false,
            unresolved_answers: false,
        },
        thumbnail: 'https://i.imgur.com/6wcAlxu.jpg',
        src: 'pog.mp4',
        visibility: 'Everyone',
    }
]

export interface CatalogueProps extends UserStatusProps{
};

const Catalogue: NextPage<CatalogueProps> = ({
    status = 'Admin',
}) => {

    const router = useRouter();
    const { cid } = router.query;

    // since we mutate the list of videos, we need keep track of mutated videos when filtering/searching
    const [videos, setVideos] = useState<Video[]>([...videoList]);
    const [currentVideos, setCurrentVideos] = useState<Video[]>([...videos]);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        setIsAdmin(isUserAdmin())
    })

    const refFilterSort = useRef() as RefObject<HTMLSelectElement>;
    const refFilterVisibility = useRef() as RefObject<HTMLSelectElement>;

    const displayVideos = (): React.ReactNode[] => {
        // console.log(cid);
        // console.log(videos);
        return (
            currentVideos.map((video, index) => 
                ((video.visibility != 'TAProfs' && isLoggedIn) || isAdmin) && <VideoRow key={index} video={video} removeClick={() => removeVideo(index)}/>
            )
        )
    };

    const removeVideo = (index: number) => {
        const temp = [...videos];
        // const temp2 = [...currentVideos];
        // const index2 = temp2.indexOf(temp[index]);

        temp.splice(index, 1);
        // console.log(removed);
        setVideos([...temp]);
        setCurrentVideos([...temp]);
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
            setCurrentVideos([...newList]);
        }
        else {
            setCurrentVideos([...videos]);
        }
    };

    const sortVideos: React.MouseEventHandler<HTMLSelectElement> = (event: React.MouseEvent<HTMLSelectElement>) => {
        const option = event.currentTarget.value;
        // console.log(option);
        const temp = [...currentVideos];
        switch(option) {
            case 'Upload Date': {
                temp.sort((a, b) =>  b.date.getTime() - a.date.getTime());
                setCurrentVideos([...temp]);
                break;
            }
            case 'Total Views': {
                temp.sort((a, b) => b.num_likes - a.num_likes);
                setCurrentVideos([...temp]);
                break;
            }
            case 'Total Comments': {
                temp.sort((a, b) => b.num_comments - a.num_comments);
                setCurrentVideos([...temp]);
                break;
            }
            default: {
                // default to 'Sort Videos'
                setCurrentVideos([...videos]);
                break;
            }
        }
    }

    const filterVideos: React.MouseEventHandler<HTMLSelectElement> = (event: React.MouseEvent<HTMLSelectElement>) => {
        const option = event.currentTarget.value;
        const temp = [...currentVideos];
        const newList = [];
        switch(option) {
            case 'TAProfs': {
                for(let i=0; i<temp.length; i++) {
                    if (temp[i].visibility == 'TAProfs')
                        newList.push(temp[i]);
                }
                setCurrentVideos([...newList]);
                break;
            }
            default: {
                // default to 'All Videos'
                setCurrentVideos([...videos]);
            }
        }
    };

    const addVideo = (newVideo: Video) => {
        const temp = [...videos];
        temp.push(newVideo);
        setVideos([...temp]);
        setCurrentVideos([...temp]);
    };

    return (
        <PageContainer>
            <NavBar addVideo={addVideo} />
            <CatalogueContainer>
                <Filters>
                    <Input onChange={searchVideos} placeholder="Search..." icon={Search} />
                    <Select selectRef={refFilterSort} values={['Sort Videos', 'Upload Date', 'Total Views', 'Total Comments']} onClick={sortVideos}/>
                    <Select selectRef={refFilterVisibility} values={['All Videos', 'TAProfs']} onClick={filterVideos} />
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
    margin: 100px 0 0 10px;
    height: 100%;
`;

const Filters = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 10px;
`;

const PageContainer = styled.div`
    position: fixed;
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
