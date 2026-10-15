import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Check,
  Circle,
  MapPin,
  Calendar,
  CloudSun,
  Globe2,
  X,
  Plane,
  HeartHandshake
} from 'lucide-react';

// Curated high-res travel destinations matching the app aesthetic
const DESTINATIONS = [
  {
    id: 'kyoto',
    name: 'Kyoto & Arashiyama, Japan',
    tag: 'Zen Heritage',
    tagline: 'Timeless temples, tranquil bamboo groves & ancient tea paths',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    weather: '20°C Mild & Breezy',
    days: '5-Day Custom Route',
    aiInsights: 'Optimized early-morning temple walks • Autonomous crowd avoidance'
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    tag: 'Coastal Haven',
    tagline: 'Cliffside lemon groves, pastel villages & turquoise waters',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    weather: '25°C Sun-Drenched',
    days: '7-Day Scenic Drive',
    aiInsights: 'Curated seaside trattorias • Secret cove swimming spots'
  },
  {
    id: 'swiss',
    name: 'Zermatt & Matterhorn, Switzerland',
    tag: 'Alpine Majesty',
    tagline: 'Pristine glaciers, panoramic trains & crystal-clear alpine air',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    weather: '14°C Crisp Alpine',
    days: '6-Day Mountain Pass',
    aiInsights: 'Glacier Express seat reservations • Real-time trail weather alerts'
  }
];

export default function RegisterPage({ onNavigateToLogin, onNavigateToDashboard }) {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & submission states
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Visual showcase state
  const [activeDestination, setActiveDestination] = useState(DESTINATIONS[0]);
  const [lang, setLang] = useState('en');

  // Multi-language strings
  const content = {
    en: {
      badge: 'Start Your Journey',
      title: 'Create your account',
      subtitle: 'Join over 140,000 explorers using autonomous AI to curate trips, forecast weather, and find hidden gems.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Alex Rivera',
      emailLabel: 'Email address',
      emailPlaceholder: 'alex.rivera@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a strong password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      agreeTermsLabel: 'I agree to the',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      signUpBtn: 'Create Free Account',
      signingUpBtn: 'Creating your account...',
      alreadyHaveAccount: 'Already have an account?',
      signInLink: 'Sign in',
      orSignUpWith: 'Or continue with',
      securityBadge: '256-bit SSL encrypted • Zero-spam guarantee • GDPR ready',
      activeItinerary: 'Active Itinerary Preview',
      curatedBy: 'Curated by AI Travel Companion',
      
      // Password strength labels
      strengthLabel: 'Password Strength',
      strengthNone: 'Enter password',
      strengthWeak: 'Weak password',
      strengthFair: 'Fair strength',
      strengthStrong: 'Strong password',
      strengthVeryStrong: 'Excellent & secure!',
      
      // Rule requirements
      ruleMinLength: 'At least 8 characters',
      ruleNumber: 'At least 1 number (0-9)',
      ruleSpecial: 'At least 1 special character (!@#$...)',
      ruleBonus: 'Mixed uppercase & lowercase',

      // Confirm match states
      passwordsMatch: 'Passwords match',
      passwordsMismatch: 'Passwords do not match',

      // Validation errors
      nameRequired: 'Please enter your full name',
      nameShort: 'Name must be at least 2 characters',
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email address (e.g. name@domain.com)',
      passwordRequired: 'Please create a password',
      passwordRequirementsFailed: 'Password does not satisfy all security requirements',
      confirmRequired: 'Please confirm your password',
      confirmMismatch: 'Passwords do not match',
      termsRequired: 'Please accept the Terms of Service to continue',
      accountCreatedSuccess: 'Account Created Successfully!',
      welcomeExplorer: 'Welcome aboard! Your personalized AI travel profile has been initialized.',
      goToDashboard: 'Proceed to Explorer Dashboard',
      backToLogin: 'Back to Sign In'
    },
    tr: {
      badge: 'Yolculuğa Başla',
      title: 'Hesabını oluştur',
      subtitle: 'Otonom yapay zeka ile seyahat planlayan, hava durumunu öngören ve gizli rotaları keşfeden 140.000+ gezgine katıl.',
      fullNameLabel: 'Ad Soyad',
      fullNamePlaceholder: 'Ahmet Yılmaz',
      emailLabel: 'E-posta adresi',
      emailPlaceholder: 'ahmet@alanadi.com',
      passwordLabel: 'Şifre',
      passwordPlaceholder: 'Güçlü bir şifre belirleyin',
      confirmPasswordLabel: 'Şifreyi Onayla',
      confirmPasswordPlaceholder: 'Şifrenizi tekrar girin',
      agreeTermsLabel: '',
      termsOfService: 'Kullanım Koşulları',
      and: 've',
      privacyPolicy: 'Gizlilik Politikası',
      signUpBtn: 'Ücretsiz Hesap Oluştur',
      signingUpBtn: 'Hesabınız oluşturuluyor...',
      alreadyHaveAccount: 'Zaten bir hesabın var mı?',
      signInLink: 'Giriş yap',
      orSignUpWith: 'Veya şununla devam et',
      securityBadge: '256-bit SSL şifreleme • Sıfır spam garantisi • KVKK uyumlu',
      activeItinerary: 'Aktif Rota Önizlemesi',
      curatedBy: 'AI Travel Companion tarafından hazırlandı',
      
      // Password strength labels
      strengthLabel: 'Şifre Gücü',
      strengthNone: 'Şifre girin',
      strengthWeak: 'Zayıf şifre',
      strengthFair: 'Orta seviye',
      strengthStrong: 'Güçlü şifre',
      strengthVeryStrong: 'Mükemmel ve güvenli!',

      // Rule requirements
      ruleMinLength: 'En az 8 karakter',
      ruleNumber: 'En az 1 rakam (0-9)',
      ruleSpecial: 'En az 1 özel karakter (!@#$...)',
      ruleBonus: 'Büyük ve küçük harf',

      // Confirm match states
      passwordsMatch: 'Şifreler eşleşiyor',
      passwordsMismatch: 'Şifreler eşleşmiyor',

      // Validation errors
      nameRequired: 'Lütfen adınızı ve soyadınızı girin',
      nameShort: 'Ad soyad en az 2 karakter olmalıdır',
      emailRequired: 'Lütfen e-posta adresinizi girin',
      emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
      passwordRequired: 'Lütfen bir şifre oluşturun',
      passwordRequirementsFailed: 'Şifre tüm güvenlik gereksinimlerini karşılamalıdır',
      confirmRequired: 'Lütfen şifrenizi tekrar girin',
      confirmMismatch: 'Girdiğiniz şifreler eşleşmiyor',
      termsRequired: 'Devam etmek için Kullanım Koşullarını kabul etmelisiniz',
      accountCreatedSuccess: 'Hesabınız Başarıyla Oluşturuldu!',
      welcomeExplorer: 'Hoş geldiniz! Kişiselleştirilmiş seyahat profiliniz hazırlandı.',
      goToDashboard: 'Seyahat Paneline Git',
      backToLogin: 'Giriş Ekranına Dön'
    }
  }[lang];

  // ============================================================
  // REAL-TIME PASSWORD STRENGTH EVALUATION
  // Rules required:
  // 1. Min 8 characters
  // 2. 1 number
  // 3. 1 special character
  // Bonus: Uppercase & lowercase
  // ============================================================
  const passwordEvaluation = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: content.strengthNone,
        colorClass: 'bg-slate-200',
        textColorClass: 'text-slate-400',
        progressWidth: '0%',
        hasMinLength: false,
        hasNumber: false,
        hasSpecial: false,
        hasMixedCase: false,
        allRulesMet: false
      };
    }

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password);
    const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

    // Core 3 rules
    const coreRulesPassed = [hasMinLength, hasNumber, hasSpecial].filter(Boolean).length;
    const allRulesMet = hasMinLength && hasNumber && hasSpecial;

    let score = 1;
    let label = content.strengthWeak;
    let colorClass = 'bg-rose-500';
    let textColorClass = 'text-rose-600';
    let progressWidth = '25%';

    if (coreRulesPassed === 1) {
      score = 1;
      label = content.strengthWeak;
      colorClass = 'bg-rose-500';
      textColorClass = 'text-rose-600';
      progressWidth = '25%';
    } else if (coreRulesPassed === 2) {
      score = 2;
      label = content.strengthFair;
      colorClass = 'bg-amber-500';
      textColorClass = 'text-amber-600';
      progressWidth = '50%';
    } else if (coreRulesPassed === 3) {
      if (hasMixedCase && password.length >= 10) {
        score = 4;
        label = content.strengthVeryStrong;
        colorClass = 'bg-emerald-600';
        textColorClass = 'text-emerald-700';
        progressWidth = '100%';
      } else {
        score = 3;
        label = content.strengthStrong;
        colorClass = 'bg-emerald-500';
        textColorClass = 'text-emerald-600';
        progressWidth = '75%';
      }
    }

    return {
      score,
      label,
      colorClass,
      textColorClass,
      progressWidth,
      hasMinLength,
      hasNumber,
      hasSpecial,
      hasMixedCase,
      allRulesMet
    };
  }, [password, content]);

  // Real-time confirm password check
  const confirmStatus = useMemo(() => {
    if (!confirmPassword) return 'empty';
    if (confirmPassword === password) return 'match';
    return 'mismatch';
  }, [password, confirmPassword]);

  // Client-side validation handler
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      newErrors.fullName = content.nameRequired;
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = content.nameShort;
    }

    if (!email.trim()) {
      newErrors.email = content.emailRequired;
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = content.emailInvalid;
    }

    if (!password) {
      newErrors.password = content.passwordRequired;
    } else if (!passwordEvaluation.allRulesMet) {
      newErrors.password = content.passwordRequirementsFailed;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = content.confirmRequired;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = content.confirmMismatch;
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = content.termsRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate async server registration API call
    setTimeout(() => {
      setIsLoading(false);
      
      // If email has "taken" in it, simulate an existing account error
      if (email.toLowerCase().includes('taken')) {
        setSubmitError(
          lang === 'tr' 
            ? 'Bu e-posta adresi zaten kullanımda. Lütfen giriş yapın.' 
            : 'This email address is already registered. Please sign in instead.'
        );
      } else {
        setIsSuccess(true);
      }
    }, 1400);
  };

  // Quick Demo Testing Helpers
  const handleDemoFillStrong = () => {
    setFullName('Elena Rostova');
    setEmail('elena.traveler@companion.ai');
    setPassword('Alpine@Summit2026!');
    setConfirmPassword('Alpine@Summit2026!');
    setAgreeTerms(true);
    setErrors({});
    setSubmitError('');
    setIsSuccess(false);
  };

  const handleDemoFillWeak = () => {
    setFullName('John Doe');
    setEmail('john@example.com');
    setPassword('travel');
    setConfirmPassword('travel');
    setAgreeTerms(true);
    setErrors({});
    setSubmitError('');
    setIsSuccess(false);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
    setErrors({});
    setSubmitError('');
    setIsSuccess(false);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen w-full flex bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* ============================================================ */}
      {/* LEFT COLUMN: Visual & Atmospheric Travel Showcase (Desktop) */}
      {/* ============================================================ */}
      <section 
        className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative flex-col justify-between p-12 overflow-hidden text-white transition-all duration-700 ease-in-out"
        aria-label="Travel Visual Inspiration"
      >
        {/* Dynamic Background Image with Smooth Cross-Transition */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${activeDestination.image})` }}
          aria-hidden="true"
        />

        {/* Sophisticated Dual Gradient Overlay matching Emerald Brand */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-emerald-950/45 backdrop-blur-[1px]"
          aria-hidden="true"
        />

        {/* Glowing Decorative Ambient Blobs */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div 
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top Header on Visual Side */}
        <div className="relative z-10 flex items-center justify-between">
          <div 
            onClick={() => onNavigateToLogin && onNavigateToLogin()}
            className="flex items-center space-x-3 group cursor-pointer"
            title="Go to AI Travel Companion Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-300 to-indigo-500 p-[1.5px] shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-300">
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
            <span>AI-Powered Concierge</span>
          </div>
        </div>

        {/* Center Editorial Showcase & Live Floating Itinerary Preview */}
        <div className="relative z-10 space-y-8 my-auto pt-14 pb-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3 h-3" />
              {activeDestination.tag}
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
              Start your adventure. <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                Let AI guide every step.
              </span>
            </h1>
            <p className="text-slate-300 text-base xl:text-lg leading-relaxed font-normal max-w-lg">
              {activeDestination.tagline} Create your profile in seconds to unlock smart packing recommendations, real-time flight alerts, and bespoke itineraries.
            </p>
          </div>

          {/* Floating Glassmorphism Itinerary Card */}
          <div className="max-w-md rounded-2xl bg-slate-900/65 backdrop-blur-xl border border-white/20 p-5 shadow-2xl space-y-4 transition-all duration-300 hover:border-emerald-400/40 hover:bg-slate-900/80">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  {content.activeItinerary}
                </span>
              </div>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/20 flex items-center gap-1">
                <Plane className="w-3 h-3 text-emerald-400" />
                Instant Generation
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
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                Smart Agent Active
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Destination Switcher Carousel */}
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

        {/* Bottom Social Proof & Trust Metrics */}
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
      {/* RIGHT COLUMN: Modern, Responsive Registration Form           */}
      {/* ============================================================ */}
      <section 
        className="w-full lg:w-1/2 xl:w-5/12 min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-12 xl:p-14 bg-white"
        aria-label="Registration Section"
      >
        {/* Top Header Bar: Mobile Branding & Language Toggle */}
        <div className="w-full flex items-center justify-between pb-4">
          {/* Logo visible for mobile & tablet */}
          <div 
            onClick={() => onNavigateToLogin && onNavigateToLogin()}
            className="flex lg:hidden items-center space-x-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              AI Travel Companion
            </span>
          </div>

          <div className="hidden lg:block">
            {/* Desktop spacer */}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 bg-slate-50/80 transition-colors"
              title="Toggle English / Türkçe"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold uppercase">{lang}</span>
            </button>
          </div>
        </div>

        {/* Central Registration Form / Success State Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {/* SUCCESS STATE VIEW */}
          {isSuccess ? (
            <div className="text-center py-8 space-y-6 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 text-emerald-600 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Passport Issued</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {content.accountCreatedSuccess}
                </h2>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {content.welcomeExplorer}
                </p>
              </div>

              {/* User Confirmation Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left space-y-2 text-xs text-emerald-950">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Explorer Name:</span>
                  <span className="font-bold text-slate-900">{fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Account Email:</span>
                  <span className="font-semibold text-emerald-800">{email}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                  <span className="text-slate-500">Membership Tier:</span>
                  <span className="font-bold text-emerald-700">AI Early Explorer (Free)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToDashboard ? onNavigateToDashboard() : (onNavigateToLogin ? onNavigateToLogin() : null)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{content.goToDashboard}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Create another account
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD REGISTRATION FORM */
            <div>
              {/* Form Header */}
              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{content.badge}</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {content.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {content.subtitle}
                </p>
              </div>

              {/* Interactive State Helper Toolbar for Quick Review & Demo */}
              <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Interactive State Preview:
                  </span>
                  <span className="text-[10px] text-slate-400">Click to autofill</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={handleDemoFillStrong}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all shadow-sm active:scale-95 text-center"
                    title="Fill form with a strong password meeting all rules"
                  >
                    Fill Strong
                  </button>
                  <button
                    type="button"
                    onClick={handleDemoFillWeak}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50/50 transition-all shadow-sm active:scale-95 text-center"
                    title="Fill weak password to see live meter warning"
                  >
                    Test Weak
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLoading((prev) => !prev)}
                    className={`px-2 py-1 text-[11px] font-medium rounded-lg border transition-all shadow-sm active:scale-95 text-center ${
                      isLoading 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-700'
                    }`}
                    title="Toggle button loading spinner"
                  >
                    {isLoading ? 'Stop Spin' : 'Test Load'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-2 py-1 text-[11px] font-medium rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-all shadow-sm active:scale-95 text-center"
                    title="Reset all form fields"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Server / Generic Submit Error Alert */}
              {submitError && (
                <div 
                  role="alert" 
                  className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start justify-between gap-3 animate-fade-in"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-rose-900">Registration Error</p>
                      <p className="text-xs text-rose-700 mt-0.5">{submitError}</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSubmitError('')}
                    className="text-rose-400 hover:text-rose-600 transition-colors p-0.5"
                    aria-label="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* MAIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* 1. FULL NAME FIELD */}
                <div>
                  <label 
                    htmlFor="reg-fullname" 
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    {content.fullNameLabel} <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-fullname"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors((prev) => ({ ...prev, fullName: null }));
                        }
                      }}
                      placeholder={content.fullNamePlaceholder}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                        errors.fullName 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                          : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                      }`}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullname-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. EMAIL ADDRESS FIELD */}
                <div>
                  <label 
                    htmlFor="reg-email" 
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    {content.emailLabel} <span className="text-emerald-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: null }));
                        }
                      }}
                      placeholder={content.emailPlaceholder}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                        errors.email 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                          : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                      }`}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-rose-600 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 3. PASSWORD FIELD WITH REAL-TIME STRENGTH METER */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="reg-password" 
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {content.passwordLabel} <span className="text-emerald-600">*</span>
                    </label>

                    {/* Real-time Dynamic Strength Badge */}
                    {password && (
                      <span className={`text-[11px] font-bold ${passwordEvaluation.textColorClass} transition-colors flex items-center gap-1`}>
                        {passwordEvaluation.allRulesMet ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 opacity-70" />
                        )}
                        {passwordEvaluation.label}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) {
                          setErrors((prev) => ({ ...prev, password: null }));
                        }
                      }}
                      placeholder={content.passwordPlaceholder}
                      className={`w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                        errors.password 
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
                          : passwordEvaluation.allRulesMet
                            ? 'border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                            : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                      }`}
                      aria-invalid={Boolean(errors.password)}
                      aria-describedby="password-rules"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* DYNAMIC PASSWORD STRENGTH METER BAR */}
                  <div className="mt-2.5 space-y-2" id="password-rules">
                    {/* Visual Segmented Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          passwordEvaluation.score >= 1 ? passwordEvaluation.colorClass : 'bg-slate-200'
                        }`}
                        style={{ width: '33.33%' }}
                      />
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          passwordEvaluation.score >= 2 ? passwordEvaluation.colorClass : 'bg-slate-200'
                        }`}
                        style={{ width: '33.33%' }}
                      />
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          passwordEvaluation.score >= 3 ? passwordEvaluation.colorClass : 'bg-slate-200'
                        }`}
                        style={{ width: '33.33%' }}
                      />
                    </div>

                    {/* Dynamic Real-Time Rule Checklist Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1 text-[11px]">
                      {/* Rule 1: Min 8 chars */}
                      <div 
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 ${
                          passwordEvaluation.hasMinLength 
                            ? 'bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60' 
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}
                      >
                        {passwordEvaluation.hasMinLength ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 text-slate-300 flex-shrink-0" />
                        )}
                        <span>{content.ruleMinLength}</span>
                      </div>

                      {/* Rule 2: 1 number */}
                      <div 
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 ${
                          passwordEvaluation.hasNumber 
                            ? 'bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60' 
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}
                      >
                        {passwordEvaluation.hasNumber ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 text-slate-300 flex-shrink-0" />
                        )}
                        <span>{content.ruleNumber}</span>
                      </div>

                      {/* Rule 3: 1 special char */}
                      <div 
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200 ${
                          passwordEvaluation.hasSpecial 
                            ? 'bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60' 
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                        }`}
                      >
                        {passwordEvaluation.hasSpecial ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 text-slate-300 flex-shrink-0" />
                        )}
                        <span>{content.ruleSpecial}</span>
                      </div>
                    </div>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* 4. CONFIRM PASSWORD FIELD */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label 
                      htmlFor="reg-confirm-password" 
                      className="block text-xs font-semibold text-slate-700"
                    >
                      {content.confirmPasswordLabel} <span className="text-emerald-600">*</span>
                    </label>

                    {/* Instant match status indicator */}
                    {confirmStatus === 'match' && (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {content.passwordsMatch}
                      </span>
                    )}
                    {confirmStatus === 'mismatch' && (
                      <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {content.passwordsMismatch}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) {
                          setErrors((prev) => ({ ...prev, confirmPassword: null }));
                        }
                      }}
                      placeholder={content.confirmPasswordPlaceholder}
                      className={`w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50/50 rounded-xl border transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:outline-none ${
                        errors.confirmPassword || confirmStatus === 'mismatch'
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                          : confirmStatus === 'match'
                            ? 'border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                            : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
                      }`}
                      aria-invalid={Boolean(errors.confirmPassword || confirmStatus === 'mismatch')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                      aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* TERMS & PRIVACY CHECKBOX */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        if (errors.agreeTerms) {
                          setErrors((prev) => ({ ...prev, agreeTerms: null }));
                        }
                      }}
                      className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      {content.agreeTermsLabel}{' '}
                      <a href="#terms" onClick={(e) => e.preventDefault()} className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                        {content.termsOfService}
                      </a>{' '}
                      {content.and}{' '}
                      <a href="#privacy" onClick={(e) => e.preventDefault()} className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">
                        {content.privacyPolicy}
                      </a>.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                {/* 5. SUBMIT BUTTON WITH LOADING STATE */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 ${
                      isLoading
                        ? 'bg-emerald-700/80 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/25 active:scale-[0.98]'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{content.signingUpBtn}</span>
                      </>
                    ) : (
                      <>
                        <span>{content.signUpBtn}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* OR DIVIDER */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-400 font-medium">
                    {content.orSignUpWith}
                  </span>
                </div>
              </div>

              {/* SOCIAL BUTTONS (GOOGLE & APPLE) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => alert('Google registration is simulated')}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => alert('Apple registration is simulated')}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.45c.67-.82 1.12-1.96.99-3.11-1 .04-2.14.65-2.81 1.44-.59.69-1.11 1.83-.97 2.95 1.12.09 2.19-.55 2.79-1.28z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>

              {/* 6. SUBTLE LINK BACK TO LOGIN PAGE AT THE BOTTOM */}
              <div className="mt-7 text-center text-xs text-slate-500">
                <span>{content.alreadyHaveAccount} </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToLogin) {
                      onNavigateToLogin();
                    }
                  }}
                  className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-1 ml-0.5"
                >
                  {content.signInLink}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Security Assurance */}
        <div className="w-full flex items-center justify-center gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{content.securityBadge}</span>
        </div>
      </section>
    </main>
  );
}
