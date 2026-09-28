/**
 * Hell House Cafe - Official Menu Data
 * Address: Hiran Nagar (Opposite Bank of Baroda), Unnao, Uttar Pradesh
 * Contact: +91 8874056350
 */

const MENU_CATEGORIES = [
  { id: 'all', name: '🔥 All Items', icon: 'fa-fire' },
  { id: 'pizza', name: '🍕 Artisan Pizzas', icon: 'fa-pizza-slice' },
  { id: 'burger', name: '🍔 Burgers & Fries', icon: 'fa-burger' },
  { id: 'starter', name: '🥟 Starters & Momos', icon: 'fa-bowl-food' },
  { id: 'sandwich', name: '🥪 Sandwiches', icon: 'fa-bread-slice' },
  { id: 'maggi', name: '🍜 Maggi Bowls', icon: 'fa-fire-burner' },
  { id: 'mocktails', name: '🍹 Mocktails & Shakes', icon: 'fa-martini-glass-citrus' },
  { id: 'beverages', name: '☕ Beverages', icon: 'fa-mug-hot' }
];

const MENU_ITEMS = [
  // --- PIZZAS ---
  {
    id: 'pizza-1',
    name: 'Hell House Special Pizza',
    category: 'pizza',
    description: 'The ultimate signature pizza loaded with premium mozzarella, spiced paneer, crisp veggies & secret hellfire spice blend.',
    prices: { small: 170, medium: 300 },
    defaultSize: 'small',
    badge: "Chef's Signature 🔥",
    isVeg: true,
    isSpicy: true,
    rating: 5.0,
    tags: ['bestseller', 'special']
  },
  {
    id: 'pizza-2',
    name: 'Fully Loaded Pizza',
    category: 'pizza',
    description: 'Over-the-top loaded pizza packed with mozzarella, sweet corn, black olives, onions, capsicum & herbs.',
    prices: { small: 160, medium: 200 },
    defaultSize: 'small',
    badge: 'Heavy Cheese 🧀',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'pizza-3',
    name: 'Peppy Paneer Pizza',
    category: 'pizza',
    description: 'Juicy spiced paneer cubes, crisp capsicum, spicy red paprika & melted cheese drizzle.',
    prices: { small: 120, medium: 180 },
    defaultSize: 'small',
    badge: 'Popular Vibe',
    isVeg: true,
    isSpicy: true,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'pizza-4',
    name: 'Tandoori Veggie Pizza',
    category: 'pizza',
    description: 'Smoky tandoori sauce combined with crunchy onion, capsicum and golden baked crust.',
    prices: { small: 120, medium: 180 },
    defaultSize: 'small',
    badge: 'Tandoori Twist',
    isVeg: true,
    isSpicy: true,
    rating: 4.7,
    tags: []
  },
  {
    id: 'pizza-5',
    name: 'Moroccan Spicy Pizza',
    category: 'pizza',
    description: 'Exotic spicy combination crafted for adventurous tastebuds who crave an authentic fiery kick.',
    prices: { small: 90, medium: 160 },
    defaultSize: 'small',
    badge: 'Fiery Kick 🌶️',
    isVeg: true,
    isSpicy: true,
    rating: 4.7,
    tags: ['spicy']
  },
  {
    id: 'pizza-6',
    name: 'Morican Pizza',
    category: 'pizza',
    description: 'Cheesy classic foundation baked with fresh sun-ripened tomatoes, sweet capsicum & herbs.',
    prices: { small: 130, medium: 180 },
    defaultSize: 'small',
    badge: 'Classic Craft',
    isVeg: true,
    isSpicy: false,
    rating: 4.6,
    tags: []
  },
  {
    id: 'pizza-7',
    name: 'Cheese Corn Pizza',
    category: 'pizza',
    description: 'Golden sweet corn kernels swimming in gooey molten cheese on a crispy hand-stretched crust.',
    prices: { small: 80, medium: 150 },
    defaultSize: 'small',
    badge: 'Kids & Gangs Fav',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'pizza-8',
    name: 'Margherita Pizza',
    category: 'pizza',
    description: 'The timeless cheesy classic with rich tomato sauce and extra bubbling mozzarella cheese.',
    prices: { small: 70, medium: 130 },
    defaultSize: 'small',
    badge: 'True Classic',
    isVeg: true,
    isSpicy: false,
    rating: 4.6,
    tags: []
  },

  // --- BURGERS & FRIES ---
  {
    id: 'burger-1',
    name: 'Cheese Loaded Burger',
    category: 'burger',
    description: 'Double cheese drip, crispy patty, fresh crisp lettuce, juicy tomato and signature house relish.',
    price: 90,
    badge: 'Cheese Explosion 🧀',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'burger-2',
    name: 'Paneer Burger',
    category: 'burger',
    description: 'Golden crumb-fried spiced paneer steak topped with crunchy onion rings and smoky burger mayo.',
    price: 80,
    badge: 'Paneer King',
    isVeg: true,
    isSpicy: true,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'burger-3',
    name: 'Cheesy Burger',
    category: 'burger',
    description: 'Crisp vegetable patty enveloped in molten processed cheese and creamy mayo sauce.',
    price: 60,
    badge: 'Cafe Standard',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'burger-4',
    name: 'Veg Burger',
    category: 'burger',
    description: 'Classic spiced potato-herb patty inside toasted sesame bun with crisp veggies.',
    price: 50,
    badge: 'Pocket Friendly',
    isVeg: true,
    isSpicy: false,
    rating: 4.5,
    tags: []
  },
  {
    id: 'fries-1',
    name: 'Tandoori Fries',
    category: 'burger',
    description: 'Crisp salted fries drenched in rich smoky tandoori sauce and spiced seasoning.',
    price: 120,
    badge: 'Chef Pick 🔥',
    isVeg: true,
    isSpicy: true,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'fries-2',
    name: 'Cheesy Fries',
    category: 'burger',
    description: 'Golden french fries smothered with warm liquid cheese and herb seasoning.',
    price: 90,
    badge: 'Cheese Lover',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'fries-3',
    name: 'Indian Spicy Masala Fries',
    category: 'burger',
    description: 'Tossed in a mouthwatering blend of chaat masala, peri-peri and desi spices.',
    price: 70,
    badge: 'Desi Crunch 🌶️',
    isVeg: true,
    isSpicy: true,
    rating: 4.7,
    tags: []
  },
  {
    id: 'fries-4',
    name: 'Classic Fries',
    category: 'burger',
    description: 'Skinny-cut golden fries, fried to crisp perfection, dusted with sea salt.',
    price: 60,
    badge: 'Always Fresh',
    isVeg: true,
    isSpicy: false,
    rating: 4.6,
    tags: []
  },

  // --- STARTERS & MOMOS ---
  {
    id: 'starter-1',
    name: 'White Sauce Pasta',
    category: 'starter',
    description: 'Penne pasta tossed in rich, velvety garlic bechamel sauce with tender sweet corn and capsicum.',
    price: 150,
    badge: 'Crowd Favorite ✨',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'starter-2',
    name: 'Red Sauce Pasta',
    category: 'starter',
    description: 'Penne simmered in robust Italian arrabbiata tomato sauce infused with basil and chilli flakes.',
    price: 130,
    badge: 'Fiery Italian',
    isVeg: true,
    isSpicy: true,
    rating: 4.8,
    tags: []
  },
  {
    id: 'starter-3',
    name: 'Chilli Potato',
    category: 'starter',
    description: 'Crispy finger potatoes wok-tossed with chopped garlic, green chillies, spring onions and schezwan glaze.',
    price: 120,
    badge: 'Street Style Flex',
    isVeg: true,
    isSpicy: true,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'starter-4',
    name: 'Gravy Momos',
    category: 'starter',
    description: 'Steamed dumplings coated in rich spicy tandoori schezwan gravy, garnished with coriander.',
    price: 100,
    badge: 'Must Try 🔥',
    isVeg: true,
    isSpicy: true,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'starter-5',
    name: 'Steam Momos',
    category: 'starter',
    description: 'Thin-skinned dumplings packed with spiced cabbage, carrot, paneer filling with fiery red chutney.',
    price: 60,
    badge: 'Hot & Steamy',
    isVeg: true,
    isSpicy: true,
    rating: 4.7,
    tags: []
  },

  // --- SANDWICHES ---
  {
    id: 'sandwich-1',
    name: 'Cheese Sandwich',
    category: 'sandwich',
    description: 'Triple-decker bread stuffed with melted mozzarella, cheddar shreds, butter and herbs.',
    price: 70,
    badge: 'Cheesy Melt',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'sandwich-2',
    name: 'Makhni Sandwich',
    category: 'sandwich',
    description: 'Toasted bread loaded with luscious butter makhni gravy, vegetables and paneer chunks.',
    price: 65,
    badge: 'Royal Flavor',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['bestseller']
  },
  {
    id: 'sandwich-3',
    name: 'Grill Sandwich',
    category: 'sandwich',
    description: 'Char-grilled buttery toast packed with spiced capsicum, cucumber, tomato & mint chutney.',
    price: 60,
    badge: 'Char Grilled',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'sandwich-4',
    name: 'Veggie Sandwich',
    category: 'sandwich',
    description: 'Fresh farm veggies paired with creamy dressing between slices of toasted artisan bread.',
    price: 60,
    badge: 'Fresh & Light',
    isVeg: true,
    isSpicy: false,
    rating: 4.6,
    tags: []
  },
  {
    id: 'sandwich-5',
    name: 'Masala Sandwich',
    category: 'sandwich',
    description: 'Desi style spiced potato filling layered with green chutney and toasted till crisp.',
    price: 50,
    badge: 'Desi Masala',
    isVeg: true,
    isSpicy: true,
    rating: 4.7,
    tags: []
  },

  // --- MAGGI BOWLS ---
  {
    id: 'maggi-1',
    name: 'Paneer Maggi',
    category: 'maggi',
    description: 'Rich bowl of noodles simmered in aromatic spices with fresh sautéed paneer cubes.',
    price: 120,
    badge: 'High Protein Flex',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'maggi-2',
    name: 'Cheesy Maggi',
    category: 'maggi',
    description: 'Noodles cooked with bubbling melted cheese pull and secret magic seasoning.',
    price: 90,
    badge: 'Cheese Pull 🧀',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'maggi-3',
    name: 'Red Chatkara Maggi',
    category: 'maggi',
    description: 'Extra tangy and spicy red chilli chatkara sauce tossed noodles for late-night cravings.',
    price: 70,
    badge: 'Spicy Kick 🌶️',
    isVeg: true,
    isSpicy: true,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'maggi-4',
    name: 'Veggie Maggi',
    category: 'maggi',
    description: 'Loaded with finely chopped peas, carrots, onions, tomatoes and classic tastemaker.',
    price: 60,
    badge: 'Loaded Veggies',
    isVeg: true,
    isSpicy: false,
    rating: 4.6,
    tags: []
  },
  {
    id: 'maggi-5',
    name: 'Classic Maggi',
    category: 'maggi',
    description: 'Pure 2-minute nostalgia cooked to perfection with original Maggi seasoning.',
    price: 50,
    badge: 'Original Vibe',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },

  // --- MOCKTAILS & SHAKES ---
  {
    id: 'mocktail-1',
    name: 'Blue Sky Mocktail',
    category: 'mocktails',
    description: 'Electric blue curacao combined with sparkling fizz, lemon juice and mint leaves over crushed ice.',
    price: 70,
    badge: 'Neon Aesthetic 🌌',
    isVeg: true,
    isSpicy: false,
    rating: 5.0,
    tags: ['bestseller', 'special']
  },
  {
    id: 'mocktail-2',
    name: 'Kiwi Mocktail',
    category: 'mocktails',
    description: 'Exotic crushed kiwi puree with tangy lime soda and refreshing herbal notes.',
    price: 90,
    badge: 'Zesty Punch',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: []
  },
  {
    id: 'mocktail-3',
    name: 'Black Currant Mocktail',
    category: 'mocktails',
    description: 'Deep berry richness blended with chilled sparkle and citrus accents.',
    price: 80,
    badge: 'Berry Bliss',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'mocktail-4',
    name: 'Green Apple Mocktail',
    category: 'mocktails',
    description: 'Crisp green apple twist mixed with ice-cold tonic and crushed mint leaves.',
    price: 75,
    badge: 'Crisp & Cool',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'mocktail-5',
    name: 'Classic Mocktail',
    category: 'mocktails',
    description: 'House special blend of citrus notes, grenadine splash and sparkling fizz.',
    price: 65,
    badge: 'Refreshing',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'shake-1',
    name: 'Butterscotch Shake',
    category: 'mocktails',
    description: 'Creamy thick shake with real butterscotch crunch praline and vanilla bean cream.',
    price: 120,
    badge: 'Crunch Delight',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'shake-2',
    name: 'Vanilla Shake',
    category: 'mocktails',
    description: 'Silky smooth Madagascar vanilla blended with chilled whole milk and whip.',
    price: 110,
    badge: 'Smooth Classic',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'shake-3',
    name: 'Dark Chocolate Shake',
    category: 'mocktails',
    description: 'Intense 70% dark cocoa indulgence with chocolate drizzle and fudge shavings.',
    price: 100,
    badge: 'Pure Chocoholic 🍫',
    isVeg: true,
    isSpicy: false,
    rating: 5.0,
    tags: ['bestseller']
  },
  {
    id: 'shake-4',
    name: 'Kitkat Shake',
    category: 'mocktails',
    description: 'Crispy wafer KitKat bars crushed and blended into ultra-thick chocolate cream.',
    price: 100,
    badge: 'Break Time Treat',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['popular']
  },
  {
    id: 'shake-5',
    name: 'Oreo Shake',
    category: 'mocktails',
    description: 'Crushed Oreo cookies blended with creamy ice cream, crowned with cookie crumble.',
    price: 90,
    badge: 'All-Time Favorite',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },
  {
    id: 'shake-6',
    name: 'Cold Coffee',
    category: 'mocktails',
    description: 'Rich frothy espresso brewed cold and blended with sweetened milk and chocolate syrup swirl.',
    price: 70,
    badge: 'Cafe Essential ☕',
    isVeg: true,
    isSpicy: false,
    rating: 4.9,
    tags: ['bestseller']
  },

  // --- BEVERAGES ---
  {
    id: 'bev-1',
    name: 'Hot Coffee',
    category: 'beverages',
    description: 'Freshly frothed aromatic dark roast coffee prepared hot with creamy steamed milk.',
    price: 35,
    badge: 'Warm Hug',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: ['popular']
  },
  {
    id: 'bev-2',
    name: 'Coke (Chilled)',
    category: 'beverages',
    description: 'Ice-cold carbonated beverage served chilled in glass with lemon slice.',
    price: 30,
    badge: 'Chilled Can',
    isVeg: true,
    isSpicy: false,
    rating: 4.7,
    tags: []
  },
  {
    id: 'bev-3',
    name: 'Packaged Drinking Water',
    category: 'beverages',
    description: 'Sealed mineral water bottle for pure hydration.',
    price: 30,
    badge: 'Pure & Cold',
    isVeg: true,
    isSpicy: false,
    rating: 4.8,
    tags: []
  }
];

// Cafe Business Details
const CAFE_DETAILS = {
  name: "Hell House Cafe",
  subtitle: "Hellfire Hidden House • Restaurant & Cafe",
  tagline: "Good Food • Good Mood • Great Vibes",
  phone: "+91 8874056350",
  phoneRaw: "918874056350",
  address: "Hiran Nagar (Opposite Bank of Baroda), Unnao, Uttar Pradesh",
  hours: "11:00 AM – 11:00 PM (Monday – Sunday)",
  mapsUrl: "https://maps.google.com/?q=Hiran+Nagar+Opposite+Bank+of+Baroda+Unnao+Uttar+Pradesh",
  instagram: "https://instagram.com",
  whatsappUrl: "https://wa.me/918874056350"
};
