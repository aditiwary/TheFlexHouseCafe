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
  if (mobileNavToggle && navLinksContainer) {
    mobileNavToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
      soundEngine.click();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
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
    const colors = ['#FFB703', '#FB8500', '#00F0FF', '#FF007F', '#00FFA3', '#FFFFFF'];
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
  // TOP SCROLL PROGRESS BAR
  // ==========================================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      scrollProgressBar.style.width = `${scrolled}%`;
    }, { passive: true });
  }

  // ==========================================================================
  // SCROLL REVEAL OBSERVER (SMOOTH ENTRANCE ANIMATIONS)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ==========================================================================
  // ANIMATED STATS COUNTER ON SCROLL
  // ==========================================================================
  const statsStrip = document.querySelector('.flex-stats-strip');
  let statsCounted = false;
  if (statsStrip && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && !statsCounted) {
        statsCounted = true;
        document.querySelectorAll('.stat-number').forEach(stat => {
          const target = parseFloat(stat.dataset.target);
          if (isNaN(target)) return;
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const step = target / 35;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (isDecimal) {
              stat.textContent = `${current.toFixed(1)} ★`;
            } else if (target === 100) {
              stat.textContent = `${Math.floor(current)}%`;
            } else if (target === 29) {
              stat.textContent = `₹${Math.floor(current)}`;
            } else {
              stat.textContent = `${Math.floor(current)}+`;
            }
          }, 30);
        });
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsStrip);
  }

  // ==========================================================================
  // INTERACTIVE 3D CARD TILT ON MOUSE HOVER
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.showpiece-card, .storefront-frame, .cinema-player-card, .hero-brand-crest');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // CINEMA & LIVE REEL STREAM ENGINE
  // ==========================================================================
  const cinemaVideo = document.getElementById('mainCinemaVideo');
  const cinemaCanvas = document.getElementById('cinemaAmbientCanvas');
  const cinemaIframeWrap = document.getElementById('cinemaIframeWrap');
  const cinemaIframe = document.getElementById('cinemaIframe');
  const cinemaBackdropGlow = document.getElementById('cinemaBackdropGlow');
  const cinemaOverlay = document.getElementById('cinemaInteractiveOverlay');
  const centerPlayIcon = document.getElementById('centerPlayIcon');
  const ctrlPlayPause = document.getElementById('ctrlPlayPause');
  const ctrlMuteToggle = document.getElementById('ctrlMuteToggle');
  const ctrlVolumeSlider = document.getElementById('ctrlVolumeSlider');
  const ctrlTimeDisplay = document.getElementById('ctrlTimeDisplay');
  const videoScrubberWrap = document.getElementById('videoScrubberWrap');
  const videoScrubberFill = document.getElementById('videoScrubberFill');
  const videoScrubberBuffered = document.getElementById('videoScrubberBuffered');
  const videoScrubberHandle = document.getElementById('videoScrubberHandle');
  const ctrlLoopToggle = document.getElementById('ctrlLoopToggle');
  const ctrlFullscreen = document.getElementById('ctrlFullscreen');
  const streamScreenWrap = document.getElementById('cinemaScreenWrap');
  const activeStreamTitle = document.getElementById('activeStreamTitle');
  const activeChannelBadge = document.getElementById('activeChannelBadge');
  const reelPills = document.querySelectorAll('.reel-pill');

  // Video Modals
  const openVideoUploadModalBtn = document.getElementById('openVideoUploadModalBtn');
  const openVideoHostingGuideBtn = document.getElementById('openVideoHostingGuideBtn');
  const videoUploadModal = document.getElementById('videoUploadModal');
  const videoUploadModalClose = document.getElementById('videoUploadModalClose');
  const closeStudioBtn = document.getElementById('closeStudioBtn');
  const videoGuideModal = document.getElementById('videoGuideModal');
  const videoGuideModalClose = document.getElementById('videoGuideModalClose');
  const openGuideFromStudioBtn = document.getElementById('openGuideFromStudioBtn');
  const guideCloseAndUploadBtn = document.getElementById('guideCloseAndUploadBtn');
  const videoDropZone = document.getElementById('videoDropZone');
  const videoFileInput = document.getElementById('videoFileInput');
  const btnTriggerFilePicker = document.getElementById('btnTriggerFilePicker');
  const videoFileMeta = document.getElementById('videoFileMeta');
  const metaFileName = document.getElementById('metaFileName');
  const metaFileSize = document.getElementById('metaFileSize');
  const directVideoUrlInput = document.getElementById('directVideoUrlInput');
  const applyDirectUrlBtn = document.getElementById('applyDirectUrlBtn');
  const socialVideoUrlInput = document.getElementById('socialVideoUrlInput');
  const applySocialUrlBtn = document.getElementById('applySocialUrlBtn');
  const studioTabBtns = document.querySelectorAll('.studio-tab-btn');

  // Reel Configuration Data
  const REEL_CONFIGS = {
    'reel-1': {
      id: 'reel-1',
      badge: 'TFH REEL 01',
      title: '✨ Reel 01: Neon Vibe & Cafe Lounge Tour',
      videoSrc: 'assets/videos/cafe-reel-1.mp4',
      poster: 'assets/images/cafe-reel-1-poster.png',
      glow: 'rgba(255, 183, 3, 0.45)',
      themeColor: '#FFB703'
    },
    'reel-2': {
      id: 'reel-2',
      badge: 'TFH REEL 02',
      title: '🔥 Reel 02: Sizzling Bites & Kitchen Cravings',
      videoSrc: 'assets/videos/cafe-reel-2.mp4',
      poster: 'assets/images/cafe-reel-2-poster.png',
      glow: 'rgba(0, 240, 255, 0.4)',
      themeColor: '#00F0FF'
    },
    pizza: {
      id: 'pizza',
      badge: 'TFH REEL 03',
      title: '🍕 Signature Artisan Pizza & Cheese Pull',
      videoSrc: 'assets/videos/cafe-reel-1.mp4',
      poster: 'assets/images/flex-pizza.jpg',
      glow: 'rgba(255, 183, 3, 0.45)',
      themeColor: '#FFB703'
    },
    momos: {
      id: 'momos',
      badge: 'TFH REEL 04',
      title: '🥟 Crispy Kurkure Momos & Flame-Wok Toss',
      videoSrc: 'assets/videos/cafe-reel-2.mp4',
      poster: 'assets/images/flex-momos-noodles.jpg',
      glow: 'rgba(0, 240, 255, 0.4)',
      themeColor: '#00F0FF'
    }
  };

  let activeReelKey = 'reel-1';
  let isCustomVideoLoaded = false;

  // Generative Canvas Visualizer (Ambient Sizzle & Neon Lights)
  let canvasCtx = null;
  let canvasParticles = [];

  function initCinemaCanvas() {
    if (!cinemaCanvas) return;
    canvasCtx = cinemaCanvas.getContext('2d');
    resizeCinemaCanvas();
    window.addEventListener('resize', resizeCinemaCanvas, { passive: true });

    // Spawn ambient light particles
    canvasParticles = [];
    for (let i = 0; i < 35; i++) {
      canvasParticles.push({
        x: Math.random() * (cinemaCanvas.width || 800),
        y: Math.random() * (cinemaCanvas.height || 450),
        r: Math.random() * 4 + 1.5,
        dx: (Math.random() - 0.5) * 0.8,
        dy: -Math.random() * 1.5 - 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.5 ? '#FFB703' : '#00F0FF'
      });
    }

    renderCinemaCanvas();
  }

  function resizeCinemaCanvas() {
    if (!cinemaCanvas || !streamScreenWrap) return;
    cinemaCanvas.width = streamScreenWrap.clientWidth || 960;
    cinemaCanvas.height = streamScreenWrap.clientHeight || 540;
  }

  function renderCinemaCanvas() {
    if (!canvasCtx || !cinemaCanvas) return;

    canvasCtx.clearRect(0, 0, cinemaCanvas.width, cinemaCanvas.height);

    // Draw subtle rising particles
    canvasParticles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < 0) {
        p.y = cinemaCanvas.height + 10;
        p.x = Math.random() * cinemaCanvas.width;
      }

      canvasCtx.beginPath();
      canvasCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      canvasCtx.fillStyle = p.color;
      canvasCtx.globalAlpha = p.alpha * 0.6;
      canvasCtx.shadowBlur = 10;
      canvasCtx.shadowColor = p.color;
      canvasCtx.fill();
    });
    canvasCtx.globalAlpha = 1.0;
    canvasCtx.shadowBlur = 0;

    requestAnimationFrame(renderCinemaCanvas);
  }

  initCinemaCanvas();

  // Switch Reel
  function switchReel(reelKey) {
    const config = REEL_CONFIGS[reelKey];
    if (!config) return;

    activeReelKey = reelKey;

    reelPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.reelId === reelKey);
    });

    if (activeStreamTitle) activeStreamTitle.textContent = config.title;
    if (activeChannelBadge) activeChannelBadge.textContent = config.badge;

    if (cinemaBackdropGlow) {
      cinemaBackdropGlow.style.background = `radial-gradient(ellipse at center, ${config.glow} 0%, rgba(0, 240, 255, 0.1) 40%, transparent 70%)`;
    }

    if (cinemaVideo) {
      if (config.videoSrc && !isCustomVideoLoaded) {
        const curSrc = cinemaVideo.currentSrc || cinemaVideo.src || '';
        if (!curSrc.includes(config.videoSrc)) {
          cinemaVideo.src = config.videoSrc;
          cinemaVideo.load();
          cinemaVideo.play().then(() => updatePlayState(true)).catch(() => updatePlayState(false));
        }
      }
      cinemaVideo.poster = config.poster;
      if (!isCustomVideoLoaded) {
        cinemaVideo.currentTime = 0;
      }
    }

    soundEngine.click();
  }

  reelPills.forEach(pill => {
    pill.addEventListener('click', () => {
      switchReel(pill.dataset.reelId);
    });
  });

  // Play / Pause Toggle
  function toggleCinemaPlay() {
    if (!cinemaVideo) return;

    if (cinemaVideo.paused) {
      cinemaVideo.play().then(() => {
        updatePlayState(true);
      }).catch(err => {
        console.warn('Playback deferred', err);
        updatePlayState(false);
      });
    } else {
      cinemaVideo.pause();
      updatePlayState(false);
    }
  }

  function updatePlayState(isPlaying) {
    if (ctrlPlayPause) ctrlPlayPause.textContent = isPlaying ? '⏸' : '▶';
    if (centerPlayIcon) centerPlayIcon.textContent = isPlaying ? '⏸' : '▶';
    if (cinemaOverlay) {
      cinemaOverlay.style.opacity = isPlaying ? '0' : '1';
      cinemaOverlay.style.pointerEvents = isPlaying ? 'none' : 'auto';
    }
  }

  if (cinemaOverlay) cinemaOverlay.addEventListener('click', toggleCinemaPlay);
  if (ctrlPlayPause) ctrlPlayPause.addEventListener('click', toggleCinemaPlay);

  if (cinemaVideo) {
    cinemaVideo.addEventListener('play', () => updatePlayState(true));
    cinemaVideo.addEventListener('pause', () => updatePlayState(false));

    // Time update & Scrubber
    cinemaVideo.addEventListener('timeupdate', () => {
      const cur = cinemaVideo.currentTime || 0;
      const dur = cinemaVideo.duration || 30;
      const pct = (cur / dur) * 100;

      if (videoScrubberFill) videoScrubberFill.style.width = `${pct}%`;
      if (videoScrubberHandle) videoScrubberHandle.style.left = `${pct}%`;

      const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      };

      if (ctrlTimeDisplay) {
        ctrlTimeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
      }
    });

    cinemaVideo.addEventListener('progress', () => {
      if (cinemaVideo.buffered.length > 0 && videoScrubberBuffered) {
        const bufferedEnd = cinemaVideo.buffered.end(cinemaVideo.buffered.length - 1);
        const dur = cinemaVideo.duration || 30;
        videoScrubberBuffered.style.width = `${(bufferedEnd / dur) * 100}%`;
      }
    });
  }

  // Scrubber Seek
  if (videoScrubberWrap && cinemaVideo) {
    videoScrubberWrap.addEventListener('click', (e) => {
      const rect = videoScrubberWrap.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const dur = cinemaVideo.duration || 30;
      cinemaVideo.currentTime = clickPos * dur;
    });
  }

  // Mute / Unmute & Volume
  if (ctrlMuteToggle && cinemaVideo) {
    ctrlMuteToggle.addEventListener('click', () => {
      cinemaVideo.muted = !cinemaVideo.muted;
      ctrlMuteToggle.textContent = cinemaVideo.muted ? '🔇' : '🔊';
      if (ctrlVolumeSlider) ctrlVolumeSlider.value = cinemaVideo.muted ? 0 : (cinemaVideo.volume || 1);
    });
  }

  if (ctrlVolumeSlider && cinemaVideo) {
    ctrlVolumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      cinemaVideo.volume = val;
      cinemaVideo.muted = val === 0;
      if (ctrlMuteToggle) ctrlMuteToggle.textContent = val === 0 ? '🔇' : '🔊';
    });
  }

  // Loop Toggle
  if (ctrlLoopToggle && cinemaVideo) {
    ctrlLoopToggle.addEventListener('click', () => {
      cinemaVideo.loop = !cinemaVideo.loop;
      ctrlLoopToggle.style.color = cinemaVideo.loop ? 'var(--neon-green)' : '#FFFFFF';
      showQuickNotification(cinemaVideo.loop ? '🔁 Video Loop Enabled' : 'Video Loop Disabled');
    });
  }

  // Fullscreen
  if (ctrlFullscreen && streamScreenWrap) {
    ctrlFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        streamScreenWrap.requestFullscreen().catch(err => {
          console.warn('Fullscreen error:', err);
        });
      } else {
        document.exitFullscreen();
      }
    });
  }

  // ==========================================================================
  // VIDEO UPLOAD & STUDIO MODAL HANDLERS
  // ==========================================================================
  function openStudioModal(activeTab = 'local') {
    if (!videoUploadModal) return;
    videoUploadModal.classList.add('active');
    switchStudioTab(activeTab);
    soundEngine.click();
  }

  function closeStudioModal() {
    if (!videoUploadModal) return;
    videoUploadModal.classList.remove('active');
  }

  function openGuideModal() {
    if (!videoGuideModal) return;
    videoGuideModal.classList.add('active');
    soundEngine.click();
  }

  function closeGuideModal() {
    if (!videoGuideModal) return;
    videoGuideModal.classList.remove('active');
  }

  if (openVideoUploadModalBtn) openVideoUploadModalBtn.addEventListener('click', () => openStudioModal('local'));
  if (openVideoHostingGuideBtn) openVideoHostingGuideBtn.addEventListener('click', openGuideModal);
  if (videoUploadModalClose) videoUploadModalClose.addEventListener('click', closeStudioModal);
  if (closeStudioBtn) closeStudioBtn.addEventListener('click', closeStudioModal);
  if (videoGuideModalClose) videoGuideModalClose.addEventListener('click', closeGuideModal);

  if (openGuideFromStudioBtn) {
    openGuideFromStudioBtn.addEventListener('click', () => {
      closeStudioModal();
      openGuideModal();
    });
  }

  if (guideCloseAndUploadBtn) {
    guideCloseAndUploadBtn.addEventListener('click', () => {
      closeGuideModal();
      openStudioModal('local');
    });
  }

  // Quick Option Cards click bindings
  const cardOptYoutube = document.getElementById('cardOptYoutube');
  const cardOptCdn = document.getElementById('cardOptCdn');
  const cardOptS3 = document.getElementById('cardOptS3');
  const cardOptLocal = document.getElementById('cardOptLocal');

  if (cardOptYoutube) cardOptYoutube.addEventListener('click', () => openStudioModal('embed'));
  if (cardOptCdn) cardOptCdn.addEventListener('click', openGuideModal);
  if (cardOptS3) cardOptS3.addEventListener('click', openGuideModal);
  if (cardOptLocal) cardOptLocal.addEventListener('click', () => openStudioModal('local'));

  // Studio Mode Tabs
  function switchStudioTab(tabKey) {
    studioTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    const paneLocal = document.getElementById('paneUploadLocal');
    const paneUrl = document.getElementById('paneStreamUrl');
    const paneEmbed = document.getElementById('paneEmbedSocial');

    if (paneLocal) paneLocal.style.display = tabKey === 'local' ? 'block' : 'none';
    if (paneUrl) paneUrl.style.display = tabKey === 'url' ? 'block' : 'none';
    if (paneEmbed) paneEmbed.style.display = tabKey === 'embed' ? 'block' : 'none';
  }

  studioTabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchStudioTab(btn.dataset.tab));
  });

  // Local File Upload & Drag-and-Drop
  if (btnTriggerFilePicker && videoFileInput) {
    btnTriggerFilePicker.addEventListener('click', (e) => {
      e.stopPropagation();
      videoFileInput.click();
    });
  }

  if (videoDropZone && videoFileInput) {
    videoDropZone.addEventListener('click', () => videoFileInput.click());

    ['dragenter', 'dragover'].forEach(eventName => {
      videoDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        videoDropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      videoDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        videoDropZone.classList.remove('dragover');
      }, false);
    });

    videoDropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleLocalVideoFile(files[0]);
      }
    });

    videoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleLocalVideoFile(e.target.files[0]);
      }
    });
  }

  function handleLocalVideoFile(file) {
    if (!file || !file.type.startsWith('video/')) {
      alert('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    if (cinemaVideo) {
      cinemaVideo.src = objectUrl;
      cinemaVideo.muted = false;
      cinemaVideo.load();
      cinemaVideo.play().catch(e => console.log('Autoplay handled', e));

      isCustomVideoLoaded = true;

      if (cinemaIframeWrap) cinemaIframeWrap.style.display = 'none';
      if (cinemaVideo) cinemaVideo.style.display = 'block';

      if (activeStreamTitle) activeStreamTitle.textContent = `🎬 Custom Stream: ${file.name}`;
      if (activeChannelBadge) activeChannelBadge.textContent = 'LOCAL STREAM';

      if (videoFileMeta) videoFileMeta.style.display = 'flex';
      if (metaFileName) metaFileName.textContent = file.name;
      if (metaFileSize) metaFileSize.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      showQuickNotification(`🎥 Live Stream Started: ${file.name}!`);
      setTimeout(closeStudioModal, 800);
      soundEngine.fanfare();
    }
  }

  // Direct URL Streaming
  if (applyDirectUrlBtn && directVideoUrlInput) {
    applyDirectUrlBtn.addEventListener('click', () => {
      const url = directVideoUrlInput.value.trim();
      if (!url) return;

      if (cinemaVideo) {
        cinemaVideo.src = url;
        cinemaVideo.muted = false;
        cinemaVideo.load();
        cinemaVideo.play().catch(e => console.log('Autoplay handled', e));

        isCustomVideoLoaded = true;

        if (cinemaIframeWrap) cinemaIframeWrap.style.display = 'none';
        if (cinemaVideo) cinemaVideo.style.display = 'block';

        if (activeStreamTitle) activeStreamTitle.textContent = `🌐 CDN Stream: ${url.split('/').pop() || 'Live URL'}`;
        if (activeChannelBadge) activeChannelBadge.textContent = 'HLS / CDN';

        showQuickNotification('🌐 Streaming from Direct CDN URL!');
        closeStudioModal();
        soundEngine.fanfare();
      }
    });
  }

  // YouTube / Social Embed Stream
  if (applySocialUrlBtn && socialVideoUrlInput) {
    applySocialUrlBtn.addEventListener('click', () => {
      const rawUrl = socialVideoUrlInput.value.trim();
      if (!rawUrl) return;

      let embedUrl = '';
      const ytMatch = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
      if (ytMatch && ytMatch[1]) {
        embedUrl = `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&mute=0&rel=0&loop=1&playlist=${ytMatch[1]}`;
      } else if (rawUrl.includes('vimeo.com/')) {
        const vimeoId = rawUrl.split('/').filter(Boolean).pop();
        embedUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1`;
      } else {
        embedUrl = rawUrl;
      }

      if (cinemaIframe && cinemaIframeWrap) {
        cinemaIframe.src = embedUrl;
        cinemaIframeWrap.style.display = 'block';
        if (cinemaVideo) cinemaVideo.pause();

        if (activeStreamTitle) activeStreamTitle.textContent = '▶️ Streaming Social Cinema Reel';
        if (activeChannelBadge) activeChannelBadge.textContent = 'YOUTUBE / SOCIAL';

        showQuickNotification('▶️ Embedded Stream Active!');
        closeStudioModal();
        soundEngine.fanfare();
      }
    });
  }

  // Initial Render
  renderMenuItems();
  updateCartUI();
});
