import type { NextPage } from 'next';
// import {  removeVideoFromDB } from '../scripts/video_script';
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

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [isAdmin, setIsAdmin] = useState<Boolean>(false);

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
        setIsAdmin(isUserAdmin())
    })

    const refFilterSort = useRef() as RefObject<HTMLSelectElement>;
    const refFilterVisibility = useRef() as RefObject<HTMLSelectElement>;

    useEffect(() => {
        // console.log('rerendering');
        getVideosFromDB();
    }, [])

    const displayVideos = (): React.ReactNode[] => {
        // console.log('displayVideos:', videos);
        return (
            videos.map((video, index) => 
                ((video.visibility != 'TAProfs' && isLoggedIn) || isAdmin) && <VideoRow key={index} video={video} removeClick={() => removeVideoFromDB(index)}/>
            )
        )
    };

    // const removeVideo = (index: number) => {
    //     const temp = [...videos];
    //     // const temp2 = [...currentVideos];
    //     // const index2 = temp2.indexOf(temp[index]);

    //     // console.log(temp[index]);
    //     const video = temp[index] as any;
    //     console.log('removing', video['video_id']);
    //     removeVideoFromDB(video['video_id']);
    //     temp.splice(index, 1);
    //     // console.log(removed);
    //     setVideos([...temp]);
    //     setCurrentVideos([...temp]);
    // }

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
            setVideos([...newList]);
        }
        else {
            getVideosFromDB();
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

    const getVideosFromDB = () => {
        const url = `/api/catalogue/`;
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                console.log("Could not get videos");
            }
        })
        .then(json => {
            // // the resolved promise with the JSON body
            // studentList.setState({ studentList: json.students });
            // console.log('json', json);
            setVideos(json.videos);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const removeVideoFromDB = (index: number) => {
        const temp = [...videos];

        const video = temp[index] as any;
        console.log('removing', video['video_id']);

        const url = `/api/catalogue/${video['video_id']}`;
        const request = new Request(url, {
            method: 'delete', 
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        fetch(request)
        .then(function(res) {
    
            if (res.status === 200) {
                console.log('Successfully deleted video')
                temp.splice(index, 1);
                setVideos([...temp]);
                setCurrentVideos([...temp]);
            } else {
                console.log('Could not delete video')
            }
            console.log(res)  // log the result in the console for development purposes,
                              //  users are not expected to see this.
        }).catch((error) => {
            console.log(error)
        })
    }

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
    margin: 30px 0 10px;
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
    overflow: auto;

    
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

export default Catalogue;
