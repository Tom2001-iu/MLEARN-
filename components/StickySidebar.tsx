import React from 'react';
import { Article } from '../types';
import SidebarArticleCard from './SidebarArticleCard';

interface StickySidebarProps {
  articles: Article[];
  currentArticleId: string;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ articles, currentArticleId }) => {
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 4); // Show up to 4 related articles

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <aside>
      <div className="space-y-6">
        <h3 className="text-xl font-bold font-serif text-gray-900 border-b-2 border-black pb-2">
          More To Read
        </h3>
        <div className="space-y-6">
          {relatedArticles.map(article => (
            <SidebarArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default StickySidebar;
