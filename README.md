<div align="center">

# 🌍 AI Travel Companion

### *Next-Gen Agentic Travel Intelligence & Bespoke Itinerary Generator*

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-059669?style=for-the-badge)](LICENSE)

<br />

<img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80" alt="AI Travel Companion Banner" width="100%" style="border-radius: 20px; max-height: 420px; object-fit: cover; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);" />

<br />

[✨ Canlı Demo](#-hızlı-başlangıç-quick-start) • [📖 Özellikler](#-temel-özellikler-core-features) • [🛠️ Teknoloji Yığını](#️-teknoloji-yığını-tech-stack) • [📁 Mimari](#-proje-dizin-yapısı-project-structure) • [🚀 Kurulum](#-kurulum-ve-çalıştırma-installation)

</div>

---

## 📌 İçindekiler (Table of Contents)

- [📖 Proje Hakkında (About the Project)](#-proje-hakkında-about-the-project)
- [✨ Temel Özellikler (Core Features)](#-temel-özellikler-core-features)
  - [1. 🧭 Kişiselleştirilmiş Seyahat Paneli](#1--kişiselleştirilmiş-seyahat-paneli-travel-dashboard)
  - [2. 🪄 Çok Adımlı AI Planlama Sihirbazı](#2--çok-adımlı-ai-planlama-sihirbazı-multi-step-planner-wizard)
  - [3. 🗺️ Kapsamlı Seyahat Detayları & AI Sonuç Sayfası](#3-️-kapsamlı-seyahat-detayları--ai-sonuç-sayfası-trip-details-page)
  - [4. 🔐 Kimlik Doğrulama & Dinamik Şifre Güç Ölçer](#4--kimlik-doğrulama--güvenlik-auth-flow)
  - [5. 🌐 Temiz URL Mimarisi (No Hash)](#5--temiz-url-mimarisi-clean-urls)
- [🛠️ Teknoloji Yığını (Tech Stack)](#️-teknoloji-yığını-tech-stack)
- [📁 Proje Dizin Yapısı (Project Structure)](#-proje-dizin-yapısı-project-structure)
- [🚀 Kurulum ve Çalıştırma (Installation)](#-kurulum-ve-çalıştırma-installation)
- [🎨 Tasarım Sistemi & Renk Paleti (Design System)](#-tasarım-sistemi--renk-paleti-design-system)
- [📄 Lisans (License)](#-lisans-license)

---

## 📖 Proje Hakkında (About the Project)

**AI Travel Companion**, modern gezginlerin seyahat planlama deneyimini baştan tanımlayan yapay zeka destekli bir web uygulamasıdır. 

Zümrüt yeşili (**emerald**) marka paleti, **glassmorphism** kart tasarımları, **Framer Motion** destekli yumuşak mikro-geçişler ve yüksek çözünürlüklü seyahat görselleri ile kullanıcıyı ilk bakışta etkileyecek üst düzey bir arayüz sunar.

> [!TIP]
> Uygulama tamamen **duyarlıdır (responsive)**; mobil, tablet ve masaüstü ekran boyutlarına kusursuz şekilde uyum sağlar.

---

## ✨ Temel Özellikler (Core Features)

### 1. 🧭 Kişiselleştirilmiş Seyahat Paneli (Travel Dashboard)
- **Kullanıcıya Özel Karşılama**: *"Hello, mehmet! Where are we going next?"* karşılaması, aktif otonom seyahat rozeti ve anlık istatistik sayaçları (*3 Aktif Rota, 4 Destinasyon, %99.4 AI İsabeti*).
- **Yüksek Dönüşümlü CTA**: Yüzen harita ve yapay zeka ikonuna sahip göz alıcı *"Plan a New Trip"* butonu.
- **Seyahat Kartları Izgarası**:
  - `● Ongoing` (canlı yeşil nabız efekti), `📅 Upcoming`, `✓ Past` durum etiketleri.
  - Kart üzerinde hava durumu hapı, kompakt rota özeti ve dinamik akıllı bavul ilerleme çubuğu.
- **Zarif Boş Durum (Empty State)**: Liste boşaldığında devreye giren pasaport ilham kartı ve tek tıkla rotayı dolduran ilham hapları (*Santorini, Bali, Banff*).
- **Gerçek Zamanlı Arama & Filtreleme**: Kategori sekmeleri (*Tümü, Yaklaşan, Devam Eden, Geçmiş*) ve canlı metin araması.

---

### 2. 🪄 Çok Adımlı AI Planlama Sihirbazı (Multi-Step Planner Wizard)
**Framer Motion** destekli yatay kayma ve opasite animasyonlarına sahip 5 adımlı sihirbaz:
- **Adım 1: Nereye ve Ne Zaman?**: Otomatik tamamlamalı (mock autocomplete) akıllı arama girdisi, popüler öneri hapları ve süre hesaplayıcılı tarih seçici.
- **Adım 2: Bütçe Profili**: Üç premium seçilebilir kart (*Economic - $50-$110/gün*, *Balanced - $160-$290/gün [Most Popular]*, *Luxury - $450+/gün*).
- **Adım 3: Yolcu Detayları**: Yetişkin ve çocuk sayaçları; çocuk eklendiğinde puset ve aile rotalarının otomatik dahil edilmesi.
- **Adım 4: İlgi Alanları**: Çoklu seçim ızgarası (*Gastronomi, Tarih, Doğa, Gece Hayatı, Macera, Alışveriş, Wellness, Fotoğrafçılık*).
- **Adım 5: Özet & Onay**: Rota blueprint özeti ve yüksek kontrastlı *"Generate AI Travel Plan"* butonu.
- **Dinamik Yükleme Ekranı**: Dönen holografik pusula, dolan ilerleme çubuğu ve ardışık değişen (fade-in / fade-out) yapay zeka durum mesajları.

---

### 3. 🗺️ Kapsamlı Seyahat Detayları & AI Sonuç Sayfası (Trip Details Page)
Masaüstünde **yapışkan dikey menü (sticky vertical sidebar)**, mobilde **kaydırılabilir yatay sekme çubuğu (sliding tab bar)**:
- **📍 Route**: Saat, konum, süre, maliyet ve **🍜 Şef Önerili Yerel Yemek Tavsiyeleri** içeren dikey zaman çizelgesi (vertical timeline).
- **🧳 Luggage**: Tıklanıp işaretlenebilen etkileşimli onay kutuları, anlık CSS ilerleme çubuğu, kategori filtreleri ve özel eşya ekleme alanı.
- **💳 Budget**: Konaklama, Yeme-İçme, Ulaşım ve Aktiviteler kategorilerinde CSS ilerleme çubukları, döviz kuru dönüşümü ve AI tasarruf tüyoları.
- **🚨 Emergency & Locals**: 24/7 yerel acil numaralar (Polis 110, Ambulans 119, Turist Danışma) ve **fonetik okunuş kılavuzlu Japonca pratik ifadeler tablosu** (tek tıkla panoya kopyalama).
- **🌧️ Weather Backup**: Olası yağmurlu günlerde açık hava rotalarının yerine anında eklenebilen kapalı mekan alternatifleri (*Kyoto Manga Müzesi, Kapalı Nishiki Pazarı, Kurama Onsen, Wagashi Tatlı Atölyesi*).
- **👶 Child-Friendly Mode**: Üst başlıktaki anahtar açıldığında otomatik olarak devreye giren puset dostu yollar ve çocuk aktiviteleri kartı (*Tren simülatörü, maymun parkı, ninja dojosu*).

---

### 4. 🔐 Kimlik Doğrulama & Güvenlik (Auth Flow)
- **Kayıt Sayfası (RegisterPage)**:
  - Ad Soyad, E-posta, Şifre ve Şifre Tekrarı.
  - **Gerçek Zamanlı Dinamik Şifre Güç Ölçer (Password Strength Meter)**:
    - Minimum 8 karakter
    - En az 1 rakam (0-9)
    - En az 1 özel karakter (!@#$...)
    - Çok kademeli renkli ilerleme çubuğu ve anlık kontrol rozetleri.
  - Şifre eşleşme kontrolü (mismatch / match bildirimleri).
  - Yükleme durumlu (spinner) kayıt butonu ve dijital pasaport başarı ekranı.
- **Giriş Sayfası (LoginPage)**:
  - Atmosferik arka plan görselleri (Amalfi, Kyoto, Zermatt).
  - Dil değiştirici (İngilizce / Türkçe).
  - Hızlı demo test butonları (*Fill Valid, Test Error, Test Loading*).

---

### 5. 🌐 Temiz URL Mimarisi (Clean URLs)
- URL'lerde `#` (hash) işareti kullanılmaz. **HTML5 History API** (`pushState` / `popstate`) mimarisi ile temiz adresleme desteklenir:
  - `/dashboard` — Ana Seyahat Paneli
  - `/itinerary` — Seyahat Detayları ve AI Rota Sayfası
  - `/wizard` — Çok Adımlı AI Planlama Sihirbazı
  - `/login` — Giriş Ekranı
  - `/register` — Kayıt Ekranı

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Teknoloji | Versiyon | Görev / Kullanım Alanı |
|---|---|---|
| **React** | `18.3.1` | Çekirdek UI kütüphanesi & State yönetimi |
| **Tailwind CSS** | `3.4.17` | Zümrüt yeşili tasarım sistemi, glassmorphism, responsive grid |
| **Framer Motion** | `11.x` | Sihirbaz adım geçişleri, animasyonlu yükleme modalı |
| **Lucide React** | `1.16.0` | Modern ve tutarlı vektör ikon seti |
| **Vite** | `5.4.11` | Hızlı geliştirme sunucusu ve optimize edilmiş derleme |

---

## 📁 Proje Dizin Yapısı (Project Structure)

```plaintext
AI Travel Companion/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx            # Kişiselleştirilmiş seyahat paneli & kartlar
│   │   ├── TravelPlannerWizard.jsx  # Framer Motion destekli çok adımlı planlama sihirbazı
│   │   ├── TripDetailsPage.jsx      # Zaman çizelgesi, bavul, bütçe ve acil durum sekme sayfası
│   │   ├── LoginPage.jsx            # Atmosferik seyahat giriş sayfası
│   │   └── RegisterPage.jsx         # Şifre güç ölçerli modern kayıt sayfası
│   ├── App.jsx                      # Temiz URL yönlendirmesi & paylaşılan state
│   ├── index.css                    # Tailwind yönergeleri ve özel kaydırma çubuğu
│   └── main.jsx                     # React DOM giriş noktası
├── index.html                       # HTML5 şablonu ve Plus Jakarta Sans fontu
├── tailwind.config.js               # Marka renk paleti ('brand' emerald tonları)
├── vite.config.js                   # Vite konfigürasyonu
├── package.json                     # Bağımlılıklar ve npm betikleri
└── README.md                        # Proje dokümantasyonu
```

---

## 🚀 Kurulum ve Çalıştırma (Installation)

### Gereksinimler
- [Node.js](https://nodejs.org/) (v18.x veya üzeri önerilir)
- [Git](https://git-scm.com/)

### Kurulum Adımları

```powershell
# 1. Depoyu klonlayın
git clone https://github.com/KULLANICI_ADINIZ/AI-Travel-Companion.git

# 2. Proje dizinine gidin
cd "AI Travel Companion"

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

> [!NOTE]
> Geliştirme sunucusu varsayılan olarak `http://localhost:5173/` portunda başlar.

### Derleme (Production Build)

```powershell
npm run build
```

---

## 🎨 Tasarım Sistemi & Renk Paleti (Design System)

Uygulama, güven veren ve keşif duygusu uyandıran zümrüt yeşili (**emerald**) temeline oturmaktadır:

- **Primary (Zümrüt Yeşili)**: `#10b981` (Emerald 500), `#059669` (Emerald 600), `#047857` (Emerald 700)
- **Secondary (Teal / Deniz Yeşili)**: `#14b8a6` (Teal 500), `#0f766e` (Teal 700)
- **Neutral (Slate & Arka Plan)**: `#f8fafc` (Slate 50), `#0f172a` (Slate 900), `#020617` (Slate 950)
- **Tipografi**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts)

---

## 📄 Lisans (License)

Bu proje [MIT](LICENSE) lisansı altında sunulmaktadır.
Dilediğiniz gibi kullanabilir, geliştirebilir ve katkıda bulunabilirsiniz.

<div align="center">

**Geliştirici dostu • Otonom AI destekli • Modern seyahat deneyimi**

⭐ Beğendiyseniz repoya yıldız vermeyi unutmayın!

</div>
