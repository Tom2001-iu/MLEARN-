import React from 'react';
import { Article } from '../types';

interface SidebarArticleCardProps {
  article: Article;
}

const SidebarArticleCard: React.FC<SidebarArticleCardProps> = ({ article }) => {
  return (
    <article>
        <a href={`/#/article/${article.id}`} className="group flex items-start space-x-4">
            <div className="flex-shrink-0 w-24 h-16 bg-gray-200 overflow-hidden">
                <img 
                src={article.imageUrl.replace('1200/800', '200/150')} 
                alt={article.headline} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{article.category}</p>
                <h4 className="text-base font-serif font-bold text-gray-900 mt-1 leading-tight group-hover:text-gray-700 transition-colors">
                {article.headline}
                </h4>
            </div>
        </a>
    </article>
  );
};

export default SidebarArticleCard;
