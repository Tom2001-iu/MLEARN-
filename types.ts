export interface Article {
  id: string;
  headline: string;
  summary: string;
  body: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
}

export interface User {
  username: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  text: string;
  timestamp: string;
}