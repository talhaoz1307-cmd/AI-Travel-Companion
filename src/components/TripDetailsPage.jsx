import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Luggage,
  Wallet,
  PhoneCall,
  CloudRain,
  Baby,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  UtensilsCrossed,
  Share2,
  Download,
  AlertTriangle,
  Hospital,
  Shield,
  Volume2,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Sun,
  CloudSun,
  Coffee,
  Heart,
  Navigation,
  DollarSign,
  Car,
  BedDouble,
  Ticket,
  Info
} from 'lucide-react';

// Sample master itinerary data (Kyoto, Japan)
const TRIP_DATA = {
  id: 'kyoto-2026',
  destination: 'Kyoto & Arashiyama',
  country: 'Japan',
  coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
  dates: 'Nov 12 - Nov 18, 2026',
  duration: '7 Days • 6 Nights',
  weatherSummary: '19°C Mild Autumn Foliage',
  budgetTier: 'Balanced Comfort ($210 / day)',
  party: '2 Adults, 1 Child (Age 6)',
  defaultChildFriendly: true,

  // Route: Day-by-day vertical timeline
  days: [
    {
      dayNumber: 1,
      title: 'Arrival & Ancient Higashiyama',
      date: 'Thursday, Nov 12',
      weather: '18°C Clear & Sunny',
      activities: [
        {
          time: '09:00 AM',
          title: 'Arrival via Shinkansen & Hotel Check-in',
          description: 'Arrive at Kyoto Station via the Tokaido Shinkansen bullet train. Drop bags at boutique Machiya stay in Gion.',
          location: 'Kyoto Station to Gion Machiya',
          duration: '1 hr',
          cost: '¥1,400 (~$9.50) Taxi',
          transport: 'Direct 10 min taxi or Karasuma subway line',
          foodTip: {
            dish: 'Kyo-Kaiseki Seasonal Bento',
            spot: 'Isetan B2 Gourmet Market',
            note: 'Grab fresh seasonal chestnut rice and autumn tempura boxes at station floor.'
          }
        },
        {
          time: '11:30 AM',
          title: 'Kiyomizu-dera Cliffside Temple & Sacred Spring',
          description: 'Ascend the historic slope of Sannenzaka. Marvel at the massive wooden stage built without nails and sip from the Otowa Waterfall.',
          location: 'Higashiyama Ward',
          duration: '2 hrs',
          cost: '¥400 (~$2.70) / person',
          transport: '15 min gentle cobblestone uphill walk',
          foodTip: {
            dish: 'Warm Yatsuhashi Cinnamon Pastries',
            spot: 'Honjo Honke Yatsuhashi',
            note: 'Freshly steamed triangular mochi filled with sweet azuki red bean.'
          }
        },
        {
          time: '02:30 PM',
          title: 'Traditional Matcha Ceremony at Camellia Tea House',
          description: 'Private 45-minute zen tea preparation workshop led by a licensed Urasenke tea master. Learn whisking techniques and tea etiquette.',
          location: 'Ninenzaka Historical Lane',
          duration: '1 hr',
          cost: '¥3,500 (~$23.50)',
          transport: '5 min walk from Kiyomizu-dera',
          foodTip: {
            dish: 'Uji Matcha & Seasonal Wagashi Sweets',
            spot: 'Camellia Garden',
            note: 'Bitter ceremonial grade stone-ground green tea paired with handmade maple leaf sugar confection.'
          }
        },
        {
          time: '06:30 PM',
          title: 'Evening Lantern Walk & Riverside Dining in Pontocho',
          description: 'Atmospheric cobblestone alley lined with traditional wooden teahouses. Lanterns reflecting over the Kamogawa River.',
          location: 'Pontocho Alley & Kamo River',
          duration: '2.5 hrs',
          cost: '¥5,500 (~$37) Dinner',
          transport: '12 min walk across Shijo Bridge',
          foodTip: {
            dish: 'Kamo-Nanban Soba (Duck & Leek Soba)',
            spot: 'Honke Owariya (Operating since 1465)',
            note: '550-year-old historic soba institution with fragrant dashi broth.'
          }
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Bamboo Groves, Alpine Monkeys & Zen Gardens',
      date: 'Friday, Nov 13',
      weather: '17°C Partly Cloudy (Chance of afternoon drizzle)',
      activities: [
        {
          time: '07:30 AM',
          title: 'Early Dawn Walk through Arashiyama Bamboo Grove',
          description: 'Beat the tour groups by arriving before 8:00 AM. Experience the mesmerizing wind rustling through towering green bamboo stalks.',
          location: 'Sagano, Arashiyama',
          duration: '1.5 hrs',
          cost: 'Free Admission',
          transport: 'JR San-in line from Kyoto Station (16 mins)',
          foodTip: {
            dish: 'Fresh Soy Milk Soft-Serve',
            spot: 'Saga Tofu Ine',
            note: 'Silky, dairy-free organic tofu ice cream with roasted soybean kinako dust.'
          }
        },
        {
          time: '10:00 AM',
          title: 'Tenryu-ji Zen Temple & Sogenchi Landscape Pond',
          description: 'UNESCO World Heritage 14th-century temple with one of Japan’s oldest surviving stroll gardens framed by surrounding autumn mountains.',
          location: 'Arashiyama Main Street',
          duration: '1.5 hrs',
          cost: '¥500 (~$3.40)',
          transport: 'Direct exit from the bamboo forest',
          foodTip: {
            dish: 'Shigetsu Buddhist Vegetarian Lunch (Shojin Ryori)',
            spot: 'Inside Tenryu-ji Temple Grounds',
            note: 'Mindful multi-course meal cooked without meat, fish, or pungent root vegetables.'
          }
        },
        {
          time: '02:00 PM',
          title: 'Iwatayama Monkey Park Hilltop Hike',
          description: 'Gentle 20-minute shaded mountain hike leading to over 120 free-roaming wild Japanese macaques and panoramic skyline views.',
          location: 'South bank of Oi River',
          duration: '2 hrs',
          cost: '¥600 (~$4)',
          transport: 'Cross Togetsukyo wooden bridge',
          foodTip: {
            dish: 'Matcha Fondue with Dango',
            spot: 'Rilakkuma Sabo Cafe',
            note: 'Fun skewered rice dumplings dipped in rich white chocolate matcha cream.'
          }
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Fushimi Inari Torii Gates & Sake Breweries',
      date: 'Saturday, Nov 14',
      weather: '20°C Sunny',
      activities: [
        {
          time: '08:00 AM',
          title: 'Hiking the 10,000 Vermilion Torii Gates of Inari',
          description: 'Ascend the mystical mountain trail dedicated to the Shinto deity of rice and business. Fox statues (Kitsune) guard each junction.',
          location: 'Fushimi Inari Taisha',
          duration: '2.5 hrs',
          cost: 'Free Admission',
          transport: 'JR Nara Line (5 mins from Kyoto Station)',
          foodTip: {
            dish: 'Inari Sushi (Sweet Fried Tofu Pockets)',
            spot: 'Nezameya (Operating since 1592)',
            note: 'Legendary grill visited by Toyotomi Hideyoshi, seasoned with aromatic hemp seed.'
          }
        },
        {
          time: '01:00 PM',
          title: 'Fushimi Historic Sake District & Canal Boat Ride',
          description: 'Stroll past weeping willows and Edo-period cedar wood sake breweries fed by pristine mineral springs.',
          location: 'Gekkeikan Okura Sake Museum',
          duration: '2 hrs',
          cost: '¥600 (~$4) with 3 tastings',
          transport: 'Keihan Main Line train (8 mins)',
          foodTip: {
            dish: 'Sake Kasu Ramen & Fermented Koji Tapas',
            spot: 'Kizakura Kappa Country',
            note: 'Rich warming ramen noodles enriched with sake mash reduction broth.'
          }
        }
      ]
    }
  ],

  // Interactive Packing list
  initialLuggage: [
    { id: 'l1', item: 'Passport & International Driving Permit', category: 'Documents', packed: true },
    { id: 'l2', item: 'JR Kansai Regional Rail Passes (Digital)', category: 'Documents', packed: true },
    { id: 'l3', item: 'Travel Medical & Cancellation Insurance', category: 'Documents', packed: true },
    { id: 'l4', item: 'Slip-on Walking Shoes (Easy for temples)', category: 'Clothing', packed: true },
    { id: 'l5', item: 'Breathable Merino Wool Layers (Morning chill)', category: 'Clothing', packed: false },
    { id: 'l6', item: 'Light Packable Rain Shell / Umbrella', category: 'Clothing', packed: false },
    { id: 'l7', item: 'Clean Thick Socks (For temple tatami floors)', category: 'Clothing', packed: true },
    { id: 'l8', item: 'Universal Travel Adapter (Type A/B 100V)', category: 'Electronics', packed: true },
    { id: 'l9', item: '10,000mAh Compact Power Bank', category: 'Electronics', packed: true },
    { id: 'l10', item: 'Pocket Wi-Fi / eSIM QR code', category: 'Electronics', packed: true },
    { id: 'l11', item: 'Personal Prescriptions & Blister Bandages', category: 'Health', packed: false },
    { id: 'l12', item: 'Hand Sanitizer & Pocket Tissues (WC use)', category: 'Health', packed: false },
    { id: 'l13', item: 'Kids Motion Sickness Drops & Snacks', category: 'Family', packed: true },
    { id: 'l14', item: 'Compact Umbrella Stroller for Arashiyama', category: 'Family', packed: false }
  ],

  // Budget breakdown
  budgetBreakdown: {
    totalEstimate: '$2,140 USD',
    currencyRate: '1 USD ≈ 148 JPY',
    categories: [
      { name: 'Lodging (Hotels & Machiya)', amount: '$980', percent: 46, icon: BedDouble, color: 'bg-emerald-500' },
      { name: 'Food & Dining (Trattorias & Street Eats)', amount: '$540', percent: 25, icon: UtensilsCrossed, color: 'bg-teal-500' },
      { name: 'Travel & Transport (Trains, Taxis, Buses)', amount: '$360', percent: 17, icon: Car, color: 'bg-sky-500' },
      { name: 'Activities & Sightseeing (Temples, Tea)', amount: '$260', percent: 12, icon: Ticket, color: 'bg-amber-500' }
    ],
    savingsTips: [
      'Purchasing the 3-day Subway & Bus Pass saves approximately ¥1,800 ($12) per adult.',
      'Lunch menus at top Kaiseki restaurants are 50% cheaper than dinner for identical multi-courses.',
      'Kids under 6 ride Kyoto City Buses and subways completely free.'
    ]
  },

  // Emergency & Locals
  emergency: {
    police: '110',
    ambulanceFire: '119',
    touristHelpline: '+81 50-3816-2787 (Japan National Tourism 24/7 in English)',
    nearestHospital: 'Kyoto University Hospital International Clinic (Sakyo-ku, Kyoto)',
    usEmbassy: 'U.S. Consulate General Osaka-Kobe: 06-6315-5900',
    japanEmergencyNote: 'In Japan, dial 119 for medical emergency and speak clearly: "Kyukyu-desu" (Medical emergency).'
  },

  localPhrases: [
    {
      phrase: 'Arigatou gozaimasu',
      kana: 'ありがとうございます',
      meaning: 'Thank you very much (polite)',
      pronunciation: 'Ah-ree-gah-toh goh-zigh-mahs'
    },
    {
      phrase: 'Sumimasen',
      kana: 'すみません',
      meaning: 'Excuse me / I am sorry',
      pronunciation: 'Soo-mee-mah-sen'
    },
    {
      phrase: 'Kore wa ikura desu ka?',
      kana: 'これはいくらですか？',
      meaning: 'How much is this?',
      pronunciation: 'Koh-reh wah ee-koo-rah des-kah'
    },
    {
      phrase: 'O-kaikei onegaishimasu',
      kana: 'お会計お願いします',
      meaning: 'The bill / check please',
      pronunciation: 'Oh-kye-kay oh-neh-guy-she-mahs'
    },
    {
      phrase: 'Eigo ga hanasemasu ka?',
      kana: '英語が話せますか？',
      meaning: 'Do you speak English?',
      pronunciation: 'Ay-goh gah hah-nah-seh-mahs-kah'
    },
    {
      phrase: 'Toire wa doko desu ka?',
      kana: 'トイレはどこですか？',
      meaning: 'Where is the restroom?',
      pronunciation: 'Toy-reh wah doh-koh des-kah'
    },
    {
      phrase: 'Oishii desu!',
      kana: '美味しいです！',
      meaning: 'This is delicious!',
      pronunciation: 'Oy-shee des!'
    },
    {
      phrase: 'Tasukete kudasai',
      kana: '助けてください',
      meaning: 'Please help me (emergency)',
      pronunciation: 'Tah-soo-keh-teh koo-dah-sigh'
    }
  ],

  // Weather Backup indoor alternatives
  weatherBackup: {
    forecastAlert: '🌧️ 65% Probability of Rain on Friday afternoon (Day 2)',
    indoorAlternatives: [
      {
        title: 'Kyoto International Manga Museum',
        tag: 'Indoor Culture & Books',
        cost: '¥900 (~$6)',
        location: 'Karasuma Oike Station',
        description: 'Former 1929 elementary school transformed into a colossal library of 300,000 historic and modern comics. Relax on wooden floors reading translated editions.',
        whyRainFriendly: 'Completely covered, climate-controlled, cozy cafe on-site.'
      },
      {
        title: 'Covered Nishiki Food Market Arcade Walking Tour',
        tag: 'Gastronomy & Covered Street',
        cost: 'Free entry (food pay-as-you-go)',
        location: 'Central Downtown Kyoto',
        description: 'Known as "Kyoto’s Kitchen", this 400-year-old narrow five-block shopping street is sheltered beneath stained glass canopies with over 130 food vendors.',
        whyRainFriendly: '100% sheltered glass arcade spanning 5 full city blocks.'
      },
      {
        title: 'Kurama Onsen & Indoor Cedar Bath Experience',
        tag: 'Thermal Spa & Relaxation',
        cost: '¥1,400 (~$9.50)',
        location: 'Kurama Mountain Village (Eizan rail)',
        description: 'Immerse in mineral-rich natural thermal waters while watching rain mist drift through cedar pine trees on the mountain slopes.',
        whyRainFriendly: 'Indoor warm steam baths, hot tea lounge, and tatami nap rooms.'
      },
      {
        title: 'Handmade Wagashi Sweet Making Workshop',
        tag: 'Artisan Workshop',
        cost: '¥2,800 (~$19)',
        location: 'Kanshunko Senju Studio',
        description: 'Knead, mold, and sculpt your own seasonal bean-paste flowers and maple leaves alongside master Japanese confectioners.',
        whyRainFriendly: 'Hands-on indoor creative workshop suitable for all ages.'
      }
    ]
  },

  // Kids-friendly extra details
  kidsFriendlyActivities: [
    {
      title: 'Kyoto Railway Museum Simulator & Steam Locomotives',
      tag: 'Toddlers to Teens',
      highlight: 'Drive an authentic Shinkansen train simulator and ride working 1800s steam engines.',
      facility: 'Full elevator access, stroller rentals & dedicated nursing rooms.'
    },
    {
      title: 'Iwatayama Monkey Park Treat Feeding Room',
      tag: 'Ages 4+',
      highlight: 'Kids step into an enclosed wire observation hut to safely hand apple slices to wild mountain macaques.',
      facility: 'Shaded resting benches, juice vending machines.'
    },
    {
      title: 'Ninja Trick House & Shuriken Throwing Dojo',
      tag: 'All Ages',
      highlight: 'Dress in ninja garb, discover secret revolving doors, and practice throwing soft ninja stars.',
      facility: 'Air-conditioned, indoor trick rooms.'
    }
  ]
};

export default function TripDetailsPage({ onNavigateToDashboard }) {
  // Active Tab state: 'route' | 'luggage' | 'budget' | 'emergency' | 'weather'
  const [activeTab, setActiveTab] = useState('route');

  // Selected Day in Route tab
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);

  // Child-friendly flag toggle (requested in prompt)
  const [isChildFriendly, setIsChildFriendly] = useState(TRIP_DATA.defaultChildFriendly);

  // Luggage check state
  const [luggageItems, setLuggageItems] = useState(TRIP_DATA.initialLuggage);
  const [newLuggageInput, setNewLuggageInput] = useState('');
  const [luggageFilter, setLuggageFilter] = useState('all'); // 'all' | 'packed' | 'unpacked'

  // Copied phrase indicator
  const [copiedPhrase, setCopiedPhrase] = useState('');

  // Toast feedback
  const [toast, setToast] = useState('');

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Toggle luggage item
  const toggleLuggage = (id) => {
    setLuggageItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  };

  // Add new luggage item
  const handleAddLuggage = (e) => {
    e.preventDefault();
    if (!newLuggageInput.trim()) return;
    const newItem = {
      id: `custom-${Date.now()}`,
      item: newLuggageInput.trim(),
      category: 'Personal',
      packed: false
    };
    setLuggageItems([...luggageItems, newItem]);
    setNewLuggageInput('');
    triggerToast('Added item to packing list!');
  };

  // Luggage progress calculation
  const totalLuggage = luggageItems.length;
  const packedLuggage = luggageItems.filter((i) => i.packed).length;
  const luggageProgressPercent = totalLuggage > 0 ? Math.round((packedLuggage / totalLuggage) * 100) : 0;

  // Filtered luggage
  const filteredLuggage = luggageItems.filter((item) => {
    if (luggageFilter === 'packed') return item.packed;
    if (luggageFilter === 'unpacked') return !item.packed;
    return true;
  });

  // Copy phrase helper
  const handleCopyPhrase = (text, phonetic) => {
    navigator.clipboard?.writeText(`${text} (${phonetic})`);
    setCopiedPhrase(text);
    triggerToast(`Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedPhrase(''), 2000);
  };

  // Tabs configuration
  const tabs = [
    { id: 'route', label: 'Route', icon: MapPin, badge: `${TRIP_DATA.days.length} Days` },
    { id: 'luggage', label: 'Luggage', icon: Luggage, badge: `${luggageProgressPercent}%` },
    { id: 'budget', label: 'Budget', icon: Wallet, badge: TRIP_DATA.budgetBreakdown.totalEstimate },
    { id: 'emergency', label: 'Emergency & Locals', icon: PhoneCall, badge: 'Crucial' },
    { id: 'weather', label: 'Weather Backup', icon: CloudRain, badge: 'Rain Plan' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white flex flex-col">
      {/* Toast Feedback */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-950 text-white shadow-2xl border border-emerald-500/40 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* TOP HERO COVER & TRIP HEADER                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Cover Image with gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-all duration-1000"
          style={{ backgroundImage: `url(${TRIP_DATA.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-emerald-950/40 backdrop-blur-[1px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 space-y-6">
          {/* Top Back & Quick Action Toolbar */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerToast('Trip itinerary exported to PDF!')}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
                title="Download PDF Itinerary"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Share link copied to clipboard!')}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                title="Share Trip"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Destination Details & Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Master Itinerary</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-slate-200">
                  <CloudSun className="w-3.5 h-3.5 text-amber-300" />
                  <span>{TRIP_DATA.weatherSummary}</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {TRIP_DATA.destination}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {TRIP_DATA.dates} ({TRIP_DATA.duration})
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Wallet className="w-4 h-4 text-teal-400" />
                  {TRIP_DATA.budgetTier}
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  {TRIP_DATA.party}
                </span>
              </div>
            </div>

            {/* Child-Friendly Mode Interactive Toggle Switch (Requested in Prompt) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  isChildFriendly ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'bg-white/10 text-slate-400'
                }`}>
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Child-Friendly Mode</p>
                  <p className="text-[11px] text-slate-300">Strollers & kid activities</p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  setIsChildFriendly(!isChildFriendly);
                  triggerToast(isChildFriendly ? 'Child-friendly filters disabled' : 'Child-friendly guide enabled!');
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  isChildFriendly ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
                aria-label="Toggle child friendly mode"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isChildFriendly ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MOBILE SLIDING TAB BAR (Horizontal Scrollable on Mobile)     */}
      {/* ============================================================ */}
      <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* MAIN TWO-COLUMN LAYOUT: DESKTOP VERTICAL SIDEBAR + CONTENT   */}
      {/* ============================================================ */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* ============================================================ */}
        {/* DESKTOP VERTICAL SIDEBAR                                     */}
        {/* ============================================================ */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Sidebar Navigation Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-sm space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 block">
                Itinerary Views
              </span>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{tab.label}</span>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-emerald-700/80 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* AI Assistant Quick Snapshot Card in Sidebar */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-5 space-y-3 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Concierge
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h4 className="text-sm font-bold text-white">Live Route Monitoring</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Crowd levels are lowest at Kiyomizu-dera before 08:30 AM. Weather backup ready.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => triggerToast('AI Concierge chat window active!')}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-emerald-300 transition-all text-center"
                >
                  Ask AI Travel Assistant
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* MAIN TAB CONTENT AREA                                        */}
        {/* ============================================================ */}
        <main className="flex-1 min-w-0 space-y-8">
          
          {/* ============================================================ */}
          {/* EXTRA CARD: KIDS-FRIENDLY ACTIVITIES (TRIGGERED IF ENABLED)  */}
          {/* ============================================================ */}
          {isChildFriendly && (
            <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border-2 border-amber-300/80 p-5 sm:p-6 shadow-sm space-y-4 animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/30">
                    <Baby className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      Kids-Friendly Mode Active
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        Family Ready
                      </span>
                    </h3>
                    <p className="text-xs text-slate-600">
                      Curated resting stops, gentle gradients, stroller accessibility & kid favorites for your 6-year-old explorer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kids Activity Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {TRIP_DATA.kidsFriendlyActivities.map((kidAct, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      {kidAct.tag}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900">{kidAct.title}</h5>
                    <p className="text-[11px] text-slate-600 leading-snug">{kidAct.highlight}</p>
                    <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 pt-1 border-t border-slate-100">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{kidAct.facility}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 1: "ROUTE" (DAY-BY-DAY VERTICAL TIMELINE)                */}
          {/* ============================================================ */}
          {activeTab === 'route' && (
            <div className="space-y-6 animate-fade-in">
              {/* Day Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {TRIP_DATA.days.map((day) => {
                  const isSelected = selectedDayNumber === day.dayNumber;
                  return (
                    <button
                      key={day.dayNumber}
                      type="button"
                      onClick={() => setSelectedDayNumber(day.dayNumber)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>Day {day.dayNumber}</span>
                      <span className="opacity-60 ml-1.5 font-normal">({day.date.split(',')[0]})</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Day Header */}
              {(() => {
                const activeDay = TRIP_DATA.days.find((d) => d.dayNumber === selectedDayNumber) || TRIP_DATA.days[0];

                return (
                  <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            Day {activeDay.dayNumber}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{activeDay.date}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                          {activeDay.title}
                        </h2>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                        <CloudSun className="w-4 h-4 text-amber-500" />
                        <span>{activeDay.weather}</span>
                      </span>
                    </div>

                    {/* VERTICAL TIMELINE CONTAINER */}
                    <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-400 before:to-slate-200">
                      {activeDay.activities.map((activity, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline bullet dot */}
                          <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          </div>

                          {/* Activity Card */}
                          <div className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-3 transition-all hover:shadow-sm">
                            {/* Time & Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-extrabold shadow-sm">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{activity.time}</span>
                              </span>

                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                                  {activity.duration}
                                </span>
                                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                                  {activity.cost}
                                </span>
                              </div>
                            </div>

                            {/* Title & Description */}
                            <div>
                              <h4 className="text-base font-bold text-slate-900">{activity.title}</h4>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                                {activity.description}
                              </p>
                            </div>

                            {/* Location & Transport Details */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                              <span className="flex items-center gap-1 font-medium text-slate-700">
                                <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                <span>{activity.location}</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Car className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <span>{activity.transport}</span>
                              </span>
                            </div>

                            {/* LOCAL FOOD RECOMMENDATION HIGHLIGHT (Requested in Prompt) */}
                            {activity.foodTip && (
                              <div className="mt-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                                  <UtensilsCrossed className="w-4 h-4" />
                                </div>
                                <div className="text-xs space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-amber-900 uppercase text-[10px] tracking-wider">
                                      🍜 Local Food Recommendation:
                                    </span>
                                    <span className="font-bold text-slate-900">{activity.foodTip.dish}</span>
                                  </div>
                                  <p className="text-slate-600">
                                    <span className="font-semibold text-emerald-800">At {activity.foodTip.spot}</span> — {activity.foodTip.note}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: "LUGGAGE" (INTERACTIVE PACKING LIST WITH CHECKBOXES)  */}
          {/* ============================================================ */}
          {activeTab === 'luggage' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-1">
                    <Luggage className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Smart Packing Assistant</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Interactive Packing Checklist
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Check off items as you pack. Tailored for Kyoto autumn weather, temple dress codes & family ease.
                  </p>
                </div>

                {/* Live Packing Percentage Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[200px] text-right space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Packing Progress</span>
                    <span className="text-emerald-700">{packedLuggage} / {totalLuggage} items</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                      style={{ width: `${luggageProgressPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-extrabold text-emerald-700">
                    {luggageProgressPercent}% Complete
                  </p>
                </div>
              </div>

              {/* Add Custom Item Input & Filter Tabs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Filter Pills */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                  {['all', 'unpacked', 'packed'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setLuggageFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        luggageFilter === f
                          ? 'bg-white text-emerald-800 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Add Item Form */}
                <form onSubmit={handleAddLuggage} className="flex items-center gap-2 flex-1 sm:max-w-md">
                  <input
                    type="text"
                    value={newLuggageInput}
                    onChange={(e) => setNewLuggageInput(e.target.value)}
                    placeholder="Add custom packing item..."
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* Checklist Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {filteredLuggage.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleLuggage(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      item.packed
                        ? 'bg-emerald-50/50 border-emerald-200/80 text-slate-500'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                        item.packed ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                      }`}>
                        {item.packed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-0.5">
                        <span className={`text-xs font-medium ${item.packed ? 'line-through text-slate-400' : 'text-slate-800 font-semibold'}`}>
                          {item.item}
                        </span>
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.packed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.packed ? 'Packed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: "BUDGET" (VISUAL EXPENSE BREAKDOWN & PROGRESS BARS)    */}
          {/* ============================================================ */}
          {activeTab === 'budget' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-1">
                    <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cost Forecasting & Allocation</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Visual Expense Breakdown
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Transparent daily cost estimates with real-time conversion ({TRIP_DATA.budgetBreakdown.currencyRate}).
                  </p>
                </div>

                <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-sm text-right">
                  <p className="text-[11px] text-emerald-400 font-semibold uppercase">Total Trip Estimate</p>
                  <p className="text-2xl font-black text-white">{TRIP_DATA.budgetBreakdown.totalEstimate}</p>
                </div>
              </div>

              {/* Progress Bars for Lodging, Food, Travel, Activities */}
              <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category Breakdown & Percentage of Total
                </h4>

                <div className="space-y-4">
                  {TRIP_DATA.budgetBreakdown.categories.map((cat, idx) => {
                    const Icon = cat.icon;

                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="flex items-center gap-2 text-slate-800">
                            <Icon className="w-4 h-4 text-emerald-600" />
                            <span>{cat.name}</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900">{cat.amount}</span>
                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">
                              {cat.percent}%
                            </span>
                          </div>
                        </div>

                        {/* Smooth CSS progress bar */}
                        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                            style={{ width: `${cat.percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Cost Optimization Tips */}
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    AI Budget Optimization Tips
                  </h4>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-900 leading-relaxed">
                  {TRIP_DATA.budgetBreakdown.savingsTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: "EMERGENCY & LOCALS" (CONTACT NUMBERS & PHRASE TABLE) */}
          {/* ============================================================ */}
          {activeTab === 'emergency' && (
            <div className="space-y-6 animate-fade-in">
              {/* Emergency Numbers Card (Requested in Prompt) */}
              <div className="rounded-3xl bg-rose-50/70 border-2 border-rose-200 p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold shadow-md shadow-rose-500/20">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-rose-950">
                        Japan Emergency Contacts & Hospital Guide
                      </h3>
                      <p className="text-xs text-rose-700">
                        Always available 24/7. Save these numbers or tap to dial.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-rose-200 text-rose-900">
                    Important
                  </span>
                </div>

                {/* Quick Call Numbers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-2xs space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Police (Keisatsu)</span>
                    <p className="text-xl font-black text-rose-700 flex items-center justify-between">
                      <span>{TRIP_DATA.emergency.police}</span>
                      <PhoneCall className="w-4 h-4 text-rose-400" />
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-2xs space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Ambulance & Fire</span>
                    <p className="text-xl font-black text-rose-700 flex items-center justify-between">
                      <span>{TRIP_DATA.emergency.ambulanceFire}</span>
                      <PhoneCall className="w-4 h-4 text-rose-400" />
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-rose-200/80 shadow-2xs space-y-0.5 sm:col-span-2 md:col-span-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tourist Helpline</span>
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {TRIP_DATA.emergency.touristHelpline}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Hospital className="w-4 h-4 text-rose-600" />
                    Nearest English-Speaking Hospital:
                  </p>
                  <p className="text-slate-600 pl-5">{TRIP_DATA.emergency.nearestHospital}</p>
                </div>
              </div>

              {/* Table of Useful Local Phrases with Meanings & Pronunciations (Requested in Prompt) */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-1">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Language & Etiquette Pocketbook</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    Essential Local Japanese Phrases
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Tap any phrase to copy to clipboard or practice your pronunciation with our phonetic guide.
                  </p>
                </div>

                {/* Phrases Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Japanese Phrase & Script</th>
                        <th className="py-3 px-4">English Meaning</th>
                        <th className="py-3 px-4">Phonetic Pronunciation</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {TRIP_DATA.localPhrases.map((p, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            <div>{p.phrase}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{p.kana}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-700 font-medium">
                            {p.meaning}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-emerald-700 bg-emerald-50/40 rounded">
                            [{p.pronunciation}]
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleCopyPhrase(p.phrase, p.pronunciation)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 text-slate-600 hover:text-emerald-700 transition-colors"
                              title="Copy phrase"
                            >
                              {copiedPhrase === p.phrase ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: "WEATHER BACKUP" (INDOOR ALTERNATIVES IF IT RAINS)    */}
          {/* ============================================================ */}
          {activeTab === 'weather' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-1">
                    <CloudRain className="w-3.5 h-3.5 text-sky-600" />
                    <span>Contingency & Weather Safeguard</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Weather Backup: Rainy Day Indoor Alternatives
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    If sudden showers occur in Kyoto, swap outdoor hikes with these highly-rated indoor sanctuaries without losing precious travel time.
                  </p>
                </div>

                <div className="bg-sky-50 border border-sky-200 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs text-sky-900 font-bold">
                  <CloudRain className="w-5 h-5 text-sky-600 flex-shrink-0 animate-bounce" />
                  <span>{TRIP_DATA.weatherBackup.forecastAlert}</span>
                </div>
              </div>

              {/* Indoor Alternative Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRIP_DATA.weatherBackup.indoorAlternatives.map((alt, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-emerald-300 transition-all shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          {alt.tag}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{alt.cost}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{alt.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {alt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-sky-700 flex items-center gap-1">
                        <CloudRain className="w-3.5 h-3.5" />
                        {alt.whyRainFriendly}
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerToast(`Swapped Day 2 activity with "${alt.title}"!`)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                      >
                        Swap Into Route
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
