/**
 * The Flex House Cafe — Interactive Application Engine
 * Pure Vanilla JavaScript: Fast, Robust, Zero-Dependency & Bug-Free
 */

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    cart: [],
    activeCategory: 'combos',
    searchQuery: '',
    selectedSizes: {}, // itemId -> 'S' | 'M' | 'L' | 'Half' | 'Full'
    soundEnabled: true,
    flexModeActive: false,
    selectedZone: 'Neon Glow Lounge',
    selectedGuests: '2 Guests',
    selectedTimeSlot: '08:00 PM'
  };

  // Sound Engine (Web Audio API - No external assets required)
  const soundEngine = {
    ctx: null,
    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }
    },
    playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
      if (!state.soundEnabled) return;
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    },
    click() {
      this.playTone(620, 'sine', 0.08, 0.04);
    },
    addPlate() {
      this.playTone(523.25, 'triangle', 0.1, 0.08);
      setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.08), 80);
    },
    fanfare() {
      if (!state.soundEnabled) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, 'triangle', 0.25, 0.1), idx * 120);
      });
    }
  };

  // DOM Elements
  const menuContainer = document.getElementById('menuGridContainer');
  const catFilterPills = document.querySelectorAll('.cat-pill');
  const menuSearchInput = document.getElementById('menuSearchInput');
  const cartTrigger = document.getElementById('cartTriggerBtn');
  const cartBadge = document.getElementById('cartCountBadge');
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsContainer = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotalAmount');
  const checkoutWhatsAppBtn = document.getElementById('checkoutWhatsAppBtn');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const flexCelebrationBtn = document.getElementById('flexCelebrationBtn');
  const copyPlusCodeBtn = document.getElementById('copyPlusCodeBtn');
  const plusCodeFeedback = document.getElementById('plusCodeFeedback');
  const reservationForm = document.getElementById('tableBookingForm');
  const bookingSuccessModal = document.getElementById('bookingModalBackdrop');
  const bookingModalClose = document.getElementById('bookingModalClose');
  const sendWhatsAppBookingBtn = document.getElementById('sendWhatsAppBookingBtn');
  const menuLightboxModal = document.getElementById('menuLightboxModal');
  const openMenuPhotosBtn = document.getElementById('openMenuPhotosBtn');
  const lightboxModalClose = document.getElementById('lightboxModalClose');
  const lightboxImg = document.getElementById('lightboxActiveImg');
  const lightboxTabBtns = document.querySelectorAll('.lightbox-tab-btn');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const cursorGlow = document.getElementById('cursorNeonGlow');

  // Interactive Cursor Ambient Halo
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Live Open / Closes Status Indicator
  function updateLiveStatus() {
    const statusDot = document.getElementById('storeLiveDot');
    const statusText = document.getElementById('storeLiveText');
    if (!statusDot || !statusText) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMins = hours * 60 + minutes;

    // Open from 11:00 AM (660 mins) to 11:30 PM (1410 mins)
    const isOpen = timeInMins >= 660 && timeInMins <= 1410;

    if (isOpen) {
      statusDot.style.backgroundColor = 'var(--neon-green)';
      statusDot.style.boxShadow = '0 0 10px var(--neon-green)';
      statusText.innerHTML = '<strong>OPEN NOW</strong> · Closes 11:30 PM';
    } else {
      statusDot.style.backgroundColor = '#EF4444';
      statusDot.style.boxShadow = '0 0 10px #EF4444';
      statusText.innerHTML = '<strong>CLOSED NOW</strong> · Opens 11:00 AM';
    }
  }
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000);

  // Sound Toggle Handler
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundToggleBtn.innerHTML = state.soundEnabled ? '🔊' : '🔇';
      soundToggleBtn.setAttribute('title', state.soundEnabled ? 'Mute Sound' : 'Unmute Sound');
      if (state.soundEnabled) soundEngine.click();
    });
  }

  // Mobile Navigation Toggle
  const mobileDrawerTourBtn = document.getElementById('mobileDrawerTourBtn');

  function closeMobileNav() {
    if (navLinksContainer) navLinksContainer.classList.remove('mobile-open');
    if (mobileNavToggle) {
      mobileNavToggle.classList.remove('active');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileNavToggle && navLinksContainer) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('mobile-open');
      mobileNavToggle.classList.toggle('active', isOpen);
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      soundEngine.click();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    document.querySelectorAll('.mobile-drawer-btn').forEach(btn => {
      btn.addEventListener('click', closeMobileNav);
    });
  }

  // Plus Code Copy
  if (copyPlusCodeBtn) {
    copyPlusCodeBtn.addEventListener('click', () => {
      const code = 'GFGJ+99 Unnao, Uttar Pradesh';
      navigator.clipboard.writeText(code).then(() => {
        soundEngine.click();
        plusCodeFeedback.textContent = 'Copied to Clipboard!';
        plusCodeFeedback.style.display = 'inline-block';
        setTimeout(() => {
          plusCodeFeedback.style.display = 'none';
        }, 2500);
      });
    });
  }

  // Category Filtering
  catFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      soundEngine.click();
      catFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.dataset.category;
      renderMenuItems();
    });
  });

  // Search Input
  if (menuSearchInput) {
    menuSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderMenuItems();
    });
  }

  // Get current active price for item based on selected size
  function getItemPrice(item) {
    if (item.price) return item.price;
    if (item.prices) {
      const currentSize = state.selectedSizes[item.id] || Object.keys(item.prices)[0];
      return item.prices[currentSize];
    }
    return 0;
  }

  // Render Menu Items
  function renderMenuItems() {
    if (!menuContainer) return;

    let itemsToDisplay = [];

    if (state.searchQuery) {
      itemsToDisplay = ALL_MENU_ITEMS.filter(item => {
        const matchesName = item.name.toLowerCase().includes(state.searchQuery);
        const matchesDesc = item.desc ? item.desc.toLowerCase().includes(state.searchQuery) : false;
        return matchesName || matchesDesc;
      });
    } else {
      switch (state.activeCategory) {
        case 'combos':
          itemsToDisplay = MENU_DATA.combos;
          break;
        case 'pizza':
          itemsToDisplay = MENU_DATA.pizzas;
          break;
        case 'chinese':
          itemsToDisplay = MENU_DATA.chinese;
          break;
        case 'momos':
          itemsToDisplay = MENU_DATA.momos;
          break;
        case 'burgers':
          itemsToDisplay = MENU_DATA.burgers;
          break;
        case 'sandwiches':
          itemsToDisplay = MENU_DATA.sandwiches;
          break;
        case 'maggie-pasta':
          itemsToDisplay = MENU_DATA.maggiePasta;
          break;
        case 'drinks':
          itemsToDisplay = MENU_DATA.drinks;
          break;
        default:
          itemsToDisplay = ALL_MENU_ITEMS;
      }
    }

    if (itemsToDisplay.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="color: #fff; margin-bottom: 0.5rem;">No items matched your search</h3>
          <p>Try searching for Pizza, Noodles, Momos, Burger or Combos!</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = itemsToDisplay.map(item => {
      const currentPrice = getItemPrice(item);
      const isCombo = item.category === 'combos';
      const hasSizes = !!item.prices;
      const selectedSize = state.selectedSizes[item.id] || (hasSizes ? Object.keys(item.prices)[0] : '');

      let sizesHtml = '';
      if (hasSizes) {
        sizesHtml = `
          <div class="size-selector-row">
            ${Object.keys(item.prices).map(sizeKey => `
              <button type="button" 
                class="size-pill-btn ${selectedSize === sizeKey ? 'active' : ''}" 
                data-item-id="${item.id}" 
                data-size="${sizeKey}">
                ${sizeKey} · ₹${item.prices[sizeKey]}
              </button>
            `).join('')}
          </div>
        `;
      }

      let comboBadgesHtml = '';
      if (isCombo && item.items) {
        comboBadgesHtml = `
          <div class="combo-items-list">
            ${item.items.map(sub => `<span class="combo-pill">✓ ${sub}</span>`).join('')}
          </div>
        `;
      }

      return `
        <article class="menu-card" data-id="${item.id}">
          <div class="menu-card-top">
            <div class="menu-card-header">
              <h3 class="menu-item-name">${item.name}</h3>
              ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
            </div>
            <p class="menu-item-desc">${item.desc || 'Freshly prepared with authentic ingredients at The Flex House.'}</p>
            ${comboBadgesHtml}
          </div>

          <div>
            ${sizesHtml}
            <div class="menu-card-bottom">
              <div class="menu-price-display">
                <span class="price-currency">Price</span>
                <span class="price-amount" id="price-val-${item.id}">₹${currentPrice}</span>
              </div>
              <button type="button" class="btn-add-plate" data-add-id="${item.id}">
                <span>Add +</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach Size Toggle Listeners
    menuContainer.querySelectorAll('.size-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundEngine.click();
        const itemId = e.currentTarget.dataset.itemId;
        const sizeKey = e.currentTarget.dataset.size;
        state.selectedSizes[itemId] = sizeKey;

        // Update UI pills
        const parentCard = e.currentTarget.closest('.menu-card');
        parentCard.querySelectorAll('.size-pill-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        // Update displayed price
        const itemObj = ALL_MENU_ITEMS.find(i => i.id === itemId);
        if (itemObj && itemObj.prices) {
          const priceDisplay = parentCard.querySelector(`#price-val-${itemId}`);
          if (priceDisplay) {
            priceDisplay.textContent = `₹${itemObj.prices[sizeKey]}`;
          }
        }
      });
    });

    // Attach Add to Cart Listeners
    menuContainer.querySelectorAll('.btn-add-plate').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.dataset.addId;
        addToCart(itemId);
      });
    });
  }

  // Cart Management
  function addToCart(itemId) {
    const item = ALL_MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    soundEngine.addPlate();

    const size = item.prices ? (state.selectedSizes[itemId] || Object.keys(item.prices)[0]) : null;
    const price = item.prices ? item.prices[size] : item.price;
    const cartItemId = size ? `${itemId}-${size}` : itemId;

    const existingIndex = state.cart.findIndex(c => c.cartItemId === cartItemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        cartItemId,
        id: item.id,
        name: item.name,
        size: size,
        price: price,
        qty: 1
      });
    }

    updateCartUI();
    showQuickNotification(`Added "${item.name}${size ? ' (' + size + ')' : ''}" to your order!`);
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
      cartBadge.style.animation = 'none';
      setTimeout(() => { cartBadge.style.animation = 'cartShake 0.4s var(--ease-spring)'; }, 10);
    }

    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛒</div>
          <h4 style="color: #fff; margin-bottom: 0.4rem;">Your order is empty</h4>
          <p>Explore our menu and add your favorite dishes to flex!</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
      return;
    }

    let subtotal = 0;
    cartItemsContainer.innerHTML = state.cart.map(item => {
      const itemTotal = item.price * item.qty;
      subtotal += itemTotal;
      return `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <span>${item.size ? item.size + ' · ' : ''}₹${item.price} each</span>
          </div>
          <div class="cart-qty-controls">
            <button type="button" class="qty-btn" data-cart-dec="${item.cartItemId}">-</button>
            <span style="font-weight: 800; min-width: 22px; text-align: center;">${item.qty}</span>
            <button type="button" class="qty-btn" data-cart-inc="${item.cartItemId}">+</button>
          </div>
          <div style="font-weight: 800; min-width: 50px; text-align: right; color: var(--neon-gold-bright);">
            ₹${itemTotal}
          </div>
        </div>
      `;
    }).join('');

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;

    // Attach qty controls
    cartItemsContainer.querySelectorAll('[data-cart-inc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundEngine.click();
        const cid = e.currentTarget.dataset.cartInc;
        const item = state.cart.find(c => c.cartItemId === cid);
        if (item) item.qty += 1;
        updateCartUI();
      });
    });

    cartItemsContainer.querySelectorAll('[data-cart-dec]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundEngine.click();
        const cid = e.currentTarget.dataset.cartDec;
        const itemIndex = state.cart.findIndex(c => c.cartItemId === cid);
        if (itemIndex > -1) {
          state.cart[itemIndex].qty -= 1;
          if (state.cart[itemIndex].qty <= 0) {
            state.cart.splice(itemIndex, 1);
          }
        }
        updateCartUI();
      });
    });
  }

  // Quick Notification Toast
  function showQuickNotification(msg) {
    const existing = document.getElementById('tfhToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'tfhToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(11, 15, 23, 0.95);
      border: 1.5px solid var(--neon-gold);
      color: #FFFFFF;
      padding: 0.8rem 1.6rem;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 0.9rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px var(--neon-gold-glow);
      z-index: 500;
      transition: all 0.3s var(--ease-spring);
      opacity: 0;
      pointer-events: none;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 350);
    }, 2400);
  }

  // Cart Drawer open/close
  if (cartTrigger && cartOverlay && cartCloseBtn) {
    cartTrigger.addEventListener('click', () => {
      soundEngine.click();
      cartOverlay.classList.add('open');
      updateCartUI();
    });

    cartCloseBtn.addEventListener('click', () => {
      soundEngine.click();
      cartOverlay.classList.remove('open');
    });

    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('open');
      }
    });
  }

  // WhatsApp Order Checkout
  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        alert('Please add some items to your cart before proceeding!');
        return;
      }
      soundEngine.fanfare();

      const orderTypeInput = document.querySelector('input[name="orderType"]:checked');
      const orderType = orderTypeInput ? orderTypeInput.value : 'Dine-In';

      let itemsText = state.cart.map(c => 
        `• ${c.name}${c.size ? ' (' + c.size + ')' : ''} x ${c.qty} = ₹${c.price * c.qty}`
      ).join('\n');

      const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

      const message = `👋 Hello *The Flex House Cafe*!\nI want to place an order from your website:\n\n*Order Type:* ${orderType}\n\n*Ordered Items:*\n${itemsText}\n\n*Total Amount:* ₹${subtotal}\n\n📍 *Cafe Location:* near galaxy hospital, PD Nagar, Nirala Nagar, Unnao\n📞 Customer Phone: (Please confirm delivery/table)\nThank you!`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/918400580216?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Table Reservation Interactive Seating & Slot Selection
  document.querySelectorAll('.zone-option-card').forEach(card => {
    card.addEventListener('click', () => {
      soundEngine.click();
      document.querySelectorAll('.zone-option-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.selectedZone = card.dataset.zone;
    });
  });

  document.querySelectorAll('.guest-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      soundEngine.click();
      document.querySelectorAll('.guest-pill').forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      state.selectedGuests = pill.dataset.guests;
    });
  });

  document.querySelectorAll('.time-slot-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      soundEngine.click();
      document.querySelectorAll('.time-slot-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state.selectedTimeSlot = chip.dataset.time;
    });
  });

  // Table Reservation Form Submission
  if (reservationForm) {
    // Prefill date input with today's date formatted as YYYY-MM-DD
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('bookingName');
      const phoneInput = document.getElementById('bookingPhone');
      const dateVal = dateInput ? dateInput.value : 'Today';
      const notesInput = document.getElementById('bookingNotes');

      if (!nameInput.value || !phoneInput.value) {
        alert('Please provide your name and phone number to complete reservation.');
        return;
      }

      soundEngine.fanfare();
      triggerConfetti();

      // Generate Unique Booking ID
      const bookingId = `TFH-${Math.floor(1000 + Math.random() * 9000)}`;

      // Update Modal
      document.getElementById('modalTicketId').textContent = bookingId;
      document.getElementById('modalTicketName').textContent = nameInput.value;
      document.getElementById('modalTicketPhone').textContent = phoneInput.value;
      document.getElementById('modalTicketDate').textContent = dateVal;
      document.getElementById('modalTicketTime').textContent = state.selectedTimeSlot;
      document.getElementById('modalTicketGuests').textContent = state.selectedGuests;
      document.getElementById('modalTicketZone').textContent = state.selectedZone;

      // Save to localStorage
      const reservations = JSON.parse(localStorage.getItem('tfh_reservations') || '[]');
      reservations.push({
        id: bookingId,
        name: nameInput.value,
        phone: phoneInput.value,
        date: dateVal,
        time: state.selectedTimeSlot,
        guests: state.selectedGuests,
        zone: state.selectedZone,
        notes: notesInput ? notesInput.value : '',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('tfh_reservations', JSON.stringify(reservations));

      // Setup WhatsApp Confirmation link
      if (sendWhatsAppBookingBtn) {
        sendWhatsAppBookingBtn.onclick = () => {
          const msg = `🎉 *Table Reservation Request*\n\n*Booking ID:* ${bookingId}\n*Name:* ${nameInput.value}\n*Phone:* ${phoneInput.value}\n*Date:* ${dateVal}\n*Time Slot:* ${state.selectedTimeSlot}\n*Guests:* ${state.selectedGuests}\n*Ambience Zone:* ${state.selectedZone}\n*Special Request:* ${notesInput && notesInput.value ? notesInput.value : 'None'}\n\n📍 *The Flex House Cafe, Unnao*\nPlease confirm our table reservation!`;
          const url = `https://wa.me/918400580216?text=${encodeURIComponent(msg)}`;
          window.open(url, '_blank');
        };
      }

      // Show modal
      if (bookingSuccessModal) {
        bookingSuccessModal.classList.add('open');
      }
    });
  }

  // Booking Modal Close
  if (bookingModalClose && bookingSuccessModal) {
    bookingModalClose.addEventListener('click', () => {
      soundEngine.click();
      bookingSuccessModal.classList.remove('open');
    });

    bookingSuccessModal.addEventListener('click', (e) => {
      if (e.target === bookingSuccessModal) {
        bookingSuccessModal.classList.remove('open');
      }
    });
  }

  // Menu Photo Lightbox Modal
  if (openMenuPhotosBtn && menuLightboxModal) {
    openMenuPhotosBtn.addEventListener('click', () => {
      soundEngine.click();
      menuLightboxModal.classList.add('open');
    });
  }

  if (lightboxModalClose && menuLightboxModal) {
    lightboxModalClose.addEventListener('click', () => {
      soundEngine.click();
      menuLightboxModal.classList.remove('open');
    });

    menuLightboxModal.addEventListener('click', (e) => {
      if (e.target === menuLightboxModal) {
        menuLightboxModal.classList.remove('open');
      }
    });
  }

  // Lightbox Tabs (Combos vs Main Menu)
  lightboxTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      soundEngine.click();
      lightboxTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetMenu = btn.dataset.menuPhoto;
      if (lightboxImg) {
        lightboxImg.src = targetMenu === 'combo' ? 'assets/images/combo-menu.jpg' : 'assets/images/main-menu.jpg';
      }
    });
  });

  // Confetti Animation for Celebrations & Flex Mode
  function triggerConfetti() {
    const colors = ['#FFB703', '#FB8500', '#00F0FF', '#00E5FF', '#FFD166', '#00FFA3', '#FFFFFF'];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `-20px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.width = `${Math.floor(Math.random() * 8 + 6)}px`;
      particle.style.height = `${Math.floor(Math.random() * 12 + 6)}px`;
      particle.style.animationDuration = `${Math.random() * 2 + 1.8}s`;
      particle.style.animationDelay = `${Math.random() * 0.4}s`;

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 3500);
    }
  }

  // "FLEX CELEBRATION MODE" Trigger Button
  if (flexCelebrationBtn) {
    flexCelebrationBtn.addEventListener('click', () => {
      soundEngine.fanfare();
      triggerConfetti();

      state.flexModeActive = !state.flexModeActive;
      document.body.classList.toggle('max-flex-mode', state.flexModeActive);

      showQuickNotification(state.flexModeActive ? '🔥 FLEX MODE ACTIVATED! Welcome to The Flex House!' : 'Flex Mode Deactivated');
    });
  }

  // Interactive Jumping Sticker Click Events
  document.querySelectorAll('.jump-sticker').forEach(sticker => {
    sticker.addEventListener('click', (e) => {
      soundEngine.addPlate();
      const stickerEl = e.currentTarget;
      stickerEl.style.transform = 'translateY(-18px) scale(1.25) rotate(-10deg)';
      setTimeout(() => {
        stickerEl.style.transform = '';
      }, 350);
      const cat = stickerEl.dataset.jumpCategory;
      if (cat) {
        const catBtn = document.querySelector(`.cat-pill[data-category="${cat}"]`);
        if (catBtn) catBtn.click();
        const menuSec = document.getElementById('menu');
        if (menuSec) menuSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================================================
  // CONTINUOUS BACKGROUND VIDEO & FLOATING CAFE ENTRANCE WINDOW
  // ==========================================================================
  const bgSpaceVideo = document.getElementById('bgSpaceVideo');
  const floatingCafeWindow = document.getElementById('floatingCafeWindow');
  const floatingTourPill = document.getElementById('floatingTourPill');
  const fcEntranceVideo = document.getElementById('fcEntranceVideo');
  const fcVideoFrame = document.getElementById('fcVideoFrame');
  const fcAudioBtn = document.getElementById('fcAudioBtn');
  const fcMaximizeBtn = document.getElementById('fcMaximizeBtn');
  const fcMinimizeBtn = document.getElementById('fcMinimizeBtn');
  const fcCloseBtn = document.getElementById('fcCloseBtn');
  const fcWindowBackdrop = document.getElementById('fcWindowBackdrop');
  const fcFullscreenChip = document.getElementById('fcFullscreenChip');
  const navOpenTourBtn = document.getElementById('navOpenTourBtn');
  const headerTourToggleBtn = document.getElementById('headerTourToggleBtn');

  // Configure background video properties for seamless mobile Safari / Chrome autoplay
  if (bgSpaceVideo) {
    bgSpaceVideo.muted = true;
    bgSpaceVideo.defaultMuted = true;
    bgSpaceVideo.playsInline = true;
  }
  if (fcEntranceVideo) {
    fcEntranceVideo.muted = true;
    fcEntranceVideo.defaultMuted = true;
    fcEntranceVideo.playsInline = true;
  }

  // Mobile initial state: minimize floating tour so it never obstructs the mobile viewport
  if (window.innerWidth <= 768 && floatingCafeWindow && floatingTourPill) {
    floatingCafeWindow.style.display = 'none';
    floatingTourPill.style.display = 'inline-flex';
  }

  // 1. Battery & Tab Lifecycle optimization for videos
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (bgSpaceVideo && !bgSpaceVideo.paused) bgSpaceVideo.pause();
      if (fcEntranceVideo && !fcEntranceVideo.paused) fcEntranceVideo.pause();
    } else {
      if (bgSpaceVideo && bgSpaceVideo.paused) bgSpaceVideo.play().catch(() => {});
      if (fcEntranceVideo && fcEntranceVideo.paused && floatingCafeWindow && floatingCafeWindow.style.display !== 'none') {
        fcEntranceVideo.play().catch(() => {});
      }
    }
  });

  // Ensure autoplay on first user interaction if blocked by mobile browser policies
  const tryStartAutoplay = () => {
    if (bgSpaceVideo && bgSpaceVideo.paused) bgSpaceVideo.play().catch(() => {});
    if (fcEntranceVideo && fcEntranceVideo.paused) fcEntranceVideo.play().catch(() => {});
    document.removeEventListener('click', tryStartAutoplay);
    document.removeEventListener('touchstart', tryStartAutoplay);
  };
  document.addEventListener('click', tryStartAutoplay, { once: true });
  document.addEventListener('touchstart', tryStartAutoplay, { once: true, passive: true });

  // 2. Floating Cafe Entrance Window Controls & Maximize Mode
  function setFloatingTourMaximized(isMax) {
    if (!floatingCafeWindow) return;
    if (isMax) {
      floatingCafeWindow.classList.add('is-maximized');
      if (fcWindowBackdrop) fcWindowBackdrop.classList.add('active');
      if (fcMaximizeBtn) {
        fcMaximizeBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        fcMaximizeBtn.title = 'Restore Window Size';
        fcMaximizeBtn.setAttribute('aria-label', 'Restore Window Size');
      }
    } else {
      floatingCafeWindow.classList.remove('is-maximized');
      if (fcWindowBackdrop) fcWindowBackdrop.classList.remove('active');
      if (fcMaximizeBtn) {
        fcMaximizeBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        fcMaximizeBtn.title = 'Maximize Video';
        fcMaximizeBtn.setAttribute('aria-label', 'Maximize Video');
      }
    }
  }

  function toggleMaximizeFloatingTour() {
    if (!floatingCafeWindow) return;
    const isNowMaximized = !floatingCafeWindow.classList.contains('is-maximized');
    setFloatingTourMaximized(isNowMaximized);
    soundEngine.click();
  }

  function openFloatingTour() {
    if (!floatingCafeWindow) return;
    floatingCafeWindow.style.display = 'block';
    if (floatingTourPill) floatingTourPill.style.display = 'none';
    if (fcEntranceVideo) fcEntranceVideo.play().catch(() => {});
    soundEngine.click();
  }

  function minimizeFloatingTour() {
    if (!floatingCafeWindow) return;
    setFloatingTourMaximized(false);
    floatingCafeWindow.style.display = 'none';
    if (floatingTourPill) floatingTourPill.style.display = 'inline-flex';
    soundEngine.click();
  }

  function closeFloatingTour() {
    minimizeFloatingTour();
    if (fcEntranceVideo) fcEntranceVideo.pause();
  }

  if (fcAudioBtn && fcEntranceVideo) {
    fcAudioBtn.addEventListener('click', () => {
      fcEntranceVideo.muted = !fcEntranceVideo.muted;
      if (!fcEntranceVideo.muted) fcEntranceVideo.volume = 1.0;
      fcAudioBtn.innerHTML = fcEntranceVideo.muted
        ? '<i class="fa-solid fa-volume-xmark"></i>'
        : '<i class="fa-solid fa-volume-high"></i>';
      fcAudioBtn.title = fcEntranceVideo.muted ? 'Unmute Sound' : 'Mute Sound';
      soundEngine.click();
    });
  }

  if (fcMaximizeBtn) fcMaximizeBtn.addEventListener('click', toggleMaximizeFloatingTour);
  if (fcMinimizeBtn) fcMinimizeBtn.addEventListener('click', minimizeFloatingTour);
  if (fcCloseBtn) fcCloseBtn.addEventListener('click', closeFloatingTour);
  if (floatingTourPill) floatingTourPill.addEventListener('click', openFloatingTour);
  if (navOpenTourBtn) navOpenTourBtn.addEventListener('click', openFloatingTour);
  if (headerTourToggleBtn) headerTourToggleBtn.addEventListener('click', () => {
    if (floatingCafeWindow && floatingCafeWindow.style.display === 'none') {
      openFloatingTour();
    } else {
      minimizeFloatingTour();
    }
  });

  if (mobileDrawerTourBtn) {
    mobileDrawerTourBtn.addEventListener('click', () => {
      closeMobileNav();
      openFloatingTour();
      if (window.innerWidth <= 768) {
        setFloatingTourMaximized(true);
      }
    });
  }

  if (fcWindowBackdrop) {
    fcWindowBackdrop.addEventListener('click', () => {
      setFloatingTourMaximized(false);
      soundEngine.click();
    });
  }

  // Escape key to restore maximized video
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && floatingCafeWindow && floatingCafeWindow.classList.contains('is-maximized')) {
      setFloatingTourMaximized(false);
    }
  });

  // Double click video frame to toggle maximize
  if (fcVideoFrame) {
    fcVideoFrame.addEventListener('dblclick', toggleMaximizeFloatingTour);
  }

  // Click on video to toggle play/pause
  if (fcEntranceVideo) {
    fcEntranceVideo.addEventListener('click', () => {
      if (fcEntranceVideo.paused) {
        fcEntranceVideo.play().catch(() => {});
      } else {
        fcEntranceVideo.pause();
      }
    });
  }

  // Device Fullscreen toggle
  if (fcFullscreenChip && fcEntranceVideo) {
    fcFullscreenChip.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fcEntranceVideo.requestFullscreen) {
        fcEntranceVideo.requestFullscreen().catch(() => {});
      } else if (fcEntranceVideo.webkitEnterFullscreen) {
        fcEntranceVideo.webkitEnterFullscreen();
      } else if (fcEntranceVideo.webkitRequestFullscreen) {
        fcEntranceVideo.webkitRequestFullscreen().catch(() => {});
      } else if (fcEntranceVideo.msRequestFullscreen) {
        fcEntranceVideo.msRequestFullscreen().catch(() => {});
      }
      soundEngine.click();
    });
  }

  // ==========================================================================
  // PWA (PROGRESSIVE WEB APP) SERVICE WORKER & 1-TAP INSTALL
  // ==========================================================================
  const pwaInstallBtn = document.getElementById('pwaInstallBtn');
  let deferredPrompt = null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('ServiceWorker registration skipped:', err);
      });
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'inline-flex';
      pwaInstallBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showQuickNotification('🎉 The Flex House App Installed!');
        }
        deferredPrompt = null;
        pwaInstallBtn.style.display = 'none';
      });
    }
  });

  // ==========================================================================
  // HIGH-SPEED GOOGLE MAP EMBED OPTIMIZATION & INSTANT SKELETON FADE
  // ==========================================================================
  const googleMapIframe = document.getElementById('googleMapIframe');
  const mapSkeleton = document.getElementById('mapSkeleton');

  if (googleMapIframe && mapSkeleton) {
    let mapLoaded = false;
    const hideMapSkeleton = () => {
      if (mapLoaded) return;
      mapLoaded = true;
      mapSkeleton.classList.add('fade-out');
      setTimeout(() => {
        mapSkeleton.style.display = 'none';
      }, 450);
    };

    googleMapIframe.addEventListener('load', hideMapSkeleton);

    // Failsafe: ensure map becomes fully interactive even if iframe load event is delayed by 3rd party scripts
    setTimeout(hideMapSkeleton, 3000);
  }

  // ==========================================================================
  // GOOGLE MAPS REVIEWS DYNAMIC DATA LOADER (AUTO-SYNC SYSTEM)
  // ==========================================================================
  const reviewsGrid = document.getElementById('reviewsGrid');
  const reviewsSyncPill = document.getElementById('reviewsSyncPill');

  async function loadAndRenderGoogleReviews() {
    if (!reviewsGrid) return;

    try {
      const response = await fetch('assets/data/reviews.json', { cache: 'no-cache' });
      if (!response.ok) return;

      const data = await response.json();
      if (!data || !Array.isArray(data.reviews) || data.reviews.length === 0) return;

      // Update sync pill with live rating & count
      if (reviewsSyncPill && data.rating) {
        reviewsSyncPill.innerHTML = `<span class="status-dot"></span> Synced with Google Maps (${Number(data.rating).toFixed(1)} ★ • ${data.user_ratings_total || 100}+ reviews)`;
      }

      reviewsGrid.innerHTML = data.reviews.map(review => {
        const stars = '★'.repeat(Math.min(5, Math.max(1, Math.round(review.rating || 5))));
        const avatarStyle = review.avatar_gradient ? `style="background: ${review.avatar_gradient};"` : '';
        const authorInitial = review.avatar_text || (review.author_name ? review.author_name.slice(0, 2).toUpperCase() : 'TF');

        return `
          <div class="review-card">
            <div class="review-card-top">
              <div class="review-stars">${stars}</div>
              <span class="review-google-badge"><i class="fa-brands fa-google"></i> Google</span>
            </div>
            <p class="review-quote">"${review.text}"</p>
            <div class="reviewer-meta">
              <div class="reviewer-avatar" ${avatarStyle}>${authorInitial}</div>
              <div class="reviewer-info">
                <h5>${review.author_name}</h5>
                <span>${review.tag || `${review.relative_time || 'Recent'} • 5.0 Review`}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } catch (e) {
      // Keep static SSR fallback cards if fetch fails or during offline/file:// mode
      console.log('Using static Google reviews fallback:', e.message);
    }
  }

  // Initial Render
  renderMenuItems();
  updateCartUI();
  loadAndRenderGoogleReviews();
});
