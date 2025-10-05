import React from 'react';
import { Article } from '../types';

interface MainArticleProps {
  article: Article;
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


const MainArticle: React.FC<MainArticleProps> = ({ article }) => {
  if (!article) return null;

  return (
    <a href={`/#/article/${article.id}`} className="block mb-8 group">
      <div className="relative overflow-hidden bg-gray-200">
        <img src={article.imageUrl} alt={article.headline} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>
      <div className="relative p-6 -mt-24 z-10">
        <p className="text-sm font-bold uppercase tracking-wider text-gray-300">{article.category}</p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-2 group-hover:text-gray-200 transition-colors">
          {article.headline}
        </h2>
        <p className="text-gray-300 mt-4 text-lg font-sans">
          {truncateSummary(article.summary, 2)}
        </p>
        <div className="text-gray-400 text-sm mt-4 font-sans">
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.publishedAt}</span>
        </div>
      </div>
    </a>
  );
};

export default MainArticle;