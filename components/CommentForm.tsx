import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addComment } from '../services/commentService';

interface CommentFormProps {
  articleId: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onCommentAdded }) => {
  const { currentUser, openAuthModal } = useAuth();
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || text.trim() === '') return;

    setIsSubmitting(true);
    await addComment(articleId, text, currentUser.username);
    setText('');
    setIsSubmitting(false);
    onCommentAdded();
  };

  if (!currentUser) {
    return (
      <div className="mt-6 border-t pt-6 text-center">
        <p className="text-gray-600">You must be logged in to post a comment.</p>
        <button 
          onClick={openAuthModal}
          className="mt-2 text-sm font-semibold text-gray-800 hover:text-black transition-colors underline"
        >
          Log In or Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Commenting as ${currentUser.username}...`}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          rows={4}
          required
        />
        <div className="text-right mt-2">
            <button
            type="submit"
            disabled={isSubmitting || text.trim() === ''}
            className="bg-black text-white font-bold py-2 px-5 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
