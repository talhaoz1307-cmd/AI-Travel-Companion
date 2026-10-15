import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Search,
  X,
  Plus,
  Minus,
  UtensilsCrossed,
  Landmark,
  Trees,
  Moon,
  Mountain,
  ShoppingBag,
  Heart,
  Crown,
  Coins,
  Scale,
  CloudSun,
  Clock,
  Luggage,
  ShieldCheck,
  Plane,
  ChevronRight,
  Flame,
  Coffee,
  Camera
} from 'lucide-react';

// Mock destinations autocomplete data
const AUTOCOMPLETE_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Kyoto, Japan',
    region: 'East Asia',
    tag: 'Zen Temples & Bamboo Groves',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    weather: '19°C Pleasant',
    popularSeason: 'Autumn Foliage'
  },
  {
    id: 'dest-2',
    name: 'Amalfi Coast, Italy',
    region: 'Southern Europe',
    tag: 'Cliffside Lemon Groves & Azure Sea',
    flag: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    weather: '24°C Sunny',
    popularSeason: 'Spring - Summer'
  },
  {
    id: 'dest-3',
    name: 'Zermatt & Matterhorn, Switzerland',
    region: 'Central Europe',
    tag: 'Glacier Express & Alpine Peaks',
    flag: '🇨🇭',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
    weather: '12°C Crisp',
    popularSeason: 'Year-Round Ski & Hike'
  },
  {
    id: 'dest-4',
    name: 'Reykjavik, Iceland',
    region: 'Northern Europe',
    tag: 'Northern Lights & Geothermal Lagoons',
    flag: '🇮🇸',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    weather: '2°C Crisp Winter',
    popularSeason: 'Aurora Season (Oct-Mar)'
  },
  {
    id: 'dest-5',
    name: 'Bali & Ubud, Indonesia',
    region: 'Southeast Asia',
    tag: 'Lush Terraces & Spiritual Wellness',
    flag: '🇮🇩',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    weather: '28°C Tropical',
    popularSeason: 'Dry Season'
  },
  {
    id: 'dest-6',
    name: 'Santorini, Greece',
    region: 'Southern Europe',
    tag: 'Whitewashed Caldera & Sunsets',
    flag: '🇬🇷',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    weather: '25°C Warm Sea Breeze',
    popularSeason: 'May - October'
  },
  {
    id: 'dest-7',
    name: 'Paris, France',
    region: 'Western Europe',
    tag: 'Art, High Gastronomy & Romance',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    weather: '18°C Mild',
    popularSeason: 'Spring in Paris'
  }
];

// Budget options
const BUDGET_OPTIONS = [
  {
    id: 'economic',
    name: 'Economic',
    tier: 'Smart Backpacker',
    priceGuide: '$50 - $110 / day',
    icon: Coins,
    description: 'Charming boutique hostels, authenticated local street bistros, scenic walking paths, and metro passes.',
    highlights: ['Comfortable boutique hostels', 'Authentic local bistros & markets', 'Public transit & rail cards'],
    accentColor: 'from-blue-500 to-teal-500',
    borderColor: 'border-blue-200'
  },
  {
    id: 'balanced',
    name: 'Balanced',
    tier: 'Smart Comfort',
    priceGuide: '$160 - $290 / day',
    isPopular: true,
    icon: Scale,
    description: 'Selected 4-star boutique hotels, handpicked authentic trattorias, skip-the-line museum tickets, and comfortable transit.',
    highlights: ['4★ central boutique hotels', 'Curated dining reservations', 'Skip-the-line monument entries'],
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300'
  },
  {
    id: 'luxury',
    name: 'Luxury',
    tier: 'VIP Concierge',
    priceGuide: '$450+ / day',
    icon: Crown,
    description: '5-star luxury cliffside villas, private chauffeur transfers, Michelin-starred gastronomic experiences, and private boat charters.',
    highlights: ['5★ luxury resorts & suites', 'Michelin-starred dining seats', 'Private chauffeurs & yacht access'],
    accentColor: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-200'
  }
];

// Interest tags
const INTEREST_TAGS = [
  {
    id: 'gastronomy',
    name: 'Gastronomy',
    desc: 'Local wines, street markets & chef tables',
    icon: UtensilsCrossed,
    color: 'emerald'
  },
  {
    id: 'history',
    name: 'History & Culture',
    desc: 'Ancient ruins, castles & art museums',
    icon: Landmark,
    color: 'amber'
  },
  {
    id: 'nature',
    name: 'Nature & Scenery',
    desc: 'National parks, lakes & scenic viewpoints',
    icon: Trees,
    color: 'emerald'
  },
  {
    id: 'nightlife',
    name: 'Nightlife & Social',
    desc: 'Rooftops, live jazz & vibrant night bazaars',
    icon: Moon,
    color: 'indigo'
  },
  {
    id: 'adventure',
    name: 'Adventure & Sports',
    desc: 'Hiking, water sports & glacier trails',
    icon: Mountain,
    color: 'teal'
  },
  {
    id: 'shopping',
    name: 'Shopping & Artisans',
    desc: 'Local craft bazaars & luxury boutiques',
    icon: ShoppingBag,
    color: 'rose'
  },
  {
    id: 'wellness',
    name: 'Wellness & Relaxation',
    desc: 'Thermal hot springs, spas & beach lounging',
    icon: Coffee,
    color: 'cyan'
  },
  {
    id: 'photography',
    name: 'Photography Spots',
    desc: 'Iconic vantage points, sunrise & drone spots',
    icon: Camera,
    color: 'purple'
  }
];

// Slide animation variants for Framer Motion
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.98
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

// Animated messages during itinerary creation
const GENERATION_MESSAGES = [
  'Analyzing seasonal climate & sunrise timings...',
  'Scouting handpicked scenic viewpoints & hidden trails...',
  'Curating authentic gastronomic stops & trattorias...',
  'Optimizing budget allocations & rail connections...',
  'Consulting 24/7 autonomous travel concierge...',
  'Finalizing your bespoke itinerary pass!'
];

export default function TravelPlannerWizard({ onComplete, onClose, onNavigateToDashboard }) {
  // Stepper state: 1: Destination & Dates, 2: Budget, 3: Travelers, 4: Interests, 5: Summary
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  // Form states
  const [destination, setDestination] = useState('');
  const [selectedDestinationObj, setSelectedDestinationObj] = useState(null);
  const [destinationSearch, setDestinationSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Date range states
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-17');
  const [datePreset, setDatePreset] = useState('7-days');

  // Step 2: Budget state
  const [selectedBudget, setSelectedBudget] = useState('balanced');

  // Step 3: Traveler counters
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Step 4: Interests multi-select
  const [selectedInterests, setSelectedInterests] = useState(['gastronomy', 'nature', 'history']);

  // Loading generation screen states
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGeneratedComplete, setIsGeneratedComplete] = useState(false);

  // Calculate duration in days
  const tripDurationDays = Math.max(
    1,
    Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
    )
  );

  // Filter autocomplete destinations
  const filteredDestinations = AUTOCOMPLETE_DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(destinationSearch.toLowerCase()) ||
    d.tag.toLowerCase().includes(destinationSearch.toLowerCase()) ||
    d.region.toLowerCase().includes(destinationSearch.toLowerCase())
  );

  // Handle destination select
  const handleSelectDestination = (dest) => {
    setDestination(dest.name);
    setSelectedDestinationObj(dest);
    setDestinationSearch(dest.name);
    setIsSearchOpen(false);
  };

  // Toggle interest
  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Stepper navigation helpers
  const goToNextStep = () => {
    if (currentStep < 5) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Generate Plan Handler
  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setCurrentMessageIndex(0);
    setGenerationProgress(10);

    // Cycle through messages with timer
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % GENERATION_MESSAGES.length);
    }, 900);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 15;
      });
    }, 450);

    // Complete generation after 4.2 seconds
    setTimeout(() => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setIsGenerating(false);
      setIsGeneratedComplete(true);
    }, 4200);
  };

  // Handle Preset Dates click
  const handleApplyPreset = (type) => {
    setDatePreset(type);
    const start = new Date('2026-11-10');
    let days = 7;
    if (type === 'weekend') days = 3;
    if (type === '10-days') days = 10;
    if (type === '2-weeks') days = 14;

    const end = new Date(start);
    end.setDate(end.getDate() + days);

    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const stepsList = [
    { num: 1, title: 'Destination', sub: 'Location & Dates' },
    { num: 2, title: 'Budget', sub: 'Travel Style' },
    { num: 3, title: 'Travelers', sub: 'Party Size' },
    { num: 4, title: 'Interests', sub: 'Curated Focus' },
    { num: 5, title: 'Summary', sub: 'Review & Plan' }
  ];

  return (
    <div className="min-h-screen bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 text-slate-900 font-sans relative selection:bg-emerald-500 selection:text-white">
      {/* Background Decorative Ambient Glowing Elements */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col relative z-10 transition-all duration-300">
        
        {/* ============================================================ */}
        {/* WIZARD HEADER & STEP PROGRESS BAR                            */}
        {/* ============================================================ */}
        <header className="px-6 sm:px-10 pt-7 pb-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
          <div className="flex items-center justify-between pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Compass className="w-5 h-5 text-white animate-spin-slow" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                  AI Travel Planner
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Wizard
                  </span>
                </span>
                <p className="text-xs text-slate-500 font-medium">Bespoke Autonomous Itinerary Engine</p>
              </div>
            </div>

            {/* Close / Return button */}
            <button
              type="button"
              onClick={onClose || onNavigateToDashboard}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Close and return to Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="relative">
            {/* Background Track Line */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-slate-200 rounded-full -z-0" />

            {/* Active Fill Line */}
            <motion.div
              className="absolute top-4 left-6 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full -z-0"
              initial={false}
              animate={{
                width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* Stepper Nodes */}
            <div className="relative z-10 flex items-center justify-between">
              {stepsList.map((step) => {
                const isCompleted = step.num < currentStep;
                const isActive = step.num === currentStep;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => {
                      if (step.num < currentStep) {
                        setDirection(-1);
                        setCurrentStep(step.num);
                      }
                    }}
                    className="flex flex-col items-center group focus:outline-none"
                    disabled={step.num > currentStep}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                        isCompleted
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isActive
                            ? 'bg-slate-900 text-white ring-4 ring-emerald-500/25 scale-110'
                            : 'bg-white text-slate-400 border border-slate-300'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                    </div>
                    <span
                      className={`mt-2 text-[11px] font-semibold hidden sm:block ${
                        isActive
                          ? 'text-slate-900 font-bold'
                          : isCompleted
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* STEPPER BODY WITH FRAMER MOTION TRANSITIONS                  */}
        {/* ============================================================ */}
        <div className="px-6 sm:px-10 py-8 min-h-[460px] flex flex-col justify-between overflow-x-hidden">
          <AnimatePresence custom={direction} mode="wait">
            {/* ============================================================ */}
            {/* STEP 1: DESTINATION & DATE RANGE PICKER                      */}
            {/* ============================================================ */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step 1: Where & When</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Where is your soul traveling next?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Search any destination in the world. Our AI fetches seasonal climate, local events, and travel permits.
                  </p>
                </div>

                {/* Destination Autocomplete Input */}
                <div className="space-y-2 relative">
                  <label className="block text-xs font-bold text-slate-700">
                    Search Destination or City <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={destinationSearch}
                      onChange={(e) => {
                        setDestinationSearch(e.target.value);
                        setDestination(e.target.value);
                        setIsSearchOpen(true);
                      }}
                      onFocus={() => setIsSearchOpen(true)}
                      placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy..."
                      className="w-full pl-10 pr-10 py-3.5 text-sm bg-slate-50/70 rounded-2xl border border-slate-200 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium transition-all"
                    />
                    {destinationSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setDestinationSearch('');
                          setDestination('');
                          setSelectedDestinationObj(null);
                        }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Autocomplete Dropdown List */}
                  {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                      <div className="p-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
                        <span>Suggested Destinations</span>
                        <span>Click to pick</span>
                      </div>
                      {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest) => (
                          <div
                            key={dest.id}
                            onClick={() => handleSelectDestination(dest)}
                            className="p-3 hover:bg-emerald-50/60 cursor-pointer transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={dest.image}
                                alt={dest.name}
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                              <div>
                                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{dest.flag}</span>
                                  <span>{dest.name}</span>
                                </p>
                                <p className="text-[11px] text-slate-500">{dest.tag}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                              {dest.weather}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-500">
                          Custom destination: "<span className="font-semibold text-slate-800">{destinationSearch}</span>" will be processed by AI.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Popular Inspiration Quick Pick Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Quick Inspirations:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {AUTOCOMPLETE_DESTINATIONS.slice(0, 4).map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => handleSelectDestination(d)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                          destination === d.name
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40'
                        }`}
                      >
                        <span>{d.flag}</span>
                        <span>{d.name.split(',')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range Picker Section */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Select Travel Date Window</span>
                    </label>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                      Duration: {tripDurationDays} Days • {tripDurationDays - 1} Nights
                    </span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'weekend', label: 'Long Weekend (3 Days)' },
                      { key: '7-days', label: '1 Week Escape (7 Days)' },
                      { key: '10-days', label: 'Grand Tour (10 Days)' }
                    ].map((preset) => (
                      <button
                        key={preset.key}
                        type="button"
                        onClick={() => handleApplyPreset(preset.key)}
                        className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                          datePreset === preset.key
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Date Input Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 mb-1">Departure Date</span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setDatePreset('custom');
                        }}
                        className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-500 mb-1">Return Date</span>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setDatePreset('custom');
                        }}
                        className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 2: BUDGET SELECTION (THREE SELECTABLE CARDS)            */}
            {/* ============================================================ */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                    <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step 2: Budget & Spending Profile</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Choose your desired comfort & budget style
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Our AI dynamically balances hotel tiering, culinary reservations, and transportation passes to fit your budget.
                  </p>
                </div>

                {/* Three Selectable Budget Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BUDGET_OPTIONS.map((budget) => {
                    const isSelected = selectedBudget === budget.id;
                    const IconComponent = budget.icon;

                    return (
                      <div
                        key={budget.id}
                        onClick={() => setSelectedBudget(budget.id)}
                        className={`relative rounded-3xl p-5 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-b from-emerald-50/90 to-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-4 ring-emerald-500/10 -translate-y-1'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {/* Most Popular Badge */}
                        {budget.isPopular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                            ✨ Most Popular
                          </div>
                        )}

                        <div className="space-y-3">
                          {/* Card Header */}
                          <div className="flex items-center justify-between">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${budget.accentColor} shadow-md`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                isSelected
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-slate-900">{budget.name}</h3>
                            <p className="text-[11px] font-semibold text-emerald-700">{budget.tier}</p>
                          </div>

                          <div className="py-1">
                            <span className="text-lg font-black text-slate-900">{budget.priceGuide}</span>
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed">
                            {budget.description}
                          </p>
                        </div>

                        {/* Bullet Highlights */}
                        <div className="pt-4 border-t border-slate-100 mt-4 space-y-1.5">
                          {budget.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 3: TRAVELER DETAILS (COUNTERS)                          */}
            {/* ============================================================ */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step 3: Who is Traveling?</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Who will be joining this adventure?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Party size helps our AI calculate room configurations, vehicle rentals, and family-friendly activity paces.
                  </p>
                </div>

                {/* Counters Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Adults Counter */}
                  <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-base font-bold text-slate-900">Adults</h4>
                      </div>
                      <p className="text-xs text-slate-500">Ages 13 and above</p>
                      <span className="text-[11px] font-semibold text-emerald-700">Full itinerary pacing</span>
                    </div>

                    <div className="flex items-center space-x-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                        disabled={adults <= 1}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-black text-slate-900 w-6 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
                        disabled={adults >= 10}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/90 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <h4 className="text-base font-bold text-slate-900">Children</h4>
                      </div>
                      <p className="text-xs text-slate-500">Ages 0 to 12</p>
                      <span className="text-[11px] font-semibold text-teal-700">Kid-friendly attractions</span>
                    </div>

                    <div className="flex items-center space-x-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                      <button
                        type="button"
                        onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                        disabled={childrenCount <= 0}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-black text-slate-900 w-6 text-center">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount((prev) => Math.min(8, prev + 1))}
                        disabled={childrenCount >= 8}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dynamic Party Summary Pill */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Luggage className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      Party Configuration:{' '}
                      <span className="text-emerald-800">
                        {adults === 1 && childrenCount === 0 && 'Solo Explorer'}
                        {adults === 2 && childrenCount === 0 && 'Couple / Duo Getaway'}
                        {adults > 2 && childrenCount === 0 && `Group Tour (${adults} Adults)`}
                        {childrenCount > 0 && `Family Vacation (${adults} Adults, ${childrenCount} ${childrenCount === 1 ? 'Child' : 'Children'})`}
                      </span>
                    </h5>
                    <p className="text-[11px] text-slate-600">
                      {childrenCount > 0
                        ? 'AI will automatically factor in stroller-friendly walking routes and child entrance discounts.'
                        : 'AI will prioritize evening culinary reservations and scenic sunset cocktail viewpoints.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 4: INTEREST TAGS MULTI-SELECT GRID                      */}
            {/* ============================================================ */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Step 4: Tailor Your Interests</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      What experiences excite you the most?
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Select as many as you like. Our algorithm weights daily itinerary pacing based on your choices.
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    {selectedInterests.length} Selected
                  </span>
                </div>

                {/* Multi-select Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {INTEREST_TAGS.map((interest) => {
                    const isSelected = selectedInterests.includes(interest.id);
                    const IconComponent = interest.icon;

                    return (
                      <div
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-50/90 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-500/10 -translate-y-0.5'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>

                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{interest.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                            {interest.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ============================================================ */}
            {/* STEP 5: FINAL SUMMARY SCREEN BEFORE GENERATE PLAN            */}
            {/* ============================================================ */}
            {currentStep === 5 && (
              <motion.div
                key="step-5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step 5: Master Itinerary Blueprint</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Review your bespoke journey profile
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Everything is ready for generation. Click below to launch autonomous multi-agent synthesis.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200/80">
                    {/* Destination & Dates */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Destination & Route
                      </span>
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span>{destination || 'Kyoto, Japan'}</span>
                      </h4>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {startDate} to {endDate} ({tripDurationDays} Days)
                        </span>
                      </p>
                    </div>

                    {/* Budget & Party */}
                    <div className="space-y-1 sm:text-right">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Spending Profile & Party
                      </span>
                      <p className="text-base font-bold text-emerald-800 uppercase tracking-tight">
                        {BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.tier} ({BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.name})
                      </p>
                      <p className="text-xs text-slate-600">
                        {adults} {adults === 1 ? 'Adult' : 'Adults'}
                        {childrenCount > 0 && `, ${childrenCount} Children`}
                      </p>
                    </div>
                  </div>

                  {/* Selected Interests Breakdown */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Target Focus & Curated Themes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interestId) => {
                        const interestObj = INTEREST_TAGS.find((i) => i.id === interestId);
                        if (!interestObj) return null;
                        const Icon = interestObj.icon;
                        return (
                          <span
                            key={interestId}
                            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                          >
                            <Icon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{interestObj.name}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Concierge Assurance Note */}
                  <div className="p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-950">
                    <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>
                      Autonomous agents will verify weather, skip-the-line museum tickets, and reservations for your dates.
                    </span>
                  </div>
                </div>

                {/* THE "GENERATE PLAN" BUTTON */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGeneratePlan}
                    className="w-full py-4 px-6 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 hover:from-white hover:to-emerald-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <Sparkles className="w-5 h-5 text-slate-900 group-hover:rotate-12 transition-transform" />
                    <span>Generate AI Travel Plan</span>
                    <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============================================================ */}
          {/* STEPPER FOOTER BUTTONS (BACK & NEXT)                         */}
          {/* ============================================================ */}
          {currentStep < 5 && (
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={goToPrevStep}
                disabled={currentStep === 1}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={goToNextStep}
                disabled={currentStep === 1 && !destination.trim()}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* ANIMATED LOADING SCREEN MODAL (TRIGGERED ON GENERATE PLAN)   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden space-y-6">
              {/* Background ambient pulse */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />

              {/* Central Rotating Hologram Compass */}
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 border-t-emerald-400 animate-spin" />
                <div className="absolute inset-2 rounded-full border border-teal-400/20 border-b-teal-400 animate-spin-reverse" />
                <div className="w-full h-full rounded-full bg-emerald-950/80 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Compass className="w-10 h-10 animate-pulse text-emerald-400" />
                </div>
              </div>

              {/* Progress Title & Destination */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white tracking-tight">
                  Synthesizing Master Itinerary
                </h3>
                <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{destination || 'Kyoto, Japan'}</span>
                  <span>• {tripDurationDays} Days</span>
                </p>
              </div>

              {/* FADING IN & OUT DYNAMIC MESSAGES */}
              <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessageIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm font-medium text-slate-300"
                  >
                    ✨ {GENERATION_MESSAGES[currentMessageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 rounded-full"
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-1">
                  <span>AI Agents Collaborating</span>
                  <span>{generationProgress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* FINAL CELEBRATORY SCREEN AFTER PLAN GENERATION               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isGeneratedComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
          >
            <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-emerald-300 space-y-6 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-600 shadow-lg shadow-emerald-500/20 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Passport Issued & Synced</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Your AI Itinerary is Ready!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                  We've curated a {tripDurationDays}-day master plan for <span className="font-bold text-slate-800">{destination || 'Kyoto, Japan'}</span> with optimized daily routes, dietary reservations, and weather forecast sync.
                </p>
              </div>

              {/* Quick Summary Pill Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-900">{destination || 'Kyoto, Japan'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-semibold text-emerald-800">{startDate} — {endDate} ({tripDurationDays} Days)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Budget Tier:</span>
                  <span className="font-bold text-slate-800 uppercase">{selectedBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-semibold text-slate-700">{adults} Adults {childrenCount > 0 && `• ${childrenCount} Children`}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onComplete) onComplete({
                      destination: destination || 'Kyoto, Japan',
                      dates: `${startDate} - ${endDate}`,
                      duration: `${tripDurationDays} Days`,
                      budget: selectedBudget,
                      adults,
                      childrenCount,
                      interests: selectedInterests
                    });
                    if (onNavigateToDashboard) onNavigateToDashboard();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Itinerary on Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsGeneratedComplete(false);
                    setCurrentStep(1);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Plan Another Journey
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
