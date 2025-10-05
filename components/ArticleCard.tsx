import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  large?: boolean;
}

const truncateSummary = (summary: string, maxSentences: number): string => {
    if (!summary) return '';
    // This regex splits the text into sentences, keeping the punctuation.
    const sentences = summary.match(/[^.!?]+[.!?]+/g) || [];
    
    if (sentences.length <= maxSentences) {
        return summary;
    }
    
    // Join the first 'maxSentences' sentences and add an ellipsis.
    return sentences.slice(0, maxSentences).join('').trim() + '...';
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, large = false }) => {
  return (
    <div className="group flex flex-col h-full">
      <a href={`/#/article/${article.id}`} className="block overflow-hidden bg-gray-200">
        <img 
          src={article.imageUrl.replace('1200/800', large ? '800/500' : '600/400')} 
          alt={article.headline} 
          className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out" 
        />
      </a>
      <div className="pt-4 flex-grow flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{article.category}</p>
        <h3 className={`font-serif font-bold text-gray-900 mt-1 ${large ? 'text-2xl' : 'text-xl'}`}>
           <a href={`/#/article/${article.id}`} className="hover:text-gray-700 transition-colors">
                {article.headline}
           </a>
        </h3>
        {large && (
             <p className="text-gray-600 mt-2 font-sans text-base flex-grow">
                {truncateSummary(article.summary, 2)}
             </p>
        )}
        <div className="text-gray-500 text-xs mt-2 font-sans">
            <span>By {article.author}</span>
            <span className="mx-1.5">•</span>
            <span>{article.publishedAt}</span>
        </div>

        <div className="mt-auto pt-3">
             <a href={`/#/article/${article.id}`} className="text-sm font-semibold text-gray-800 hover:text-black transition-colors group-hover:underline">
                Read More &rarr;
            </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;