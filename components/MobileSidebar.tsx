import React from 'react';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const categories = ['World', 'Business', 'Markets', 'Technology', 'Lifestyle'];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose, searchQuery, setSearchQuery }) => {
  const { currentUser, logout, openAuthModal } = useAuth();

  const handleAuthClick = () => {
    openAuthModal();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-black text-white p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out font-sans ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 id="mobile-menu-title" className="text-2xl font-bold font-serif">Menu</h2>
          <button onClick={onClose} className="p-2" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={(q) => {
                setSearchQuery(q);
                if(q) onClose();
            }} />
        </div>

        <nav className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-400 uppercase tracking-wider">Categories</h3>
          <ul className="space-y-3">
            {categories.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  onClick={onClose}
                  className="block py-2 text-gray-300 hover:text-white transition-colors text-lg"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-gray-700 pt-6 space-y-4">
          {currentUser ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-gray-300">
                    {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300 font-semibold">Welcome, {currentUser.username}</span>
              </div>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 text-lg"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button onClick={handleAuthClick} className="w-full text-left text-gray-300 hover:text-white transition-colors py-2 text-lg">
                Log In
              </button>
              <button onClick={handleAuthClick} className="w-full bg-white text-black font-bold py-3 px-4 rounded-md text-sm hover:bg-gray-200 transition-colors text-center">
                Sign Up
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
