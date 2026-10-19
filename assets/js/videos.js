/**
 * StreamPulse - Official Videos Catalog & Intelligent Parser Engine
 * 
 * ============================================================================
 * PANDUAN CARA MENAMBAHKAN VIDEO / POSTINGAN BARU KE WEB INI (VIDEOS_DATA)
 * ============================================================================
 * 
 * Web StreamPulse mendukung 2 jenis video:
 * 1. VIDEO YOUTUBE (PUBLIK & RESMI):
 *    - Tampil di seluruh halaman publik: Beranda, Popular, Latest, Kategori, & Pencarian.
 *    - Mendukung thumbnail resolusi tinggi otomatis dari YouTube.
 *    - Menampilkan lencana kualitas HD / 1080p / 4K rapih.
 * 
 * 2. VIDEO CDN / DIRECT STREAM (PRIVAT):
 *    - Mendukung seluruh CDN: videy.co, xxxfollow.com, twimg.com (Twitter/X), dan direct MP4.
 *    - Sesuai aturan: SUMBER DARI CDN TIDAK DITAMPILKAN DI HALAMAN UTAMA / BERANDA.
 *    - Khusus untuk akses pemutar langsung via tautan privat: //v/?id=ID atau //v/?src=URL.
 * 
 * CONTOH MENAMBAHKAN VIDEO YOUTUBE (TAMPIL DI BERANDA & WEB UTAMA):
 * {
 *   id: 'yt-R6MlUcmOul8',
 *   slug: 'tears-of-steel-4k',
 *   title: 'Tears of Steel: Futuristic Cyberpunk Odyssey in 4K',
 *   description: 'Sinematografi fiksi ilmiah siber di masa depan distopia.',
 *   thumbnail: 'https://img.youtube.com/vi/R6MlUcmOul8/maxresdefault.jpg',
 *   sourceType: 'youtube',
 *   directVideoUrl: '',
 *   embedUrl: 'https://www.youtube-nocookie.com/embed/R6MlUcmOul8',
 *   downloadUrl: '',
 *   joinPrivateUrl: 'https://t.me/streampulse_vip',
 *   category: 'Action & Cinema',
 *   tags: ['4K UHD', 'Cyberpunk', 'Sci-Fi'],
 *   duration: '12:14',
 *   quality: '4K UHD',
 *   publishedAt: '2026-10-12',
 *   featured: true,
 *   isPublic: true,
 *   popularity: 98,
 *   views: 485000
 * },
 * 
 * CONTOH MENAMBAHKAN VIDEO CDN (PRIVAT, HANYA DIPUTAR VIA LINK PLAYER):
 * {
 *   id: 'Ky4smNE51',
 *   slug: 'videy-ky4smne51',
 *   title: 'Videy Stream: Ky4smNE51 HD Video',
 *   description: 'Stream langsung dari CDN Videy.',
 *   thumbnail: '/assets/images/thumb-videy-ky4smne51.svg',
 *   sourceType: 'cdn',
 *   directVideoUrl: 'https://cdn.videy.co/Ky4smNE51.mp4',
 *   embedUrl: 'https://videy.co/v?id=Ky4smNE51',
 *   downloadUrl: 'https://cdn.videy.co/Ky4smNE51.mp4',
 *   joinPrivateUrl: 'https://t.me/streampulse_vip',
 *   category: 'Tech & AI',
 *   tags: ['Videy', 'CDN', 'HD'],
 *   duration: 'Stream HD',
 *   quality: '1080p HD',
 *   publishedAt: '2026-10-12',
 *   featured: false,
 *   isPublic: false, // Tidak tampil di halaman utama
 *   popularity: 80,
 *   views: 12000
 * },
 * ============================================================================
 */

const VIDEOS_DATA = [
  // ==========================================================================
  // 1. VIDEO PUBLIK RESMI (HANYA DARI YOUTUBE SOURCE YANG TAMPIL DI WEB UTAMA)
  //    All video IDs verified embeddable via YouTube oEmbed API.
  //    Source: official studio channels (Warner Bros, Universal, Paramount,
  //    Marvel, Disney, Blender Foundation, NASA, 3Blue1Brown).
  // ==========================================================================
  {
    id: 'R6MlUcmOul8',
    slug: 'tears-of-steel-sci-fi-odyssey',
    title: 'Tears of Steel: Futuristic Cyberpunk Odyssey in 4K',
    description: 'Di masa depan distopia Amsterdam, pejuang siber dan ilmuwan holografik berusaha merekonstruksi mercusuar memori untuk menghentikan invasi robotik. Film pendek open-source dari Blender Foundation.',
    thumbnail: 'https://img.youtube.com/vi/R6MlUcmOul8/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/R6MlUcmOul8',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Action & Cinema',
    tags: ['Sci-Fi', 'Cyberpunk', 'VFX', 'Blender'],
    duration: '12:14',
    quality: '4K UHD',
    publishedAt: '2026-10-15',
    featured: true,
    isPublic: true,
    popularity: 99,
    views: 485200,
    relatedArticleIds: ['art-01', 'art-03']
  },
  {
    id: 'aqz-KE-bpKQ',
    slug: 'big-buck-bunny-animation-classic',
    title: 'Big Buck Bunny: The Classic Forest Adventure [4K 60FPS]',
    description: 'Kelinci raksasa yang ramah menghadapi hewan-hewan nakal di hutan dalam animasi legendaris beresolusi tinggi 4K 60FPS dari Blender Foundation.',
    thumbnail: 'https://img.youtube.com/vi/aqz-KE-bpKQ/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Animation',
    tags: ['Animation', 'Comedy', '4K UHD', 'Family'],
    duration: '09:56',
    quality: '4K UHD',
    publishedAt: '2026-10-14',
    featured: true,
    isPublic: true,
    popularity: 96,
    views: 612400,
    relatedArticleIds: ['art-02', 'art-04']
  },
  // === MOVIE TRAILERS (verified embeddable from official studio channels) ===
  {
    id: 'n9xhJrPXop4',
    slug: 'dune-2021-official-trailer',
    title: 'Dune (2021) — Official Trailer | Warner Bros.',
    description: 'Paul Atreides, pemuda berbakat yang lahir dengan takdir luar biasa, harus melakukan perjalanan ke planet paling berbahaya di alam semesta untuk memastikan masa depan keluarga dan rakyatnya. Sutradara: Denis Villeneuve. Pemeran: Timothée Chalamet, Rebecca Ferguson, Oscar Isaac.',
    thumbnail: 'https://img.youtube.com/vi/n9xhJrPXop4/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/n9xhJrPXop4',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Dune', 'Sci-Fi', 'Warner Bros', 'Trailer'],
    duration: '03:13',
    quality: '1080p HD',
    publishedAt: '2026-10-15',
    featured: true,
    isPublic: true,
    popularity: 98,
    views: 24500000,
    relatedArticleIds: ['art-01', 'art-03']
  },
  {
    id: 'Way9Dexny3w',
    slug: 'dune-part-two-official-trailer',
    title: 'Dune: Part Two — Official Trailer | Warner Bros.',
    description: 'Paul Atreides bersatu dengan Chani dan Fremen dalam perjalanan balas dendam melawan konspirator yang menghancurkan keluarganya. Menghadapi pilihan antara cinta dan takdir alam semesta, ia berusaha mencegah masa depan mengerikan yang hanya dia yang bisa lihat.',
    thumbnail: 'https://img.youtube.com/vi/Way9Dexny3w/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Dune', 'Sci-Fi', 'Warner Bros', 'Trailer', '2024'],
    duration: '03:09',
    quality: '1080p HD',
    publishedAt: '2026-10-14',
    featured: true,
    isPublic: true,
    popularity: 97,
    views: 31200000,
    relatedArticleIds: ['art-01', 'art-03']
  },
  {
    id: 'mqqft2x_Aa4',
    slug: 'the-batman-main-trailer',
    title: 'THE BATMAN — Main Trailer | Warner Bros.',
    description: 'Dalam tahun kedua Bruce Wayne sebagai Batman, ia menelusuri korupsi di Gotham yang terhubung ke masa lalunya sendiri saat pembunuh beruntun Riddler menargetkan elit kota. Sutradara: Matt Reeves. Pemeran: Robert Pattinson, Zoë Kravitz, Paul Dano.',
    thumbnail: 'https://img.youtube.com/vi/mqqft2x_Aa4/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Batman', 'DC', 'Warner Bros', 'Trailer'],
    duration: '02:35',
    quality: '1080p HD',
    publishedAt: '2026-10-13',
    featured: true,
    isPublic: true,
    popularity: 95,
    views: 28900000,
    relatedArticleIds: ['art-03', 'art-01']
  },
  {
    id: 'uYPbbksJxIg',
    slug: 'oppenheimer-new-trailer',
    title: 'Oppenheimer — New Trailer | Universal Pictures',
    description: 'Cerita tentang fisikawan Amerika J. Robert Oppenheimer dan perannya dalam pengembangan bom atom. Sutradara: Christopher Nolan. Pemeran: Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.',
    thumbnail: 'https://img.youtube.com/vi/uYPbbksJxIg/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Oppenheimer', 'Nolan', 'Universal', 'Trailer', '2023'],
    duration: '03:00',
    quality: '1080p HD',
    publishedAt: '2026-10-12',
    featured: false,
    isPublic: true,
    popularity: 94,
    views: 19500000,
    relatedArticleIds: ['art-01', 'art-05']
  },
  {
    id: 'avz06PDqDbM',
    slug: 'mission-impossible-dead-reckoning-trailer',
    title: 'Mission: Impossible — Dead Reckoning | Official Trailer | Paramount',
    description: 'Ethan Hunt dan tim IMF harus melacak senjata mengerikan yang mengancam kemanusiaan sebelum jatuh ke tangan yang salah. Tom Cruise kembali sebagai Ethan Hunt dalam aksi paling berbahaya.',
    thumbnail: 'https://img.youtube.com/vi/avz06PDqDbM/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/avz06PDqDbM',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Mission Impossible', 'Tom Cruise', 'Paramount', 'Trailer'],
    duration: '02:32',
    quality: '1080p HD',
    publishedAt: '2026-10-11',
    featured: false,
    isPublic: true,
    popularity: 93,
    views: 17800000,
    relatedArticleIds: ['art-03', 'art-04']
  },
  {
    id: 'TcMBFSGVi1c',
    slug: 'avengers-endgame-official-trailer',
    title: 'Marvel Studios Avengers: Endgame — Official Trailer',
    description: 'Setelah peristiwa yang menghancurkan di Infinity War, Avengers yang tersisa berkumpul untuk mengembalikan tata tertib alam semesta satu kali lagi. Pemeran: Robert Downey Jr., Chris Evans, Scarlett Johansson.',
    thumbnail: 'https://img.youtube.com/vi/TcMBFSGVi1c/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Avengers', 'Marvel', 'Superhero', 'Trailer'],
    duration: '02:25',
    quality: '1080p HD',
    publishedAt: '2026-10-10',
    featured: false,
    isPublic: true,
    popularity: 92,
    views: 142000000,
    relatedArticleIds: ['art-04', 'art-01']
  },
  {
    id: 'QwievZ1Tx-8',
    slug: 'avengers-infinity-war-official-trailer',
    title: 'Marvel Studios Avengers: Infinity War — Official Trailer',
    description: 'Avengers dan Guardians of the Galaxy bersatu untuk menghentikan Thanos dari mengumpulkan enam Infinity Stones yang kuat. Pertempuran terbesar Marvel hingga kini.',
    thumbnail: 'https://img.youtube.com/vi/QwievZ1Tx-8/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/QwievZ1Tx-8',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Avengers', 'Marvel', 'Thanos', 'Superhero', 'Trailer'],
    duration: '02:25',
    quality: '1080p HD',
    publishedAt: '2026-10-09',
    featured: false,
    isPublic: true,
    popularity: 91,
    views: 235000000,
    relatedArticleIds: ['art-04', 'art-01']
  },
  {
    id: 'zAGVQLHvwOY',
    slug: 'joker-final-trailer-warner-bros',
    title: 'JOKER — Final Trailer | Warner Bros.',
    description: 'Komedian yang gagal Arthur Fleck perlahan kehilangan pegangan pada realitasasnya saat ia menjelma menjadi ikon kekerasan dan kekacauan di Gotham City. Sutradara: Todd Phillips. Pemeran: Joaquin Phoenix.',
    thumbnail: 'https://img.youtube.com/vi/zAGVQLHvwOY/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Joker', 'DC', 'Warner Bros', 'Trailer'],
    duration: '02:24',
    quality: '1080p HD',
    publishedAt: '2026-10-08',
    featured: false,
    isPublic: true,
    popularity: 89,
    views: 89300000,
    relatedArticleIds: ['art-03', 'art-04']
  },
  {
    id: 'iV46TJKL8cU',
    slug: 'disney-snow-white-official-trailer',
    title: 'Disney Snow White — Official Trailer | In Theaters March 21',
    description: 'Kisah klasik donggeng Snow White dibuat ulang dalam film live-action dari Disney. Pemeran: Rachel Zegler sebagai Snow White, Gal Gadot sebagai Evil Queen.',
    thumbnail: 'https://img.youtube.com/vi/iV46TJKL8cU/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/iV46TJKL8cU',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Disney', 'Snow White', 'Fairy Tale', 'Trailer'],
    duration: '02:18',
    quality: '1080p HD',
    publishedAt: '2026-10-07',
    featured: false,
    isPublic: true,
    popularity: 87,
    views: 13400000,
    relatedArticleIds: ['art-02', 'art-04']
  },
  {
    id: '2LqzF5WauAw',
    slug: 'interstellar-original-theatrical-trailer',
    title: 'Interstellar (2014) — Original Theatrical Trailer | Paramount Movies',
    description: 'Sekelompok penjelajah melakukan perjalanan melewati lubang cacing dalam upaya untuk memastikan kelangsungan hidup manusia. Sutradara: Christopher Nolan. Pemeran: Matthew McConaughey, Anne Hathaway, Jessica Chastain.',
    thumbnail: 'https://img.youtube.com/vi/2LqzF5WauAw/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/2LqzF5WauAw',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Movie Trailers',
    tags: ['Interstellar', 'Sci-Fi', 'Nolan', 'Paramount', 'Trailer'],
    duration: '02:34',
    quality: '1080p HD',
    publishedAt: '2026-10-06',
    featured: false,
    isPublic: true,
    popularity: 90,
    views: 21500000,
    relatedArticleIds: ['art-01', 'art-05']
  },
  // === Existing verified non-trailer content ===
  {
    id: 'TLkA0RELQ1g',
    slug: 'elephants-dream-steampunk-surrealism',
    title: 'Elephants Dream: Surreal Steampunk Clockwork World [HD]',
    description: 'Dunia mesin jam steampunk raksasa yang terus berputar, mengeksplorasi batas ilusi dan realitas mesin mekanik. Film pendek open-source pertama dari Blender Foundation.',
    thumbnail: 'https://img.youtube.com/vi/TLkA0RELQ1g/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/TLkA0RELQ1g',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Animation',
    tags: ['Steampunk', 'CGI', 'Surreal', 'Blender'],
    duration: '10:54',
    quality: '1080p HD',
    publishedAt: '2026-10-05',
    featured: false,
    isPublic: true,
    popularity: 86,
    views: 184000,
    relatedArticleIds: ['art-02', 'art-04']
  },
  {
    id: 'aircAruvnKk',
    slug: 'neural-networks-deep-learning-explained',
    title: 'But What Is a Neural Network? | Deep Learning Chapter 1 — 3Blue1Brown',
    description: 'Penjelasan visual mendalam tentang cara kerja neural network dengan animasi matematika yang jelas. Bab pertama dari seri deep learning oleh Grant Sanderson (3Blue1Brown).',
    thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Tech & AI',
    tags: ['Neural Network', 'Machine Learning', '3Blue1Brown', 'Education'],
    duration: '19:13',
    quality: '1080p HD',
    publishedAt: '2026-10-04',
    featured: false,
    isPublic: true,
    popularity: 85,
    views: 16900000,
    relatedArticleIds: ['art-05', 'art-03']
  },
  {
    id: 'LXb3EKWsInQ',
    slug: 'costa-rica-4k-wildlife-nature',
    title: 'Costa Rica in 4K 60FPS HDR: Rain Forest Wildlife & Pristine Oceans',
    description: 'Rekaman sinematik keanekaragaman hayati hutan hujan tropis dan satwa eksotis dengan warna ultra dinamis 60 frame per detik oleh Jacob & Katie Schwarz.',
    thumbnail: 'https://img.youtube.com/vi/LXb3EKWsInQ/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Nature & 4K',
    tags: ['Nature', '4K UHD', 'Wildlife', '60FPS', 'HDR'],
    duration: '15:20',
    quality: '4K UHD',
    publishedAt: '2026-10-03',
    featured: false,
    isPublic: true,
    popularity: 84,
    views: 6250000,
    relatedArticleIds: ['art-01', 'art-03']
  },
  {
    id: '21X5lGlDOfg',
    slug: 'nasa-live-earth-from-space',
    title: 'NASA Live: Official Stream of NASA TV — Earth from Space',
    description: 'Siaran langsung resmi NASA menampilkan pemandangan Bumi dari Stasiun Luar Angkasa Internasional (ISS), termasuk aurora, cahaya kota di malam hari, dan bentangan lautan.',
    thumbnail: 'https://img.youtube.com/vi/21X5lGlDOfg/hqdefault.jpg',
    sourceType: 'youtube',
    directVideoUrl: '',
    embedUrl: 'https://www.youtube.com/embed/21X5lGlDOfg',
    downloadUrl: '',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Nature & 4K',
    tags: ['NASA', 'Space', 'ISS', 'Live Stream', 'Earth'],
    duration: 'Live',
    quality: '1080p HD',
    publishedAt: '2026-10-02',
    featured: false,
    isPublic: true,
    popularity: 83,
    views: 8900000,
    relatedArticleIds: ['art-01', 'art-05']
  },

  // ==========================================================================
  // 2. VIDEO CDN / DIRECT STREAM PRIVAT (TIDAK DITAMPILKAN DI HALAMAN UTAMA)
  //    Tetap 100% didukung dan dapat diputar langsung via //v/?id=ID
  // ==========================================================================
  {
    id: 'Ky4smNE51',
    slug: 'videy-ky4smne51-stream',
    title: 'Videy Stream: Ky4smNE51 HD Video',
    description: 'Video streaming definisi tinggi langsung dari CDN Videy. Buffer cepat, responsif di ponsel, dan dilengkapi tombol Download HD direct stream.',
    thumbnail: '/assets/images/thumb-videy-ky4smne51.svg',
    sourceType: 'cdn',
    directVideoUrl: 'https://cdn.videy.co/Ky4smNE51.mp4',
    embedUrl: 'https://videy.co/v?id=Ky4smNE51',
    downloadUrl: 'https://cdn.videy.co/Ky4smNE51.mp4',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Tech & AI',
    tags: ['Videy', 'CDN', '1080p HD', 'Mobile Stream'],
    duration: 'Stream HD',
    quality: '1080p HD',
    publishedAt: '2026-10-12',
    featured: false,
    isPublic: false, // Tidak tampil di halaman utama / beranda
    popularity: 99,
    views: 45200,
    relatedArticleIds: ['art-01', 'art-05']
  },
  {
    id: '1823603',
    slug: 'xxxfollow-1823603-stream',
    title: 'CDN Stream: xxxfollow 1823603 Media Stream',
    description: 'Direct MP4 stream hosted on xxxfollow fan media CDN. Buffer optimal, direct MP4 playback, no-referrer support.',
    thumbnail: '', // dynamically generated branded thumbnail
    sourceType: 'cdn',
    directVideoUrl: 'https://www.xxxfollow.com/media/fans/post_public/4532/45324791/1823603.mp4',
    embedUrl: '',
    downloadUrl: 'https://www.xxxfollow.com/media/fans/post_public/4532/45324791/1823603.mp4',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Lifestyle',
    tags: ['CDN', '1080p HD', 'Direct MP4', 'Mobile Video'],
    duration: 'Direct Stream',
    quality: '1080p HD',
    publishedAt: '2026-10-12',
    featured: false,
    isPublic: false, // Tidak tampil di halaman utama / beranda
    popularity: 90,
    views: 23100,
    relatedArticleIds: ['art-01', 'art-05']
  },
  {
    id: 'ND-wN9PYlv3ThapC',
    slug: 'twitter-twimg-amplify-stream',
    title: 'Twitter X Stream: Amplify 720x1280 Vertical Video',
    description: 'Mobile vertical video stream (720x1280) from video.twimg.com CDN with tag parameter. Full responsive portrait video playback.',
    thumbnail: '', // dynamically generated branded thumbnail
    sourceType: 'cdn',
    directVideoUrl: 'https://video.twimg.com/amplify_video/2108647717345841152/vid/avc1/720x1280/ND-wN9PYlv3ThapC.mp4?tag=29',
    embedUrl: '',
    downloadUrl: 'https://video.twimg.com/amplify_video/2108647717345841152/vid/avc1/720x1280/ND-wN9PYlv3ThapC.mp4?tag=29',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Esports',
    tags: ['Twitter', 'CDN', 'Vertical', '720p HD'],
    duration: 'Mobile HD',
    quality: '720p HD',
    isVertical: true,
    publishedAt: '2026-10-12',
    featured: false,
    isPublic: false, // Tidak tampil di halaman utama / beranda
    popularity: 88,
    views: 31200,
    relatedArticleIds: ['art-04', 'art-05']
  },
  {
    id: '4FJUYtI1WMtoCBXC',
    slug: 'twitter-twimg-amplify-1080-square',
    title: 'Twitter X Stream: Amplify 1080x1080 Square Video',
    description: 'Square 1:1 video stream (1080x1080) hosted on video.twimg.com CDN. Optimized HTML5 playback with no-referrer policy and graceful fallback UI for restrictive CDNs.',
    thumbnail: '', // dynamically generated branded thumbnail
    sourceType: 'cdn',
    directVideoUrl: 'https://video.twimg.com/amplify_video/2109928632860983296/vid/avc1/1080x1080/4FJUYtI1WMtoCBXC.mp4?tag=29',
    embedUrl: '',
    downloadUrl: 'https://video.twimg.com/amplify_video/2109928632860983296/vid/avc1/1080x1080/4FJUYtI1WMtoCBXC.mp4?tag=29',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Lifestyle',
    tags: ['Twitter', 'CDN', 'Square 1:1', '1080p HD'],
    duration: 'Square HD',
    quality: '1080p HD',
    isVertical: false, // 1080x1080 is square, not vertical — keep 16:9 wrapper
    publishedAt: '2026-10-12',
    featured: false,
    isPublic: false, // Tidak tampil di halaman utama / beranda
    popularity: 91,
    views: 27800,
    relatedArticleIds: ['art-01', 'art-04']
  },
  {
    id: 'vid-direct-sample',
    slug: 'sample-direct-mp4',
    title: 'Sample Direct MP4 High-Speed Buffer Showcase',
    description: 'High-speed HTML5 buffer demonstration on common cloud storage.',
    thumbnail: '', // dynamically generated branded thumbnail
    sourceType: 'cdn',
    directVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    embedUrl: '',
    downloadUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    joinPrivateUrl: 'https://t.me/streampulse_vip',
    category: 'Tech & AI',
    tags: ['Sample', 'Direct MP4', '1080p HD'],
    duration: '00:15',
    quality: '1080p HD',
    publishedAt: '2026-10-10',
    featured: false,
    isPublic: false,
    popularity: 70,
    views: 8900
  }
];

/**
 * Editorial Articles Data
 * Used for random recommendations above the player and "Continue Reading" section.
 */
const ARTICLES_DATA = [
  {
    id: 'art-01',
    title: 'How Next-Gen Video Codecs Deliver 4K at Half the Bitrate on Mobile',
    excerpt: 'AV1 and VVC are revolutionizing mobile streaming efficiency. Discover how advanced entropy encoding and hardware acceleration allow crystal-clear playback on cellular networks.',
    category: 'Tech & AI',
    readTime: '4 min read',
    publishedAt: '2026-10-11',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    relatedVideoId: 'R6MlUcmOul8'
  },
  {
    id: 'art-02',
    title: 'The Evolution of Open-Source Animation Pipelines in Modern Studios',
    excerpt: 'From humble beginnings to Hollywood blockbusters, open tools like Blender are transforming digital storytelling with real-time viewport raytracing and physics simulation.',
    category: 'Animation',
    readTime: '6 min read',
    publishedAt: '2026-10-09',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    relatedVideoId: 'aqz-KE-bpKQ'
  },
  {
    id: 'art-03',
    title: 'Cinematography Secrets: Framing Low-Light Cyberpunk Aesthetics',
    excerpt: 'Why high-contrast neon lighting and anamorphic lenses create such visceral emotional resonance in modern science-fiction film productions.',
    category: 'Action & Cinema',
    readTime: '5 min read',
    publishedAt: '2026-10-08',
    thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    relatedVideoId: 'mqqft2x_Aa4'
  },
  {
    id: 'art-04',
    title: 'The Psychology of Esports Clutches: How Champions Manage Heart Rates',
    excerpt: 'Biometric telemetry shows pro gamers sustaining 160+ BPM during 1v3 clutch situations while maintaining sub-150 millisecond reaction times.',
    category: 'Esports',
    readTime: '5 min read',
    publishedAt: '2026-10-07',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    relatedVideoId: 'TcMBFSGVi1c'
  },
  {
    id: 'art-05',
    title: 'Static Hosting on Server: Architectural Secrets for Ultra Speed',
    excerpt: 'How zero-server web architectures achieve sub-500ms First Contentful Paint times with client-side caching, vector icons, and lazy media pipelines.',
    category: 'Tech & AI',
    readTime: '7 min read',
    publishedAt: '2026-10-05',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    relatedVideoId: 'aircAruvnKk'
  }
];

const CUSTOM_VIDEOS_STORAGE_KEY = 'streampulse_custom_videos';

/**
 * Retrieve user-generated custom videos from localStorage
 */
function getCustomVideos() {
  try {
    const raw = localStorage.getItem(CUSTOM_VIDEOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('[videos.js] Error reading custom videos:', e);
  }
  return [];
}

/**
 * Save a custom video to localStorage
 */
function saveCustomVideo(videoObj) {
  if (!videoObj || !videoObj.id) return false;
  const list = getCustomVideos();
  const filtered = list.filter((v) => v.id !== videoObj.id);
  filtered.unshift(videoObj);
  try {
    localStorage.setItem(CUSTOM_VIDEOS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('videosUpdated', { detail: { video: videoObj } }));
    return true;
  } catch (e) {
    console.error('[videos.js] Failed to save custom video:', e);
    return false;
  }
}

/**
 * Delete a custom video from localStorage
 */
function deleteCustomVideo(id) {
  if (!id) return false;
  const list = getCustomVideos();
  const filtered = list.filter((v) => v.id !== id);
  try {
    localStorage.setItem(CUSTOM_VIDEOS_STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('videosUpdated', { detail: { deletedId: id } }));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Format Quality Badge (HD, 1080p, 4K)
 * Menggantikan label html5 menjadi label resolusi profesional
 */
function formatQualityBadge(video) {
  if (!video) return '1080p HD';
  if (video.quality && video.quality.trim()) return video.quality;
  const tagsStr = (video.tags || []).join(' ').toLowerCase();
  const titleStr = (video.title || '').toLowerCase();
  if (tagsStr.includes('4k') || titleStr.includes('4k')) return '4K UHD';
  if (tagsStr.includes('1080') || titleStr.includes('1080') || titleStr.includes('remaster')) return '1080p HD';
  if (tagsStr.includes('720') || titleStr.includes('720') || (video.isVertical)) return '720p HD';
  return '1080p HD';
}

/**
 * Generator Thumbnail Branded Khusus StreamPulse
 * Menghasilkan SVG / Data URL berkualitas tinggi beresolusi 640x360
 * yang seragam dengan identitas gelap neon web StreamPulse.
 *
 * Versi 2: thumbnail benar-benar merefleksikan isi video — bukan placeholder generik.
 * - Background warna ditentukan oleh source (twimg/xxxfollow/videy/youtube/direct)
 * - Layout thumbnail berubah berdasarkan orientasi (square/vertical/landscape)
 * - Badge kualitas, kategori, dan durasi tampil jelas
 * - Title, source CDN, dan ID terlihat di info bar bawah
 */
function generateBrandedThumbnailSvg(title, id, category, video) {
  // Normalize inputs
  const safeTitle = (title || 'StreamPulse Video')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const safeId = (id || 'VID').replace(/[^a-zA-Z0-9_-]/g, '');
  const safeCategory = (category || '1080P HD').toUpperCase()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Pull metadata from optional video object — this is what makes the thumbnail
  // actually reflect the video content instead of being a generic placeholder.
  const meta = video || {};
  const sourceType = (meta.sourceType || 'cdn').toLowerCase();
  const directUrl = (meta.directVideoUrl || '').toLowerCase();
  const isVertical = !!meta.isVertical;
  const isSquare = !isVertical && (
    directUrl.includes('1080x1080') ||
    directUrl.includes('720x720') ||
    directUrl.includes('480x480')
  );

  // Detect source CDN for branding
  let sourceLabel = 'CDN STREAM';
  let sourceAccent = '#8B5CF6'; // purple default
  if (directUrl.includes('twimg.com') || directUrl.includes('twitter.com') || directUrl.includes('x.com')) {
    sourceLabel = 'TWITTER / X';
    sourceAccent = '#1DA1F2';
  } else if (directUrl.includes('xxxfollow.com')) {
    sourceLabel = 'XXXFOLLOW CDN';
    sourceAccent = '#FF3366';
  } else if (directUrl.includes('videy.co')) {
    sourceLabel = 'VIDEY CDN';
    sourceAccent = '#10B981';
  } else if (sourceType === 'youtube') {
    sourceLabel = 'YOUTUBE';
    sourceAccent = '#FF0000';
  } else if (directUrl) {
    sourceLabel = 'DIRECT MP4';
    sourceAccent = '#F59E0B';
  }

  // Quality label
  const qualityLabel = (meta.quality || (isVertical ? '720P HD' : '1080P HD')).toUpperCase();

  // Duration label
  const durationLabel = (meta.duration || 'STREAM HD').toString().toUpperCase();

  // Display title (truncate to fit)
  const displayTitle = safeTitle.length > 42 ? safeTitle.slice(0, 39) + '...' : safeTitle;

  // Oriented label
  const orientationLabel = isVertical ? 'VERTICAL' : (isSquare ? 'SQUARE 1:1' : 'LANDSCAPE 16:9');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" fill="none">
  <defs>
    <linearGradient id="bg-grad-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0d1a" />
      <stop offset="50%" stop-color="#14142d" />
      <stop offset="100%" stop-color="#060812" />
    </linearGradient>
    <linearGradient id="neon-${safeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF3366" />
      <stop offset="100%" stop-color="${sourceAccent}" />
    </linearGradient>
    <radialGradient id="glow-${safeId}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${sourceAccent}" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="src-bar-${safeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${sourceAccent}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="${sourceAccent}" stop-opacity="0.55" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="640" height="360" fill="url(#bg-grad-${safeId})" />
  <circle cx="320" cy="180" r="230" fill="url(#glow-${safeId})" />

  <!-- High-tech subtle grid pattern -->
  <path d="M0 60 H640 M0 120 H640 M0 180 H640 M0 240 H640 M0 300 H640" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />
  <path d="M80 0 V360 M160 0 V360 M240 0 V360 M320 0 V360 M400 0 V360 M480 0 V360 M560 0 V360" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1" />

  <!-- Neon Frame Border Accent -->
  <rect x="14" y="14" width="612" height="332" rx="14" fill="none" stroke="url(#neon-${safeId})" stroke-width="1.5" stroke-opacity="0.5" />

  <!-- Source CDN Top Bar (colored strip indicating which CDN this video is from) -->
  <g transform="translate(14, 14)">
    <rect width="612" height="6" rx="3" fill="url(#src-bar-${safeId})" />
  </g>

  <!-- StreamPulse Brand Pill (Top Left) -->
  <g transform="translate(28, 36)">
    <rect width="134" height="26" rx="13" fill="#111728" stroke="#25304d" stroke-width="1" />
    <circle cx="14" cy="13" r="5" fill="#FF3366" />
    <text x="28" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">STREAMPULSE</text>
  </g>

  <!-- Source CDN Badge (Top Right) -->
  <g transform="translate(478, 36)">
    <rect width="148" height="26" rx="6" fill="#1e183a" stroke="${sourceAccent}" stroke-width="1.5" />
    <text x="74" y="17" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="${sourceAccent}" letter-spacing="0.8">${sourceLabel}</text>
  </g>

  <!-- Category Pill (Left, below brand) -->
  <g transform="translate(28, 72)">
    <rect width="${(safeCategory.length * 7) + 22}" height="22" rx="11" fill="#0c1020" stroke="#25304d" stroke-width="1" />
    <text x="11" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#94A3B8" letter-spacing="0.4">${safeCategory}</text>
  </g>

  <!-- Orientation Pill (Right, below source) -->
  <g transform="translate(510, 72)">
    <rect width="116" height="22" rx="11" fill="#0c1020" stroke="#25304d" stroke-width="1" />
    <text x="58" y="15" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="700" fill="#94A3B8" letter-spacing="0.6">${orientationLabel}</text>
  </g>

  <!-- Glowing Center Play Emblem -->
  <g transform="translate(320, 165)">
    <circle cx="0" cy="0" r="50" fill="#0c101d" stroke="url(#neon-${safeId})" stroke-width="3" />
    <path d="M-11 -16 L15 0 L-11 16 Z" fill="url(#neon-${safeId})" />
  </g>

  <!-- Lower Title & Info Bar with Glassmorphism -->
  <g transform="translate(14, 252)">
    <rect width="612" height="94" rx="12" fill="#0c1020" fill-opacity="0.88" stroke="#25304d" stroke-width="1" />

    <!-- Title -->
    <text x="24" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">${displayTitle}</text>

    <!-- Subtitle: source + orientation + ID -->
    <text x="24" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">${sourceLabel} &bull; ${orientationLabel} &bull; ID: ${safeId}</text>

    <!-- Duration label -->
    <text x="24" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="${sourceAccent}" letter-spacing="0.6">DURATION: ${durationLabel}</text>

    <!-- Quality Pill (Bottom Right) -->
    <rect x="500" y="52" width="92" height="28" rx="6" fill="url(#neon-${safeId})" />
    <text x="546" y="70" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="0.6">${qualityLabel}</text>
  </g>
</svg>`;
}

/**
 * Resolve the best thumbnail URL for a video object.
 * Priority order:
 *   1. Explicit `thumbnail` field that is a real remote URL (http/https/data:)
 *      — local SVG paths under /assets/images/thumb-*.svg are ignored because
 *      the original repo shipped malformed SVGs that trigger the onerror
 *      fallback. We replace them with dynamic branded thumbnails.
 *   2. YouTube official thumbnail (for sourceType === 'youtube')
 *   3. Generated branded thumbnail (data URL) — reflects actual video metadata
 *
 * The placeholder-thumbnail.svg is NEVER used for CDN videos anymore; instead
 * each video gets a unique generated thumbnail that shows its source CDN,
 * orientation, category, and quality — so users can tell at a glance what
 * kind of video a card represents.
 */
function resolveVideoThumbnail(video) {
  if (!video) return '/assets/images/placeholder-thumbnail.svg';

  // 1. Explicit thumbnail — but ONLY trust real remote URLs (http/https/data:).
  // Local SVG paths like '/assets/images/thumb-*.svg' are skipped because the
  // original repo shipped malformed SVGs that fail to render.
  const explicit = video.thumbnail;
  if (explicit) {
    const isHttp = explicit.startsWith('http://') || explicit.startsWith('https://');
    const isData = explicit.startsWith('data:');
    if (isHttp || isData) {
      return explicit;
    }
    // Skip local SVG paths — fall through to dynamic generation
  }

  // 2. YouTube official thumbnail (preferred for YouTube videos — real screenshot)
  if (video.sourceType === 'youtube' && video.id && video.id.length === 11) {
    return 'https://img.youtube.com/vi/' + video.id + '/hqdefault.jpg';
  }

  // 3. Generated branded thumbnail reflecting actual video content
  try {
    return generateBrandedThumbnailDataUrl(video.title, video.id, video.category, video);
  } catch (e) {
    return '/assets/images/placeholder-thumbnail.svg';
  }
}

function generateBrandedThumbnailDataUrl(title, id, category, video) {
  const svg = generateBrandedThumbnailSvg(title, id, category, video);
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/**
 * Intelligent URL parser: converts raw links (YouTube, Videy, xxxfollow, twimg, direct MP4)
 * into a structured video object.
 */
function parseVideoInputUrl(rawUrl, customMeta = {}) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const url = rawUrl.trim();

  let id = '';
  let sourceType = 'cdn';
  let directVideoUrl = '';
  let embedUrl = '';
  let downloadUrl = '';
  let defaultTitle = 'Custom Stream Video';
  let defaultCategory = customMeta.category || 'Tech & AI';
  let isPublic = false; // Default: CDN tidak tampil di publik!
  let quality = '1080p HD';
  let isVertical = false;
  let detectedThumbnail = '';

  // 1. YOUTUBE LINK (e.g. watch?v=, youtu.be/, embed/, shorts/)
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const ytMatch = url.match(/(?:watch\?v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/i);
    if (ytMatch) {
      id = ytMatch[1];
      sourceType = 'youtube';
      isPublic = true; // YOUTUBE TAMPIL DI WEB UTAMA!
      embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
      directVideoUrl = '';
      downloadUrl = '';
      defaultTitle = `YouTube Video [${id}]`;
      quality = '1080p HD';
      detectedThumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    }
  }
  // 2. VIDEY CDN: https://cdn.videy.co/Ky4smNE51.mp4 or https://videy.co/v?id=Ky4smNE51
  else if (url.includes('videy.co')) {
    const videyCdnMatch = url.match(/cdn\.videy\.co\/([a-zA-Z0-9_-]+)\.(mp4|webm|mov)/i);
    const vQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
    const vPathMatch = url.match(/videy\.co\/(?:v\/)?([a-zA-Z0-9_-]+)/i);
    id = (videyCdnMatch && videyCdnMatch[1]) || (vQueryMatch && vQueryMatch[1]) || (vPathMatch && vPathMatch[1]) || '';
    if (id) {
      sourceType = 'cdn';
      isPublic = false; // CDN tidak tampil di web publik
      directVideoUrl = `https://cdn.videy.co/${id}.mp4`;
      embedUrl = `https://videy.co/v?id=${id}`;
      downloadUrl = `https://cdn.videy.co/${id}.mp4`;
      defaultTitle = `Videy Stream [${id}]`;
      quality = '1080p HD';
      detectedThumbnail = '/assets/images/thumb-videy-ky4smne51.svg';
    }
  }
  // 3. XXXFOLLOW CDN: https://www.xxxfollow.com/media/fans/post_public/4532/45324791/1823603.mp4
  else if (url.includes('xxxfollow.com')) {
    const fileMatch = url.match(/\/([0-9a-zA-Z_-]+)\.mp4/i);
    id = fileMatch ? fileMatch[1] : 'xxxfollow-' + Date.now().toString(36);
    sourceType = 'cdn';
    isPublic = false; // CDN tidak tampil di web publik
    directVideoUrl = url;
    downloadUrl = url;
    defaultTitle = `xxxfollow Stream [${id}]`;
    quality = '1080p HD';
    detectedThumbnail = '/assets/images/placeholder-thumbnail.svg';
  }
  // 4. TWITTER / X / TWIMG CDN: https://video.twimg.com/amplify_video/2108647717345841152/vid/avc1/720x1280/ND-wN9PYlv3ThapC.mp4?tag=29
  //    Also handles square (1080x1080) and landscape (1280x720) variants.
  else if (url.includes('twimg.com') || url.includes('twitter.com') || url.includes('x.com')) {
    const nameMatch = url.match(/\/([0-9a-zA-Z_-]+)\.mp4/i);
    id = nameMatch ? nameMatch[1] : 'tw-' + Date.now().toString(36);
    sourceType = 'cdn';
    isPublic = false; // CDN tidak tampil di web publik
    directVideoUrl = url;
    downloadUrl = url;
    defaultTitle = `Twitter X Stream [${id}]`;
    // Detect orientation from the resolution token in the URL path.
    // Format pattern: /vid/avc1/<WIDTH>x<HEIGHT>/<filename>.mp4
    const resMatch = url.match(/\/vid\/(?:avc1|hev1|h264)\/(\d{3,4})x(\d{3,4})\//i);
    if (resMatch) {
      const w = parseInt(resMatch[1], 10);
      const h = parseInt(resMatch[2], 10);
      if (h > w) {
        // Portrait / vertical (e.g. 720x1280, 1080x1920)
        isVertical = true;
        quality = '720p HD';
      } else if (w === h) {
        // Square (e.g. 1080x1080) — keep 16:9 wrapper, no vertical class
        isVertical = false;
        quality = '1080p HD';
      } else {
        // Landscape (e.g. 1280x720, 1920x1080)
        isVertical = false;
        quality = '1080p HD';
      }
    } else {
      // Fallback heuristic: detect common vertical resolutions in URL string
      isVertical = url.includes('720x1280') || url.includes('1080x1920') || url.includes('480x854');
      quality = isVertical ? '720p HD' : '1080p HD';
    }
    detectedThumbnail = '/assets/images/placeholder-thumbnail.svg';
  }
  // 5. DIRECT MP4 / WEBM / M3U8 / MOV / OGG (Generic CDN)
  else if (/\.(mp4|webm|ogg|m4v|m3u8|mov)(\?.*)?$/i.test(url)) {
    const cleanPath = url.split('?')[0];
    const filenameMatch = cleanPath.split('/').pop().replace(/\.[^.]+$/, '');
    id = (filenameMatch || 'cdn-' + Date.now().toString(36)).replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 32);
    sourceType = 'cdn';
    isPublic = false; // CDN tidak tampil di web publik
    directVideoUrl = url;
    downloadUrl = url;
    defaultTitle = `Direct CDN Stream [${id}]`;
    quality = '1080p HD';
    detectedThumbnail = '/assets/images/placeholder-thumbnail.svg';
  }
  // 6. Raw ID directly (e.g. "Ky4smNE51" or YouTube 11 chars)
  else if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    // 11 chars matches YouTube video ID
    id = url;
    sourceType = 'youtube';
    isPublic = true;
    embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
    defaultTitle = `YouTube Video [${id}]`;
    quality = '1080p HD';
    detectedThumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  } else if (/^[a-zA-Z0-9_-]{4,32}$/.test(url)) {
    // Videy short ID
    id = url;
    sourceType = 'cdn';
    isPublic = false;
    directVideoUrl = `https://cdn.videy.co/${id}.mp4`;
    embedUrl = `https://videy.co/v?id=${id}`;
    downloadUrl = `https://cdn.videy.co/${id}.mp4`;
    defaultTitle = `Videy Stream [${id}]`;
    quality = '1080p HD';
    detectedThumbnail = '/assets/images/thumb-videy-ky4smne51.svg';
  }
  // 7. Generic Fallback
  else {
    id = 'custom-' + Date.now().toString(36);
    sourceType = 'embed';
    embedUrl = url;
    isPublic = false;
    defaultTitle = `Embedded Stream [${id}]`;
    quality = 'HD';
    detectedThumbnail = '/assets/images/placeholder-thumbnail.svg';
  }

  const finalTitle = customMeta.title || defaultTitle;
  const finalCategory = customMeta.category || defaultCategory;

  // Thumbnail handling — uses the new resolveVideoThumbnail helper so CDN
  // videos get a dynamic branded thumbnail that reflects their actual content
  // (source CDN, orientation, quality) instead of a generic placeholder.
  let finalThumbnail = customMeta.thumbnail || detectedThumbnail;
  if (!finalThumbnail) {
    if (sourceType === 'youtube') {
      finalThumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    // For CDN videos, leave finalThumbnail empty — resolveVideoThumbnail will
    // generate a dynamic branded thumbnail at render time using the video's
    // metadata. This is what fixes the "thumbnail tidak sesuai isi video" issue.
  }

  const generatedVideo = {
    id: id,
    slug: (customMeta.slug || id).toLowerCase(),
    title: finalTitle,
    description: customMeta.description || `High-definition stream playback for ${id}. Fast buffer and responsive player controls.`,
    thumbnail: finalThumbnail,
    sourceType: sourceType,
    directVideoUrl: directVideoUrl,
    embedUrl: embedUrl,
    downloadUrl: customMeta.downloadUrl || downloadUrl,
    joinPrivateUrl: customMeta.joinPrivateUrl || 'https://t.me/streampulse_vip',
    category: finalCategory,
    tags: customMeta.tags || [quality, finalCategory, sourceType.toUpperCase()],
    duration: customMeta.duration || (sourceType === 'youtube' ? '12:00' : 'Stream HD'),
    quality: customMeta.quality || quality,
    isVertical: isVertical,
    publishedAt: new Date().toISOString().split('T')[0],
    featured: Boolean(customMeta.featured),
    isPublic: customMeta.isPublic !== undefined ? customMeta.isPublic : isPublic,
    popularity: 90,
    views: Math.floor(Math.random() * 20000) + 1200,
    relatedArticleIds: ['art-01', 'art-05']
  };

  // Final safety net: resolve thumbnail dynamically if still empty
  if (!generatedVideo.thumbnail && typeof resolveVideoThumbnail === 'function') {
    generatedVideo.thumbnail = resolveVideoThumbnail(generatedVideo);
  }

  return generatedVideo;
}

/**
 * Return all videos (Catalog + User Saved)
 */
function getAllVideos() {
  const custom = getCustomVideos();
  return [...custom, ...VIDEOS_DATA];
}

/**
 * ATURAN UTAMA:
 * "untuk source dari cdn jangan tampilkan di web atau halaman utama web ini."
 * "untuk video yang tambil di publik atau halaman utama web ini hanya dari youtube source."
 * 
 * Hanya video dari sumber YouTube yang berstatus publik yang ditampilkan
 * di halaman utama, Beranda, Popular, Latest, Kategori, dan Pencarian!
 */
function getPublicVideos() {
  const all = getAllVideos();
  return all.filter((v) => {
    const isYouTube = v.sourceType === 'youtube';
    const isPublic = v.isPublic !== false;
    return isYouTube && isPublic;
  });
}

/**
 * Resolve video by ID or direct URL parameter
 * Mendukung pencarian video publik maupun pemutaran langsung video CDN
 */
function getVideoById(id) {
  if (!id) return null;
  const decodedId = decodeURIComponent(id).trim();

  // 1. Direct URL passed as ID: ?id=https://...
  if (decodedId.startsWith('http://') || decodedId.startsWith('https://')) {
    return parseVideoInputUrl(decodedId);
  }

  // 2. Base64 encoded URL: ?id=b64_...
  //    The generator (g/index.html buildPlayerPath) encodes the full source
  //    URL with btoa(unescape(encodeURIComponent(url))) so the player page
  //    can recover the original twimg / xxxfollow / videy / direct MP4 URL
  //    on ANY browser — even if the video is NOT in localStorage or catalog.
  //    Symmetric decode: decodeURIComponent(escape(atob(b64))).
  if (decodedId.startsWith('b64_')) {
    try {
      const raw = atob(decodedId.slice(4));
      // Reverse the unescape(encodeURIComponent(...)) trick used by the
      // generator. For pure-ASCII URLs (twimg etc.) this is a no-op; for
      // non-ASCII URLs it correctly restores the original Unicode chars.
      const decodedUrl = decodeURIComponent(escape(raw));
      return parseVideoInputUrl(decodedUrl);
    } catch (e) {
      // Fallback: maybe it was encoded with plain btoa() (no Unicode trick).
      try {
        const decodedUrl = atob(decodedId.slice(4));
        return parseVideoInputUrl(decodedUrl);
      } catch (e2) {}
    }
  }

  // 3. Search in all catalog & localStorage (termasuk video CDN privat)
  const all = getAllVideos();
  const found = all.find((v) => v.id === decodedId || v.slug === decodedId || v.id.toLowerCase() === decodedId.toLowerCase());
  if (found) return found;

  // 4. Dynamic ON-THE-FLY RESOLUTION:
  // Videy ID (misal: Ky4smNE51)
  if (/^[a-zA-Z0-9_-]{5,15}$/.test(decodedId)) {
    return {
      id: decodedId,
      slug: decodedId.toLowerCase(),
      title: `Videy Stream: ${decodedId}`,
      description: `Video definisi tinggi diputar langsung dari Videy CDN (${decodedId}). Buffer cepat dan tombol unduh HD.`,
      thumbnail: '/assets/images/thumb-videy-ky4smne51.svg',
      sourceType: 'cdn',
      directVideoUrl: `https://cdn.videy.co/${decodedId}.mp4`,
      embedUrl: `https://videy.co/v?id=${decodedId}`,
      downloadUrl: `https://cdn.videy.co/${decodedId}.mp4`,
      joinPrivateUrl: 'https://t.me/streampulse_vip',
      category: 'Tech & AI',
      tags: ['Videy', 'CDN', '1080p HD'],
      duration: 'Stream HD',
      quality: '1080p HD',
      publishedAt: new Date().toISOString().split('T')[0],
      featured: false,
      isPublic: false,
      popularity: 88,
      views: 14200,
      relatedArticleIds: ['art-01', 'art-05'],
      isDynamic: true
    };
  }

  // YouTube ID fallback (11 karakter)
  if (/^[a-zA-Z0-9_-]{11}$/.test(decodedId)) {
    return {
      id: decodedId,
      slug: `yt-${decodedId}`.toLowerCase(),
      title: `YouTube Video [${decodedId}]`,
      description: `Pemutar video resmi YouTube beresolusi tinggi.`,
      thumbnail: `https://img.youtube.com/vi/${decodedId}/hqdefault.jpg`,
      sourceType: 'youtube',
      directVideoUrl: '',
      embedUrl: `https://www.youtube-nocookie.com/embed/${decodedId}`,
      downloadUrl: '',
      joinPrivateUrl: 'https://t.me/streampulse_vip',
      category: 'Action & Cinema',
      tags: ['YouTube', '1080p HD'],
      duration: '1080p HD',
      quality: '1080p HD',
      publishedAt: new Date().toISOString().split('T')[0],
      featured: false,
      isPublic: true,
      popularity: 85,
      views: 25000,
      relatedArticleIds: ['art-01', 'art-03'],
      isDynamic: true
    };
  }

  return null;
}

function getVideoBySlug(slug) {
  if (!slug) return null;
  const all = getAllVideos();
  return all.find((v) => v.slug === slug || v.id === slug) || getVideoById(slug);
}

/**
 * Filter functions for Public Views:
 * Semua fungsi katalog ini memakai getPublicVideos() (hanya YouTube source)
 */
function getFeaturedVideos() {
  const publicVids = getPublicVideos();
  const featured = publicVids.filter((v) => v.featured);
  return featured.length > 0 ? featured : publicVids.slice(0, 1);
}

function getPopularVideos(limit = 10) {
  return [...getPublicVideos()].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

function getLatestVideos(limit = 10) {
  return [...getPublicVideos()]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

function getCategories() {
  const catSet = new Set();
  getPublicVideos().forEach((v) => {
    if (v.category) catSet.add(v.category);
  });
  return Array.from(catSet);
}

function getVideosByCategory(category) {
  const publicVids = getPublicVideos();
  if (!category || category === 'All') return publicVids;
  return publicVids.filter((v) => v.category.toLowerCase() === category.toLowerCase());
}

function searchVideos(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return getPublicVideos().filter((v) => {
    const titleMatch = v.title && v.title.toLowerCase().includes(q);
    const descMatch = v.description && v.description.toLowerCase().includes(q);
    const catMatch = v.category && v.category.toLowerCase().includes(q);
    const tagMatch = v.tags && v.tags.some((tag) => tag.toLowerCase().includes(q));
    const idMatch = v.id && v.id.toLowerCase().includes(q);
    return titleMatch || descMatch || catMatch || tagMatch || idMatch;
  });
}

/**
 * Returns a random article, ensuring it differs from excludeId if possible
 */
function getRandomArticle(excludeId = null) {
  if (!ARTICLES_DATA || ARTICLES_DATA.length === 0) return null;
  const candidates = excludeId ? ARTICLES_DATA.filter((a) => a.id !== excludeId) : ARTICLES_DATA;
  const pool = candidates.length > 0 ? candidates : ARTICLES_DATA;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function getAllArticles() {
  return ARTICLES_DATA;
}

function getRelatedArticles(video) {
  if (!video || !video.relatedArticleIds || video.relatedArticleIds.length === 0) {
    return ARTICLES_DATA.slice(0, 2);
  }
  const matched = ARTICLES_DATA.filter((a) => video.relatedArticleIds.includes(a.id));
  return matched.length > 0 ? matched : ARTICLES_DATA.slice(0, 2);
}

function getRelatedVideos(video, limit = 4) {
  const currentId = video ? video.id : '';
  const currentCategory = video ? video.category : '';
  // Hanya ambil rekomendasi dari video publik (YouTube)
  const publicVids = getPublicVideos();
  const sameCat = publicVids.filter((v) => v.id !== currentId && v.category === currentCategory);
  const otherCat = publicVids.filter((v) => v.id !== currentId && v.category !== currentCategory);
  return [...sameCat, ...otherCat].slice(0, limit);
}

function formatViews(num) {
  if (typeof num !== 'number') return num || '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Global browser exports
window.VIDEOS_DATA = VIDEOS_DATA;
window.ARTICLES_DATA = ARTICLES_DATA;
window.getAllVideos = getAllVideos;
window.getPublicVideos = getPublicVideos;
window.getVideoById = getVideoById;
window.getVideoBySlug = getVideoBySlug;
window.getFeaturedVideos = getFeaturedVideos;
window.getPopularVideos = getPopularVideos;
window.getLatestVideos = getLatestVideos;
window.getCategories = getCategories;
window.getVideosByCategory = getVideosByCategory;
window.searchVideos = searchVideos;
window.getCustomVideos = getCustomVideos;
window.saveCustomVideo = saveCustomVideo;
window.deleteCustomVideo = deleteCustomVideo;
window.parseVideoInputUrl = parseVideoInputUrl;
window.getRandomArticle = getRandomArticle;
window.getAllArticles = getAllArticles;
window.getRelatedArticles = getRelatedArticles;
window.getRelatedVideos = getRelatedVideos;
window.formatViews = formatViews;
window.formatQualityBadge = formatQualityBadge;
window.generateBrandedThumbnailSvg = generateBrandedThumbnailSvg;
window.generateBrandedThumbnailDataUrl = generateBrandedThumbnailDataUrl;
window.resolveVideoThumbnail = resolveVideoThumbnail;
