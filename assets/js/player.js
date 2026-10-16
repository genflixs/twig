/**
 * StreamPulse - Custom Dedicated Video Player Engine
 * Implements strict sequential layout:
 * 1. Random Article above player
 * 2. Main 16:9 Video Player (HTML5 / YouTube / Videy / Embed)
 * 3. Adsterra In-Player 10s Timed Overlay
 * 4. Adsterra Responsive Banner below player
 * 5. Action Buttons: "Download HD" & "Join Private"
 * 6. Continued Articles / Related Insights
 * 7. More Videos Recommended Grid
 */

function initPlayerPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id') || urlParams.get('v');
  const directSrc = urlParams.get('src') || urlParams.get('url') || urlParams.get('cdn');

  // Verify video data exists
  if (!window.VIDEOS_DATA) {
    console.error('[StreamPulse Player] Videos catalog not loaded.');
    return;
  }

  let currentVideo = null;
  if (directSrc) {
    currentVideo = window.parseVideoInputUrl ? window.parseVideoInputUrl(directSrc) : null;
  } else if (videoId) {
    currentVideo = window.getVideoById ? window.getVideoById(videoId) : null;
  }

  // Handle Missing or Invalid Video ID
  if (!currentVideo) {
    renderVideoErrorState();
    return;
  }

  // Update Document Title and Meta
  document.title = `${currentVideo.title} | StreamPulse HD`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', currentVideo.description);

  // 1. RANDOM ARTICLE ABOVE PLAYER
  renderRandomArticle(currentVideo);

  // 2. MAIN VIDEO PLAYER
  renderMainPlayer(currentVideo);

  // 4. ADSTERRA BANNER BELOW PLAYER
  if (window.renderAd) {
    window.renderAd('belowPlayerBanner', '#ad-below-player');
  }

  // 5. ACTION BUTTONS (Download HD & Join Private)
  renderActionButtons(currentVideo);

  // VIDEO DETAILS (Title, Views, Description, Tags)
  renderVideoDetails(currentVideo);

  // 6. CONTINUED ARTICLES / RELATED INSIGHTS
  renderContinuedArticles(currentVideo);

  // 7. MORE VIDEOS (RECOMMENDED)
  renderMoreVideos(currentVideo);
}

/**
 * 1. Random Article Above Player
 * Picks a random article avoiding repeats and renders above player.
 */
function renderRandomArticle(currentVideo) {
  const container = document.getElementById('random-article-container');
  if (!container || !window.getRandomArticle) return;

  const lastArticleId = sessionStorage.getItem('last_random_article_id');
  const article = window.getRandomArticle(lastArticleId);

  if (!article) return;
  sessionStorage.setItem('last_random_article_id', article.id);

  const readText = window.t ? window.t('read_article', 'Read Insight') : 'Read Insight';
  const recBadgeText = window.t ? window.t('random_recommendation', 'Recommended Article For You') : 'Recommended Article For You';

  // Can link to related video or an article anchor
  const articleTargetUrl = article.relatedVideoId 
    ? `/v/?id=${encodeURIComponent(article.relatedVideoId)}`
    : `#continued-articles`;

  container.innerHTML = `
    <div class="random-article-box">
      <img 
        src="${article.thumbnail}" 
        alt="${article.title}" 
        class="random-article-thumb"
        onerror="this.onerror=null;this.src='/assets/images/placeholder-thumbnail.svg';"
      />
      <div class="random-article-content">
        <div class="random-article-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>${recBadgeText} &bull; ${article.category}</span>
        </div>
        <h3 class="random-article-title">${article.title}</h3>
        <p class="random-article-desc">${article.excerpt}</p>
      </div>
      <a href="${articleTargetUrl}" class="random-article-btn">
        ${readText} &rarr;
      </a>
    </div>
  `;
}

/**
 * 2. Main Video Player
 * Supports HTML5 Direct Video, YouTube Embed, Videy, and Generic Embeds.
 */
function renderMainPlayer(video) {
  const playerContainer = document.getElementById('player-container');
  const overlayContainer = document.getElementById('player-ad-overlay');
  if (!playerContainer) return;

  playerContainer.innerHTML = '';

  const sourceType = (video.sourceType || 'cdn').toLowerCase();

  // If video has directVideoUrl (from Videy, xxxfollow, Twitter/X twimg, or any CDN MP4)
  if (video.directVideoUrl) {
    // Detect restrictive CDNs (twimg.com / Twitter / X) that do NOT send
    // Access-Control-Allow-Origin headers. For those we MUST NOT set
    // crossorigin="anonymous" because it triggers a CORS preflight that the
    // CDN refuses, which causes the video element to never load the source.
    const rawUrl = video.directVideoUrl.toLowerCase();
    const isRestrictiveCdn =
      rawUrl.includes('twimg.com') ||
      rawUrl.includes('twitter.com') ||
      rawUrl.includes('x.com') ||
      rawUrl.includes('xxxfollow.com');

    const videoEl = document.createElement('video');
    videoEl.className = 'player-video-element' + (video.isVertical ? ' vertical-video' : '');
    videoEl.controls = true;
    videoEl.playsInline = true;
    // AUTOPLAY: Start playback as soon as the page loads. Browsers require
    // `muted` for autoplay to work without user interaction, so we mute by
    // default. The user can un-mute via the native controls.
    videoEl.autoplay = true;
    videoEl.muted = true;
    // For autoplay to work reliably, the browser must be able to fetch the
    // media, so we use 'auto' instead of 'none'. The browser will start
    // buffering as soon as the element is attached.
    videoEl.preload = 'auto';
    // no-referrer is mandatory for twimg / xxxfollow: they only serve media
    // when the request carries no external referrer.
    videoEl.setAttribute('referrerpolicy', 'no-referrer');
    // Only set crossorigin when the CDN actually supports CORS. Setting it on
    // twimg.com breaks playback entirely (browser blocks the media response).
    if (!isRestrictiveCdn) {
      videoEl.setAttribute('crossorigin', 'anonymous');
    }
    // Branded poster — shown immediately while the video is not yet loaded.
    if (video.thumbnail) {
      videoEl.poster = video.thumbnail;
    } else if (window.resolveVideoThumbnail) {
      videoEl.poster = window.resolveVideoThumbnail(video);
    }

    const sourceEl = document.createElement('source');
    sourceEl.src = video.directVideoUrl;
    sourceEl.type = 'video/mp4';
    sourceEl.setAttribute('referrerpolicy', 'no-referrer');

    videoEl.appendChild(sourceEl);

    const fallbackP = document.createElement('p');
    fallbackP.textContent = 'Browser Anda tidak mendukung pemutaran video langsung.';
    videoEl.appendChild(fallbackP);

    playerContainer.appendChild(videoEl);

    // Explicitly trigger play() — the `autoplay` attribute alone is not
    // reliable when set via JavaScript (some browsers ignore it). Calling
    // play() after the element is in the DOM ensures autoplay kicks in.
    // Catch any rejection (e.g. if browser blocks autoplay) silently — the
    // user can still click play manually via the native controls.
    try {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => { /* autoplay blocked — user can click play */ });
      }
    } catch (e) { /* ignore */ }

    // Error handling: only show fallback on a real, fatal media error.
    // We do NOT use a fixed timeout anymore — huge twimg files take a long
    // time to start (the user must click Play first, then the browser does
    // a ranged fetch), and a timeout would prematurely kill the player.
    let errorHandled = false;
    const handleLoadError = () => {
      if (errorHandled) return;
      errorHandled = true;
      try {
        const overlay = document.createElement('div');
        overlay.className = 'player-fallback-overlay';
        const labelText = window.t
          ? window.t('playback_failed', 'Sumber video tidak dapat diputar langsung di browser.')
          : 'Sumber video tidak dapat diputar langsung di browser.';
        const openText = window.t
          ? window.t('open_source', 'Buka Sumber Video')
          : 'Buka Sumber Video';
        const downloadText = window.t
          ? window.t('download_hd', 'Download HD')
          : 'Download HD';
        overlay.innerHTML = `
          <div class="player-fallback-inner">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p class="player-fallback-text">${labelText}</p>
            <div class="player-fallback-actions">
              <a href="${video.directVideoUrl}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer" class="player-fallback-btn primary">${openText}</a>
              ${video.downloadUrl ? `<a href="${video.downloadUrl}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer" download class="player-fallback-btn">${downloadText}</a>` : ''}
            </div>
          </div>
        `;
        playerContainer.innerHTML = '';
        playerContainer.appendChild(overlay);
      } catch (err) {
        console.warn('[StreamPulse Player] fallback render error:', err);
      }
    };

    // Only trigger fallback on a genuine media error event (HTTP 403/404/etc).
    // No timeout — let the user wait as long as they want for the video to load.
    videoEl.addEventListener('error', () => {
      // Only treat as fatal if no data has been loaded.
      if (videoEl.readyState === 0 || videoEl.networkState === 3) {
        handleLoadError();
      }
    });

    // Setup in-player timed ad overlay (~10s into active playback).
    // Restored per publisher request.
    if (window.setupInPlayerAd && overlayContainer) {
      window.setupInPlayerAd(videoEl, overlayContainer);
    }
  } else if (sourceType === 'youtube' && (video.embedUrl || video.id)) {
    // YouTube Embed
    // Extract the 11-char YouTube video ID from any URL format
    // (embed/, watch?v=, youtu.be/, shorts/) or fall back to video.id.
    let ytId = '';
    const ytSource = video.embedUrl || '';
    const ytMatch = ytSource.match(/(?:watch\?v=|youtu\.be\/|embed\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      ytId = ytMatch[1];
    } else if (video.id && /^[a-zA-Z0-9_-]{11}$/.test(video.id)) {
      ytId = video.id;
    } else {
      const parts = ytSource.split('/').filter(Boolean);
      ytId = parts[parts.length - 1] || video.id || '';
    }

    // Build the embed URL.
    //
    // Why each parameter:
    //   - `autoplay=1` + `mute=1`  → autoplay (mute is required by browsers)
    //   - `rel=0`                  → restrict related videos to same channel
    //   - `enablejsapi=1`          → enables JS API, sometimes helps with
    //                                Error 153 ("Video player configuration
    //                                error") when third-party cookies are
    //                                blocked by the browser
    //   - `origin=<current>`       → paired with enablejsapi, tells YouTube
    //                                the embedding origin so it can configure
    //                                the player correctly
    //
    // We deliberately AVOID:
    //   - `modestbranding=1` (deprecated 2018, TRIGGERS Error 153)
    //   - `playsinline=1`    (iOS-only, can cause config errors on desktop)
    //   - `youtube-nocookie.com` (returns Error 153 in stricter privacy modes)
    let origin = '';
    try {
      origin = window.location.origin;
    } catch (e) { origin = ''; }

    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      rel: '0',
      enablejsapi: '1'
    });
    if (origin) params.set('origin', origin);

    const embedSrc = ytId
      ? `https://www.youtube.com/embed/${ytId}?${params.toString()}`
      : ytSource;

    // Wrapper that holds both the iframe and an error fallback overlay.
    // The iframe tries to load YouTube; if YouTube returns Error 153
    // (which happens in browsers that block third-party cookies), the
    // fallback "Watch on YouTube" button is shown over the iframe.
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:100%;height:100%;';

    const iframe = document.createElement('iframe');
    iframe.className = 'player-iframe-element';
    iframe.src = embedSrc;
    iframe.title = video.title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('frameborder', '0');
    // Allow YouTube to set its own referrer policy. Setting strict-origin
    // here matches YouTube's own oEmbed output.
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    wrapper.appendChild(iframe);

    // Error fallback overlay. Shown only if the iframe fails to load
    // (detected via the iframe `error` event, which fires for some — but
    // not all — Error 153 cases). For browser-side cookie blocks, we also
    // show a subtle "If the video doesn't load, watch on YouTube" link
    // below the player, so users always have a path forward.
    const fallbackBar = document.createElement('div');
    fallbackBar.style.cssText = 'position:absolute;bottom:8px;left:8px;right:8px;display:flex;justify-content:center;gap:8px;pointer-events:none;z-index:5;';
    const fallbackLink = document.createElement('a');
    fallbackLink.href = `https://www.youtube.com/watch?v=${ytId}`;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.textContent = '↗ Watch on YouTube';
    fallbackLink.style.cssText = 'pointer-events:auto;background:rgba(255,0,0,0.85);color:#fff;text-decoration:none;padding:4px 12px;border-radius:4px;font-size:0.78rem;font-weight:700;opacity:0;transition:opacity 0.3s ease;font-family:system-ui,sans-serif;';
    fallbackBar.appendChild(fallbackLink);
    wrapper.appendChild(fallbackBar);

    // Reveal the fallback link after 6 seconds — by then, if the YouTube
    // iframe has not started playing (Error 153 case), the user will see
    // the "Watch on YouTube" escape hatch. If the video IS playing, the
    // link stays hidden so it doesn't interfere.
    setTimeout(() => {
      try {
        // Heuristic: if the iframe is still on the YouTube error page or
        // hasn't started playback, show the fallback link.
        // (We can't read cross-origin iframe DOM, but the visual cue helps.)
        fallbackLink.style.opacity = '0.75';
      } catch (e) { /* ignore */ }
    }, 6000);

    playerContainer.appendChild(wrapper);
  } else if (video.embedUrl) {
    // Generic authorized embed (Videy iframe, etc.)
    const iframe = document.createElement('iframe');
    iframe.className = 'player-iframe-element';
    iframe.src = video.embedUrl;
    iframe.title = video.title;
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    playerContainer.appendChild(iframe);
  } else {
    // Fallback error
    playerContainer.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;flex-direction:column;gap:10px;padding:20px;text-align:center;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>Tidak ada sumber pemutar stream video yang valid.</p>
      </div>
    `;
  }
}

/**
 * 5. Action Buttons: "Download HD" & "Join Private"
 *
 * Both buttons route through the configured smartlink interstitial
 * (window.SMARTLINK_URL) before reaching the final destination. The
 * final URL is passed as the `url` query parameter so the smartlink
 * provider can forward the user after their interstitial completes.
 *
 * If SMARTLINK_URL is not defined, the buttons fall back to direct links.
 */
function renderActionButtons(video) {
  const container = document.getElementById('action-buttons-container');
  if (!container) return;
  container.innerHTML = '';

  const downloadText = window.t ? window.t('download_hd', 'Download HD') : 'Download HD';
  const downloadSub = window.t ? window.t('download_hd_sub', 'Fast Direct Server') : 'Fast Direct Server';
  const joinText = window.t ? window.t('join_private', 'Join VIP Private') : 'Join VIP Private';
  const joinSub = window.t ? window.t('join_private_sub', 'Exclusive Community Access') : 'Exclusive Community Access';

  /**
   * Wrap a destination URL through the smartlink interstitial.
   * Example: smartlink="https://uplcm.com/4/10180725", dest="https://cdn.videy.co/x.mp4"
   * Result:  "https://uplcm.com/4/10180725?url=https%3A%2F%2Fcdn.videy.co%2Fx.mp4"
   */
  function wrapSmartlink(destUrl) {
    if (!destUrl) return destUrl;
    const smart = window.SMARTLINK_URL || (window.SITE_CONFIG && window.SITE_CONFIG.smartlinkUrl);
    if (!smart) return destUrl;
    // Don't double-wrap if the destination is already the smartlink itself.
    if (destUrl === smart || destUrl.startsWith(smart)) return destUrl;
    try {
      return smart + (smart.indexOf('?') >= 0 ? '&' : '?') + 'url=' + encodeURIComponent(destUrl);
    } catch (e) {
      return destUrl;
    }
  }

  // Button A: Download HD
  // Only render if a valid downloadUrl is configured and not empty
  if (video.downloadUrl && video.downloadUrl.trim().length > 0) {
    const downloadBtn = document.createElement('a');
    downloadBtn.href = wrapSmartlink(video.downloadUrl);
    downloadBtn.target = '_blank';
    downloadBtn.rel = 'noopener noreferrer';
    downloadBtn.className = 'action-btn download-btn';
    downloadBtn.innerHTML = `
      <div class="action-btn-icon-wrapper">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      </div>
      <div class="action-btn-text">
        <span class="action-btn-title">${downloadText}</span>
        <span class="action-btn-sub">${downloadSub}</span>
      </div>
    `;
    container.appendChild(downloadBtn);
  }

  // Button B: Join Private
  // Configurable community/VIP membership link — also wrapped via smartlink.
  const privateUrl = video.joinPrivateUrl || (window.SITE_CONFIG && window.SITE_CONFIG.defaultJoinPrivateUrl) || 'https://t.me/streampulse_vip';
  if (privateUrl) {
    const joinBtn = document.createElement('a');
    joinBtn.href = wrapSmartlink(privateUrl);
    joinBtn.target = '_blank';
    joinBtn.rel = 'noopener noreferrer';
    joinBtn.className = 'action-btn private-btn';
    joinBtn.innerHTML = `
      <div class="action-btn-icon-wrapper">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <div class="action-btn-text">
        <span class="action-btn-title">${joinText}</span>
        <span class="action-btn-sub">${joinSub}</span>
      </div>
    `;
    container.appendChild(joinBtn);
  }
}

/**
 * Video Information Block
 */
function renderVideoDetails(video) {
  const titleEl = document.getElementById('video-details-title');
  const metaEl = document.getElementById('video-details-meta');
  const descEl = document.getElementById('video-details-desc');
  const tagsEl = document.getElementById('video-details-tags');
  const shareBtn = document.getElementById('video-share-btn');

  if (titleEl) titleEl.textContent = video.title;
  if (descEl) descEl.textContent = video.description;

  const viewsText = window.formatViews ? window.formatViews(video.views) : video.views;
  const viewsLabel = window.t ? window.t('views_label', 'views') : 'views';
  const publishedText = window.t ? window.t('published_on', 'Published on') : 'Published on';

  if (metaEl) {
    metaEl.innerHTML = `
      <span>&#128065; ${viewsText} ${viewsLabel}</span>
      <span>&bull;</span>
      <span>${publishedText} ${video.publishedAt}</span>
      <span>&bull;</span>
      <span class="video-card-source">${window.formatQualityBadge ? window.formatQualityBadge(video) : (video.quality || '1080p HD')}</span>
      <span>&bull;</span>
      <span style="color:var(--accent-secondary);font-weight:700;">${video.category}</span>
    `;
  }

  if (tagsEl && video.tags) {
    tagsEl.innerHTML = '';
    video.tags.forEach((tag) => {
      const tagPill = document.createElement('span');
      tagPill.className = 'video-tag-pill';
      tagPill.textContent = `#${tag}`;
      tagsEl.appendChild(tagPill);
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          if (window.showToast) {
            window.showToast(window.t ? window.t('copied_to_clipboard', 'Link copied to clipboard!') : 'Link copied!');
          }
        });
      } else {
        prompt('Copy link to share:', shareUrl);
      }
    });
  }
}

/**
 * 6. Continued Articles Section
 */
function renderContinuedArticles(video) {
  const container = document.getElementById('continued-articles-list');
  if (!container || !window.getRelatedArticles) return;

  container.innerHTML = '';
  const articles = window.getRelatedArticles(video);

  articles.forEach((art) => {
    const card = document.createElement('article');
    card.className = 'article-card';
    const linkUrl = art.relatedVideoId ? `/v/?id=${encodeURIComponent(art.relatedVideoId)}` : '#';
    card.innerHTML = `
      <img 
        src="${art.thumbnail}" 
        alt="${art.title}" 
        class="article-card-thumb" 
        loading="lazy" 
        onerror="this.onerror=null;this.src='/assets/images/placeholder-thumbnail.svg';"
      />
      <div class="article-card-body">
        <span class="article-card-meta">${art.category} &bull; ${art.readTime}</span>
        <a href="${linkUrl}">
          <h4 class="article-card-title">${art.title}</h4>
        </a>
      </div>
    `;
    container.appendChild(card);
  });

  // Render article banner if configured
  if (window.renderAd) {
    window.renderAd('articleBanner', '#ad-articles-slot');
  }
}

/**
 * 7. More Videos Recommended Grid
 */
function renderMoreVideos(video) {
  const container = document.getElementById('more-videos-grid');
  if (!container || !window.getRelatedVideos || !window.createVideoCard) return;

  container.innerHTML = '';
  const related = window.getRelatedVideos(video, 4);
  related.forEach((v) => {
    container.appendChild(window.createVideoCard(v));
  });
}

/**
 * Video Not Found Error State
 */
function renderVideoErrorState() {
  const mainWrapper = document.getElementById('player-main-wrapper');
  if (!mainWrapper) return;

  const notFoundTitle = window.t ? window.t('video_not_found', 'Video Not Found') : 'Video Not Found';
  const notFoundDesc = window.t ? window.t('video_not_found_desc', 'The requested video was not found.') : 'The requested video was not found.';
  const backHomeText = window.t ? window.t('back_to_home', 'Return to Home') : 'Return to Home';

  mainWrapper.innerHTML = `
    <div class="error-container">
      <div class="error-code">404</div>
      <h2 class="error-title">${notFoundTitle}</h2>
      <p class="error-desc">${notFoundDesc}</p>
      <a href="/" class="featured-play-btn" style="display:inline-flex;margin:0 auto;">
        &larr; ${backHomeText}
      </a>
    </div>
  `;
}

// Auto init on DOM ready
document.addEventListener('DOMContentLoaded', initPlayerPage);
