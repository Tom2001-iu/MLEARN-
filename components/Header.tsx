import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';
import MobileSidebar from './MobileSidebar';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout, openAuthModal } = useAuth();
  const categories = ['World', 'Business', 'Markets', 'Technology', 'Lifestyle'];

  return (
    <>
      <header className="bg-black text-white font-sans sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 border-b border-gray-800">
            <div className="flex-shrink-0">
              <a href="/#/" aria-label="WORD'S Homepage">
                  <h1 className="text-3xl font-bold font-serif tracking-wider">WORD'S</h1>
              </a>
            </div>
            <div className="hidden md:flex items-center justify-end flex-1">
              <nav 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  Categories
                  <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 py-1 z-10">
                    {categories.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </nav>
              <div className="ml-6 w-full max-w-xs">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <div className="ml-6 flex items-center space-x-2">
                {currentUser ? (
                  <>
                    <span className="text-gray-300 text-sm">Welcome, {currentUser.username}</span>
                    <button 
                      onClick={logout}
                      className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={openAuthModal} className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                      Log In
                    </button>
                    <button onClick={openAuthModal} className="bg-white text-black font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden">
              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Open main menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default Header;
