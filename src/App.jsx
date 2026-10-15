import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  // Support initial route via URL hash or default to 'register' to prioritize user request
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#login') {
      return 'login';
    }
    return 'register';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#login') {
        setCurrentView('login');
      } else {
        setCurrentView('register');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToLogin = () => {
    window.location.hash = 'login';
    setCurrentView('login');
  };

  const navigateToRegister = () => {
    window.location.hash = 'register';
    setCurrentView('register');
  };

  // Update document title dynamically based on active page
  useEffect(() => {
    document.title = currentView === 'register' 
      ? 'AI Travel Companion — Create Your Account'
      : 'AI Travel Companion — Sign In';
  }, [currentView]);

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans relative">
      {/* View Switcher Floating Badge for Seamless Reviewing */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center p-1 rounded-full bg-slate-900/90 text-white backdrop-blur-md shadow-xl border border-slate-700/60 text-xs">
        <button
          type="button"
          onClick={navigateToRegister}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentView === 'register'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Register Page
        </button>
        <button
          type="button"
          onClick={navigateToLogin}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentView === 'login'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Login Page
        </button>
      </div>

      {currentView === 'register' ? (
        <RegisterPage onNavigateToLogin={navigateToLogin} />
      ) : (
        <LoginPage onNavigateToRegister={navigateToRegister} />
      )}
    </div>
  );
}

export default App;
