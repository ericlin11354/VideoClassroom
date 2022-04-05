import type { NextPage } from 'next';
import { getVideosFromDB, removeVideoFromDB } from '../scripts/video_script';
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
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';

const log = console.log

export interface CatalogueProps extends UserStatusProps{
    currentCourse?: string;
};

const Catalogue: NextPage<CatalogueProps> = ({
    status = 'Admin',
}) => {

    const router = useRouter();
    // const { cid } = router.query;
    // since we mutate the list of videos, we need keep track of mutated videos when filtering/searching
    // console.log(getVideosFromCourse(cid))
    const videoList = useState<Video[]>([]);
    const [videos, setVideos] = videoList;
    const [currentVideos, setCurrentVideos] = useState<Video[]>(videos);
    const [displayedVideos, setDisplayedVideos] = useState<Video[]>(videos);

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortTerm, setSortTerm] = useState<string>('');
    const [filterTerm, setFilterTerm] = useState<string>('');

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        setIsAdmin(isUserAdmin())
    })

    const refFilterSort = useRef() as RefObject<HTMLSelectElement>;
    const refFilterVisibility = useRef() as RefObject<HTMLSelectElement>;

    useEffect(() => {
        let filteredVideos = searchVideos(searchTerm, videos)
        filteredVideos = sortVideos(sortTerm, filteredVideos)
        filteredVideos = filterVideos(filterTerm, filteredVideos)
        setDisplayedVideos([...filteredVideos])
    }, [searchTerm, sortTerm, filterTerm, isLoggedIn, isAdmin, videos])
    
    useEffect(() => {
        getVideosFromDB(videoList);
    }, [isLoggedIn, isAdmin])

    const displayVideos = (): React.ReactNode[] => {
        // console.log('displayVideos:', videos);
        return (
            displayedVideos.map((video, index) => 
                ((video.visibility != 'TAProfs' && isLoggedIn) || isAdmin) && <VideoRow key={index} video={video} removeClick={() => removeVideo(index)}/>
            )
        )
    };

    const removeVideo = (index: number) => {
        const temp = [...videos];
        // const temp2 = [...currentVideos];
        // const index2 = temp2.indexOf(temp[index]);

        // console.log(temp[index]);
        const video = temp[index] as any;
        console.log('removing', video['video_id']);
        removeVideoFromDB(video['video_id']);
        temp.splice(index, 1);
        // console.log(removed);
        setVideos([...temp]);
        setCurrentVideos([...temp]);
    }

    const searchVideos = (searchTitle: string, videoList: any) => {
        // console.log(searchTitle);

        if (searchTitle != '') {
            const temp = [...videoList];
            const newList = []
            for (let i=0; i<temp.length; i++) {
                if (temp[i].title.toLowerCase().includes(searchTitle.toLowerCase())) {
                    newList.push(temp[i]);
                }
            }

            return newList
        }
        else {
            return videoList
            // setDisplayedVideos([...displayedVideos]);
        }
    };
    const handleSearchVideos: React.FormEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTitle = event.target.value;
        setSearchTerm(searchTitle)
    };

    const sortVideos = (option: string, videoList: any) => {
        // console.log(option);
        const temp = [...videoList];
        switch(option) {
            case 'Upload Date': {
                temp.sort((a, b) =>  b.date.valueOf() - a.date.valueOf());
                // setDisplayedVideos([...temp]);
                break;
            }
            // case 'Total Views': {
            //     temp.sort((a, b) => b.num_likes - a.num_likes);
            //     // setDisplayedVideos([...temp]);
            //     break;
            // }
            case 'Total Comments': {
                temp.sort((a, b) => b.num_comments - a.num_comments);
                // setDisplayedVideos([...temp]);
                break;
            }
            default: {
                // default to 'Sort Videos'
                // setDisplayedVideos([...videos]);
                return videoList
            }
        }
        
        return temp
    }
    const handleSortVideos: React.MouseEventHandler<HTMLSelectElement> = (event: React.MouseEvent<HTMLSelectElement>) => {
        const option = event.currentTarget.value;
        setSortTerm(option)
    };

    const filterVideos = (option: string, videoList: any) => {
        const temp = [...videoList];
        const newList = [];
        switch(option) {
            case 'TAProfs': {
                for(let i=0; i<temp.length; i++) {
                    if (temp[i].visibility == 'TAProfs')
                        newList.push(temp[i]);
                }
                // setDisplayedVideos([...newList]);
                return newList
            }
            default: {
                // default to 'All Videos'
                // setDisplayedVideos([...videos]);
                return videoList
            }
        }
    };
    const handleFilterVideos: React.MouseEventHandler<HTMLSelectElement> = (event: React.MouseEvent<HTMLSelectElement>) => {
        const option = event.currentTarget.value;
        setFilterTerm(option)
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
                    <Input onChange={handleSearchVideos} placeholder="Search..." icon={Search} />
                    <Select selectRef={refFilterSort} values={['Sort Videos', 'Upload Date', 'Total Comments']} onClick={handleSortVideos}/>
                    <Select selectRef={refFilterVisibility} values={['All Videos', 'TAProfs']} onClick={handleFilterVideos} />
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

const Filters = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    column-gap: 10px;
`;

const PageContainer = styled.div`
    position: fixed;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    align-items: center;
    min-width: 800px;
    height: 100%;
    width: 100%;
`;

const VideoList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export default Catalogue;
