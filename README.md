# The Flex House Cafe 🍕☕

> **Good Food • Great Mood • Every Time**  
> Unnao's premier cyber-neon cafe & restaurant located in PD Nagar, Nirala Nagar, Unnao.

---

## 🍽️ Features & Experience

Official responsive web application for **The Flex House Cafe**, featuring:
- **🌌 Ambient Fullscreen Background Video:** Space-to-earth descent drone reel continuously playing in the background with cyber-dark overlays.
- **⚡ Floating Stylish Cafe Tour Window:** PiP-style glowing neon window hovering at the bottom of the screen showcasing the cafe entrance, neon corridor, and lounge with audio toggle and minimize controls.
- **📱 PWA & Universal Device Compatibility:** 1-tap installable Progressive Web App with offline caching (`manifest.json` + `sw.js`). Ultra-lightweight, smooth, and flexible on Android, iOS Safari, iPads, tablets, and Windows.
- **🍕 Interactive Digital Menu & Filtering:** Handcrafted Pizzas, Burgers, Pastas, Crispy Kurkure Momos, Indo-Chinese Wok, Shakes, and 12+ Super Combos starting at ₹130.
- **🗓️ Table Reservation & Party Booking System:** Instant booking request flow with time slots and direct WhatsApp confirmation.
- **📍 Location & Contact:** Verified 5.0 Google rating, Google Maps integration, and 1-tap WhatsApp concierge.

---

## 🚀 Getting Started

### Local Development

You can serve this website using any static HTTP server:

```bash
# Using Python
python3 -m http.server 8899

# Or using Node.js / npx
npx serve .
```

Open [http://localhost:8899](http://localhost:8899) in your browser.

---

## 📂 Project Structure

```
TheFlexHouseCafe/
├── assets/
│   ├── css/
│   │   └── style.css           # Cyber-neon styling, floating window, animations
│   ├── js/
│   │   ├── app.js              # PWA lifecycle, video window controls, cart & UI
│   │   └── menu-data.js        # Authentic The Flex House Cafe menu database
│   ├── images/                 # Storefront, combos, food photos & flex-logo
│   └── videos/
│       ├── cafe-reel-1.mp4     # Space descent ambient background video
│       └── cafe-reel-2.mp4     # Cafe entrance & lounge tour video
├── index.html                  # Main landing page
├── manifest.json               # PWA web app manifest
├── sw.js                       # Service worker for offline caching & install
├── vercel.json                 # Vercel deployment configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

---

## 📄 License

All rights reserved © The Flex House Cafe.
