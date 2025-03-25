export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    createdAt: string;
}
