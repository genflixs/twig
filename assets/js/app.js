/**
 * StreamPulse - Core Application Engine
 * Lightweight, zero-dependency vanilla JS for Server.
 */

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Generate reusable video card element
function createVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'video-card';
  card.setAttribute('data-id', video.id);
  card.setAttribute('data-category', video.category);

  const playerUrl = `/v/?id=${encodeURIComponent(video.id)}`;
  const viewsText = window.formatViews ? window.formatViews(video.views) : video.views;
  const viewsLabel = window.t ? window.t('views_label', 'views') : 'views';

  // Resolve the best thumbnail — uses dynamic branded thumbnail for CDN videos
  // so the card actually reflects what the video is (instead of a generic placeholder).
  const thumbSrc = window.resolveVideoThumbnail ? window.resolveVideoThumbnail(video) : video.thumbnail;

  card.innerHTML = `
    <a href="${playerUrl}" class="video-card-thumb-wrapper" aria-label="${video.title}">
      <img 
        src="${thumbSrc}" 
        alt="${video.title}" 
        class="video-card-thumb" 
        loading="lazy" 
        onerror="this.onerror=null;this.src='/assets/images/placeholder-thumbnail.svg';"
      />
      <span class="video-card-duration">${video.duration}</span>
      <span class="video-card-cat-badge">${video.category}</span>
    </a>
    <div class="video-card-body">
      <a href="${playerUrl}">
        <h3 class="video-card-title">${video.title}</h3>
      </a>
      <div class="video-card-meta">
        <span class="video-card-views">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          ${viewsText} ${viewsLabel}
        </span>
        <span class="video-card-source">${window.formatQualityBadge ? window.formatQualityBadge(video) : (video.quality || '1080p HD')}</span>
      </div>
    </div>
  `;
  return card;
}

// Common UI Initializer
function initCommonUI() {
  // Mobile Drawer Toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Mobile Search Bar Toggle
  const searchToggle = document.getElementById('mobile-search-toggle');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  if (searchToggle && mobileSearchBar) {
    searchToggle.addEventListener('click', () => {
      mobileSearchBar.classList.toggle('active');
      const input = mobileSearchBar.querySelector('input');
      if (mobileSearchBar.classList.contains('active') && input) {
        input.focus();
      }
    });
  }

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      if (lang && window.setLanguage) {
        window.setLanguage(lang);
        showToast(lang === 'id' ? 'Bahasa diubah ke Bahasa Indonesia' : 'Language switched to English');
      }
    });
  });

  // Setup search inputs
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.search-input');
      const q = input ? input.value.trim() : '';
      if (q) {
        window.location.href = `/l/?q=${encodeURIComponent(q)}`;
      }
    });
  });

  // Set active link in desktop navigation and mobile bottom navigation
  highlightActiveNav();

  // Initialize ZIP download buttons if any
  document.querySelectorAll('.export-server-btn').forEach((btn) => {
    btn.addEventListener('click', exportServerZip);
  });

  // Secret Owner Gesture: Ketuk logo 3 kali berturut-turut untuk membuka generator rahasia
  document.querySelectorAll('.brand-logo').forEach((logo) => {
    let logoClicks = 0;
    let logoTimer = null;
    logo.addEventListener('click', (e) => {
      logoClicks++;
      clearTimeout(logoTimer);
      if (logoClicks >= 3) {
        e.preventDefault();
        logoClicks = 0;
        const pin = prompt('🔒 StreamPulse Studio (Akses Pemilik)\nMasukkan PIN Admin untuk membuka generator:');
        if (pin === 'admin123') {
          sessionStorage.setItem('streampulse_admin_auth', 'true');
          window.location.href = '/g/';
        } else if (pin !== null) {
          showToast('PIN salah. Akses ditolak.');
        }
      } else {
        logoTimer = setTimeout(() => {
          logoClicks = 0;
        }, 900);
      }
    });
  });
}

function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || '/';
  document.querySelectorAll('.nav-link, .drawer-link, .bottom-nav-item').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === '/')) {
      link.classList.add('active');
    }
  });
}

/**
 * Client-Side Server Ready ZIP Generator using JSZip
 */
async function exportServerZip(e) {
  if (e) e.preventDefault();
  showToast('Preparing Server zip package...');

  try {
    // If JSZip is not on window, load dynamically
    if (typeof window.JSZip === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      document.head.appendChild(script);
      await new Promise((res, rej) => {
        script.onload = res;
        script.onerror = rej;
      });
    }

    const zip = new window.JSZip();

    // Complete list of static files to package — MUST stay in sync with the
    // actual repository contents. Previously this list omitted most SVG
    // thumbnails and the `.nojekyll` file, which caused exported ZIPs to look
    // completely broken when uploaded to Server (missing thumbnails +
    // Jekyll processing eating files inside `assets/`).
    const filesToFetch = [
      // Root config (CRITICAL for Server)
      '.nojekyll',
      '_config.yml',
      // HTML pages
      '/',
      '/pop/',
      '/l/',
      '/c/',
      '/v/',
      '/g/',
      '/a/',
      '/ct/',
      '/pr/',
      '/t/',
      '404.html',
      // SEO / crawler files
      'sitemap.xml',
      'robots.txt',
      // Documentation
      'README.md',
      'PANDUAN-ADD-VIDEO.md',
      // CSS
      '/assets/css/style.css',
      // JS
      '/assets/js/i18n.js',
      '/assets/js/ads.js',
      '/assets/js/videos.js',
      '/assets/js/player.js',
      '/assets/js/app.js',
      // Images — ALL SVG assets used by the catalog must be included
      '/assets/images/logo.svg',
      '/assets/images/placeholder-thumbnail.svg',
      '/assets/images/thumb-videy-ky4smne51.svg',
      '/assets/images/thumb-tears-of-steel.svg',
      '/assets/images/thumb-big-buck-bunny.svg',
      '/assets/images/thumb-sintel.svg',
      '/assets/images/thumb-cyberpunk.svg',
      '/assets/images/thumb-apex.svg',
      '/assets/images/thumb-ai.svg',
      '/assets/images/thumb-elephants.svg'
    ];

    let packagedCount = 0;
    for (const file of filesToFetch) {
      try {
        // Bust cache so we always package the freshest version
        const bustUrl = file + '?t=' + Date.now();
        const resp = await fetch(bustUrl, { cache: 'no-store' });
        if (resp.ok) {
          const content = await resp.text();
          zip.file(file, content);
          packagedCount++;
        } else {
          console.warn(`[ZIP Export] ${file} returned HTTP ${resp.status} — skipped`);
        }
      } catch (err) {
        console.warn(`Could not add ${file} to zip:`, err);
      }
    }

    // Hard requirement: refuse to ship a broken zip if the critical files
    // (CSS, main JS, .nojekyll) are missing.
    const critical = ['/assets/css/style.css', '/assets/js/app.js', '/assets/js/videos.js', '.nojekyll'];
    const missing = critical.filter((f) => !zip.file(f));
    if (missing.length > 0) {
      throw new Error('Critical files missing from zip: ' + missing.join(', '));
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = 'streampulse-server-pages.zip';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    showToast(`Download complete! ${packagedCount} files packaged. Ready for Server.`);
  } catch (err) {
    console.error('Failed to export ZIP:', err);
    showToast('Could not bundle zip directly. Please use git or clone files.');
  }
}

// Page Renderers
function renderHomePage() {
  if (!window.VIDEOS_DATA) return;

  // 1. Featured Hero
  const heroContainer = document.getElementById('featured-hero-container');
  if (heroContainer) {
    const featured = window.getFeaturedVideos();
    const heroVid = featured[0] || window.VIDEOS_DATA[0];
    if (heroVid) {
      const playerUrl = `/v/?id=${encodeURIComponent(heroVid.id)}`;
      const viewsText = window.formatViews ? window.formatViews(heroVid.views) : heroVid.views;
      const watchText = window.t ? window.t('watch_now', 'Watch Now') : 'Watch Now';
      const heroThumb = window.resolveVideoThumbnail ? window.resolveVideoThumbnail(heroVid) : heroVid.thumbnail;

      heroContainer.innerHTML = `
        <div class="featured-hero">
          <div class="featured-hero-media">
            <img
              src="${heroThumb}"
              alt="${heroVid.title}"
              onerror="this.onerror=null;this.src='/assets/images/placeholder-thumbnail.svg';"
            />
            <div class="featured-hero-overlay">
              <span class="featured-badge">&#9733; ${heroVid.category}</span>
              <h2 class="featured-title">${heroVid.title}</h2>
              <p class="featured-desc">${heroVid.description}</p>
              <div class="featured-meta">
                <span>${heroVid.duration}</span>
                <span>&bull;</span>
                <span>${viewsText} views</span>
              </div>
              <a href="${playerUrl}" class="featured-play-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                ${watchText}
              </a>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 2. Category Filter Pills
  const catBar = document.getElementById('home-category-bar');
  if (catBar) {
    catBar.innerHTML = '';
    const allPill = document.createElement('button');
    allPill.className = 'category-pill active';
    allPill.textContent = window.t ? window.t('filter_all', 'All') : 'All';
    allPill.addEventListener('click', () => filterHomeVideos('All', allPill));
    catBar.appendChild(allPill);

    const categories = window.getCategories ? window.getCategories() : [];
    categories.forEach((cat) => {
      const pill = document.createElement('button');
      pill.className = 'category-pill';
      pill.textContent = cat;
      pill.addEventListener('click', () => filterHomeVideos(cat, pill));
      catBar.appendChild(pill);
    });
  }

  // 3. Trending Videos Grid
  const trendingGrid = document.getElementById('trending-video-grid');
  if (trendingGrid) {
    trendingGrid.innerHTML = '';
    const popular = window.getPopularVideos ? window.getPopularVideos(4) : [];
    popular.forEach((v) => trendingGrid.appendChild(createVideoCard(v)));
  }

  // 4. Latest Videos Grid
  const latestGrid = document.getElementById('latest-video-grid');
  if (latestGrid) {
    latestGrid.innerHTML = '';
    const latest = window.getLatestVideos ? window.getLatestVideos(4) : [];
    latest.forEach((v) => latestGrid.appendChild(createVideoCard(v)));
  }

  // 5. Adsterra Banners
  if (window.renderAd) {
    window.renderAd('homeTopBanner', '#ad-home-top');
    window.renderAd('betweenSectionsBanner', '#ad-home-divider');
  }
}

function filterHomeVideos(category, activePill) {
  document.querySelectorAll('#home-category-bar .category-pill').forEach((p) => p.classList.remove('active'));
  if (activePill) activePill.classList.add('active');

  const filtered = window.getVideosByCategory ? window.getVideosByCategory(category) : [];
  const trendingGrid = document.getElementById('trending-video-grid');
  if (trendingGrid) {
    trendingGrid.innerHTML = '';
    filtered.slice(0, 8).forEach((v) => trendingGrid.appendChild(createVideoCard(v)));
  }
}

function renderPopularPage() {
  if (!window.VIDEOS_DATA) return;
  const grid = document.getElementById('popular-video-grid');
  const sortSelect = document.getElementById('popular-sort-select');
  const loadMoreBtn = document.getElementById('load-more-btn');

  let currentLimit = 6;
  let currentSort = 'popular';

  function updateList() {
    let list = window.getPublicVideos ? [...window.getPublicVideos()] : [...window.VIDEOS_DATA];
    if (currentSort === 'popular') {
      list.sort((a, b) => b.popularity - a.popularity);
    } else if (currentSort === 'views') {
      list.sort((a, b) => b.views - a.views);
    } else if (currentSort === 'newest') {
      list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    if (grid) {
      grid.innerHTML = '';
      const visible = list.slice(0, currentLimit);
      visible.forEach((v) => grid.appendChild(createVideoCard(v)));
    }

    if (loadMoreBtn) {
      if (currentLimit >= list.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'flex';
      }
    }
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      currentLimit = 6;
      updateList();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentLimit += 6;
      updateList();
    });
  }

  updateList();

  if (window.renderAd) {
    window.renderAd('betweenSectionsBanner', '#ad-popular-divider');
  }
}

function renderLatestPage() {
  if (!window.VIDEOS_DATA) return;
  const grid = document.getElementById('latest-video-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const searchHeading = document.getElementById('search-heading');

  // Check URL query for search param
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  let list = [];
  if (query) {
    list = window.searchVideos ? window.searchVideos(query) : [];
    if (searchHeading) {
      const searchForText = window.t ? window.t('search_results_for', 'Search results for:') : 'Search results for:';
      searchHeading.textContent = `${searchForText} "${query}" (${list.length})`;
      searchHeading.style.display = 'block';
    }
  } else {
    list = window.getLatestVideos ? window.getLatestVideos(50) : [];
  }

  let currentLimit = 6;

  function updateList() {
    if (grid) {
      grid.innerHTML = '';
      if (list.length === 0) {
        const noResults = window.t ? window.t('no_results_found', 'No videos found.') : 'No videos found.';
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: var(--text-dim);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p>${noResults}</p>
          </div>
        `;
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      const visible = list.slice(0, currentLimit);
      visible.forEach((v) => grid.appendChild(createVideoCard(v)));
    }

    if (loadMoreBtn) {
      if (currentLimit >= list.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'flex';
      }
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentLimit += 6;
      updateList();
    });
  }

  updateList();

  if (window.renderAd) {
    window.renderAd('betweenSectionsBanner', '#ad-latest-divider');
  }
}

function renderCategoriesPage() {
  if (!window.VIDEOS_DATA) return;
  const catGrid = document.getElementById('categories-grid');
  const catVideosGrid = document.getElementById('category-videos-grid');
  const activeCatHeading = document.getElementById('active-category-title');

  const categories = window.getCategories ? window.getCategories() : [];

  if (catGrid) {
    catGrid.innerHTML = '';
    const publicList = window.getPublicVideos ? window.getPublicVideos() : window.VIDEOS_DATA;
    categories.forEach((cat) => {
      const count = publicList.filter((v) => v.category === cat).length;
      const card = document.createElement('div');
      card.className = 'category-card';
      card.innerHTML = `
        <div class="category-card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <h3 class="category-card-name">${cat}</h3>
        <span class="category-card-count">${count} videos</span>
      `;
      card.addEventListener('click', () => showCategoryVideos(cat));
      catGrid.appendChild(card);
    });
  }

  function showCategoryVideos(cat) {
    if (activeCatHeading) {
      activeCatHeading.textContent = `${cat} Videos`;
      activeCatHeading.scrollIntoView({ behavior: 'smooth' });
    }
    if (catVideosGrid) {
      catVideosGrid.innerHTML = '';
      const list = window.getVideosByCategory ? window.getVideosByCategory(cat) : [];
      list.forEach((v) => catVideosGrid.appendChild(createVideoCard(v)));
    }
  }

  // Show first category by default
  if (categories.length > 0) {
    showCategoryVideos(categories[0]);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCommonUI();
  if (window.renderAd) {
    window.renderAd('footerBanner', '#ad-footer-slot');
  }
});

// Re-render translations when language changes
window.addEventListener('languageChanged', () => {
  // Update view counts or dynamic labels in cards if on page
});

// Export to window
window.createVideoCard = createVideoCard;
window.renderHomePage = renderHomePage;
window.renderPopularPage = renderPopularPage;
window.renderLatestPage = renderLatestPage;
window.renderCategoriesPage = renderCategoriesPage;
window.showToast = showToast;
window.exportServerZip = exportServerZip;
