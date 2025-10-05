import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Dummy password field for UI realism

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
        alert('Username cannot be empty.');
        return;
    }
    if (isLoginView) {
      login(username);
    } else {
      if(signup(username)) {
        // Successfully signed up
      }
    }
    setUsername('');
    setPassword('');
  };

  if (!isAuthModalOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={closeAuthModal}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            aria-label="Close authentication modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setIsLoginView(true)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${isLoginView ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLoginView(false)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${!isLoginView ? 'border-black text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Sign Up
            </button>
          </nav>
        </div>

        <h2 className="text-2xl font-bold font-serif mb-6 text-center">{isLoginView ? 'Welcome Back' : 'Create an Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Note: For demonstration purposes, any password is accepted.</p>
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            {isLoginView ? 'Log In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
