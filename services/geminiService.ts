import { GoogleGenAI, Type } from "@google/genai";
import { Article } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const articleSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique identifier for the article.' },
    headline: { type: Type.STRING, description: 'A compelling, professional news headline.' },
    summary: { type: Type.STRING, description: 'A concise one-paragraph summary of the article.' },
    body: { type: Type.STRING, description: 'The full article content, written in a professional news style with at least 3-4 paragraphs. Use newline characters (\\n\\n) to separate paragraphs.' },
    category: { type: Type.STRING, description: 'The news category, e.g., World, Business, Tech, Lifestyle.' },
    author: { type: Type.STRING, description: 'The name of the fictional author of the article.' },
    publishedAt: { type: Type.STRING, description: 'Publication timestamp in a readable format, e.g., "2 hours ago".' },
    imageUrl: { type: Type.STRING, description: 'A placeholder image URL from https://picsum.photos of size 1200x800.' },
  },
  required: ['id', 'headline', 'summary', 'body', 'category', 'author', 'publishedAt', 'imageUrl']
};

export async function generateArticles(): Promise<Article[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 7 realistic, professional news articles for a global news website named 'WORD\\'S'. The topics should cover a mix of world events, business, technology, and lifestyle. Ensure the content is neutral and objective. For each article, invent a realistic author name and provide a full article body of at least 3-4 paragraphs. For each article's imageUrl, use a random image from `https://picsum.photos/1200/800`.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: articleSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    const articles: Article[] = JSON.parse(jsonText);
    
    // Fallback in case Gemini returns a slightly different image URL format
    return articles.map((article, index) => ({
        ...article,
        imageUrl: `https://picsum.photos/1200/800?random=${index}` // Ensure unique images
    }));
  } catch (error) {
    console.error("Error generating articles:", error);
    // Provide fallback data on API error to ensure the UI still renders
    return [
        { id: '1', headline: 'API Error: Could Not Load Content', summary: 'There was an issue fetching the latest news. Please check your API key or network connection.', body: 'The full content of the article could not be loaded due to a backend error. Please try again later.', category: 'System', author: 'Admin', publishedAt: 'Just now', imageUrl: 'https://picsum.photos/1200/800?random=1' },
        { id: '2', headline: 'Markets Rally on Economic Optimism', summary: 'Global stock markets saw a significant surge today as new economic data pointed towards a stronger-than-expected recovery.', body: 'This is the full article body for the market rally.\n\nIt would typically contain several paragraphs detailing the economic data, quotes from analysts, and the performance of major indices around the world. The positive sentiment is driven by lower inflation numbers and strong corporate earnings reports.', category: 'Business', author: 'John Doe', publishedAt: '1 hour ago', imageUrl: 'https://picsum.photos/1200/800?random=2' },
        { id: '3', headline: 'Breakthrough in AI-Powered Drug Discovery', summary: 'Researchers have announced a major breakthrough using artificial intelligence to accelerate the discovery of new life-saving drugs.', body: 'The full article on the AI breakthrough would be here.\n\nIt would explain the new AI model, how it differs from previous methods, and what its potential implications are for medicine. It might also include interviews with the research team and other experts in the field.', category: 'Technology', author: 'Jane Smith', publishedAt: '3 hours ago', imageUrl: 'https://picsum.photos/1200/800?random=3' },
    ];
  }
}