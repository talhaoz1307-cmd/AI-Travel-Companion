import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Calendar,
  CloudSun,
  X,
  Globe2,
  Check
} from 'lucide-react';

// Curated high-res travel destinations for visual background
const DESTINATIONS = [
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    tag: 'Coastal Haven',
    tagline: 'Sun-drenched cliffs & azure Mediterranean waters',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    weather: '24°C Sunny',
    days: '7 Days Itinerary',
    aiInsights: '14 scenic stops • Curated cliffside dining & hidden coves'
  },
  {
    id: 'kyoto',
    name: 'Kyoto & Arashiyama, Japan',
    tag: 'Zen Heritage',
    tagline: 'Timeless temples, serene gardens & bamboo groves',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    weather: '19°C Pleasant',
    days: '5 Days Itinerary',
    aiInsights: 'Early morning temple routes • Tea ceremony reservations'
  },
  {
    id: 'swiss',
    name: 'Zermatt & Matterhorn, Switzerland',
    tag: 'Alpine Majesty',
    tagline: 'Snow-capped peaks, alpine trails & tranquil lakes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    weather: '12°C Crisp',
    days: '6 Days Itinerary',
    aiInsights: 'Scenic panoramic rail routes • Matterhorn sunrise viewpoint'
  }
];

export default function LoginPage({ onNavigateToRegister }) {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Status & validation states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  // Active travel background preset
  const [activeDestination, setActiveDestination] = useState(DESTINATIONS[0]);

  // Language toggle (EN / TR) matching the project doc specifications
  const [lang, setLang] = useState('en');

  const content = {
    en: {
      badge: 'AI-Powered Travel Intelligence',
      welcome: 'Welcome back',
      subtitle: 'Sign in to access your custom itineraries, smart packing lists, and AI concierge.',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me for 30 days',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      signingIn: 'Signing in to your account...',
      orContinueWith: 'Or continue with',
      noAccount: "Don't have an account?",
      signUp: 'Sign up for free',
      securityBadge: '256-bit SSL encrypted & GDPR compliant',
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email address (e.g. name@domain.com)',
      passwordRequired: 'Please enter your password',
      passwordShort: 'Password must be at least 6 characters long',
      authFailed: 'Invalid email or password. Please verify your credentials.',
      authSuccessMsg: 'Welcome back, Explorer! Preparing your personalized dashboard...',
      toggleHide: 'Hide password',
      toggleShow: 'Show password',
      activeItinerary: 'Active Itinerary Preview',
      curatedBy: 'Curated by AI Travel Companion'
    },
    tr: {
      badge: 'Yapay Zeka Destekli Seyahat Rehberi',
      welcome: 'Tekrar hoş geldin',
      subtitle: 'Kişiselleştirilmiş rotalarına, bavul listelerine ve AI asistanına erişmek için giriş yap.',
      emailLabel: 'E-posta adresi',
      emailPlaceholder: 'ornek@alanadi.com',
      passwordLabel: 'Şifre',
      passwordPlaceholder: 'Şifrenizi girin',
      rememberMe: 'Beni 30 gün hatırla',
      forgotPassword: 'Şifremi unuttum?',
      signIn: 'Giriş Yap',
      signingIn: 'Hesabınıza giriş yapılıyor...',
      orContinueWith: 'Veya şununla devam et',
      noAccount: 'Henüz hesabın yok mu?',
      signUp: 'Ücretsiz kaydol',
      securityBadge: '256-bit SSL şifreleme ve KVKK uyumlu',
      emailRequired: 'Lütfen e-posta adresinizi girin',
      emailInvalid: 'Lütfen geçerli bir e-posta adresi girin (örn. ad@alanadi.com)',
      passwordRequired: 'Lütfen şifrenizi girin',
      passwordShort: 'Şifre en az 6 karakter olmalıdır',
      authFailed: 'Hatalı e-posta veya şifre. Lütfen bilgilerinizi kontrol edin.',
      authSuccessMsg: 'Hoş geldiniz! Seyahat paneliniz hazırlanıyor...',
      toggleHide: 'Şifreyi gizle',
      toggleShow: 'Şifreyi göster',
      activeItinerary: 'Aktif Seyahat Önizlemesi',
      curatedBy: 'AI Travel Companion tarafından oluşturuldu'
    }
  }[lang];

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = content.emailRequired;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = content.emailInvalid;
    }

    if (!password) {
      newErrors.password = content.passwordRequired;
    } else if (password.length < 6) {
      newErrors.password = content.passwordShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate async authentication (Firebase / Supabase API)
    setTimeout(() => {
      setIsLoading(false);

      // Demo condition: if email contains "error", simulate an auth rejection
      if (email.toLowerCase().includes('error')) {
        setAuthError(content.authFailed);
      } else {
        setAuthSuccess(true);
      }
    }, 1200);
  };

  // Quick Demo helpers for seamless testing
  const handleDemoFill = () => {
    setEmail('explorer.alex@travelcompanion.ai');
    setPassword('Adventure2026!');
    setErrors({});
    setAuthError('');
    setAuthSuccess(false);
  };

  const handleDemoError = () => {
    setEmail('invalid.email@domain');
    setPassword('123');
    setErrors({
      email: content.emailInvalid,
      password: content.passwordShort
    });
    setAuthError(content.authFailed);
    setAuthSuccess(false);
  };

  const handleToggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  return (
    <main className="min-h-screen w-full flex bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* ============================================================ */}
      {/* LEFT COLUMN: Visual & Atmospheric Travel Showcase (Desktop) */}
      {/* ============================================================ */}
      <section 
        className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative flex-col justify-between p-12 overflow-hidden text-white transition-all duration-700 ease-in-out"
        aria-label="Travel Inspiration and Preview"
      >
        {/* Dynamic High-Resolution Background Image with Ken-Burns style slow ambient zoom */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${activeDestination.image})` }}
          aria-hidden="true"
        />

        {/* Sophisticated Dual Gradient Overlay (Deep Emerald & Indigo Tones) */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-emerald-950/40 backdrop-blur-[1px]"
          aria-hidden="true"
        />
        
        {/* Subtle decorative radial glow */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header on Visual Side */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-indigo-500 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
                <Compass className="w-6 h-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                AI Travel Companion
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <p className="text-xs text-slate-300 font-medium tracking-wide">Next-Gen Agentic Travel</p>
            </div>
          </div>

          {/* AI Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-emerald-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{content.badge}</span>
          </div>
        </div>

        {/* Center/Bottom Content & Floating Dynamic Itinerary Card */}
        <div className="relative z-10 space-y-8 my-auto pt-16 pb-8">
          {/* Main Editorial Headline */}
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              {activeDestination.tag}
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              Plan less. <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
                Experience more.
              </span>
            </h1>
            <p className="text-slate-300 text-base xl:text-lg leading-relaxed font-normal max-w-lg">
              {activeDestination.tagline} Powered by autonomous AI agents that map weather, scenic routes, and local favorites in seconds.
            </p>
          </div>

          {/* Floating Glassmorphism Itinerary Card */}
          <div className="max-w-md rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-4 transition-all duration-300 hover:border-emerald-400/40 hover:bg-slate-900/75">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  {content.activeItinerary}
                </span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
                AI Curated
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>{activeDestination.name}</span>
                <span className="text-xs font-normal text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {activeDestination.days}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{activeDestination.aiInsights}</span>
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <CloudSun className="w-4 h-4 text-amber-300" />
                {activeDestination.weather}
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:underline cursor-pointer">
                Smart Route Ready
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Destination Switcher Carousel Dots */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 mr-2">Featured Destinations:</span>
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => setActiveDestination(dest)}
                aria-label={`Switch destination to ${dest.name}`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeDestination.id === dest.id
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {dest.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Social Proof / Traveler Rating */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Traveler avatar 1" />
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Traveler avatar 2" />
              <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Traveler avatar 3" />
            </div>
            <span className="text-slate-300 font-medium">Joined by 140,000+ world travelers</span>
          </div>
          <span className="font-semibold text-emerald-400">★ 4.9 / 5 Rating</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: Minimalist, Accessible Login Form              */}
      {/* ============================================================ */}
      <section 
        className="w-full lg:w-1/2 xl:w-5/12 min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 bg-white"
        aria-label="Login Section"
      >
        {/* Top Bar on Form Side: Mobile Logo & Interactive State Helpers */}
        <div className="w-full flex items-center justify-between">
          {/* Logo visible for mobile & tablet (hidden on desktop where left hero exists) */}
          <div className="flex lg:hidden items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              AI Travel Companion
            </span>
          </div>

          <div className="hidden lg:block">
            {/* Desktop spacer */}
          </div>

          {/* Interactive Testing Toolbar & Language Toggle */}
          <div className="flex items-center gap-2 text-xs">
            {/* Language switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 bg-slate-50/80 transition-colors"
              title="Toggle English / Türkçe"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold uppercase">{lang}</span>
            </button>
          </div>
        </div>

        {/* Central Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          {/* Form Header */}
          <div className="space-y-2 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Travel Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {content.welcome}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          {/* Interactive State Demo Pills for Quick Testing */}
          <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Interactive State Tester:
              </span>
              <span className="text-[10px] text-slate-400">Click to preview</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={handleDemoFill}
                className="px-2 py-1 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all shadow-sm active:scale-95 text-center"
              >
                Fill Valid
              </button>
              <button
                type="button"
                onClick={handleToggleLoading}
                className={`px-2 py-1 text-xs font-medium rounded-lg border transition-all shadow-sm active:scale-95 text-center ${
                  isLoading 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700'
                }`}
              >
                {isLoading ? 'Stop Loading' : 'Test Loading'}
              </button>
              <button
                type="button"
                onClick={handleDemoError}
                className="px-2 py-1 text-xs font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50/50 transition-all shadow-sm active:scale-95 text-center"
              >
                Test Error
              </button>
            </div>
          </div>

          {/* Top Error Alert Banner (if server or credentials reject) */}
          {authError && (
            <div 
              role="alert" 
              className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 animate-fade-in"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-rose-900">Authentication Failed</p>
                  <p className="text-xs text-rose-700 mt-0.5">{authError}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAuthError('')}
                aria-label="Dismiss error notification"
                className="text-rose-400 hover:text-rose-700 p-0.5 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Top Success Banner */}
          {authSuccess && (
            <div 
              role="status" 
              className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 animate-fade-in"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-emerald-900">Success</p>
                <p className="text-xs text-emerald-700 mt-0.5">{content.authSuccessMsg}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* EMAIL FIELD */}
            <div className="space-y-1.5">
              <label 
                htmlFor="login-email" 
                className="block text-xs font-semibold text-slate-700 tracking-wide"
              >
                {content.emailLabel} <span className="text-emerald-600" aria-hidden="true">*</span>
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                  <Mail 
                    className={`w-4 h-4 transition-colors ${
                      errors.email 
                        ? 'text-rose-500' 
                        : 'text-slate-400 group-focus-within:text-emerald-600'
                    }`} 
                  />
                </div>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder={content.emailPlaceholder}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error-text' : undefined}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-white border transition-all duration-200 outline-none
                    ${
                      errors.email
                        ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                        : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15'
                    }
                    ${isLoading ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}
                  `}
                />
              </div>

              {/* Email Error Helper Message */}
              {errors.email && (
                <div 
                  id="email-error-text" 
                  role="alert" 
                  className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 animate-fade-in"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="login-password" 
                  className="block text-xs font-semibold text-slate-700 tracking-wide"
                >
                  {content.passwordLabel} <span className="text-emerald-600" aria-hidden="true">*</span>
                </label>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors">
                  <Lock 
                    className={`w-4 h-4 transition-colors ${
                      errors.password 
                        ? 'text-rose-500' 
                        : 'text-slate-400 group-focus-within:text-emerald-600'
                    }`} 
                  />
                </div>

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder={content.passwordPlaceholder}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={errors.password ? 'password-error-text' : undefined}
                  className={`w-full pl-10 pr-11 py-3 text-sm rounded-xl bg-white border transition-all duration-200 outline-none
                    ${
                      errors.password
                        ? 'border-rose-400 bg-rose-50/20 text-rose-950 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                        : 'border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15'
                    }
                    ${isLoading ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}
                  `}
                />

                {/* Show / Hide Password Button Toggle */}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? content.toggleHide : content.toggleShow}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none focus:text-emerald-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Error Helper Message */}
              {errors.password && (
                <div 
                  id="password-error-text" 
                  role="alert" 
                  className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 animate-fade-in"
                >
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* REMEMBER ME & FORGOT PASSWORD ROW */}
            <div className="flex items-center justify-between pt-1">
              {/* Custom Remember Me Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="rememberMe"
                    disabled={isLoading}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded-md border border-slate-300 bg-white peer-checked:bg-emerald-600 peer-checked:border-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/40 peer-focus-visible:ring-offset-1 transition-all flex items-center justify-center group-hover:border-slate-400 shadow-sm">
                    {rememberMe && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {content.rememberMe}
                </span>
              </label>

              {/* Forgot Password Link */}
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  alert(lang === 'tr' ? 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' : 'Password reset link simulated.');
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1 py-0.5"
              >
                {content.forgotPassword}
              </a>
            </div>

            {/* SUBMIT BUTTON WITH MODERN EMERALD/INDIGO MICRO-INTERACTIONS */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group
                ${
                  isLoading
                    ? 'bg-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30'
                }
              `}
            >
              {/* Subtle light sweep animation on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{content.signingIn}</span>
                </>
              ) : (
                <>
                  <span>{content.signIn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Minimalist Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400 font-medium uppercase tracking-wider">
                {content.orContinueWith}
              </span>
            </div>
          </div>

          {/* Social Login Buttons (Google & Apple) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google OAuth Button */}
            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* Apple OAuth Button */}
            <button
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.45c.67-.82 1.12-1.96.99-3.11-1 .04-2.14.65-2.81 1.44-.59.69-1.11 1.83-.97 2.95 1.12.09 2.19-.55 2.79-1.28z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign Up Redirect */}
          <div className="mt-8 text-center text-xs text-slate-500">
            <span>{content.noAccount} </span>
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToRegister) {
                  onNavigateToRegister();
                }
              }}
              className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1 cursor-pointer"
            >
              {content.signUp}
            </a>
          </div>
        </div>

        {/* Form Footer with Security / Privacy assurance */}
        <div className="w-full flex items-center justify-center gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{content.securityBadge}</span>
        </div>
      </section>
    </main>
  );
}
