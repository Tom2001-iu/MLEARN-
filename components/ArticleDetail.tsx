import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types';
import { getComments } from '../services/commentService';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import StickySidebar from './StickySidebar';

interface ArticleDetailProps {
  article: Article;
  articles: Article[];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, articles }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    if (article) {
        const fetchedComments = await getComments(article.id);
        setComments(fetchedComments);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [article]);


  if (!article) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 font-sans">
      {/* Main Content */}
      <div className="lg:col-span-2">
        <header className="mb-8">
          <a href="/#/" className="text-gray-600 hover:text-black transition-colors">&larr; Back to all articles</a>
          <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mt-4">{article.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mt-2">
            {article.headline}
          </h1>
          <div className="text-gray-500 text-sm mt-4 flex items-center font-sans">
              <span>By <strong>{article.author}</strong></span>
              <span className="mx-2">•</span>
              <span>{article.publishedAt}</span>
          </div>
        </header>
        
        <div className="mb-8 bg-gray-200">
          <img src={article.imageUrl.replace('1200/800', '1200/675')} alt={article.headline} className="w-full h-auto object-cover" />
        </div>

        <article className="prose prose-lg max-w-none text-gray-800">
          <p className="text-xl font-serif leading-relaxed text-gray-900">
            {article.summary}
          </p>
          
          {article.body && article.body.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
          ))}
        </article>

        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Comments</h2>
          <CommentList comments={comments} />
          <CommentForm articleId={article.id} onCommentAdded={fetchComments} />
        </section>

        {/* "More to Read" section for mobile/tablet */}
        <div className="lg:hidden mt-12 pt-8 border-t border-gray-200">
            <StickySidebar articles={articles} currentArticleId={article.id} />
        </div>
      </div>
      
      {/* Sticky Sidebar for desktop */}
      <div className="hidden lg:block sticky top-24">
        <StickySidebar articles={articles} currentArticleId={article.id} />
      </div>
    </div>
  );
};

export default ArticleDetail;
