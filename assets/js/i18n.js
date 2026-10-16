/**
 * StreamPulse - Lightweight Internationalization (i18n) Engine
 * Supported Languages: English (en, default), Indonesian (id)
 * Easily extensible for more languages.
 */

const I18N_STORAGE_KEY = 'streampulse_language';

const translations = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_popular: 'Popular',
    nav_latest: 'Latest',
    nav_categories: 'Categories',
    nav_generate: '+ Add Video',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_privacy: 'Privacy Policy',
    nav_terms: 'Terms of Service',
    search_placeholder: 'Search videos, tags, categories...',
    search_button: 'Search',
    search_results_for: 'Search results for:',
    no_results_found: 'No videos found matching your search.',
    quick_search: 'Quick Search',

    // Generator & Add Video
    generate_title: 'Video Generator & Add Post',
    generate_desc: 'Instantly convert Videy.co links or direct video URLs into StreamPulse players (//v/?id=...).',
    paste_video_url_label: 'Video Stream URL',
    paste_video_url_placeholder: 'e.g. https://cdn.videy.co/Ky4smNE51.mp4 or YouTube link',
    video_title_label: 'Video Title',
    video_category_label: 'Category',
    video_thumbnail_label: 'Thumbnail URL (Optional)',
    generate_button: 'Generate Player Link',
    generated_player_url: 'Generated Player URL',
    play_now_btn: 'Watch Now',
    copy_player_link_btn: 'Copy Player URL',
    save_local_btn: 'Save to My Videos (Instant)',
    code_for_github: 'Code Snippet for assets/js/videos.js (Permanent GitHub Hosting)',
    how_to_add_title: 'How to Add New Videos',
    my_saved_videos: 'My Generated & Added Videos',

    // Sections & Titles
    featured_video: 'Featured Spotlight',
    trending_now: 'Trending Now',
    popular_videos: 'Popular Videos',
    latest_videos: 'Latest Uploads',
    recommended_categories: 'Browse Categories',
    all_categories: 'All Categories',
    category_label: 'Category',
    views_label: 'views',
    duration_label: 'Duration',
    watch_now: 'Watch Now',
    load_more: 'Load More',
    no_more_videos: 'All videos loaded',
    loading: 'Loading stream...',

    // Sorting
    sort_by: 'Sort By',
    sort_popular: 'Most Popular',
    sort_newest: 'Newest First',
    sort_oldest: 'Oldest First',
    sort_views: 'Most Viewed',
    filter_all: 'All',

    // Player Page
    random_recommendation: 'Recommended Article For You',
    read_article: 'Read Insight',
    download_hd: 'Download HD',
    download_hd_sub: 'Fast Direct Server',
    join_private: 'Join VIP Private',
    join_private_sub: 'Exclusive Community Access',
    continue_reading: 'Continue Reading & Insights',
    more_videos: 'More Like This',
    video_not_found: 'Video Not Found',
    video_not_found_desc: 'The requested video may have been removed or the URL link is invalid.',
    back_to_home: 'Return to Home',
    share: 'Share',
    copied_to_clipboard: 'Link copied to clipboard!',
    published_on: 'Published on',
    tags_label: 'Tags',
    source_label: 'Source',
    ad_in_player: 'Advertisement',
    close_ad: 'Close Ad',
    ad_notice: 'Sponsored Adsterra Placement',

    // Player fallback (CORS / CDN load failure)
    playback_failed: 'This video source cannot be played directly in the browser. Open the original source or use the download button below.',
    open_source: 'Open Video Source',
    loading_stream: 'Loading stream...',

    // Ad Placements
    ad_placeholder_title: 'Adsterra Ad Placement Slot',
    ad_placeholder_desc: 'Configure your official publisher tag in assets/js/ads.js',

    // Export & GitHub Pages
    export_zip_button: 'Download GitHub Pages ZIP',
    export_zip_tooltip: 'Export ready-to-deploy static files for GitHub Pages',

    // Footer
    footer_desc: 'StreamPulse is a lightweight, mobile-first video streaming web platform built for high-performance static hosting on GitHub Pages.',
    quick_links: 'Quick Links',
    legal: 'Legal & Info',
    all_rights_reserved: 'All rights reserved.',
    developed_for: 'Built for GitHub Pages'
  },
  id: {
    // Navigasi
    nav_home: 'Beranda',
    nav_popular: 'Populer',
    nav_latest: 'Terbaru',
    nav_categories: 'Kategori',
    nav_generate: '+ Tambah Video',
    nav_about: 'Tentang Kami',
    nav_contact: 'Kontak',
    nav_privacy: 'Kebijakan Privasi',
    nav_terms: 'Syarat & Ketentuan',
    search_placeholder: 'Cari video, tag, kategori...',
    search_button: 'Cari',
    search_results_for: 'Hasil pencarian untuk:',
    no_results_found: 'Tidak ada video yang cocok dengan pencarian Anda.',
    quick_search: 'Pencarian Cepat',

    // Generator & Tambah Video
    generate_title: 'Generator Video & Tambah Postingan',
    generate_desc: 'Ubah tautan Videy.co atau URL video langsung menjadi pemutar StreamPulse (//v/?id=...) secara instan.',
    paste_video_url_label: 'URL Stream Video',
    paste_video_url_placeholder: 'contoh: https://cdn.videy.co/Ky4smNE51.mp4 atau link YouTube',
    video_title_label: 'Judul Video',
    video_category_label: 'Kategori',
    video_thumbnail_label: 'URL Gambar Thumbnail (Opsional)',
    generate_button: 'Generate Tautan Pemutar',
    generated_player_url: 'Tautan Pemutar Tergenerate',
    play_now_btn: 'Tonton Sekarang',
    copy_player_link_btn: 'Salin URL Pemutar',
    save_local_btn: 'Simpan ke Koleksi Saya (Instan)',
    code_for_github: 'Cuplikan Kode untuk assets/js/videos.js (Permanen di GitHub)',
    how_to_add_title: 'Cara Menambahkan Video Baru',
    my_saved_videos: 'Video yang Telah Digenerate & Ditambahkan',

    // Bagian & Judul
    featured_video: 'Sorotan Utama',
    trending_now: 'Sedang Tren',
    popular_videos: 'Video Populer',
    latest_videos: 'Video Terbaru',
    recommended_categories: 'Jelajahi Kategori',
    all_categories: 'Semua Kategori',
    category_label: 'Kategori',
    views_label: 'penayangan',
    duration_label: 'Durasi',
    watch_now: 'Tonton Sekarang',
    load_more: 'Muat Lebih Banyak',
    no_more_videos: 'Semua video telah dimuat',
    loading: 'Memuat streaming...',

    // Pengurutan
    sort_by: 'Urutkan Berdasarkan',
    sort_popular: 'Paling Populer',
    sort_newest: 'Terbaru',
    sort_oldest: 'Terlama',
    sort_views: 'Paling Banyak Dilihat',
    filter_all: 'Semua',

    // Halaman Pemutar
    random_recommendation: 'Artikel Rekomendasi Untuk Anda',
    read_article: 'Baca Ulasan',
    download_hd: 'Unduh HD',
    download_hd_sub: 'Server Langsung Cepat',
    join_private: 'Gabung VIP Privat',
    join_private_sub: 'Akses Komunitas Eksklusif',
    continue_reading: 'Lanjutkan Membaca & Artikel Terkait',
    more_videos: 'Video Serupa Lainnya',
    video_not_found: 'Video Tidak Ditemukan',
    video_not_found_desc: 'Video yang diminta mungkin telah dihapus atau tautan URL tidak valid.',
    back_to_home: 'Kembali ke Beranda',
    share: 'Bagikan',
    copied_to_clipboard: 'Tautan berhasil disalin!',
    published_on: 'Diterbitkan pada',
    tags_label: 'Tag',
    source_label: 'Sumber',
    ad_in_player: 'Iklan',
    close_ad: 'Tutup Iklan',
    ad_notice: 'Penempatan Iklan Adsterra Resmi',

    // Fallback pemutar (kegagalan CORS / CDN)
    playback_failed: 'Sumber video ini tidak dapat diputar langsung di browser. Buka sumber asli atau gunakan tombol unduh di bawah.',
    open_source: 'Buka Sumber Video',
    loading_stream: 'Memuat stream...',

    // Penempatan Iklan
    ad_placeholder_title: 'Slot Penempatan Iklan Adsterra',
    ad_placeholder_desc: 'Konfigurasikan tag penayang resmi Anda di assets/js/ads.js',

    // Ekspor & GitHub Pages
    export_zip_button: 'Unduh ZIP GitHub Pages',
    export_zip_tooltip: 'Ekspor berkas statis siap pakai untuk GitHub Pages',

    // Footer
    footer_desc: 'StreamPulse adalah platform web streaming video ringan yang dioptimalkan untuk seluler dan hosting statis di GitHub Pages.',
    quick_links: 'Tautan Cepat',
    legal: 'Hukum & Info',
    all_rights_reserved: 'Hak cipta dilindungi.',
    developed_for: 'Dibuat untuk GitHub Pages'
  }
};

let currentLanguage = 'en';

/**
 * Get current selected language
 */
function getLanguage() {
  return currentLanguage;
}

/**
 * Translate a key with fallback to English
 */
function t(key, fallback = '') {
  if (translations[currentLanguage] && translations[currentLanguage][key]) {
    return translations[currentLanguage][key];
  }
  if (translations['en'] && translations['en'][key]) {
    return translations['en'][key];
  }
  return fallback || key;
}

/**
 * Set and persist language
 */
function setLanguage(lang) {
  if (!translations[lang]) {
    console.warn(`[i18n] Language "${lang}" not found. Falling back to "en".`);
    lang = 'en';
  }
  currentLanguage = lang;
  try {
    localStorage.setItem(I18N_STORAGE_KEY, lang);
  } catch (e) {
    // localStorage might be unavailable in restricted environments
  }
  document.documentElement.setAttribute('lang', lang);
  updateDOMTranslations();

  // Dispatch event so other components can re-render if needed
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Scan DOM and update elements with data-i18n and data-i18n-placeholder
 */
function updateDOMTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.setAttribute('placeholder', t(key));
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.setAttribute('title', t(key));
    }
  });

  // Update active status on language selector buttons/selects
  document.querySelectorAll('.lang-select-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLanguage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const langSelect = document.getElementById('lang-select');
  if (langSelect && langSelect.value !== currentLanguage) {
    langSelect.value = currentLanguage;
  }
}

/**
 * Initialize i18n on page load
 */
function initI18n() {
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem(I18N_STORAGE_KEY) || 'en';
  } catch (e) {
    savedLang = 'en';
  }

  // Check browser language if not set
  if (!localStorage.getItem(I18N_STORAGE_KEY)) {
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('id')) {
      savedLang = 'id';
    }
  }

  setLanguage(savedLang);
}

// Auto init when script loads or DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}

// Export functions to window
window.t = t;
window.getLanguage = getLanguage;
window.setLanguage = setLanguage;
window.updateDOMTranslations = updateDOMTranslations;
