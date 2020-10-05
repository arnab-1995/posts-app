import Comment from './comment';

export default class Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
    author: string;
    comments: Comment[];
    created_at: Date;
}