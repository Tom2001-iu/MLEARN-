import React, { useState, useEffect } from 'react';
import { Article } from './types';
import { generateArticles } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import MainArticle from './components/MainArticle';
import ArticleGrid from './components/ArticleGrid';
import SectionHeader from './components/SectionHeader';
import ArticleDetail from './components/ArticleDetail';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';


const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
);

const NoResults: React.FC = () => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-bold text-gray-800">No Articles Found</h2>
        <p className="text-gray-600 mt-2">Try adjusting your search terms.</p>
    </div>
);

const AppContent: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            const generatedArticles = await generateArticles();
            setArticles(generatedArticles);
            setLoading(false);
        };
        fetchArticles();
    }, []);
    
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const match = hash.match(/^#\/article\/(.+)$/);
            if (match) {
                setSelectedArticleId(match[1]);
                window.scrollTo(0, 0); // Scroll to top on article change
            } else {
                setSelectedArticleId(null);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Check hash on initial load

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredArticles(articles);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const results = articles.filter(article =>
                article.headline.toLowerCase().includes(lowercasedQuery) ||
                article.summary.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredArticles(results);
        }
    }, [searchQuery, articles]);


    if (loading) {
        return <LoadingSpinner />;
    }
    
    const renderHomePage = () => {
        const mainArticle = filteredArticles[0];
        const otherArticles = filteredArticles.slice(1);

        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredArticles.length > 0 ? (
                    <>
                        {mainArticle && !searchQuery && <MainArticle article={mainArticle} />}
                        <div className="mt-12">
                          <SectionHeader title={searchQuery ? `Results for "${searchQuery}"` : "Latest Updates"} />
                          {searchQuery && mainArticle && otherArticles.length === 0 && <ArticleGrid articles={[mainArticle]} />}
                          {otherArticles.length > 0 && <ArticleGrid articles={otherArticles} />}
                          {!searchQuery && otherArticles.length === 0 && mainArticle && <ArticleGrid articles={[]} /> }
                        </div>
                    </>
                ) : (
                    <div className="mt-12">
                        <SectionHeader title={searchQuery ? `Results for "${searchQuery}"` : "Latest Updates"} />
                        <NoResults />
                    </div>
                )}
            </div>
        );
    }
    
    const renderDetailPage = () => {
        const article = articles.find(a => a.id === selectedArticleId);
        if (!article) {
             return (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-serif font-bold text-gray-800">Article not found</h2>
                    <p className="text-gray-600 mt-2">The article you are looking for does not exist.</p>
                    <a href="/#/" className="text-blue-600 hover:underline mt-4 inline-block">Go back home</a>
                </div>
            )
        }
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <ArticleDetail article={article} articles={articles} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <main className="flex-grow">
                {selectedArticleId ? renderDetailPage() : renderHomePage()}
            </main>
            <Footer />
            <AuthModal />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};


export default App;