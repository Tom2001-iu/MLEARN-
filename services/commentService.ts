import { Comment } from '../types';

const COMMENTS_KEY = 'comments';

// Function to get all comments from localStorage
const getAllComments = (): Comment[] => {
  try {
    const commentsJson = localStorage.getItem(COMMENTS_KEY);
    return commentsJson ? JSON.parse(commentsJson) : [];
  } catch (error) {
    console.error("Failed to parse comments from localStorage", error);
    return [];
  }
};

// Function to save all comments to localStorage
const saveAllComments = (comments: Comment[]): void => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// Get comments for a specific article
export const getComments = async (articleId: string): Promise<Comment[]> => {
  const allComments = getAllComments();
  const articleComments = allComments.filter(comment => comment.articleId === articleId);
  return Promise.resolve(articleComments);
};

// Add a new comment for an article
export const addComment = async (articleId: string, text: string, author: string): Promise<Comment> => {
  const allComments = getAllComments();
  const newComment: Comment = {
    id: new Date().toISOString() + Math.random(), // simple unique id
    articleId,
    text,
    author,
    timestamp: new Date().toLocaleString(),
  };
  allComments.push(newComment);
  saveAllComments(allComments);
  return Promise.resolve(newComment);
};
