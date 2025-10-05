import React from 'react';
import { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments.length) {
    return <p className="text-gray-600 mt-4">Be the first to comment.</p>;
  }

  return (
    <div className="space-y-6 mt-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
              {comment.author.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-800">{comment.author}</p>
                <p className="text-xs text-gray-500">{comment.timestamp}</p>
            </div>
            <p className="text-gray-700 mt-1">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
