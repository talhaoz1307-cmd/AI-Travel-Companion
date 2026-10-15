import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  CloudSun,
  Plus,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Navigation,
  Globe2,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Share2,
  Heart,
  Luggage,
  Plane,
  X,
  Map,
  Layers,
  Send,
  Loader2,
  Check,
  Flame,
  Info
} from 'lucide-react';

// Default curated trips for Mehmet
const INITIAL_TRIPS = [
  {
    id: 'trip-1',
    destination: 'Amalfi Coast & Positano',
    country: 'Italy',
    tag: 'Coastal Haven',
    status: 'Ongoing', // Ongoing trip
    dates: 'Oct 14 - Oct 21, 2026',
    duration: '7 Days',
    weather: '24°C Sunny',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
    summary: 'Cliffside lemon groves, private boat to Capri, curated seafood trattorias & sunset viewpoint walk.',
    aiHighlights: ['Path of the Gods hike', 'Fjord of Furore cove', 'Sunset dinner reserved'],
    packingProgress: 100,
    currentDay: 'Day 2 of 7'
  },
  {
    id: 'trip-2',
    destination: 'Kyoto & Arashiyama',
    country: 'Japan',
    tag: 'Zen Heritage',
    status: 'Upcoming', // Upcoming trip
    dates: 'Nov 12 - Nov 19, 2026',
    duration: '8 Days',
    weather: '18°C Autumn Foliage',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
    summary: 'Early dawn bamboo forest walk, private matcha tea ceremony, Fushimi Inari torii gates & Gion geisha district.',
    aiHighlights: ['Crowd-avoidance morning routes', 'Shinkansen bullet train booked', 'Traditional Ryokan stay'],
    packingProgress: 65,
    daysUntil: 'Starts in 28 days'
  },
  {
    id: 'trip-3',
    destination: 'Zermatt & Matterhorn',
    country: 'Switzerland',
    tag: 'Alpine Majesty',
    status: 'Upcoming', // Upcoming trip
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
    status: 'Past', // Past trip
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

export default function Dashboard({
  onNavigateToLogin,
  onNavigateToRegister,
  onOpenWizard,
  onNavigateToDetails,
  trips: externalTrips,
  setTrips: externalSetTrips
}) {
  // State for trips list (supports external or internal state)
  const [internalTrips, setInternalTrips] = useState(INITIAL_TRIPS);
  const trips = externalTrips || internalTrips;
  const setTrips = externalSetTrips || setInternalTrips;
  const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Upcoming' | 'Ongoing' | 'Past'
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState('en');

  // Modal State for "Plan a New Trip"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTripDestination, setNewTripDestination] = useState('');
  const [newTripDates, setNewTripDates] = useState('');
  const [newTripStyle, setNewTripStyle] = useState('Scenic Exploration');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Toast / notification state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Translations
  const content = {
    en: {
      appName: 'AI Travel Companion',
      greetingPrefix: 'Hello, mehmet!',
      greetingQuestion: 'Where are we going next?',
      greetingSubtitle: 'Your autonomous travel concierge has synchronized real-time weather, local advisories, and smart itineraries.',
      planNewTripBtn: 'Plan a New Trip',
      planNewTripSub: 'Instant AI itinerary generation',
      filterAll: 'All Trips',
      filterUpcoming: 'Upcoming',
      filterOngoing: 'Ongoing',
      filterPast: 'Past',
      searchPlaceholder: 'Search destinations, countries, or itineraries...',
      activeTripsCount: 'Active Trips',
      countriesVisited: 'Destinations',
      aiAccuracy: 'AI Accuracy',
      viewItinerary: 'View Itinerary',
      smartPacking: 'Smart Packing',
      exploreRoute: 'Explore Route',
      quickPlanTitle: 'AI Trip Generator',
      quickPlanSubtitle: 'Tell us where you want to go. Our agents map logistics, stays, and hidden gems.',
      destinationLabel: 'Destination or City',
      destinationPlaceholder: 'e.g., Santorini, Greece or Bali, Indonesia',
      datesLabel: 'Travel Dates or Duration',
      datesPlaceholder: 'e.g., 5 Days in Spring / May 10 - 15',
      styleLabel: 'Travel Style',
      generateBtn: 'Generate AI Itinerary',
      generatingBtn: 'Consulting AI Concierge...',
      emptyTitle: 'No journeys found',
      emptySubtitle: 'Your travel passport is waiting for its next adventure. Let autonomous AI craft your perfect itinerary in under 30 seconds.',
      emptyCta: 'Plan Your First Trip',
      tryTheseDestinations: 'Popular Inspirations to Try:',
      logout: 'Sign Out',
      toggleDemoEmpty: 'Preview Empty State',
      resetTrips: 'Restore All Trips',
      tripAddedSuccess: 'New AI Itinerary created successfully! Added to your dashboard.'
    },
    tr: {
      appName: 'AI Seyahat Asistanı',
      greetingPrefix: 'Merhaba mehmet!',
      greetingQuestion: 'Sıradaki durağımız neresi?',
      greetingSubtitle: 'Otonom seyahat asistanınız hava durumunu, bölgesel önerileri ve kişisel rotalarınızı senkronize etti.',
      planNewTripBtn: 'Yeni Seyahat Planla',
      planNewTripSub: 'Saniyeler içinde AI ile rota oluştur',
      filterAll: 'Tüm Seyahatler',
      filterUpcoming: 'Yaklaşan',
      filterOngoing: 'Devam Eden',
      filterPast: 'Geçmiş',
      searchPlaceholder: 'Rotalarda, ülkelerde veya şehirlerde ara...',
      activeTripsCount: 'Aktif Rota',
      countriesVisited: 'Keşfedilen',
      aiAccuracy: 'Yapay Zeka İsabeti',
      viewItinerary: 'Rotayı İncele',
      smartPacking: 'Akıllı Bavul',
      exploreRoute: 'Rotayı Keşfet',
      quickPlanTitle: 'Yapay Zeka ile Seyahat Planla',
      quickPlanSubtitle: 'Nereye gitmek istediğinizi yazın; AI bütçeyi, otelleri ve gizli rotaları sizin için oluştursun.',
      destinationLabel: 'Şehir veya Rota',
      destinationPlaceholder: 'örn., Kapadokya, Türkiye veya Bali, Endonezya',
      datesLabel: 'Tarihler veya Süre',
      datesPlaceholder: 'örn., 4 Günlük Kaçamak / 15-20 Mayıs',
      styleLabel: 'Seyahat Stili',
      generateBtn: 'Yapay Zeka Rotası Oluştur',
      generatingBtn: 'Yapay Zeka Planlıyor...',
      emptyTitle: 'Henüz planlanmış seyahat bulunamadı',
      emptySubtitle: 'Seyahat pasaportunuz yeni rotalarınızı bekliyor! Bırakın yapay zeka 30 saniye içinde size özel harika bir plan çıkarsın.',
      emptyCta: 'İlk Seyahatini Planla',
      tryTheseDestinations: 'Popüler Rota Önerileri:',
      logout: 'Çıkış Yap',
      toggleDemoEmpty: 'Boş Durumu İncele',
      resetTrips: 'Tüm Rotaları Sıfırla',
      tripAddedSuccess: 'Yeni seyahat planınız başarıyla oluşturuldu ve panele eklendi!'
    }
  }[lang];

  // Filtered trips computation
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      // Filter by status tag
      const matchesFilter =
        activeFilter === 'All' ? true : trip.status.toLowerCase() === activeFilter.toLowerCase();

      // Filter by search query
      const matchesSearch =
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [trips, activeFilter, searchQuery]);

  // Handle creating a new trip via AI Generator modal
  const handleGenerateTrip = (e) => {
    e.preventDefault();
    if (!newTripDestination.trim()) return;

    setIsGenerating(true);
    setGenerationStep(lang === 'tr' ? 'Bölgesel hava durumu ve harita verileri taranıyor...' : 'Scanning regional weather & topography...');

    setTimeout(() => {
      setGenerationStep(lang === 'tr' ? 'Gizli koylar ve özel restoranlar seçiliyor...' : 'Curating scenic spots & local gastronomy...');
    }, 800);

    setTimeout(() => {
      // Pick an image based on keyword or fallback
      let sampleImage = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80';
      if (newTripDestination.toLowerCase().includes('santorini') || newTripDestination.toLowerCase().includes('greece')) {
        sampleImage = 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80';
      } else if (newTripDestination.toLowerCase().includes('paris') || newTripDestination.toLowerCase().includes('france')) {
        sampleImage = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80';
      }

      const createdTrip = {
        id: `trip-${Date.now()}`,
        destination: newTripDestination.trim(),
        country: newTripDestination.includes(',') ? newTripDestination.split(',')[1].trim() : 'Global Getaway',
        tag: newTripStyle,
        status: 'Upcoming',
        dates: newTripDates.trim() || 'Next Month (Flexible)',
        duration: '5 Days',
        weather: '22°C Mild & Pleasant',
        image: sampleImage,
        summary: `Custom ${newTripStyle.toLowerCase()} itinerary curated with AI: optimized transit times, handpicked local dining, and daily highlight pacing.`,
        aiHighlights: ['Dynamic crowd forecast', 'Smart packing list generated', '24/7 AI Concierge standby'],
        packingProgress: 15,
        daysUntil: 'Starts soon'
      };

      setTrips([createdTrip, ...trips]);
      setIsGenerating(false);
      setIsModalOpen(false);
      setNewTripDestination('');
      setNewTripDates('');
      showToast(content.tripAddedSuccess);
    }, 1800);
  };

  // Quick Inspiration pre-fill helper
  const handleQuickInspire = (destinationName, style) => {
    setNewTripDestination(destinationName);
    setNewTripDates('Spring Season (5 Days)');
    setNewTripStyle(style);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-900 text-white shadow-2xl border border-emerald-500/30 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* TOP NAVIGATION BAR                                           */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                {content.appName}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <p className="text-[11px] text-slate-500 font-medium">Smart Travel Dashboard</p>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on small mobile) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold text-slate-600">
            <span className="px-3 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 font-bold flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'tr' ? 'Rotalarım' : 'My Journeys'}</span>
            </span>
            <button
              onClick={() => showToast(lang === 'tr' ? 'Keşif sekmesi yakında aktif!' : 'Explore Catalog coming soon!')}
              className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-slate-100 transition-colors"
            >
              {lang === 'tr' ? 'Rotaları Keşfet' : 'Discover'}
            </button>
            <button
              onClick={() => showToast(lang === 'tr' ? 'Akıllı bavul listesi hazır!' : 'Packing Assistant synced!')}
              className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-slate-100 transition-colors"
            >
              {lang === 'tr' ? 'Bavul Hazırlığı' : 'Packing'}
            </button>
            <button
              onClick={() => showToast(lang === 'tr' ? 'Yapay zeka asistanı devrede.' : 'AI Concierge is standby.')}
              className="px-3 py-1.5 rounded-lg hover:text-emerald-700 hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'tr' ? 'AI Asistan' : 'AI Concierge'}</span>
            </button>
          </nav>

          {/* Right User & Control Elements */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 bg-slate-50 text-xs transition-colors"
              title="Toggle English / Türkçe"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold uppercase text-[11px]">{lang}</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => showToast(lang === 'tr' ? 'Bildirim: Amalfi Coast tekne turu saati güncellendi (15:00)' : 'Notification: Amalfi boat tour time synced (15:00)')}
              className="relative p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                  M
                </div>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Mehmet Y.</p>
                <p className="text-[10px] text-emerald-600 font-medium">Pro Explorer</p>
              </div>

              {/* Logout/Sign In switch */}
              {onNavigateToLogin && (
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title={content.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION WITH WARM GREETING & PROMINENT PLAN TRIP CTA     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/30">
        {/* Subtle Ambient Decorative Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          {/* Top Warm Greeting Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              {/* Top AI Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AI Concierge Ready • Seasonal Autumn Routing Active</span>
              </div>

              {/* The Warm Personalized Greeting Requested */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {content.greetingPrefix}{' '}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                  {content.greetingQuestion}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {content.greetingSubtitle}
              </p>
            </div>

            {/* Travel Stats Quick Snapshot Badges */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl">
              <div className="px-3 text-center border-r border-white/10">
                <p className="text-xl sm:text-2xl font-black text-white">{trips.filter(t => t.status !== 'Past').length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">{content.activeTripsCount}</p>
              </div>
              <div className="px-3 text-center border-r border-white/10">
                <p className="text-xl sm:text-2xl font-black text-emerald-300">{trips.length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">{content.countriesVisited}</p>
              </div>
              <div className="px-3 text-center">
                <p className="text-xl sm:text-2xl font-black text-teal-300">99.4%</p>
                <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">{content.aiAccuracy}</p>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* PROMINENT HIGH-CONVERTING "PLAN A NEW TRIP" CALL TO ACTION   */}
          {/* ============================================================ */}
          <div className="pt-2">
            <div className="relative group p-1 rounded-3xl bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-emerald-600/40 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 rounded-[22px] bg-slate-900/90 backdrop-blur-xl border border-white/15 gap-4">
                <div className="flex items-center gap-4 text-left">
                  {/* Floating Map/AI Icon with Glow */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 text-slate-950 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                      <Map className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                    </div>
                    {/* Floating mini AI sparkle orb */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow animate-bounce">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Next-Gen Route Engine
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {lang === 'tr' ? 'Yapay Zeka ile Yeni Bir Seyahat Tasarla' : 'Ready to craft your next unforgettable memory?'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {lang === 'tr'
                        ? 'Varış noktanızı söyleyin, otonom yapay zeka saniyeler içinde rota, otel ve hava durumu planlasın.'
                        : 'Autonomous agents map weather, flights, cliffside stays, and secret local favorites in seconds.'}
                    </p>
                  </div>
                </div>

                {/* The Big Prominent CTA Button */}
                <button
                  type="button"
                  onClick={() => onOpenWizard ? onOpenWizard() : setIsModalOpen(true)}
                  className="w-full sm:w-auto flex-shrink-0 px-6 sm:px-8 py-4 rounded-2xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 hover:from-white hover:to-emerald-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group/btn"
                >
                  <MapPin className="w-5 h-5 text-slate-900 group-hover/btn:translate-y-[-2px] transition-transform" />
                  <span>{content.planNewTripBtn}</span>
                  <ArrowRight className="w-5 h-5 text-slate-900 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA: SEARCH, FILTERS & TRAVEL CARDS GRID       */}
      {/* ============================================================ */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
        {/* Controls Toolbar: Search, Filters & Preview Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
            {['All', 'Upcoming', 'Ongoing', 'Past'].map((statusKey) => {
              const labelMap = {
                All: content.filterAll,
                Upcoming: content.filterUpcoming,
                Ongoing: content.filterOngoing,
                Past: content.filterPast
              };
              const count = statusKey === 'All'
                ? trips.length
                : trips.filter(t => t.status.toLowerCase() === statusKey.toLowerCase()).length;

              const isSelected = activeFilter === statusKey;

              return (
                <button
                  key={statusKey}
                  type="button"
                  onClick={() => setActiveFilter(statusKey)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${isSelected
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                >
                  <span>{labelMap[statusKey]}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-emerald-100 text-emerald-800 font-extrabold' : 'bg-slate-300/80 text-slate-600'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar & Demo Controls */}
          <div className="flex items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white rounded-xl border border-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Demo Toggle Buttons for Testing the Requested Empty State */}
            <button
              type="button"
              onClick={() => {
                if (trips.length > 0) {
                  setTrips([]);
                } else {
                  setTrips(INITIAL_TRIPS);
                }
              }}
              className={`px-2.5 py-2 text-xs font-semibold rounded-xl border transition-all ${trips.length === 0
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              title="Toggle Empty State to preview the requested empty component"
            >
              {trips.length === 0 ? content.resetTrips : content.toggleDemoEmpty}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TRAVEL CARDS GRID OR ELEGANT EMPTY STATE                     */}
        {/* ============================================================ */}
        {filteredTrips.length === 0 ? (
          /* ============================================================ */
          /* ELEGANT EMPTY STATE COMPONENT                                */
          /* ============================================================ */
          <div className="py-12 sm:py-16 px-4">
            <div className="max-w-xl mx-auto text-center rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-xl shadow-slate-200/50 space-y-6 relative overflow-hidden animate-slide-up">
              {/* Background decorative glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Empty Illustration Icon Composite */}
              <div className="relative mx-auto w-24 h-24">
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 shadow-inner">
                  <Compass className="w-12 h-12 stroke-[1.8] text-emerald-600 animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Copy */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Passport Ready</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {content.emptyTitle}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                  {content.emptySubtitle}
                </p>
              </div>

              {/* Main CTA in Empty State */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenWizard ? onOpenWizard() : setIsModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{content.emptyCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {trips.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setTrips(INITIAL_TRIPS)}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl font-semibold text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    {content.resetTrips}
                  </button>
                )}
              </div>

              {/* Popular Inspiration Quick Pills */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {content.tryTheseDestinations}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickInspire('Santorini, Greece', 'Romantic & Coastal')}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-1"
                  >
                    <span>🇬🇷 Santorini, Greece</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickInspire('Bali, Indonesia', 'Tropical Wellness')}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-1"
                  >
                    <span>🌴 Bali, Indonesia</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickInspire('Banff National Park, Canada', 'Glacial Wilderness')}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-1"
                  >
                    <span>🏔️ Banff, Canada</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* GRID OF TRAVEL CARDS                                         */
          /* ============================================================ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map((trip) => {
              // Status Badge styling helper
              const isOngoing = trip.status === 'Ongoing';
              const isUpcoming = trip.status === 'Upcoming';
              const isPast = trip.status === 'Past';

              return (
                <article
                  key={trip.id}
                  className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Media Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for Top Badges Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Floating Status Tag */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      {isOngoing && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          <span>Ongoing</span>
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow-lg shadow-sky-500/20">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Upcoming</span>
                        </span>
                      )}
                      {isPast && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200 shadow">
                          <Check className="w-3.5 h-3.5" />
                          <span>Past Trip</span>
                        </span>
                      )}
                    </div>

                    {/* Weather Badge Floating on Top Right */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/70 backdrop-blur-md text-white border border-white/20">
                        <CloudSun className="w-3.5 h-3.5 text-amber-300" />
                        <span>{trip.weather}</span>
                      </span>
                    </div>

                    {/* Bottom overlay text on image: Destination & Duration */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {trip.tag}
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight drop-shadow-sm leading-snug">
                          {trip.destination}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm text-white">
                        {trip.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    {/* Travel Dates */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{trip.dates}</span>
                      </div>
                      {trip.currentDay && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {trip.currentDay}
                        </span>
                      )}
                      {trip.daysUntil && (
                        <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                          {trip.daysUntil}
                        </span>
                      )}
                      {trip.rating && (
                        <span className="text-xs font-bold text-amber-600">
                          {trip.rating}
                        </span>
                      )}
                    </div>

                    {/* Small Compact Itinerary Summary */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {trip.summary}
                      </p>

                      {/* AI Highlight Chips */}
                      {trip.aiHighlights && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {trip.aiHighlights.slice(0, 2).map((highlight, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Packing Progress & Action Bar */}
                    <div className="pt-2 space-y-3">
                      {/* Packing progress indicator */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <Luggage className="w-3.5 h-3.5 text-slate-400" />
                            {content.smartPacking}
                          </span>
                          <span className="text-emerald-700 font-bold">{trip.packingProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                            style={{ width: `${trip.packingProgress}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateToDetails) {
                            onNavigateToDetails(trip);
                          } else {
                            showToast(lang === 'tr' ? `${trip.destination} detaylı rotası açılıyor...` : `Opening itinerary for ${trip.destination}...`);
                          }
                        }}
                        className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-slate-700 hover:text-white bg-slate-50 hover:bg-emerald-600 border border-slate-200 hover:border-emerald-600 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                      >
                        <span>{content.viewItinerary}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* "PLAN A NEW TRIP" AI GENERATOR MODAL                         */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Autonomous Itinerary Engine</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {content.quickPlanTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {content.quickPlanSubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleGenerateTrip} className="space-y-4">
              {/* Destination Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {content.destinationLabel} <span className="text-emerald-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={newTripDestination}
                    onChange={(e) => setNewTripDestination(e.target.value)}
                    placeholder={content.destinationPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Dates / Duration Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {content.datesLabel}
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={newTripDates}
                    onChange={(e) => setNewTripDates(e.target.value)}
                    placeholder={content.datesPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {content.styleLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {['Scenic Exploration', 'Culinary & Wine', 'Alpine Adventure', 'Beach Relaxation', 'Cultural Heritage', 'Wellness & Spa'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setNewTripStyle(style)}
                      className={`p-2 rounded-xl border font-semibold transition-all text-center ${newTripStyle === style
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                        }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress status if generating */}
              {isGenerating && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600 flex-shrink-0" />
                  <span>{generationStep}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating || !newTripDestination.trim()}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>{content.generatingBtn}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <span>{content.generateBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 bg-white border-t border-slate-200/80 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1.5">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-700">AI Travel Companion</span>
          <span>• 256-bit SSL Encrypted • Real-time Agentic Travel</span>
        </p>
      </footer>
    </div>
  );
}
