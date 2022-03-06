export interface Video {
    title: string;
    description: string;
    num_likes: number;
    num_comments: number;
    date: Date;
    video_len: string;
    thumbnail: string;
    src: string;
    status: {
        professor_answered?: boolean;
        student_answered?: boolean;
        unresolved_answers?: boolean;
    };
    visibility: 'Everyone' | 'TAProfs';
}