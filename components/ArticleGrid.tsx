
import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const firstArticle = articles[0];
  const nextTwoArticles = articles.slice(1, 3);
  const remainingArticles = articles.slice(3);

  return (
    <div className="space-y-8">
      {/* Top section: 1 large, 2 small */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {firstArticle && <ArticleCard article={firstArticle} large={true} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
          {nextTwoArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      {/* Bottom section: remaining articles in a standard grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
        {remainingArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleGrid;
