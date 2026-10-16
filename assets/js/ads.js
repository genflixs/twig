/**
 * StreamPulse - Centralized Banner Advertising Configuration
 *
 * Active provider: fundingfashioned.com (320x50 mobile banner via invoke.js).
 * The fundingfashioned script uses `document.write`, so each placement is
 * rendered inside an isolated <iframe> with the `atOptions` config + invoke.js
 * loaded from within the iframe document. This keeps the parent page safe and
 * lets the same script instance be reused across multiple placements.
 */

const AD_CONFIG = {
  masterEnabled: true,

  // When true, placements with no scriptUrl show a clean demo block.
  // Set to false in production once all real scripts are wired up.
  showDemoPlaceholders: false,

  // Default banner creative used by every placement unless overridden.
  // Each placement gets its OWN iframe so document.write inside invoke.js
  // cannot clobber the parent page.
  defaultBanner: {
    type: 'atOptions',
    key: '508bcf5f3702d4bd48d225b529385479',
    format: 'iframe',
    height: 50,
    width: 320,
    invokeUrl: 'https://fundingfashioned.com/508bcf5f3702d4bd48d225b529385479/invoke.js'
  },

  placements: {
    homeTopBanner: {
      enabled: true,
      label: 'Home Top Banner (320x50)',
      containerClass: 'ad-slot-horizontal',
      banner: null // uses defaultBanner
    },
    betweenSectionsBanner: {
      enabled: true,
      label: 'Content Divider Banner (320x50)',
      containerClass: 'ad-slot-horizontal',
      banner: null
    },
    playerOverlay: {
      // In-player timed overlay — shows ~10s into active playback.
      // Renders the same fundingfashioned 320x50 banner inside the overlay
      // with a close button. Pauses timer when video is paused.
      enabled: true,
      triggerAfterSeconds: 10,
      label: 'In-Player Timed Overlay (320x50)',
      containerClass: 'ad-slot-overlay',
      banner: null // uses defaultBanner
    },
    belowPlayerBanner: {
      enabled: true,
      label: 'Below Player Banner (320x50)',
      containerClass: 'ad-slot-horizontal',
      banner: null
    },
    articleBanner: {
      enabled: true,
      label: 'Article Section Banner (320x50)',
      containerClass: 'ad-slot-horizontal',
      banner: null
    },
    footerBanner: {
      enabled: true,
      label: 'Footer Banner (320x50)',
      containerClass: 'ad-slot-footer',
      banner: null
    }
  }
};

/**
 * Build an isolated iframe document that hosts an atOptions-style banner.
 * The iframe's document.write() output is contained, so the parent page
 * is never wiped by the ad network's document.write call.
 */
function buildAtOptionsIframe(bannerCfg) {
  const cfg = bannerCfg || AD_CONFIG.defaultBanner;
  const iframe = document.createElement('iframe');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('marginwidth', '0');
  iframe.setAttribute('marginheight', '0');
  iframe.style.width = (cfg.width || 320) + 'px';
  iframe.style.height = (cfg.height || 50) + 'px';
  iframe.style.border = '0';
  iframe.style.margin = '0 auto';
  iframe.style.display = 'block';
  iframe.style.maxWidth = '100%';
  iframe.title = 'advertisement';

  // The iframe needs a srcdoc that defines atOptions then loads invoke.js.
  // Using srcdoc keeps everything in one DOM operation and avoids cross-origin
  // restrictions (the iframe is treated as same-origin because we set its
  // content directly).
  const doc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden;}body{display:flex;align-items:center;justify-content:center;}</style></head><body><script>
    window.atOptions = {
      'key' : '${cfg.key}',
      'format' : '${cfg.format || 'iframe'}',
      'height' : ${cfg.height || 50},
      'width' : ${cfg.width || 320},
      'params' : {}
    };
  </script><script src="${cfg.invokeUrl}"></script></body></html>`;
  iframe.srcdoc = doc;
  return iframe;
}

/**
 * Renders an advertisement unit into a target container element.
 * @param {string} placementKey - Key in AD_CONFIG.placements
 * @param {HTMLElement|string} container - Element or selector to render into
 */
function renderAd(placementKey, container) {
  if (!AD_CONFIG.masterEnabled) return;

  const target = typeof container === 'string' ? document.querySelector(container) : container;
  if (!target) return;

  const placement = AD_CONFIG.placements[placementKey];
  if (!placement || !placement.enabled) {
    target.style.display = 'none';
    return;
  }

  // Clear existing content safely
  target.innerHTML = '';
  target.style.display = '';
  target.classList.add('ad-container', placement.containerClass || 'ad-slot-horizontal');

  const bannerCfg = placement.banner || AD_CONFIG.defaultBanner;

  // Real ad network code paths
  if (bannerCfg) {
    try {
      if (bannerCfg.type === 'atOptions') {
        const iframe = buildAtOptionsIframe(bannerCfg);
        // Wrapper div to keep layout consistent + allow click-tracking
        const wrapper = document.createElement('div');
        wrapper.className = 'ad-live-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';
        wrapper.style.minHeight = (bannerCfg.height || 50) + 'px';
        wrapper.appendChild(iframe);
        target.appendChild(wrapper);
      } else if (bannerCf/g/Snippet) {
        const wrapper = document.createElement('div');
        wrapper.className = 'ad-live-wrapper';
        wrapper.innerHTML = bannerCf/g/Snippet;
        target.appendChild(wrapper);
      } else if (bannerCfg.scriptUrl) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = bannerCfg.scriptUrl;
        script.onerror = () => {
          console.warn(`[Ad] script failed to load for placement: ${placementKey}`);
        };
        target.appendChild(script);
      }
    } catch (err) {
      console.warn(`[Ad] Safe failure handling for ${placementKey}:`, err);
    }
    return;
  }

  // Fallback demo placeholder (only when showDemoPlaceholders is true)
  if (AD_CONFIG.showDemoPlaceholders) {
    const placeholder = document.createElement('div');
    placeholder.className = 'ad-placeholder';
    placeholder.innerHTML = `
      <div class="ad-placeholder-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="4" />
          <path d="M10 10l4 4m0-4l-4 4" />
        </svg>
        <span>SPONSORED PLACEMENT</span>
      </div>
      <div class="ad-placeholder-title">${placement.label}</div>
      <div class="ad-placeholder-info">
        <span>Network Banner Slot</span> &bull;
        <code>assets/js/ads.js &rarr; ${placementKey}</code>
      </div>
    `;
    target.appendChild(placeholder);
  } else {
    target.style.display = 'none';
  }
}

/**
 * Initializes timed in-player advertisement.
 * Kept for backwards compatibility — disabled in current config because the
 * active banner network uses document.write which doesn't play well with
 * absolute-positioned in-player overlays.
 */
function setupInPlayerAd(videoElement, overlayContainer) {
  if (!AD_CONFIG.masterEnabled) return;
  const placement = AD_CONFIG.placements.playerOverlay;
  if (!placement || !placement.enabled) {
    if (overlayContainer) overlayContainer.style.display = 'none';
    return;
  }
  if (!videoElement || !overlayContainer) return;

  const triggerSeconds = placement.triggerAfterSeconds || 10;
  let activePlaySeconds = 0;
  let hasTriggered = false;
  let timerInterval = null;

  function startTimer() {
    if (hasTriggered) return;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!videoElement.paused && !videoElement.ended && videoElement.readyState > 2) {
        activePlaySeconds += 1;
        if (activePlaySeconds >= triggerSeconds) {
          triggerAd();
          clearInterval(timerInterval);
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function triggerAd() {
    if (hasTriggered) return;
    hasTriggered = true;
    overlayContainer.innerHTML = '';
    overlayContainer.classList.add('active');

    // Close button — minimal × icon only (no "Close Ad" text label).
    // Sized small enough to not visually distract from the ad creative.
    const closeBtn = document.createElement('button');
    closeBtn.className = 'ad-overlay-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close advertisement');
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      overlayContainer.classList.remove('active');
      overlayContainer.style.display = 'none';
    };
    overlayContainer.appendChild(closeBtn);

    // Ad content wrapper — kept transparent via CSS so only the iframe is visible.
    const adContent = document.createElement('div');
    adContent.className = 'ad-overlay-content';

    const bannerCfg = placement.banner || AD_CONFIG.defaultBanner;
    if (bannerCfg && bannerCfg.type === 'atOptions') {
      adContent.appendChild(buildAtOptionsIframe(bannerCfg));
    } else if (bannerCfg && bannerCfg.htmlSnippet) {
      adContent.innerHTML = bannerCfg.htmlSnippet;
    } else if (AD_CONFIG.showDemoPlaceholders) {
      adContent.innerHTML = `
        <div class="ad-placeholder in-player">
          <div class="ad-placeholder-badge"><span>TIMED IN-PLAYER AD</span></div>
          <div class="ad-placeholder-title">${placement.label}</div>
          <p class="ad-placeholder-subtitle">Triggered after ${triggerSeconds}s of active playback</p>
          <div class="ad-placeholder-info"><code>/assets/js/ads.js &rarr; playerOverlay</code></div>
        </div>
      `;
    }
    overlayContainer.appendChild(adContent);
  }

  videoElement.addEventListener('play', startTimer);
  videoElement.addEventListener('playing', startTimer);
  videoElement.addEventListener('pause', pauseTimer);
  videoElement.addEventListener('ended', pauseTimer);
}

// Export to window
window.AD_CONFIG = AD_CONFIG;
window.renderAd = renderAd;
window.setupInPlayerAd = setupInPlayerAd;
