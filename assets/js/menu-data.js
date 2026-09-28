// Authentic Menu Data for The Flex House Cafe
// Sourced directly from official menus

const MENU_DATA = {
  categories: [
    { id: 'combos', name: '🔥 Super Combos', count: 12, icon: '⚡' },
    { id: 'pizza', name: '🍕 Handcrafted Pizzas', count: 12, icon: '🍕' },
    { id: 'chinese', name: '🥢 Chinese Delights', count: 10, icon: '🥢' },
    { id: 'momos', name: '🥟 Sizzling Momos', count: 5, icon: '🥟' },
    { id: 'burgers', name: '🍔 Burgers & Burger Pizza', count: 4, icon: '🍔' },
    { id: 'sandwiches', name: '🥪 Sandwiches & Wraps', count: 7, icon: '🥪' },
    { id: 'maggie-pasta', name: '🍝 Maggie & Pasta', count: 7, icon: '🍝' },
    { id: 'drinks', name: '☕ Beverages & Chillers', count: 4, icon: '☕' }
  ],

  combos: [
    {
      id: 'combo-1',
      name: 'Onion Pizza + Aloo Patty Burger + Cold Drink',
      category: 'combos',
      price: 130,
      badge: 'Bestseller',
      desc: 'Crispy onion pizza paired with our classic spiced aloo patty burger and chilled refreshing soda.',
      items: ['Onion Pizza', 'Aloo Patty Burger', 'Cold Drink'],
      image: 'assets/images/flex-pizza.jpg'
    },
    {
      id: 'combo-2',
      name: 'Tomato Pizza + French Fries + Cold Drink',
      category: 'combos',
      price: 130,
      badge: 'Popular',
      desc: 'Juicy tomato pizza served with golden salted French fries and a refreshing cold drink.',
      items: ['Tomato Pizza', 'French Fries', 'Cold Drink'],
      image: 'assets/images/flex-burger-coffee.jpg'
    },
    {
      id: 'combo-3',
      name: 'Capsicum Pizza + Veg Noodles + Cold Drink',
      category: 'combos',
      price: 130,
      badge: 'Pocket Friendly',
      desc: 'Fresh crunchy capsicum pizza served alongside wok-tossed vegetable noodles and a cold drink.',
      items: ['Capsicum Pizza', 'Veg Noodles', 'Cold Drink'],
      image: 'assets/images/flex-momos-noodles.jpg'
    },
    {
      id: 'combo-4',
      name: 'Spicy Paneer Pizza + Cheese Burger + Cold Drink',
      category: 'combos',
      price: 260,
      badge: 'Chef Choice 🔥',
      desc: 'Zesty tandoori spiced paneer pizza coupled with our rich melted cheese burger and a cold drink.',
      items: ['Spicy Paneer Pizza', 'Cheese Burger', 'Cold Drink'],
      image: 'assets/images/flex-pizza.jpg'
    },
    {
      id: 'combo-5',
      name: 'Onion Paneer Pizza + Paneer Burger + Cold Drink',
      category: 'combos',
      price: 180,
      badge: 'Paneer Flex 🧀',
      desc: 'Loaded onion paneer pizza alongside a delicious crispy paneer patty burger and cold drink.',
      items: ['Onion Paneer Pizza', 'Paneer Burger', 'Cold Drink'],
      image: 'assets/images/flex-burger-coffee.jpg'
    },
    {
      id: 'combo-6',
      name: 'Sandwich + Veg Noodle + French Fries + Momo',
      category: 'combos',
      price: 170,
      badge: 'Feast Box 🍱',
      desc: 'The ultimate snack platter: toasted veg sandwich, tossed veg noodles, crispy fries, and steamed momos.',
      items: ['Sandwich', 'Veg Noodle', 'French Fries', 'Momo'],
      image: 'assets/images/flex-momos-noodles.jpg'
    },
    {
      id: 'combo-7',
      name: 'Plain Maggie + Spring Roll + Paneer Momo',
      category: 'combos',
      price: 150,
      badge: 'Comfort Combo',
      desc: 'Soul-warming hot Maggie paired with crispy vegetable spring rolls and tender paneer momos.',
      items: ['Plain Maggie', 'Spring Roll', 'Paneer Momo'],
      image: 'assets/images/flex-momos-noodles.jpg'
    },
    {
      id: 'combo-8',
      name: 'White Sauce Pasta + Kurkure Momos + Chilli Potato',
      category: 'combos',
      price: 230,
      badge: 'Hot & Crunchy 🔥',
      desc: 'Rich creamy Italian white sauce pasta with super crunchy Kurkure momos and fiery crispy chilli potato.',
      items: ['White Sauce Pasta', 'Kurkure Momos', 'Chilli Potato'],
      image: 'assets/images/flex-momos-noodles.jpg'
    },
    {
      id: 'combo-9',
      name: 'Cheese Sandwich + Paneer Pizza + Peri Peri Fries',
      category: 'combos',
      price: 200,
      badge: 'Cheesy & Spiced',
      desc: 'Golden toasted cheese sandwich, personal paneer pizza, and spicy zesty Peri Peri seasoned fries.',
      items: ['Cheese Sandwich', 'Paneer Pizza', 'Peri Peri Fries'],
      image: 'assets/images/flex-burger-coffee.jpg'
    },
    {
      id: 'combo-10',
      name: 'Hakka Noodles + Onion Pizza + Cold Coffee + Cold Drink',
      category: 'combos',
      price: 220,
      badge: 'Double Drink Flex 🥤',
      desc: 'Wok-fired Hakka noodles, crispy onion pizza, thick creamy cold coffee, and chilled soda!',
      items: ['Hakka Noodles', 'Onion Pizza', 'Cold Coffee', 'Cold Drink'],
      image: 'assets/images/flex-burger-coffee.jpg'
    },
    {
      id: 'combo-11',
      name: 'Kurkure Momos + Paneer Noodle + Mexican Wrap',
      category: 'combos',
      price: 220,
      badge: 'Street Style Flex',
      desc: 'Signature crunchy Kurkure momos, spicy wok paneer noodles, and a zesty grilled Mexican wrap.',
      items: ['Kurkure Momos', 'Paneer Noodle', 'Mexican Wrap'],
      image: 'assets/images/flex-momos-noodles.jpg'
    },
    {
      id: 'combo-12',
      name: 'Corn Capsicum Pizza + Kurkure Momos + White Sauce Pasta + Noodles',
      category: 'combos',
      price: 300,
      badge: 'Grand Party Feast 👑',
      desc: 'The complete mega spread: Cheesy corn & capsicum pizza, crunchy Kurkure momos, creamy pasta, and wok noodles.',
      items: ['Corn Capsicum Pizza', 'Kurkure Momos', 'White Sauce Pasta', 'Noodles'],
      image: 'assets/images/flex-pizza.jpg'
    }
  ],

  pizzas: [
    {
      id: 'pz-onion',
      name: 'Onion Pizza',
      desc: 'Classic crisp red onions with house pizza sauce and melted mozzarella blend.',
      category: 'pizza',
      prices: { S: 69, M: 139, L: 199 },
      badge: 'Classic',
      veg: true
    },
    {
      id: 'pz-tomato',
      name: 'Tomato Pizza',
      desc: 'Freshly sliced vine tomatoes on golden crust with herb seasoning and bubbling cheese.',
      category: 'pizza',
      prices: { S: 69, M: 139, L: 199 },
      badge: 'Fresh',
      veg: true
    },
    {
      id: 'pz-corn',
      name: 'Corn Pizza',
      desc: 'Sweet golden American corn kernels smothered with mozzarella and Italian oregano.',
      category: 'pizza',
      prices: { S: 69, M: 139, L: 199 },
      badge: 'Kid Favorite',
      veg: true
    },
    {
      id: 'pz-capsicum',
      name: 'Capsicum Pizza',
      desc: 'Crunchy bell peppers sliced fine on melted cheese and rich tomato basil base.',
      category: 'pizza',
      prices: { S: 69, M: 139, L: 199 },
      badge: 'Crunchy',
      veg: true
    },
    {
      id: 'pz-onion-paneer',
      name: 'Onion Paneer Pizza',
      desc: 'Tender marinated paneer cubes and crunchy diced onions over a double cheese blanket.',
      category: 'pizza',
      prices: { S: 100, M: 199, L: 299 },
      badge: 'Bestseller ⭐',
      veg: true
    },
    {
      id: 'pz-corn-capsicum',
      name: 'Corn Capsicum Pizza',
      desc: 'Delightful duo of sweet golden corn and crisp bell peppers loaded with premium cheese.',
      category: 'pizza',
      prices: { S: 100, M: 199, L: 299 },
      badge: 'Popular',
      veg: true
    },
    {
      id: 'pz-farm-harvested',
      name: 'Farm Harvested Pizza',
      desc: 'Farm fresh garden medley: bell peppers, sweet corn, onions, tomatoes, and mushrooms on cheese.',
      category: 'pizza',
      prices: { S: 130, M: 250, L: 345 },
      badge: 'Gourmet',
      veg: true
    },
    {
      id: 'pz-indian',
      name: 'Indian Pizza',
      desc: 'Desi spiced pizza with marinated tandoori paneer, spicy masala onions, capsicum, and chili flakes.',
      category: 'pizza',
      prices: { S: 130, M: 250, L: 345 },
      badge: 'Desi Spice 🌶️',
      veg: true
    },
    {
      id: 'pz-country-gala',
      name: 'Country Gala Pizza',
      desc: 'Rustic country-style pizza loaded with herbs, vibrant veggies, and decadent mozzarella pull.',
      category: 'pizza',
      prices: { S: 130, M: 249, L: 345 },
      badge: 'Specialty',
      veg: true
    },
    {
      id: 'pz-dil-ka-margherita',
      name: 'Dil Ka Margherita',
      desc: 'Heartfelt classic cheese margherita with extra melted cheese blend and signature sauce.',
      category: 'pizza',
      prices: { S: 130, M: 249, L: 345 },
      badge: 'Cheese Heaven 🧀',
      veg: true
    },
    {
      id: 'pz-spicy-paneer',
      name: 'Spicy Paneer Pizza',
      desc: 'Generously topped with fiery peri-peri spiced paneer chunks, jalapenos, onions, and spicy herb oil.',
      category: 'pizza',
      prices: { S: 180, M: 350, L: 520 },
      badge: 'Chef Favorite 🔥',
      veg: true
    },
    {
      id: 'pz-chef-special',
      name: 'Chef Special Pizza',
      desc: 'The ultimate Flex House showpiece: triple cheese, loaded paneer, corn, capsicum, olives & secret sauce.',
      category: 'pizza',
      prices: { S: 180, M: 350, L: 520 },
      badge: 'The Flex Signature 👑',
      veg: true
    }
  ],

  chinese: [
    {
      id: 'ch-fries',
      name: 'French Fries',
      desc: 'Golden crisp potato batons tossed in sea salt, served with tangy dip.',
      category: 'chinese',
      prices: { Half: 29, Full: 50 },
      veg: true
    },
    {
      id: 'ch-periperi-fries',
      name: 'Peri-Peri Fries',
      desc: 'Crispy fries dusted with house special fiery African peri-peri spice mix.',
      category: 'chinese',
      prices: { Half: 49, Full: 90 },
      badge: 'Spicy & Crispy 🌶️',
      veg: true
    },
    {
      id: 'ch-veg-noodles',
      name: 'Veg Noodles',
      desc: 'Wok-tossed noodles with shredded cabbage, carrots, bell peppers, and soy aromatics.',
      category: 'chinese',
      prices: { Half: 50, Full: 95 },
      badge: 'Street Style',
      veg: true
    },
    {
      id: 'ch-paneer-noodles',
      name: 'Paneer Noodle',
      desc: 'Stir-fried long noodles enriched with tender sauteed paneer cubes and garlic chili sauce.',
      category: 'chinese',
      prices: { Half: 70, Full: 130 },
      badge: 'Popular',
      veg: true
    },
    {
      id: 'ch-hakka-noodles',
      name: 'Hakka Noodles',
      desc: 'Authentic Calcutta-style Hakka noodles tossed over raging flame with crunchy scallions.',
      category: 'chinese',
      prices: { Half: 69, Full: 129 },
      badge: 'Bestseller ⭐',
      veg: true
    },
    {
      id: 'ch-schezwan-noodles',
      name: 'Schezwan Noodles',
      desc: 'Fiery red wok noodles infused with Sichuan peppercorns, garlic chili paste, and fresh vegetables.',
      category: 'chinese',
      prices: { Half: 70, Full: 130 },
      badge: 'Hot & Spicy 🔥',
      veg: true
    },
    {
      id: 'ch-honey-chilli-potato',
      name: 'Honey Chilli Potato',
      desc: 'Crispy fried potato fingers glazed in a sticky sweet honey chili sauce with roasted sesame seeds.',
      category: 'chinese',
      prices: { Half: 90, Full: 170 },
      badge: 'Chef Special 🍯',
      veg: true
    },
    {
      id: 'ch-chilli-potato',
      name: 'Chilli Potato',
      desc: 'Tossed potato fingers in spicy Indo-Chinese gravy with crunchy bell peppers and green chilies.',
      category: 'chinese',
      prices: { Half: 80, Full: 160 },
      veg: true
    },
    {
      id: 'ch-hot-chilli-potato',
      name: 'Hot Chilli Potato',
      desc: 'Extra spicy fiery potato wedges tossed with crushed red chilies and dark garlic soy sauce.',
      category: 'chinese',
      prices: { Half: 90, Full: 180 },
      badge: 'Extra Fiery 🌶️',
      veg: true
    },
    {
      id: 'ch-spring-roll',
      name: 'Spring Roll',
      desc: 'Golden crispy wrapper stuffed with seasoned vegetables and noodles, served with sweet chili dip.',
      category: 'chinese',
      price: 39,
      badge: 'Crunchy Bite',
      veg: true
    }
  ],

  momos: [
    {
      id: 'mo-veg',
      name: 'Veg Momo',
      desc: 'Delicately steamed dumplings packed with finely minced spiced garden vegetables.',
      category: 'momos',
      prices: { Half: 50, Full: 100 },
      badge: 'Classic Steamed',
      veg: true
    },
    {
      id: 'mo-fried',
      name: 'Fried Momo',
      desc: 'Crispy deep-fried momos golden on the outside with juicy seasoned filling inside.',
      category: 'momos',
      prices: { Half: 60, Full: 110 },
      badge: 'Crunchy',
      veg: true
    },
    {
      id: 'mo-paneer',
      name: 'Paneer Momo',
      desc: 'Mouthwatering momos stuffed with rich crumbled paneer, spices, and fresh herbs.',
      category: 'momos',
      prices: { Half: 70, Full: 130 },
      badge: 'Paneer Loaded 🧀',
      veg: true
    },
    {
      id: 'mo-kurkure',
      name: 'Kurkure Momo',
      desc: 'The iconic Flex House highlight: super crunchy crumb-coated momos fried to golden perfection with spicy red chutney & creamy mayo.',
      category: 'momos',
      prices: { Half: 80, Full: 150 },
      badge: 'Super Bestseller 👑',
      veg: true
    },
    {
      id: 'mo-tandoori',
      name: 'Tandoori Momo',
      desc: 'Char-grilled tandoori marinated momos infused with smoky coal aroma and chaat masala.',
      category: 'momos',
      prices: { Half: 80, Full: 150 },
      badge: 'Smoky & Spicy 🔥',
      veg: true
    }
  ],

  burgers: [
    {
      id: 'bg-veg-aloo',
      name: 'Veg Aloo Patty Burger',
      desc: 'Crisp golden potato patty, fresh onion slices, tomato, and creamy sauce in soft toasted sesame bun.',
      category: 'burgers',
      price: 49,
      badge: 'Classic Favorite',
      veg: true
    },
    {
      id: 'bg-cheese-aloo',
      name: 'Cheese Aloo Patty Burger',
      desc: 'Our spiced aloo patty crowned with a thick slice of melting cheddar cheese and house burger sauce.',
      category: 'burgers',
      price: 70,
      badge: 'Cheese Loaded 🧀',
      veg: true
    },
    {
      id: 'bg-cheese-paneer',
      name: 'Cheese Paneer Patty Burger',
      desc: 'Thick succulent crispy paneer slab topped with melting cheese, crisp lettuce, and smoky mayo.',
      category: 'burgers',
      price: 70,
      badge: 'Bestseller ⭐',
      veg: true
    },
    {
      id: 'bg-burger-pizza',
      name: 'Burger Pizza',
      desc: 'The sensational hybrid: toasted burger bun baked with gooey pizza sauce, vegetables, and mozzarella.',
      category: 'burgers',
      price: 59,
      badge: 'Chef Creation 🍕🍔',
      veg: true
    }
  ],

  sandwiches: [
    {
      id: 'sw-veg',
      name: 'Veg Sandwich',
      desc: 'Fresh bread filled with sliced cucumbers, tomatoes, onions, and zesty mint chutney.',
      category: 'sandwiches',
      price: 39,
      veg: true
    },
    {
      id: 'sw-cheese',
      name: 'Cheese Sandwich',
      desc: 'Grilled sandwich overflowing with melted cheddar and mozzarella cheese and herb butter.',
      category: 'sandwiches',
      price: 59,
      badge: 'Gooey Cheese',
      veg: true
    },
    {
      id: 'sw-cheese-paneer',
      name: 'Cheese Paneer Sandwich',
      desc: 'Layered with marinated paneer slices, double cheese, and roasted capsicum in butter-toasted bread.',
      category: 'sandwiches',
      price: 69,
      badge: 'Popular ⭐',
      veg: true
    },
    {
      id: 'sw-stuff-garlic',
      name: 'Stuff Garlic Bread',
      desc: 'Freshly baked baguette brushed with roasted garlic butter and stuffed with corn, jalapenos & cheese.',
      category: 'sandwiches',
      price: 70,
      badge: 'Garlic Aroma 🧄',
      veg: true
    },
    {
      id: 'sw-cheese-garlic',
      name: 'Cheese Garlic Bread',
      desc: 'Crisp artisan bread topped with lashings of garlic herb butter and rich melted cheese.',
      category: 'sandwiches',
      price: 70,
      badge: 'Cheesy',
      veg: true
    },
    {
      id: 'sw-mexican-wrap',
      name: 'Mexican Wrap',
      desc: 'Tortilla wrap rolled with seasoned Mexican beans, corn, onions, spicy salsa, and chipotle mayo.',
      category: 'sandwiches',
      price: 79,
      badge: 'Zesty Mexican 🌯',
      veg: true
    },
    {
      id: 'sw-paneer-cheese-wrap',
      name: 'Paneer Cheese Wrap',
      desc: 'Warm tortilla wrapped around grilled spiced paneer chunks, crisp greens, and creamy cheese sauce.',
      category: 'sandwiches',
      price: 79,
      badge: 'Bestseller Wrap ⭐',
      veg: true
    }
  ],

  maggiePasta: [
    {
      id: 'mg-plain',
      name: 'Plain Maggie',
      desc: 'Steaming hot classic masala Maggie cooked to nostalgic perfection.',
      category: 'maggie-pasta',
      price: 49,
      badge: 'Nostalgia',
      veg: true
    },
    {
      id: 'mg-veg',
      name: 'Veg Maggie',
      desc: 'Masala Maggie cooked with sautéed green peas, carrots, onions, and fresh coriander.',
      category: 'maggie-pasta',
      price: 69,
      veg: true
    },
    {
      id: 'mg-cheese-paneer',
      name: 'Cheese Paneer Maggie',
      desc: 'Indulgent Maggie loaded with soft paneer cubes and molten processed cheese.',
      category: 'maggie-pasta',
      price: 80,
      badge: 'Cheesy Paneer 🧀',
      veg: true
    },
    {
      id: 'mg-makhani-corn',
      name: 'Makhani Corn Maggie',
      desc: 'Creamy buttery makhani gravy infused Maggie with sweet American corn and butter.',
      category: 'maggie-pasta',
      price: 80,
      badge: 'Makhani Twist 🧈',
      veg: true
    },
    {
      id: 'ps-red-sauce',
      name: 'Red Sauce Pasta',
      desc: 'Penne pasta tossed in tangy Italian tomato basil sauce with sauteed garlic and herbs.',
      category: 'maggie-pasta',
      price: 90,
      badge: 'Italian Classic 🍅',
      veg: true
    },
    {
      id: 'ps-white-sauce',
      name: 'White Sauce Pasta',
      desc: 'Velvety smooth Alfredo white sauce penne pasta with garlic butter, sweet corn, and oregano.',
      category: 'maggie-pasta',
      price: 90,
      badge: 'Creamy Alfredo ⭐',
      veg: true
    },
    {
      id: 'ps-garlic-white',
      name: 'Garlic White Sauce Pasta',
      desc: 'Creamy white sauce penne infused with roasted garlic chunks, cracked pepper, and herbs.',
      category: 'maggie-pasta',
      price: 90,
      badge: 'Garlic Special 🧄',
      veg: true
    }
  ],

  drinks: [
    {
      id: 'dr-cold-coffee',
      name: 'Cold Coffee',
      desc: 'Signature rich blended iced cold coffee with creamy froth and chocolate syrup drizzle.',
      category: 'drinks',
      price: 70,
      badge: 'TFH Signature ☕',
      veg: true
    },
    {
      id: 'dr-hot-coffee',
      name: 'Hot Coffee',
      desc: 'Steaming hot aromatic espresso blended with frothy milk and cocoa dust.',
      category: 'drinks',
      price: 40,
      veg: true
    },
    {
      id: 'dr-masala-chai',
      name: 'Masala Chai',
      desc: 'Freshly brewed kadak Indian tea infused with cardamom, ginger, cloves, and milk.',
      category: 'drinks',
      price: 25,
      badge: 'Desi Kadak ☕',
      veg: true
    },
    {
      id: 'dr-cold-drink',
      name: 'Cold Drink',
      desc: 'Chilled carbonated soft drinks to pair perfectly with your hot pizzas & burgers.',
      category: 'drinks',
      price: 25,
      badge: 'Chilled 🥤',
      veg: true
    }
  ]
};

// Flattened helper list for search and lookup
const ALL_MENU_ITEMS = [
  ...MENU_DATA.combos,
  ...MENU_DATA.pizzas,
  ...MENU_DATA.chinese,
  ...MENU_DATA.momos,
  ...MENU_DATA.burgers,
  ...MENU_DATA.sandwiches,
  ...MENU_DATA.maggiePasta,
  ...MENU_DATA.drinks
];
