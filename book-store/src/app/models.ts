export interface Book{
    id: number;
    title: string;
    authors: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    thumbnail?: string;
    images: string[];
    selectedImage?: string;
    cartId?: string; 
}