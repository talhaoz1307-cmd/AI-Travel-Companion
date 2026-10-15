import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import TravelPlannerWizard from './components/TravelPlannerWizard';
import TripDetailsPage from './components/TripDetailsPage';

// Initial curated trips
const INITIAL_TRIPS = [
  {
    id: 'trip-1',
    destination: 'Kyoto & Arashiyama',
    country: 'Japan',
    tag: 'Zen Heritage',
    status: 'Ongoing',
    dates: 'Nov 12 - Nov 18, 2026',
    duration: '7 Days',
    weather: '19°C Mild Autumn Foliage',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    summary: 'Early dawn bamboo forest walk, private matcha tea ceremony, Fushimi Inari torii gates & Gion geisha district.',
    aiHighlights: ['Crowd-avoidance morning routes', 'Shinkansen bullet train booked', 'Traditional Ryokan stay'],
    packingProgress: 75,
    currentDay: 'Day 1 of 7'
  },
  {
    id: 'trip-2',
    destination: 'Amalfi Coast & Positano',
    country: 'Italy',
    tag: 'Coastal Haven',
    status: 'Upcoming',
    dates: 'Oct 14 - Oct 21, 2026',
    duration: '7 Days',
    weather: '24°C Sunny',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    summary: 'Cliffside lemon groves, private boat to Capri, curated seafood trattorias & sunset viewpoint walk.',
    aiHighlights: ['Path of the Gods hike', 'Fjord of Furore cove', 'Sunset dinner reserved'],
    packingProgress: 100,
    daysUntil: 'Starts in 12 days'
  },
  {
    id: 'trip-3',
    destination: 'Zermatt & Matterhorn',
    country: 'Switzerland',
    tag: 'Alpine Majesty',
    status: 'Upcoming',
    dates: 'Dec 18 - Dec 26, 2026',
    duration: '9 Days',
    weather: '-3°C Fresh Powder',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80',
    summary: 'Glacier Express scenic rail journey, Gornergrat peak sunrise, fondue alpine chalets & car-free village exploration.',
    aiHighlights: ['Ski pass auto-synced', 'Heated panorama rail seats', 'Matterhorn sunrise alert'],
    packingProgress: 30,
    daysUntil: 'Starts in 64 days'
  },
  {
    id: 'trip-4',
    destination: 'Reykjavik & Golden Circle',
    country: 'Iceland',
    tag: 'Aurora & Volcanos',
    status: 'Past',
    dates: 'Feb 10 - Feb 16, 2026',
    duration: '6 Days',
    weather: '1°C Snow Showers',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    summary: 'Blue Lagoon geothermal soak, Northern Lights photography safari, Gullfoss waterfall & black sand beach.',
    aiHighlights: ['94% Aurora sighting achieved', 'Ice cave guided tour', '4x4 glacier crossing'],
    packingProgress: 100,
    rating: '★ 5.0 Memory'
  }
];

function App() {
  // Shared trips list
  const [trips, setTrips] = useState(INITIAL_TRIPS);

  // Default to 'details' to prioritize showcasing the new comprehensive Trip Details & AI Result page
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#dashboard') return 'dashboard';
      if (window.location.hash === '#wizard') return 'wizard';
      if (window.location.hash === '#login') return 'login';
      if (window.location.hash === '#register') return 'register';
    }
    return 'details';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login') {
        setCurrentView('login');
      } else if (hash === '#register') {
        setCurrentView('register');
      } else if (hash === '#dashboard') {
        setCurrentView('dashboard');
      } else if (hash === '#wizard' || hash === '#planner') {
        setCurrentView('wizard');
      } else if (hash === '#details' || hash === '#itinerary') {
        setCurrentView('details');
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

  const navigateToDashboard = () => {
    window.location.hash = 'dashboard';
    setCurrentView('dashboard');
  };

  const navigateToWizard = () => {
    window.location.hash = 'wizard';
    setCurrentView('wizard');
  };

  const navigateToDetails = () => {
    window.location.hash = 'details';
    setCurrentView('details');
  };

  // Callback when AI Itinerary generation in the Wizard completes
  const handleWizardComplete = (newPlan) => {
    let sampleImg = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80';
    if (newPlan.destination.toLowerCase().includes('amalfi') || newPlan.destination.toLowerCase().includes('italy')) {
      sampleImg = 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80';
    } else if (newPlan.destination.toLowerCase().includes('santorini') || newPlan.destination.toLowerCase().includes('greece')) {
      sampleImg = 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80';
    } else if (newPlan.destination.toLowerCase().includes('bali') || newPlan.destination.toLowerCase().includes('indonesia')) {
      sampleImg = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80';
    }

    const createdTrip = {
      id: `trip-${Date.now()}`,
      destination: newPlan.destination,
      country: newPlan.destination.includes(',') ? newPlan.destination.split(',')[1].trim() : 'Bespoke Route',
      tag: `${newPlan.budget.toUpperCase()} Comfort`,
      status: 'Upcoming',
      dates: newPlan.dates,
      duration: newPlan.duration,
      weather: '22°C Clear Skies',
      image: sampleImg,
      summary: `Custom ${newPlan.budget} itinerary for ${newPlan.adults} Adults${newPlan.childrenCount > 0 ? ` & ${newPlan.childrenCount} Children` : ''}. Curated focus: ${newPlan.interests.slice(0, 3).join(', ')}.`,
      aiHighlights: ['Autonomous weather sync', 'Curated culinary reservations', 'Smart transit cards ready'],
      packingProgress: 20,
      daysUntil: 'Starts soon'
    };

    setTrips([createdTrip, ...trips]);
    navigateToDetails();
  };

  // Update document title dynamically based on active page
  useEffect(() => {
    if (currentView === 'details') {
      document.title = 'AI Travel Companion — Kyoto AI Trip Itinerary & Details';
    } else if (currentView === 'wizard') {
      document.title = 'AI Travel Companion — AI Itinerary Wizard';
    } else if (currentView === 'dashboard') {
      document.title = 'AI Travel Companion — Explorer Dashboard';
    } else if (currentView === 'register') {
      document.title = 'AI Travel Companion — Create Your Account';
    } else {
      document.title = 'AI Travel Companion — Sign In';
    }
  }, [currentView]);

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans relative">
      {/* Floating View Switcher Pill for Seamless Testing Across All Pages */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center p-1 rounded-full bg-slate-900/95 text-white backdrop-blur-md shadow-2xl border border-slate-700/70 text-xs max-w-[95vw] overflow-x-auto">
        <button
          type="button"
          onClick={navigateToDetails}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
            currentView === 'details'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Trip Details
        </button>
        <button
          type="button"
          onClick={navigateToWizard}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
            currentView === 'wizard'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          AI Wizard
        </button>
        <button
          type="button"
          onClick={navigateToDashboard}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
            currentView === 'dashboard'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>
        <button
          type="button"
          onClick={navigateToRegister}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
            currentView === 'register'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={navigateToLogin}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
            currentView === 'login'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Login
        </button>
      </div>

      {currentView === 'details' && (
        <TripDetailsPage
          onNavigateToDashboard={navigateToDashboard}
        />
      )}

      {currentView === 'wizard' && (
        <TravelPlannerWizard
          onComplete={handleWizardComplete}
          onClose={navigateToDashboard}
          onNavigateToDashboard={navigateToDashboard}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard
          onNavigateToLogin={navigateToLogin}
          onNavigateToRegister={navigateToRegister}
          onOpenWizard={navigateToWizard}
          onNavigateToDetails={navigateToDetails}
          trips={trips}
          setTrips={setTrips}
        />
      )}

      {currentView === 'register' && (
        <RegisterPage 
          onNavigateToLogin={navigateToLogin}
          onNavigateToDashboard={navigateToDashboard}
        />
      )}

      {currentView === 'login' && (
        <LoginPage 
          onNavigateToRegister={navigateToRegister}
          onNavigateToDashboard={navigateToDashboard}
        />
      )}
    </div>
  );
}

export default App;
