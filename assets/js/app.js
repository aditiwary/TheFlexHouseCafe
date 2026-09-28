/**
 * Hell House Cafe - Interactive Showpiece App
 * Features: Ember Canvas, Interactive Digital Menu, Pizza Size Toggles,
 * Order Tray (WhatsApp Checkout), Table Reservation Flow, Web Audio FX, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initEmberCanvas();
  initCursorSpotlight();
  initMenuSystem();
  initFlexTray();
  initReservationSystem();
  initLightbox();
  initCardTilt();
  initSoundFx();
  initNavigation();
});

/* ==========================================================================
   1. EMBER & NEON SPARKS PARTICLE CANVAS
   ========================================================================== */
function initEmberCanvas() {
  const canvas = document.getElementById('emberCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 75;
  const colors = [
    'rgba(255, 30, 66, ',    // Neon red
    'rgba(255, 153, 0, ',   // Neon amber
    'rgba(255, 214, 10, ',   // Gold
    'rgba(181, 23, 158, '    // Purple ember
  ];

  class Ember {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.8 + 1.2;
      this.speedY = Math.random() * 1.2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.04 + 0.01;
    }
    update() {
      this.y -= this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.6 + this.speedX;

      if (this.y < -10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${this.opacity})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = `${this.colorBase}0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Ember());
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  // Performance: Pause when tab is inactive
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  animate();
}

/* ==========================================================================
   2. CURSOR SPOTLIGHT TRACKING
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.querySelector('.cursor-spotlight');
  if (!spotlight || window.innerWidth < 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function follow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.left = `${currentX}px`;
    spotlight.style.top = `${currentY}px`;
    requestAnimationFrame(follow);
  }
  follow();
}

/* ==========================================================================
   3. INTERACTIVE DIGITAL MENU SYSTEM
   ========================================================================== */
let currentCategory = 'all';
let currentSearch = '';
const pizzaSelectedSizes = {}; // { itemId: 'small' | 'medium' }

function initMenuSystem() {
  const categoriesContainer = document.getElementById('categoryPills');
  const searchInput = document.getElementById('menuSearchInput');
  const itemsContainer = document.getElementById('menuItemsGrid');

  if (!categoriesContainer || !itemsContainer) return;

  // Render category buttons
  categoriesContainer.innerHTML = MENU_CATEGORIES.map(cat => `
    <button class="category-pill ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
      <span>${cat.name}</span>
    </button>
  `).join('');

  // Event: Category Click
  categoriesContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-pill');
    if (!btn) return;
    const catId = btn.dataset.cat;
    currentCategory = catId;

    document.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenuItems();
  });

  // Event: Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderMenuItems();
    });
  }

  // Initial render
  renderMenuItems();
}

function renderMenuItems() {
  const itemsContainer = document.getElementById('menuItemsGrid');
  if (!itemsContainer) return;

  let filtered = MENU_ITEMS.filter(item => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesSearch = !currentSearch ||
      item.name.toLowerCase().includes(currentSearch) ||
      item.description.toLowerCase().includes(currentSearch) ||
      (item.badge && item.badge.toLowerCase().includes(currentSearch));
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    itemsContainer.innerHTML = `
      <div class="menu-empty-state">
        <i class="fa-solid fa-fire-flame-curved"></i>
        <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">No Fiery Dishes Found</h3>
        <p style="color: var(--text-muted);">Try searching for something else or reset category filters.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = filtered.map(item => {
    const isPizza = item.category === 'pizza' && item.prices;
    const currentSize = pizzaSelectedSizes[item.id] || (isPizza ? item.defaultSize : null);
    const displayPrice = isPizza ? item.prices[currentSize] : item.price;

    return `
      <article class="menu-card jump-hover" data-id="${item.id}">
        <div class="card-top-badges">
          ${item.badge ? `<span class="item-badge ${item.badge.includes('🔥') ? 'signature' : ''}">${item.badge}</span>` : '<span></span>'}
          <div class="veg-icon" title="100% Pure Veg Delicacy"></div>
        </div>

        <h3 class="menu-item-name">${item.name}</h3>
        <p class="menu-item-desc">${item.description}</p>

        ${isPizza ? `
          <div class="pizza-size-toggle" data-item="${item.id}">
            <button class="size-btn ${currentSize === 'small' ? 'active' : ''}" data-size="small">
              Small (₹${item.prices.small})
            </button>
            <button class="size-btn ${currentSize === 'medium' ? 'active' : ''}" data-size="medium">
              Medium (₹${item.prices.medium})
            </button>
          </div>
        ` : ''}

        <div class="menu-card-bottom">
          <div class="item-price-box">
            <span class="price-currency">Price</span>
            <span class="price-amount" id="price-display-${item.id}">₹${displayPrice}</span>
          </div>
          <button class="btn-add-tray" onclick="handleAddToCart('${item.id}')">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach size toggle handlers
  document.querySelectorAll('.pizza-size-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.size-btn');
      if (!btn) return;
      const itemId = toggle.dataset.item;
      const size = btn.dataset.size;
      pizzaSelectedSizes[itemId] = size;

      toggle.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const item = MENU_ITEMS.find(i => i.id === itemId);
      if (item && item.prices) {
        const priceEl = document.getElementById(`price-display-${itemId}`);
        if (priceEl) priceEl.textContent = `₹${item.prices[size]}`;
      }
    });
  });
}

/* ==========================================================================
   4. FLEX TRAY / ORDER CART (WITH WHATSAPP DISPATCH)
   ========================================================================== */
let cart = [];

function initFlexTray() {
  const cartToggleBtns = document.querySelectorAll('.btn-cart-toggle, #openTrayBtn');
  const closeTrayBtn = document.getElementById('closeTrayBtn');
  const trayDrawer = document.getElementById('trayDrawer');
  const trayBackdrop = document.getElementById('trayBackdrop');
  const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');

  function openTray() {
    trayDrawer?.classList.add('active');
    trayBackdrop?.classList.add('active');
  }

  function closeTray() {
    trayDrawer?.classList.remove('active');
    trayBackdrop?.classList.remove('active');
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openTray));
  closeTrayBtn?.addEventListener('click', closeTray);
  trayBackdrop?.addEventListener('click', closeTray);

  if (whatsappOrderBtn) {
    whatsappOrderBtn.addEventListener('click', dispatchWhatsAppOrder);
  }

  updateCartUI();
}

window.handleAddToCart = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const isPizza = item.category === 'pizza' && item.prices;
  const size = isPizza ? (pizzaSelectedSizes[itemId] || item.defaultSize) : null;
  const price = isPizza ? item.prices[size] : item.price;
  const cartItemId = isPizza ? `${itemId}-${size}` : itemId;
  const displayName = isPizza ? `${item.name} (${size.toUpperCase()})` : item.name;

  const existing = cart.find(ci => ci.key === cartItemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key: cartItemId,
      id: item.id,
      name: displayName,
      price: price,
      quantity: 1
    });
  }

  // Visual animation bump on cart icons
  document.querySelectorAll('.cart-counter').forEach(badge => {
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  });

  updateCartUI();

  // Play subtle feedback sound if audio enabled
  playAudioBeep(520, 0.08);
};

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update counters
  document.querySelectorAll('.cart-counter').forEach(el => {
    el.textContent = totalCount;
    el.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  const itemsContainer = document.getElementById('trayItemsContainer');
  const totalValEl = document.getElementById('trayTotalVal');

  if (totalValEl) {
    totalValEl.textContent = `₹${totalPrice}`;
  }

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="tray-empty-view">
        <i class="fa-solid fa-fire-burner"></i>
        <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; margin-bottom: 0.35rem;">Your Flex Tray is Empty</h4>
        <p style="font-size: 0.85rem;">Add some mouth-watering pizzas, burgers, or shakes from our menu!</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="tray-item-row">
      <div class="tray-item-info">
        <span class="tray-item-name">${item.name}</span>
        <span class="tray-item-detail">₹${item.price} each</span>
      </div>
      <div class="tray-item-controls">
        <button class="btn-qty" onclick="changeCartQty('${item.key}', -1)">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="btn-qty" onclick="changeCartQty('${item.key}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

window.changeCartQty = function(key, delta) {
  const itemIndex = cart.findIndex(i => i.key === key);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
};

function dispatchWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Please add items to your tray before ordering!");
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let orderMessage = `🔥 *NEW ORDER - HELL HOUSE CAFE* 🔥\n`;
  orderMessage += `📍 Address: Hiran Nagar, Unnao\n\n`;
  orderMessage += `*Order Items:*\n`;

  cart.forEach((item, idx) => {
    orderMessage += `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
  });

  orderMessage += `\n💰 *Total Amount: ₹${totalPrice}*\n`;
  orderMessage += `💬 Please confirm table / pickup order for Hell House Cafe!`;

  const encoded = encodeURIComponent(orderMessage);
  window.open(`https://wa.me/${CAFE_DETAILS.phoneRaw}?text=${encoded}`, '_blank');
}

/* ==========================================================================
   5. TABLE RESERVATION FLOW ("BOOK FROM WEBSITE ONLY")
   ========================================================================== */
function initReservationSystem() {
  const dateInput = document.getElementById('resDate');
  const partyChips = document.querySelectorAll('.party-chip');
  const vibeSlots = document.querySelectorAll('.vibe-slot-card');
  const timeBtns = document.querySelectorAll('.time-slot-btn');
  const bookingForm = document.getElementById('tableBookingForm');
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const confirmWhatsAppBtn = document.getElementById('confirmWhatsAppBtn');

  // Set date minimum to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  let selectedParty = '2 People';
  let selectedVibe = 'Hellfire Neon Lounge';
  let selectedTime = '07:00 PM';

  partyChips.forEach(chip => {
    chip.addEventListener('click', () => {
      partyChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedParty = chip.dataset.party;
    });
  });

  vibeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      vibeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      selectedVibe = slot.dataset.vibe;
    });
  });

  timeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      timeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTime = btn.dataset.time;
    });
  });

  // Form Submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = document.getElementById('resDate').value;
      const notes = document.getElementById('resNotes').value.trim() || 'No special request';

      if (!name || !phone) {
        alert("Please enter your name and phone number to reserve your table!");
        return;
      }

      // Generate Unique Token
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const token = `HHC-${randomCode}`;

      // Populate Modal Fields
      document.getElementById('ticketToken').textContent = token;
      document.getElementById('ticketName').textContent = name;
      document.getElementById('ticketParty').textContent = selectedParty;
      document.getElementById('ticketDateTime').textContent = `${date} at ${selectedTime}`;
      document.getElementById('ticketVibe').textContent = selectedVibe;

      // Prepare WhatsApp pre-filled link
      const waMsg = `🔥 *TABLE RESERVATION REQUEST - HELL HOUSE CAFE* 🔥\n\n` +
        `🎫 *Booking Code:* ${token}\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `👥 *Party Size:* ${selectedParty}\n` +
        `📅 *Date & Time:* ${date} @ ${selectedTime}\n` +
        `✨ *Vibe/Area:* ${selectedVibe}\n` +
        `📝 *Special Note:* ${notes}\n\n` +
        `Please confirm our table reservation at Hell House Cafe, Hiran Nagar, Unnao!`;

      if (confirmWhatsAppBtn) {
        confirmWhatsAppBtn.onclick = () => {
          window.open(`https://wa.me/${CAFE_DETAILS.phoneRaw}?text=${encodeURIComponent(waMsg)}`, '_blank');
        };
      }

      // Open Modal
      modal?.classList.add('active');
      playAudioBeep(640, 0.15);
    });
  }

  closeModalBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. LIGHTBOX FOR ORIGINAL CHALKBOARD & MENU CARDS
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.dataset.fullsrc || trigger.querySelector('img')?.src;
      if (src && lightboxImg) {
        lightboxImg.src = src;
        lightbox?.classList.add('active');
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

/* ==========================================================================
   7. 3D CARD TILT MICRO-INTERACTIONS
   ========================================================================== */
function initCardTilt() {
  if (window.innerWidth < 1024) return;
  const cards = document.querySelectorAll('.vibe-card, .mascot-card-hero, .showcase-banner-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   8. SYNTHESIZED SOUND AMBIENCE & FX (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = false;

function initSoundFx() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      soundBtn.style.color = 'var(--neon-red)';
      soundBtn.style.boxShadow = '0 0 16px var(--neon-red-glow)';
      playAudioBeep(440, 0.1);
    } else {
      soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      soundBtn.style.color = 'var(--text-muted)';
      soundBtn.style.boxShadow = 'none';
    }
  });
}

function playAudioBeep(freq = 440, duration = 0.1) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // audio context safety
  }
}

/* ==========================================================================
   9. NAVIGATION SCROLL & ACTIVE TRACKING
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileToggle?.addEventListener('click', () => {
    if (navLinks) {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'rgba(10, 6, 10, 0.98)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-glow)';
      }
    }
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navLinks) {
        navLinks.style.display = 'none';
      }
    });
  });

  // --- CAFE VIDEO DUAL-REEL SHOWCASE CONTROLLER ---
  const cafeVideo = document.getElementById('cafeVideoPlayer');
  const videoPlayPauseBtn = document.getElementById('videoPlayPauseBtn');
  const videoAudioBtn = document.getElementById('videoAudioBtn');
  const videoFullscreenBtn = document.getElementById('videoFullscreenBtn');
  const videoFrameInner = document.getElementById('videoFrameInner');
  const activeVideoTitle = document.getElementById('activeVideoTitle');
  const videoBadgeText = document.getElementById('videoBadgeText');
  const reelTabs = document.querySelectorAll('.video-reel-tab');

  if (cafeVideo) {
    // 1. Reel Switcher Tabs
    reelTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        reelTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const videoSrc = tab.getAttribute('data-video-src');
        const posterSrc = tab.getAttribute('data-poster');
        const titleText = tab.getAttribute('data-title');

        if (activeVideoTitle && titleText) {
          activeVideoTitle.textContent = titleText;
        }

        if (videoBadgeText) {
          videoBadgeText.textContent = `NOW STREAMING REEL 0${index + 1}`;
        }

        if (posterSrc) {
          cafeVideo.poster = posterSrc;
        }

        if (videoSrc) {
          cafeVideo.src = videoSrc;
          cafeVideo.load();
          const playPromise = cafeVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.log('Video playback error or policy restriction:', err);
            });
          }
        }

        if (videoPlayPauseBtn) {
          videoPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
      });
    });

    // 2. Play / Pause Control
    if (videoPlayPauseBtn) {
      videoPlayPauseBtn.addEventListener('click', () => {
        if (cafeVideo.paused) {
          cafeVideo.play();
          videoPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          cafeVideo.pause();
          videoPlayPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });

      cafeVideo.addEventListener('play', () => {
        videoPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      });

      cafeVideo.addEventListener('pause', () => {
        videoPlayPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      });
    }

    // 3. Audio Mute / Unmute Control
    if (videoAudioBtn) {
      videoAudioBtn.addEventListener('click', () => {
        cafeVideo.muted = !cafeVideo.muted;
        if (!cafeVideo.muted) {
          cafeVideo.volume = 1.0;
        }
        videoAudioBtn.innerHTML = cafeVideo.muted 
          ? '<i class="fa-solid fa-volume-xmark"></i>' 
          : '<i class="fa-solid fa-volume-high"></i>';
        videoAudioBtn.title = cafeVideo.muted ? 'Unmute Audio' : 'Mute Audio';
      });
    }

    // 4. Fullscreen Control
    if (videoFullscreenBtn && videoFrameInner) {
      videoFullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          if (videoFrameInner.requestFullscreen) {
            videoFrameInner.requestFullscreen();
          } else if (cafeVideo.webkitEnterFullscreen) {
            cafeVideo.webkitEnterFullscreen();
          }
          videoFullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          videoFullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
      });

      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          videoFullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
          videoFullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
      });
    }
  }
}

