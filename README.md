# ☕ Hell House Cafe Website

The ultimate flex & showpiece website for **Hell House Cafe** (Unnao) — featuring a cyber-luxury neon aesthetic, 4K reel video streaming showcase, interactive food & beverage menu with live search & filtering, booking reservation modal, and WhatsApp ordering integration.

---

## ✨ Features

- **🎬 4K Dual Reel Showcase**:
  - Live dual-reel stream player featuring official cafe videos:
    - `Reel 01`: Hell House Neon Vibe & Lounge Tour (`cafe-reel-1.mp4`)
    - `Reel 02`: Sizzling Bites & Kitchen Craving (`cafe-reel-2.mp4`)
  - Channel switcher tabs, custom play/pause, instant sound toggle, and fullscreen mode.
- **🔥 Cyberpunk / Crimson Flame Aesthetics**:
  - Deep obsidian dark palette with crimson & amber embers.
  - Interactive ember particle canvas and smooth reveal micro-animations.
  - Glassmorphic navigation bar with scroll detection and mobile responsive menu.
- **🍕 Interactive Digital Menu**:
  - Complete categorization: Pizzas, Burgers, Sandwiches, Fries, Maggi, Momos, Shakes, Hot Brews, Coolers, and Desserts.
  - Instant search filter and dietary indicators (Veg/Non-Veg badges, Chef's Special tag).
- **📲 Direct WhatsApp Ordering & Table Booking**:
  - One-click WhatsApp concierge with pre-formatted message dispatch.
  - Interactive table reservation modal with validation.
- **📍 Location & Google Maps Integration**:
  - Direct directions link to the Unnao cafe location.

---

## 📂 Project Structure

```
├── index.html                  # Main landing page
├── vercel.json                 # Vercel deployment configuration
├── assets/
│   ├── css/
│   │   └── style.css           # Custom luxury design system & responsive styling
│   ├── js/
│   │   ├── app.js              # Application logic, reel switcher, modals, UI interactions
│   │   └── menu-data.js        # Structured cafe menu data
│   ├── images/                 # Logo, posters, food showcase photography
│   └── videos/
│       ├── cafe-reel-1.mp4     # Reel 01: Neon Vibe & Lounge
│       └── cafe-reel-2.mp4     # Reel 02: Sizzling Bites
└── README.md
```

---

## 🚀 Running Locally

You can preview the website locally using any static HTTP server:

```bash
# Python 3
python3 -m http.server 8899

# Or using Node http-server / npx serve
npx serve .
```

Then open `http://localhost:8899` in your browser.

---

## 🌐 Deployment

The repository is pre-configured for **Vercel**, **GitHub Pages**, or **Netlify**:
- Simply connect this repository to Vercel or run `vercel --prod`.
- Static HTML5/CSS3/Vanilla JS with zero build steps required.
