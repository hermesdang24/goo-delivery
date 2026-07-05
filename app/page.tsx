"use client";

import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";

const logoSrc = "/logo.png";
const whatsappNumber = "+237 695 502 710";
const supportPhoneHref = "tel:+237695502710";
const supportWhatsappUrl =
  "https://wa.me/237695502710?text=Bonjour%20GOO%20Delivery%2C%20je%20souhaite%20commander.";

type AppTab = "home" | "explore" | "orders" | "favorites" | "profile";
type CategoryId =
  | "all"
  | "restaurants"
  | "fast-food"
  | "pizza"
  | "burgers"
  | "poulet"
  | "grillades"
  | "poisson"
  | "africain"
  | "asiatique"
  | "italien"
  | "supermarche"
  | "pharmacie"
  | "boissons"
  | "desserts"
  | "boulangerie"
  | "healthy"
  | "cafe";

type FilterId =
  | "freeDelivery"
  | "pickup"
  | "under20"
  | "under30"
  | "promotions"
  | "topRated"
  | "open"
  | "lowPrice";

type IconName =
  | "home"
  | "explore"
  | "orders"
  | "heart"
  | "profile"
  | "search"
  | "bell"
  | "pin"
  | "chevron"
  | "cart"
  | "share"
  | "star"
  | "clock"
  | "route"
  | "wallet"
  | "settings"
  | "support"
  | "coupon"
  | "logout"
  | "plus"
  | "minus"
  | "check"
  | "close"
  | "moon"
  | "spark";

type Coordinates = {
  lat: number;
  lng: number;
};

type ProductOption = {
  label: string;
  values: string[];
};

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  prepTime: string;
  popularity: number;
  image: string;
  options: ProductOption[];
  extras: Array<{ name: string; price: number }>;
};

type MenuSection = {
  title: "Entrées" | "Plats" | "Desserts" | "Boissons";
  items: MenuItem[];
};

type Restaurant = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: CategoryId;
  categories: CategoryId[];
  cuisine: string;
  area: string;
  address: string;
  coordinates: Coordinates;
  phone: string;
  hours: string;
  cover: string;
  logoTone: string;
  rating: number;
  reviews: number;
  etaMin: number;
  etaMax: number;
  distanceKm: number;
  minOrder: number;
  deliveryBase: number;
  freeDelivery: boolean;
  pickup: boolean;
  promo?: string;
  isNew?: boolean;
  isTopRated?: boolean;
  isVerified: boolean;
  isOpen: boolean;
  menu: MenuSection[];
};

type ClientLocation = {
  label: string;
  coordinates: Coordinates | null;
};

type CartLine = {
  restaurantId: string;
  item: MenuItem;
  quantity: number;
  size: string;
  sauce: string;
  drink: string;
  extras: string[];
  note: string;
};

const categories: Array<{ id: CategoryId; label: string; icon: string; hint: string }> = [
  { id: "all", label: "Tous", icon: "▦", hint: "Tout voir" },
  { id: "restaurants", label: "Restaurants", icon: "🍽", hint: "Tables" },
  { id: "fast-food", label: "Fast Food", icon: "🥙", hint: "Rapide" },
  { id: "pizza", label: "Pizza", icon: "🍕", hint: "Italien" },
  { id: "burgers", label: "Burgers", icon: "🍔", hint: "Gourmand" },
  { id: "poulet", label: "Poulet", icon: "🍗", hint: "Grillé" },
  { id: "grillades", label: "Grillades", icon: "🥩", hint: "Braisé" },
  { id: "poisson", label: "Poisson", icon: "🐟", hint: "Frais" },
  { id: "africain", label: "Africain", icon: "🥘", hint: "Local" },
  { id: "asiatique", label: "Asiatique", icon: "🍜", hint: "Sushi" },
  { id: "italien", label: "Italien", icon: "🍝", hint: "Pâtes" },
  { id: "supermarche", label: "Supermarché", icon: "🛒", hint: "Courses" },
  { id: "pharmacie", label: "Pharmacie", icon: "💊", hint: "Santé" },
  { id: "boissons", label: "Boissons", icon: "🥤", hint: "Frais" },
  { id: "desserts", label: "Desserts", icon: "🍰", hint: "Sucré" },
  { id: "boulangerie", label: "Boulangerie", icon: "🥐", hint: "Pain" },
  { id: "healthy", label: "Healthy", icon: "🥗", hint: "Léger" },
  { id: "cafe", label: "Café", icon: "☕", hint: "Brunch" },
];

const filters: Array<{ id: FilterId; label: string }> = [
  { id: "freeDelivery", label: "Livraison gratuite" },
  { id: "pickup", label: "Pickup" },
  { id: "under20", label: "Moins de 20 min" },
  { id: "under30", label: "Moins de 30 min" },
  { id: "promotions", label: "Promotions" },
  { id: "topRated", label: "Les mieux notés" },
  { id: "open", label: "Ouvert actuellement" },
  { id: "lowPrice", label: "Prix" },
];

const promoSlides = [
  {
    title: "20% OFF ce week-end",
    text: "Sur une sélection de restaurants partenaires à Douala.",
    badge: "Code GOO20",
  },
  {
    title: "Livraison gratuite",
    text: "Sur les restaurants vérifiés proches de votre position.",
    badge: "Proche de vous",
  },
  {
    title: "Nouveaux restaurants",
    text: "Découvrez les nouvelles adresses premium de Bonamoussadi.",
    badge: "Nouveau",
  },
  {
    title: "Programme fidélité",
    text: "Cumulez des points à chaque commande GOO Delivery.",
    badge: "GOO Club",
  },
];

const baseOptions: ProductOption[] = [
  { label: "Taille", values: ["Normal", "Grand", "Famille"] },
  { label: "Sauce", values: ["Douce", "Pimentée", "Sans sauce"] },
  { label: "Boisson", values: ["Sans boisson", "Eau", "Soda", "Jus naturel"] },
];

const foodImages = {
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  african: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80",
  bowl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  grill: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  pharmacy: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
  market: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
};

const restaurants: Restaurant[] = [
  createRestaurant({
    id: "gosto",
    name: "Gosto Resto-Café",
    shortName: "G",
    description: "Burgers, shawarmas, pizzas et milk-shakes pour une commande rapide à Bonamoussadi.",
    category: "fast-food",
    categories: ["fast-food", "burgers", "pizza", "boissons", "restaurants"],
    cuisine: "Fast food premium",
    area: "Bonamoussadi",
    address: "Rond-point Maetur, station Ola, Douala",
    coordinates: { lat: 4.0908, lng: 9.7437 },
    cover: foodImages.burger,
    logoTone: "bg-black",
    rating: 4.7,
    reviews: 824,
    etaMin: 18,
    etaMax: 32,
    distanceKm: 2.4,
    minOrder: 3000,
    deliveryBase: 700,
    freeDelivery: true,
    pickup: true,
    promo: "20% OFF",
    isTopRated: true,
    menuSeed: [
      ["Plats", "Burger américain", "Steak, cheddar, salade fraîche et sauce maison.", 3500, foodImages.burger],
      ["Plats", "Shawarma poulet", "Poulet mariné, crudités, frites et sauce au choix.", 2500, foodImages.burger],
      ["Plats", "Pizza familiale", "Pizza généreuse à partager, garniture au choix.", 10000, foodImages.pizza],
      ["Boissons", "Milk-shake vanille", "Milk-shake froid, crémeux et parfumé.", 2500, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "bantou",
    name: "Restaurant Bantou",
    shortName: "B",
    description: "Cuisine camerounaise, grillades et plats généreux proches de Makepe.",
    category: "africain",
    categories: ["africain", "grillades", "poulet", "poisson", "restaurants"],
    cuisine: "Cuisine camerounaise",
    area: "Makepe",
    address: "Makepe, près de DHL, Douala",
    coordinates: { lat: 4.0835, lng: 9.7425 },
    cover: foodImages.african,
    logoTone: "bg-[#00B140]",
    rating: 4.6,
    reviews: 512,
    etaMin: 26,
    etaMax: 42,
    distanceKm: 3.1,
    minOrder: 3500,
    deliveryBase: 900,
    freeDelivery: false,
    pickup: false,
    isVerified: true,
    menuSeed: [
      ["Plats", "Poulet braisé", "Poulet braisé, plantain et sauce piment.", 3500, foodImages.grill],
      ["Plats", "Ndolé plantain", "Ndolé riche, viande et plantain mûr.", 4500, foodImages.african],
      ["Plats", "Poisson braisé", "Poisson frais, condiments et accompagnement.", 6500, foodImages.grill],
      ["Accompagnements", "Frites de plantain", "Plantain doré et croustillant.", 1500, foodImages.african],
    ],
  }),
  createRestaurant({
    id: "paradise",
    name: "Le Paradise",
    shortName: "P",
    description: "Adresse moderne à Bonapriso pour pizza, poisson et fruits de mer.",
    category: "restaurants",
    categories: ["restaurants", "pizza", "poisson", "italien"],
    cuisine: "International",
    area: "Bonapriso",
    address: "Rue Tokoto, Bonapriso, Douala",
    coordinates: { lat: 4.0268, lng: 9.7047 },
    cover: foodImages.pizza,
    logoTone: "bg-zinc-900",
    rating: 4.4,
    reviews: 438,
    etaMin: 30,
    etaMax: 48,
    distanceKm: 5.8,
    minOrder: 5000,
    deliveryBase: 1100,
    freeDelivery: false,
    pickup: true,
    promo: "Menu duo",
    menuSeed: [
      ["Plats", "Pizza reine", "Jambon, fromage, champignons et sauce tomate.", 7000, foodImages.pizza],
      ["Plats", "Crevettes grillées", "Crevettes assaisonnées, riz et légumes.", 9000, foodImages.grill],
      ["Plats", "Filet de poisson", "Filet tendre, sauce citron et accompagnement.", 8500, foodImages.grill],
      ["Entrées", "Salade maison", "Laitue, avocat, tomate et vinaigrette légère.", 3500, foodImages.bowl],
    ],
  }),
  createRestaurant({
    id: "asian-bowl",
    name: "Asian Bowl Douala",
    shortName: "A",
    description: "Riz cantonais, nouilles sautées et plats asiatiques livrés rapidement.",
    category: "asiatique",
    categories: ["asiatique", "restaurants"],
    cuisine: "Asiatique",
    area: "Akwa",
    address: "Zone Akwa Palace, Douala",
    coordinates: { lat: 4.0309, lng: 9.6999 },
    cover: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-black",
    rating: 4.5,
    reviews: 604,
    etaMin: 24,
    etaMax: 39,
    distanceKm: 4.3,
    minOrder: 4000,
    deliveryBase: 850,
    freeDelivery: true,
    pickup: true,
    isNew: true,
    menuSeed: [
      ["Plats", "Riz cantonais poulet", "Riz sauté, poulet, œufs et légumes croquants.", 4500, foodImages.sushi],
      ["Plats", "Nouilles sautées bœuf", "Nouilles fraîches sautées avec bœuf mariné.", 5000, foodImages.sushi],
      ["Plats", "Poulet aigre-doux", "Poulet croustillant et sauce aigre-douce.", 5500, foodImages.sushi],
      ["Entrées", "Nems légumes", "Nems dorés, sauce sucrée et salade.", 2500, foodImages.sushi],
    ],
  }),
  createRestaurant({
    id: "tchop-yamo",
    name: "Tchop & Yamo Bonamoussadi",
    shortName: "Y",
    description: "Afro fast-food, beignets, bowls et jus naturels au cœur de Bonamoussadi.",
    category: "fast-food",
    categories: ["fast-food", "africain", "boissons", "restaurants"],
    cuisine: "Afro fast-food",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    coordinates: { lat: 4.0937, lng: 9.7429 },
    cover: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-[#00B140]",
    rating: 4.4,
    reviews: 765,
    etaMin: 16,
    etaMax: 28,
    distanceKm: 1.8,
    minOrder: 2000,
    deliveryBase: 600,
    freeDelivery: true,
    pickup: true,
    promo: "Livraison offerte",
    menuSeed: [
      ["Plats", "Beignets haricots bouillie", "Combo local chaud et généreux.", 1500, foodImages.african],
      ["Plats", "Ndogmangolo soya poulet", "Soya de poulet, légumes et sauce maison.", 2000, foodImages.grill],
      ["Entrées", "Salade Bitchakala", "Salade fraîche, croquante et relevée.", 2500, foodImages.bowl],
      ["Boissons", "Jus Yamo ananas", "Jus naturel d’ananas pressé.", 1500, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "maison-h",
    name: "Maison H",
    shortName: "H",
    description: "Brunch, salades, pâtisserie moderne et café premium à Bonapriso.",
    category: "cafe",
    categories: ["cafe", "healthy", "desserts", "boissons", "restaurants"],
    cuisine: "Brunch et café",
    area: "Bonapriso",
    address: "Quartier Bonapriso, Douala",
    coordinates: { lat: 4.0278, lng: 9.7065 },
    cover: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-zinc-900",
    rating: 4.8,
    reviews: 921,
    etaMin: 28,
    etaMax: 44,
    distanceKm: 5.4,
    minOrder: 5000,
    deliveryBase: 1000,
    freeDelivery: false,
    pickup: true,
    isTopRated: true,
    menuSeed: [
      ["Plats", "Avocado toast", "Pain toasté, avocat, œuf et graines.", 5500, foodImages.bowl],
      ["Plats", "Club sandwich poulet", "Pain moelleux, poulet, fromage et salade.", 6500, foodImages.burger],
      ["Desserts", "Pancakes miel fruits", "Pancakes moelleux, miel et fruits frais.", 5000, foodImages.bakery],
      ["Boissons", "Jus pressé", "Jus naturel pressé minute.", 2500, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "bombay",
    name: "Bombay Masala",
    shortName: "M",
    description: "Cuisine indienne, curry, biryani et plats épicés à Bonapriso.",
    category: "asiatique",
    categories: ["asiatique", "restaurants"],
    cuisine: "Indien",
    area: "Bonapriso",
    address: "Rue Koloko, Douala",
    coordinates: { lat: 4.0255, lng: 9.7028 },
    cover: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-black",
    rating: 4.5,
    reviews: 487,
    etaMin: 35,
    etaMax: 55,
    distanceKm: 5.9,
    minOrder: 6000,
    deliveryBase: 1200,
    freeDelivery: false,
    pickup: false,
    promo: "Combo curry",
    menuSeed: [
      ["Plats", "Butter chicken", "Poulet tendre, curry doux et riz basmati.", 8500, foodImages.sushi],
      ["Plats", "Biryani poulet", "Riz parfumé, poulet mariné et épices.", 8000, foodImages.sushi],
      ["Entrées", "Samosa légumes", "Samosas croustillants aux légumes.", 3000, foodImages.bowl],
      ["Boissons", "Lassi mangue", "Boisson indienne à la mangue.", 3000, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "la-pizzeria",
    name: "La Pizzeria",
    shortName: "PZ",
    description: "Pizzas, pâtes et desserts italiens avec cuisson rapide.",
    category: "pizza",
    categories: ["pizza", "italien", "desserts", "restaurants"],
    cuisine: "Pizza et italien",
    area: "Bonapriso",
    address: "Bonapriso, Douala",
    coordinates: { lat: 4.0283, lng: 9.7038 },
    cover: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-[#00B140]",
    rating: 4.6,
    reviews: 643,
    etaMin: 23,
    etaMax: 38,
    distanceKm: 5.5,
    minOrder: 5000,
    deliveryBase: 950,
    freeDelivery: false,
    pickup: true,
    isTopRated: true,
    menuSeed: [
      ["Plats", "Pizza margherita", "Tomate, mozzarella et basilic.", 6000, foodImages.pizza],
      ["Plats", "Pizza quatre fromages", "Mozzarella, bleu, chèvre et parmesan.", 8500, foodImages.pizza],
      ["Plats", "Pâtes bolognaise", "Sauce tomate, bœuf et parmesan.", 7000, foodImages.pizza],
      ["Desserts", "Tiramisu", "Dessert italien au café et mascarpone.", 4000, foodImages.bakery],
    ],
  }),
  createRestaurant({
    id: "sushi-lounge",
    name: "Sushi Lounge Douala",
    shortName: "S",
    description: "Sushi, makis et plateaux premium pour les commandes fraîches.",
    category: "asiatique",
    categories: ["asiatique", "restaurants"],
    cuisine: "Sushi",
    area: "Bonapriso",
    address: "Bonapriso, Douala",
    coordinates: { lat: 4.0265, lng: 9.7041 },
    cover: foodImages.sushi,
    logoTone: "bg-black",
    rating: 4.7,
    reviews: 388,
    etaMin: 35,
    etaMax: 55,
    distanceKm: 5.7,
    minOrder: 7000,
    deliveryBase: 1300,
    freeDelivery: false,
    pickup: false,
    isNew: true,
    menuSeed: [
      ["Plats", "California rolls", "Riz vinaigré, avocat, crabe et sésame.", 7000, foodImages.sushi],
      ["Plats", "Plateau mix 18 pièces", "Assortiment makis, sushi et rolls.", 18000, foodImages.sushi],
      ["Entrées", "Tempura crevettes", "Crevettes croustillantes et sauce légère.", 9000, foodImages.sushi],
      ["Boissons", "Thé vert glacé", "Thé vert frais et légèrement sucré.", 2000, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "green-bowl",
    name: "Green Bowl Bonamoussadi",
    shortName: "GB",
    description: "Bowls, wraps, salades, smoothies et options healthy.",
    category: "healthy",
    categories: ["healthy", "boissons", "restaurants"],
    cuisine: "Healthy",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    coordinates: { lat: 4.0929, lng: 9.7429 },
    cover: foodImages.bowl,
    logoTone: "bg-[#00B140]",
    rating: 4.3,
    reviews: 292,
    etaMin: 18,
    etaMax: 30,
    distanceKm: 1.9,
    minOrder: 3000,
    deliveryBase: 650,
    freeDelivery: true,
    pickup: true,
    menuSeed: [
      ["Plats", "Bowl poulet avocat", "Poulet grillé, avocat, riz et légumes.", 5500, foodImages.bowl],
      ["Plats", "Wrap légumes", "Wrap léger aux légumes croquants.", 3500, foodImages.bowl],
      ["Desserts", "Yaourt granola", "Yaourt, granola et fruits.", 3000, foodImages.bakery],
      ["Boissons", "Smoothie vert", "Smoothie épinard, pomme et citron.", 2500, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "zepol",
    name: "Zepol Bonapriso",
    shortName: "Z",
    description: "Boulangerie, pâtisserie, café et snacks de qualité.",
    category: "boulangerie",
    categories: ["boulangerie", "cafe", "desserts", "boissons"],
    cuisine: "Boulangerie",
    area: "Bonapriso",
    address: "Bonapriso, Douala",
    coordinates: { lat: 4.0271, lng: 9.7072 },
    cover: foodImages.bakery,
    logoTone: "bg-zinc-900",
    rating: 4.4,
    reviews: 506,
    etaMin: 20,
    etaMax: 34,
    distanceKm: 5.1,
    minOrder: 2500,
    deliveryBase: 800,
    freeDelivery: false,
    pickup: true,
    menuSeed: [
      ["Entrées", "Croissant beurre", "Croissant pur beurre croustillant.", 1000, foodImages.bakery],
      ["Plats", "Sandwich jambon fromage", "Pain frais, jambon, fromage et salade.", 3500, foodImages.bakery],
      ["Desserts", "Éclair chocolat", "Pâte à choux et crème chocolat.", 2000, foodImages.bakery],
      ["Boissons", "Cappuccino", "Café espresso et lait mousseux.", 2000, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "urban-shawarma",
    name: "Urban Shawarma",
    shortName: "US",
    description: "Shawarma, tacos, burgers et snacks rapides.",
    category: "fast-food",
    categories: ["fast-food", "burgers", "poulet", "boissons"],
    cuisine: "Shawarma",
    area: "Bonamoussadi",
    address: "Carrefour Maetur, Douala",
    coordinates: { lat: 4.0917, lng: 9.7454 },
    cover: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80",
    logoTone: "bg-black",
    rating: 4.2,
    reviews: 354,
    etaMin: 15,
    etaMax: 27,
    distanceKm: 2.1,
    minOrder: 2500,
    deliveryBase: 650,
    freeDelivery: true,
    pickup: true,
    promo: "Tacos -15%",
    menuSeed: [
      ["Plats", "Shawarma poulet", "Pain roulé, poulet et sauce au choix.", 2500, foodImages.burger],
      ["Plats", "Tacos gratiné", "Tacos généreux, fromage gratiné et frites.", 5000, foodImages.burger],
      ["Plats", "Burger chicken", "Poulet croustillant et sauce maison.", 3500, foodImages.burger],
      ["Boissons", "Soda", "Boisson fraîche au choix.", 1000, foodImages.coffee],
    ],
  }),
  createRestaurant({
    id: "market",
    name: "GOO Market Bonamoussadi",
    shortName: "M",
    description: "Courses du quotidien, produits frais et épicerie livrés vite.",
    category: "supermarche",
    categories: ["supermarche", "boissons"],
    cuisine: "Supermarché",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    coordinates: { lat: 4.0888, lng: 9.7449 },
    cover: foodImages.market,
    logoTone: "bg-[#00B140]",
    rating: 4.4,
    reviews: 274,
    etaMin: 22,
    etaMax: 38,
    distanceKm: 2.6,
    minOrder: 5000,
    deliveryBase: 900,
    freeDelivery: false,
    pickup: false,
    isNew: true,
    menuSeed: [
      ["Plats", "Pack petit déjeuner", "Pain, lait, œufs et jus.", 6500, foodImages.market],
      ["Plats", "Panier légumes", "Assortiment de légumes frais.", 5000, foodImages.market],
      ["Boissons", "Pack eau minérale", "Pack de bouteilles d’eau.", 3000, foodImages.market],
      ["Desserts", "Biscuits chocolat", "Biscuits familiaux.", 1800, foodImages.market],
    ],
  }),
  createRestaurant({
    id: "pharmacy",
    name: "GOO Pharmacie Express",
    shortName: "RX",
    description: "Produits de pharmacie, hygiène et besoins urgents avec assistance GOO.",
    category: "pharmacie",
    categories: ["pharmacie"],
    cuisine: "Pharmacie",
    area: "Akwa",
    address: "Akwa centre, Douala",
    coordinates: { lat: 4.0502, lng: 9.7013 },
    cover: foodImages.pharmacy,
    logoTone: "bg-black",
    rating: 4.5,
    reviews: 198,
    etaMin: 24,
    etaMax: 40,
    distanceKm: 4.8,
    minOrder: 3000,
    deliveryBase: 800,
    freeDelivery: false,
    pickup: true,
    isVerified: true,
    menuSeed: [
      ["Plats", "Kit hygiène", "Savon, gel et lingettes.", 4500, foodImages.pharmacy],
      ["Plats", "Pack vitamines", "Compléments selon disponibilité.", 6500, foodImages.pharmacy],
      ["Boissons", "Solution hydratation", "Boisson de réhydratation.", 2000, foodImages.pharmacy],
      ["Entrées", "Gel mains", "Gel hydroalcoolique.", 1500, foodImages.pharmacy],
    ],
  }),
];

function createRestaurant(input: Omit<Restaurant, "phone" | "hours" | "isOpen" | "isVerified" | "menu"> & {
  phone?: string;
  hours?: string;
  isOpen?: boolean;
  isVerified?: boolean;
  menuSeed: Array<[MenuSection["title"] | "Accompagnements", string, string, number, string]>;
}): Restaurant {
  const sectionOrder: MenuSection["title"][] = ["Entrées", "Plats", "Desserts", "Boissons"];
  const grouped = input.menuSeed.reduce<Record<MenuSection["title"], MenuItem[]>>(
    (acc, [title, name, description, price, image], index) => {
      const normalizedTitle: MenuSection["title"] = title === "Accompagnements" ? "Entrées" : title;
      acc[normalizedTitle].push({
        id: `${input.id}-${index}`,
        name,
        description,
        price,
        image,
        calories: 260 + index * 85,
        prepTime: `${8 + index * 2}-${14 + index * 2} min`,
        popularity: 84 + ((index * 7) % 15),
        options: baseOptions,
        extras: [
          { name: "Fromage", price: 500 },
          { name: "Sauce extra", price: 300 },
          { name: "Portion plus grande", price: 1200 },
        ],
      });
      return acc;
    },
    { Entrées: [], Plats: [], Desserts: [], Boissons: [] },
  );

  return {
    ...input,
    phone: input.phone ?? whatsappNumber,
    hours: input.hours ?? "Ouvert aujourd’hui · 10:00 - 22:30",
    isOpen: input.isOpen ?? true,
    isVerified: input.isVerified ?? true,
    menu: sectionOrder
      .map((title) => ({ title, items: grouped[title] }))
      .filter((section) => section.items.length > 0),
  };
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-CM").format(Math.max(0, Math.round(value)))} FCFA`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundTo50(value: number) {
  return Math.ceil(value / 50) * 50;
}

function getDistanceKm(origin: Coordinates, destination: Coordinates) {
  const radius = 6371;
  const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
  const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;
  const lat1 = (origin.lat * Math.PI) / 180;
  const lat2 = (destination.lat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getRestaurantDistance(restaurant: Restaurant, client: ClientLocation) {
  return client.coordinates ? getDistanceKm(client.coordinates, restaurant.coordinates) : restaurant.distanceKm;
}

function calculateDeliveryFee(restaurant: Restaurant, distanceKm: number, subtotal: number) {
  if (restaurant.freeDelivery || subtotal >= 18000) return 0;
  return roundTo50(clamp(restaurant.deliveryBase + distanceKm * 140 + subtotal * 0.015, 500, 2800));
}

function getGoogleMapsUrl(restaurant: Restaurant) {
  const destination = `${restaurant.name} ${restaurant.address}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

function haptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(12);
  }
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeFilters, setActiveFilters] = useState<FilterId[]>([]);
  const [location, setLocation] = useState<ClientLocation>({
    label: "Bonamoussadi, Douala",
    coordinates: null,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ restaurant: Restaurant; item: MenuItem } | null>(null);
  const [menuSearch, setMenuSearch] = useState("");
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>("Tous");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>(["maison-h", "tchop-yamo"]);
  const [productDraft, setProductDraft] = useState({
    quantity: 1,
    size: "Normal",
    sauce: "Douce",
    drink: "Sans boisson",
    extras: [] as string[],
    note: "",
  });
  const [coupon, setCoupon] = useState("");
  const [driverNote, setDriverNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [deliveryTime, setDeliveryTime] = useState("Dès que possible");
  const [tip, setTip] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const enrichedRestaurants = useMemo(
    () =>
      restaurants.map((restaurant) => {
        const distanceKm = getRestaurantDistance(restaurant, location);
        return {
          ...restaurant,
          liveDistanceKm: distanceKm,
          liveDeliveryFee: calculateDeliveryFee(restaurant, distanceKm, restaurant.minOrder),
        };
      }),
    [location],
  );

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return enrichedRestaurants.filter((restaurant) => {
      const searchable = [
        restaurant.name,
        restaurant.description,
        restaurant.cuisine,
        restaurant.area,
        ...restaurant.categories,
        ...restaurant.menu.flatMap((section) => section.items.map((item) => item.name)),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory = activeCategory === "all" || restaurant.categories.includes(activeCategory);
      const matchesFilters = activeFilters.every((filter) => {
        if (filter === "freeDelivery") return restaurant.freeDelivery;
        if (filter === "pickup") return restaurant.pickup;
        if (filter === "under20") return restaurant.etaMin <= 20;
        if (filter === "under30") return restaurant.etaMax <= 30;
        if (filter === "promotions") return Boolean(restaurant.promo);
        if (filter === "topRated") return restaurant.rating >= 4.6;
        if (filter === "open") return restaurant.isOpen;
        if (filter === "lowPrice") return restaurant.minOrder <= 3500;
        return true;
      });

      return matchesQuery && matchesCategory && matchesFilters;
    });
  }, [activeCategory, activeFilters, enrichedRestaurants, query]);

  const cartRestaurant = cartLines.length
    ? restaurants.find((restaurant) => restaurant.id === cartLines[0]?.restaurantId) ?? null
    : null;
  const cartDistance = cartRestaurant ? getRestaurantDistance(cartRestaurant, location) : 0;
  const cartSubtotal = cartLines.reduce((sum, line) => {
    const extrasTotal = line.item.extras
      .filter((extra) => line.extras.includes(extra.name))
      .reduce((total, extra) => total + extra.price, 0);
    return sum + (line.item.price + extrasTotal) * line.quantity;
  }, 0);
  const serviceFee = cartSubtotal > 0 ? roundTo50(cartSubtotal * 0.025) : 0;
  const taxes = cartSubtotal > 0 ? roundTo50(cartSubtotal * 0.015) : 0;
  const discount = coupon.trim().toUpperCase() === "GOO20" ? roundTo50(cartSubtotal * 0.2) : 0;
  const deliveryFee = cartRestaurant ? calculateDeliveryFee(cartRestaurant, cartDistance, cartSubtotal) : 0;
  const cartTotal = cartSubtotal + serviceFee + taxes + deliveryFee + tip - discount;

  function detectLocation() {
    if (!("geolocation" in navigator)) {
      setLocation((current) => ({ ...current, label: "Douala · position non disponible" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          label: "Position actuelle · Douala",
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      () => setLocation((current) => ({ ...current, label: "Douala · localisation refusée" })),
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  }

  function toggleFilter(filter: FilterId) {
    haptic();
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );
  }

  function openRestaurant(restaurant: Restaurant) {
    haptic();
    setSelectedRestaurant(restaurant);
    setMenuSearch("");
    setActiveMenuCategory("Tous");
  }

  function openProduct(restaurant: Restaurant, item: MenuItem) {
    haptic();
    setSelectedProduct({ restaurant, item });
    setProductDraft({
      quantity: 1,
      size: "Normal",
      sauce: "Douce",
      drink: "Sans boisson",
      extras: [],
      note: "",
    });
  }

  function addProductToCart() {
    if (!selectedProduct) return;
    haptic();

    setCartLines((current) => {
      const nextLine: CartLine = {
        restaurantId: selectedProduct.restaurant.id,
        item: selectedProduct.item,
        quantity: productDraft.quantity,
        size: productDraft.size,
        sauce: productDraft.sauce,
        drink: productDraft.drink,
        extras: productDraft.extras,
        note: productDraft.note,
      };

      if (current.length && current[0]?.restaurantId !== selectedProduct.restaurant.id) {
        return [nextLine];
      }

      return [...current, nextLine];
    });

    setSelectedProduct(null);
    setCartOpen(true);
  }

  function updateCartQuantity(index: number, quantity: number) {
    haptic();
    setCartLines((current) =>
      current
        .map((line, lineIndex) => (lineIndex === index ? { ...line, quantity } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  function toggleFavorite(id: string) {
    haptic();
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function refreshHome() {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 850);
  }

  function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cartRestaurant || cartLines.length === 0) return;

    const details = cartLines
      .map(
        (line) =>
          `${line.quantity} x ${line.item.name} (${line.size}, ${line.sauce}, ${line.drink}) - ${formatPrice(
            line.item.price * line.quantity,
          )}`,
      )
      .join("\n");

    const message = [
      "Bonjour GOO Delivery, je souhaite commander.",
      `Restaurant : ${cartRestaurant.name}`,
      `Adresse client : ${location.label}`,
      `Articles :\n${details}`,
      `Sous-total : ${formatPrice(cartSubtotal)}`,
      `Taxes : ${formatPrice(taxes)}`,
      `Service : ${formatPrice(serviceFee)}`,
      `Livraison : ${formatPrice(deliveryFee)}`,
      `Pourboire : ${formatPrice(tip)}`,
      `Réduction : ${formatPrice(discount)}`,
      `Total : ${formatPrice(cartTotal)}`,
      `Paiement : ${paymentMethod}`,
      `Heure souhaitée : ${deliveryTime}`,
      `Instructions : ${driverNote || "Aucune"}`,
    ].join("\n");

    window.open(`https://wa.me/237695502710?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const screenClass = cn(
    "min-h-screen overflow-x-hidden pb-28 transition-colors duration-500",
    darkMode ? "bg-black text-white" : "bg-[#f7f8f7] text-black",
  );

  return (
    <main
      className={screenClass}
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      <AppStyles />
      <AppHeader
        activeTab={activeTab}
        cartCount={cartLines.reduce((sum, line) => sum + line.quantity, 0)}
        darkMode={darkMode}
        locationLabel={location.label}
        query={query}
        onCart={() => setCartOpen(true)}
        onDarkMode={() => setDarkMode((current) => !current)}
        onDetectLocation={detectLocation}
        onQuery={setQuery}
        onTab={setActiveTab}
      />

      <div className="mx-auto w-full max-w-[1480px] px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        {activeTab === "home" ? (
          <HomeScreen
            activeCategory={activeCategory}
            activeFilters={activeFilters}
            darkMode={darkMode}
            filteredRestaurants={filteredRestaurants}
            favorites={favorites}
            location={location}
            query={query}
            refreshing={refreshing}
            onCategory={setActiveCategory}
            onFilter={toggleFilter}
            onOpenRestaurant={openRestaurant}
            onRefresh={refreshHome}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}

        {activeTab === "explore" ? (
          <ExploreScreen
            activeCategory={activeCategory}
            restaurants={filteredRestaurants}
            query={query}
            onCategory={setActiveCategory}
            onOpenRestaurant={openRestaurant}
          />
        ) : null}

        {activeTab === "orders" ? <OrdersScreen darkMode={darkMode} /> : null}

        {activeTab === "favorites" ? (
          <FavoritesScreen
            favorites={favorites}
            restaurants={enrichedRestaurants.filter((restaurant) => favorites.includes(restaurant.id))}
            onOpenRestaurant={openRestaurant}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}

        {activeTab === "profile" ? (
          <ProfileScreen
            darkMode={darkMode}
            location={location}
            onDarkMode={() => setDarkMode((current) => !current)}
            onDetectLocation={detectLocation}
          />
        ) : null}
      </div>

      <BottomNavigation activeTab={activeTab} cartCount={cartLines.length} onTab={setActiveTab} />

      {selectedRestaurant ? (
        <RestaurantSheet
          darkMode={darkMode}
          favorite={favorites.includes(selectedRestaurant.id)}
          location={location}
          menuCategory={activeMenuCategory}
          menuSearch={menuSearch}
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          onMenuCategory={setActiveMenuCategory}
          onMenuSearch={setMenuSearch}
          onOpenProduct={openProduct}
          onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
        />
      ) : null}

      {selectedProduct ? (
        <ProductSheet
          draft={productDraft}
          product={selectedProduct}
          onAdd={addProductToCart}
          onClose={() => setSelectedProduct(null)}
          onDraft={setProductDraft}
        />
      ) : null}

      {cartOpen ? (
        <CartDrawer
          cartLines={cartLines}
          cartRestaurant={cartRestaurant}
          coupon={coupon}
          deliveryFee={deliveryFee}
          deliveryTime={deliveryTime}
          discount={discount}
          driverNote={driverNote}
          location={location}
          paymentMethod={paymentMethod}
          serviceFee={serviceFee}
          subtotal={cartSubtotal}
          taxes={taxes}
          tip={tip}
          total={cartTotal}
          onClose={() => setCartOpen(false)}
          onCoupon={setCoupon}
          onDeliveryTime={setDeliveryTime}
          onDriverNote={setDriverNote}
          onPaymentMethod={setPaymentMethod}
          onSubmit={sendOrder}
          onTip={setTip}
          onUpdateQuantity={updateCartQuantity}
        />
      ) : null}
    </main>
  );
}

function AppHeader({
  activeTab,
  cartCount,
  darkMode,
  locationLabel,
  query,
  onCart,
  onDarkMode,
  onDetectLocation,
  onQuery,
  onTab,
}: {
  activeTab: AppTab;
  cartCount: number;
  darkMode: boolean;
  locationLabel: string;
  query: string;
  onCart: () => void;
  onDarkMode: () => void;
  onDetectLocation: () => void;
  onQuery: (value: string) => void;
  onTab: (tab: AppTab) => void;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-2xl transition-colors duration-300",
        darkMode ? "border-white/10 bg-black/86" : "border-black/5 bg-white/92",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onTab("home")}
            className="flex min-w-0 items-center gap-3 rounded-[20px] transition-transform hover:scale-[1.01]"
            aria-label="Accueil GOO Delivery"
          >
            <span className="relative h-12 w-16 overflow-hidden rounded-[18px] bg-white shadow-sm ring-1 ring-black/5 sm:w-20">
              <Image src={logoSrc} alt="GOO Delivery" fill priority sizes="80px" className="object-contain p-1" />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-left text-xs font-black uppercase tracking-[0.18em] text-[#00B140]">
                GOO Delivery
              </span>
              <span className="block truncate text-left text-sm font-black">
                Plus rapide. Plus simple.
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onDetectLocation}
            className={cn(
              "hidden min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition hover:scale-[1.01] md:flex",
              darkMode ? "bg-white/10 text-white" : "bg-[#f1f3f1] text-black",
            )}
          >
            <Icon name="pin" className="h-5 w-5 text-[#00B140]" />
            <span className="truncate">{locationLabel}</span>
            <Icon name="chevron" className="h-4 w-4" />
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <HeaderIconButton label="Mode sombre" name="moon" onClick={onDarkMode} />
            <HeaderIconButton label="Notifications" name="bell" onClick={() => onTab("orders")} />
            <HeaderIconButton label="Panier" name="cart" badge={cartCount} onClick={onCart} />
            <HeaderIconButton label="Profil" name="profile" onClick={() => onTab("profile")} />
          </div>
        </div>

        <button
          type="button"
          onClick={onDetectLocation}
          className={cn(
            "flex min-w-0 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black transition md:hidden",
            darkMode ? "bg-white/10 text-white" : "bg-[#f1f3f1] text-black",
          )}
        >
          <Icon name="pin" className="h-5 w-5 text-[#00B140]" />
          <span className="truncate">{locationLabel}</span>
          <Icon name="chevron" className="h-4 w-4" />
        </button>

        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label
            className={cn(
              "group flex min-w-0 items-center gap-3 rounded-[24px] px-4 py-3 shadow-sm ring-1 transition-all duration-300 focus-within:scale-[1.005] focus-within:ring-[#00B140]",
              darkMode ? "bg-white/10 ring-white/10" : "bg-white ring-black/5",
            )}
          >
            <Icon name="search" className="h-5 w-5 shrink-0 text-[#00B140]" />
            <input
              value={query}
              onChange={(event) => onQuery(event.target.value)}
              placeholder="Rechercher restaurant, plat, boisson, épicerie, pharmacie..."
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-zinc-400 sm:text-base"
            />
            {query ? (
              <button
                type="button"
                onClick={() => onQuery("")}
                className="grid h-8 w-8 place-items-center rounded-full bg-zinc-100 text-black transition hover:bg-zinc-200"
                aria-label="Effacer la recherche"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            ) : null}
          </label>

          <nav className="hidden items-center rounded-full bg-black p-1 text-sm font-black text-white lg:flex">
            {[
              ["home", "Accueil"],
              ["explore", "Explorer"],
              ["orders", "Commandes"],
              ["favorites", "Favoris"],
              ["profile", "Profil"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTab(tab as AppTab)}
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  activeTab === tab ? "bg-[#00B140] text-black" : "text-white/70 hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function HeaderIconButton({
  badge,
  label,
  name,
  onClick,
}: {
  badge?: number;
  label: string;
  name: IconName;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative grid h-11 w-11 place-items-center rounded-full bg-black text-white shadow-sm transition hover:scale-105 hover:bg-[#00B140] hover:text-black"
      aria-label={label}
    >
      <Icon name={name} className="h-5 w-5" />
      {badge ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#00B140] px-1 text-[10px] font-black text-black ring-2 ring-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function HomeScreen({
  activeCategory,
  activeFilters,
  darkMode,
  favorites,
  filteredRestaurants,
  location,
  query,
  refreshing,
  onCategory,
  onFilter,
  onOpenRestaurant,
  onRefresh,
  onToggleFavorite,
}: {
  activeCategory: CategoryId;
  activeFilters: FilterId[];
  darkMode: boolean;
  favorites: string[];
  filteredRestaurants: Array<Restaurant & { liveDistanceKm: number; liveDeliveryFee: number }>;
  location: ClientLocation;
  query: string;
  refreshing: boolean;
  onCategory: (category: CategoryId) => void;
  onFilter: (filter: FilterId) => void;
  onOpenRestaurant: (restaurant: Restaurant) => void;
  onRefresh: () => void;
  onToggleFavorite: (id: string) => void;
}) {
  const popular = filteredRestaurants.filter((restaurant) => restaurant.reviews >= 450);
  const topRated = filteredRestaurants.filter((restaurant) => restaurant.rating >= 4.6);
  const newest = filteredRestaurants.filter((restaurant) => restaurant.isNew);
  const fastest = filteredRestaurants.filter((restaurant) => restaurant.etaMin <= 22);
  const nearby = [...filteredRestaurants].sort((a, b) => a.liveDistanceKm - b.liveDistanceKm);
  const african = filteredRestaurants.filter((restaurant) => restaurant.categories.includes("africain"));
  const pizza = filteredRestaurants.filter((restaurant) => restaurant.categories.includes("pizza"));
  const asian = filteredRestaurants.filter((restaurant) => restaurant.categories.includes("asiatique"));
  const drinks = filteredRestaurants.filter((restaurant) => restaurant.categories.includes("boissons"));

  return (
    <div className="space-y-8">
      <HeroBand darkMode={darkMode} location={location} refreshing={refreshing} onRefresh={onRefresh} />
      <CategoryRail activeCategory={activeCategory} onCategory={onCategory} />
      <FilterRail activeFilters={activeFilters} onFilter={onFilter} />
      <PromoSlider />

      {refreshing ? <SkeletonRail /> : null}

      {query ? (
        <SectionRail
          favorites={favorites}
          restaurants={filteredRestaurants}
          title={`Résultats pour “${query}”`}
          onOpenRestaurant={onOpenRestaurant}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <>
          <SectionRail
            favorites={favorites}
            restaurants={popular}
            title="Les plus populaires"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={topRated}
            title="Les mieux notés"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={newest}
            title="Nouveaux restaurants"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={fastest}
            title="Livraison rapide"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={nearby}
            title="Près de chez vous"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={african}
            title="Cuisine africaine"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={pizza}
            title="Pizza"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={asian}
            title="Asiatique"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
          <SectionRail
            favorites={favorites}
            restaurants={drinks}
            title="Boissons et cafés"
            onOpenRestaurant={onOpenRestaurant}
            onToggleFavorite={onToggleFavorite}
          />
        </>
      )}
    </div>
  );
}

function HeroBand({
  darkMode,
  location,
  refreshing,
  onRefresh,
}: {
  darkMode: boolean;
  location: ClientLocation;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[28px] px-5 py-7 shadow-sm sm:px-8 lg:px-10",
        darkMode ? "bg-white/8 ring-1 ring-white/10" : "bg-white",
      )}
    >
      <div className="absolute -right-10 top-0 h-52 w-52 rounded-full bg-[#00B140]/20 blur-3xl" />
      <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative min-w-0">
          <p className="inline-flex rounded-full bg-[#00B140]/12 px-4 py-2 text-sm font-black text-[#008f35]">
            Livraison moderne au Cameroun
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
            Commandez mieux. Recevez plus vite.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-500 sm:text-lg">
            Restaurants, fast-food, pharmacies, courses et boissons autour de {location.label}. Une expérience
            fluide, premium et pensée mobile.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={supportWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#00B140] px-6 py-4 text-sm font-black text-black shadow-[0_18px_50px_rgba(0,177,64,0.28)] transition hover:scale-[1.02]"
            >
              Commander sur WhatsApp
            </a>
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-4 text-sm font-black transition hover:border-[#00B140] hover:text-[#008f35]"
            >
              <Icon name="spark" className={cn("h-5 w-5", refreshing && "animate-spin")} />
              Actualiser les offres
            </button>
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-black p-5 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,177,64,0.5),transparent_34%),linear-gradient(135deg,#050505,#111)]" />
          <div className="relative grid h-full content-between gap-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-black">GOO Live</span>
              <span className="rounded-full bg-[#00B140] px-4 py-2 text-sm font-black text-black">60 FPS UI</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["18 min", "livraison rapide"],
                ["4.7", "note moyenne"],
                ["0 FCFA", "offres livraison"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="mt-1 text-xs font-bold text-white/60">{label}</p>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[24px] bg-white p-4 text-black">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00B140] text-xl font-black">
                  G
                </span>
                <div>
                  <p className="text-sm font-black">Commande en route</p>
                  <p className="text-xs font-bold text-zinc-500">Livreur à 7 minutes · Bonamoussadi</p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                <div className="goo-progress h-full rounded-full bg-[#00B140]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRail({
  activeCategory,
  onCategory,
}: {
  activeCategory: CategoryId;
  onCategory: (category: CategoryId) => void;
}) {
  return (
    <section className="space-y-3">
      <SectionTitle title="Catégories" action="Filtrage instantané" />
      <div className="goo-scrollbar flex snap-x gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              haptic();
              onCategory(category.id);
            }}
            className={cn(
              "group flex h-[116px] w-[104px] shrink-0 snap-start flex-col justify-between rounded-[22px] p-3 text-left shadow-sm transition duration-300 hover:-translate-y-1 sm:h-[124px] sm:w-[122px] sm:rounded-[24px] sm:p-4",
              activeCategory === category.id
                ? "bg-black text-white"
                : "bg-white text-black hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-2xl leading-none transition sm:h-12 sm:w-12",
                activeCategory === category.id ? "bg-[#00B140] text-black" : "bg-[#00B140]/12 text-[#008f35]",
              )}
            >
              {category.icon}
            </span>
            <span className="block min-w-0">
              <span className="block truncate whitespace-nowrap text-sm font-black leading-5">{category.label}</span>
              <span
                className={cn(
                  "mt-0.5 block truncate whitespace-nowrap text-xs font-bold leading-4",
                  activeCategory === category.id ? "text-white/60" : "text-zinc-500",
                )}
              >
                {category.hint}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function FilterRail({
  activeFilters,
  onFilter,
}: {
  activeFilters: FilterId[];
  onFilter: (filter: FilterId) => void;
}) {
  return (
    <section className="goo-scrollbar flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => {
        const active = activeFilters.includes(filter.id);
        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilter(filter.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-3 text-sm font-black shadow-sm transition hover:scale-[1.02]",
              active ? "bg-[#00B140] text-black" : "bg-white text-black hover:bg-zinc-50",
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </section>
  );
}

function PromoSlider() {
  return (
    <section className="max-w-full overflow-hidden rounded-[28px] bg-black p-3 text-white">
      <div className="goo-promo-track flex gap-3">
        {[...promoSlides, ...promoSlides].map((slide, index) => (
          <article
            key={`${slide.title}-${index}`}
            className="w-[calc(100vw-2rem)] max-w-[640px] shrink-0 rounded-[24px] bg-[linear-gradient(135deg,#00B140,#101010)] p-5 shadow-sm sm:w-[520px] sm:p-6"
          >
            <p className="inline-flex rounded-full bg-black/30 px-3 py-1 text-xs font-black">{slide.badge}</p>
            <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-4xl">{slide.title}</h2>
            <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-white/80">{slide.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionRail({
  favorites,
  restaurants,
  title,
  onOpenRestaurant,
  onToggleFavorite,
}: {
  favorites: string[];
  restaurants: Array<Restaurant & { liveDistanceKm?: number; liveDeliveryFee?: number }>;
  title: string;
  onOpenRestaurant: (restaurant: Restaurant) => void;
  onToggleFavorite: (id: string) => void;
}) {
  if (restaurants.length === 0) return null;

  return (
    <section className="space-y-4">
      <SectionTitle title={title} action="Voir tout" />
      <div className="goo-scrollbar flex snap-x gap-4 overflow-x-auto pb-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            favorite={favorites.includes(restaurant.id)}
            restaurant={restaurant}
            onOpen={() => onOpenRestaurant(restaurant)}
            onToggleFavorite={() => onToggleFavorite(restaurant.id)}
          />
        ))}
      </div>
    </section>
  );
}

function RestaurantCard({
  favorite,
  restaurant,
  onOpen,
  onToggleFavorite,
}: {
  favorite: boolean;
  restaurant: Restaurant & { liveDistanceKm?: number; liveDeliveryFee?: number };
  onOpen: () => void;
  onToggleFavorite: () => void;
}) {
  const distanceKm = restaurant.liveDistanceKm ?? restaurant.distanceKm;
  const deliveryFee = restaurant.liveDeliveryFee ?? restaurant.deliveryBase;

  return (
    <article className="group w-[82vw] max-w-[360px] shrink-0 snap-start rounded-[26px] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.12)] sm:w-[330px]">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative h-52 overflow-hidden rounded-[22px] bg-zinc-100">
          <div
            className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${restaurant.cover})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-black/5 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {restaurant.promo ? <Badge tone="green">{restaurant.promo}</Badge> : null}
            {restaurant.isNew ? <Badge>Nouveau</Badge> : null}
            {restaurant.isTopRated ? <Badge>Top Rated</Badge> : null}
            {restaurant.freeDelivery ? <Badge tone="green">Livraison gratuite</Badge> : null}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
            <span className={cn("grid h-12 w-12 place-items-center rounded-2xl text-lg font-black text-white ring-2 ring-white", restaurant.logoTone)}>
              {restaurant.shortName}
            </span>
            <span className={cn("rounded-full px-3 py-1 text-xs font-black", restaurant.isOpen ? "bg-white text-black" : "bg-zinc-900 text-white")}>
              {restaurant.isOpen ? "Ouvert" : "Fermé"}
            </span>
          </div>
        </div>
      </button>

      <div className="px-1 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={onOpen} className="min-w-0 text-left">
            <h3 className="truncate text-xl font-black text-black">{restaurant.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-zinc-500">{restaurant.description}</p>
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full transition hover:scale-105",
              favorite ? "bg-[#00B140] text-black" : "bg-zinc-100 text-black",
            )}
            aria-label="Ajouter aux favoris"
          >
            <Icon name="heart" className="h-5 w-5" filled={favorite} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Metric value={`★ ${restaurant.rating}`} label={`${restaurant.reviews} avis`} />
          <Metric value={`${restaurant.etaMin}-${restaurant.etaMax}`} label="min" />
          <Metric value={`${distanceKm.toFixed(1)} km`} label={formatPrice(deliveryFee)} />
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-xs font-black text-zinc-500">Min. {formatPrice(restaurant.minOrder)}</span>
          {restaurant.isVerified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#00B140]/12 px-3 py-1 text-xs font-black text-[#008f35]">
              <Icon name="check" className="h-3.5 w-3.5" />
              Vérifié
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function Badge({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "green" }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-black backdrop-blur",
        tone === "green" ? "bg-[#00B140] text-black" : "bg-black/70 text-white",
      )}
    >
      {children}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-50 px-2 py-3">
      <p className="text-sm font-black text-black">{value}</p>
      <p className="mt-1 truncate text-[11px] font-bold text-zinc-500">{label}</p>
    </div>
  );
}

function ExploreScreen({
  activeCategory,
  restaurants,
  query,
  onCategory,
  onOpenRestaurant,
}: {
  activeCategory: CategoryId;
  restaurants: Array<Restaurant & { liveDistanceKm: number; liveDeliveryFee: number }>;
  query: string;
  onCategory: (category: CategoryId) => void;
  onOpenRestaurant: (restaurant: Restaurant) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Explorer" action={`${restaurants.length} résultats`} />
      <CategoryRail activeCategory={activeCategory} onCategory={onCategory} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            type="button"
            onClick={() => onOpenRestaurant(restaurant)}
            className="flex min-w-0 gap-4 rounded-[24px] bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            <div className="h-28 w-32 shrink-0 rounded-[20px] bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.cover})` }} />
            <div className="min-w-0 py-1">
              <p className="truncate text-lg font-black">{restaurant.name}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">{restaurant.cuisine}</p>
              <p className="mt-3 text-sm font-black text-[#008f35]">
                ★ {restaurant.rating} · {restaurant.etaMin}-{restaurant.etaMax} min · {restaurant.liveDistanceKm.toFixed(1)} km
              </p>
              <p className="mt-1 text-xs font-bold text-zinc-400">
                {query ? "Correspond à votre recherche" : restaurant.address}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RestaurantSheet({
  darkMode,
  favorite,
  location,
  menuCategory,
  menuSearch,
  restaurant,
  onClose,
  onMenuCategory,
  onMenuSearch,
  onOpenProduct,
  onToggleFavorite,
}: {
  darkMode: boolean;
  favorite: boolean;
  location: ClientLocation;
  menuCategory: string;
  menuSearch: string;
  restaurant: Restaurant;
  onClose: () => void;
  onMenuCategory: (category: string) => void;
  onMenuSearch: (value: string) => void;
  onOpenProduct: (restaurant: Restaurant, item: MenuItem) => void;
  onToggleFavorite: () => void;
}) {
  const distanceKm = getRestaurantDistance(restaurant, location);
  const deliveryFee = calculateDeliveryFee(restaurant, distanceKm, restaurant.minOrder);
  const menuCategories = ["Tous", ...restaurant.menu.map((section) => section.title)];
  const normalizedMenuSearch = menuSearch.trim().toLowerCase();
  const visibleSections = restaurant.menu
    .filter((section) => menuCategory === "Tous" || section.title === menuCategory)
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          !normalizedMenuSearch ||
          `${item.name} ${item.description}`.toLowerCase().includes(normalizedMenuSearch),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          "goo-sheet fixed inset-x-0 bottom-0 mx-auto max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-t-[32px] shadow-2xl",
          darkMode ? "bg-[#070707] text-white" : "bg-white text-black",
        )}
      >
        <div className="relative h-[34vh] min-h-[260px] overflow-hidden rounded-t-[32px] bg-zinc-200">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.cover})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-black/20" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow">
              <Icon name="close" className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onToggleFavorite}
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow"
                aria-label="Favori"
              >
                <Icon name="heart" className="h-5 w-5" filled={favorite} />
              </button>
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow" aria-label="Partager">
                <Icon name="share" className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex items-end gap-4">
              <span className={cn("grid h-20 w-20 place-items-center rounded-[24px] text-2xl font-black ring-4 ring-white", restaurant.logoTone)}>
                {restaurant.shortName}
              </span>
              <div className="min-w-0">
                <h2 className="break-words text-4xl font-black tracking-tight sm:text-5xl">{restaurant.name}</h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-white/78">{restaurant.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-4">
            <InfoTile icon="star" label="Note" value={`★ ${restaurant.rating} · ${restaurant.reviews} avis`} />
            <InfoTile icon="clock" label="Livraison" value={`${restaurant.etaMin}-${restaurant.etaMax} min`} />
            <InfoTile icon="route" label="Distance" value={`${distanceKm.toFixed(1)} km`} />
            <InfoTile icon="cart" label="Frais" value={deliveryFee === 0 ? "Gratuite" : formatPrice(deliveryFee)} />
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[24px] bg-zinc-50 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#008f35]">Informations</p>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-zinc-600 sm:grid-cols-2">
                <p>Adresse : <span className="font-black text-black">{restaurant.address}</span></p>
                <p>Horaires : <span className="font-black text-black">{restaurant.hours}</span></p>
                <p>Téléphone : <span className="font-black text-black">{restaurant.phone}</span></p>
                <p>Minimum : <span className="font-black text-black">{formatPrice(restaurant.minOrder)}</span></p>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={supportPhoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[#00B140] hover:text-black"
                >
                  <Icon name="support" className="h-4 w-4" />
                  Appeler
                </a>
                <a
                  href={getGoogleMapsUrl(restaurant)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-sm font-black transition hover:border-[#00B140]"
                >
                  <Icon name="route" className="h-4 w-4" />
                  Itinéraire
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] bg-black p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00B140]">Carte live</p>
              <div className="mt-4 h-44 rounded-[22px] bg-[radial-gradient(circle_at_35%_35%,rgba(0,177,64,0.55),transparent_32%),linear-gradient(135deg,#1f2937,#050505)] p-4">
                <div className="relative h-full">
                  <span className="absolute left-[18%] top-[48%] grid h-10 w-10 place-items-center rounded-full bg-[#00B140] text-black">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <span className="absolute right-[22%] top-[24%] grid h-10 w-10 place-items-center rounded-full bg-white text-black">
                    <Icon name="home" className="h-5 w-5" />
                  </span>
                  <div className="absolute left-[27%] top-[52%] h-1 w-[44%] rotate-[-24deg] rounded-full bg-[#00B140]" />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-[120px] z-10 mt-6 rounded-[24px] bg-white/90 p-3 shadow-sm backdrop-blur-xl">
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="flex min-w-0 items-center gap-3 rounded-full bg-zinc-100 px-4 py-3">
                <Icon name="search" className="h-5 w-5 text-[#00B140]" />
                <input
                  value={menuSearch}
                  onChange={(event) => onMenuSearch(event.target.value)}
                  placeholder="Rechercher dans le menu"
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
                />
              </label>
              <div className="goo-scrollbar flex gap-2 overflow-x-auto">
                {menuCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => onMenuCategory(category)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-3 text-sm font-black transition",
                      menuCategory === category ? "bg-black text-white" : "bg-zinc-100 text-black",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-8">
            {visibleSections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h3 className="text-2xl font-black">{section.title}</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {section.items.map((item) => (
                    <ProductCard key={item.id} item={item} restaurant={restaurant} onOpen={() => onOpenProduct(restaurant, item)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  item,
  onOpen,
}: {
  item: MenuItem;
  restaurant: Restaurant;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-w-0 gap-4 rounded-[24px] bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.1)]"
    >
      <div className="h-28 w-32 shrink-0 overflow-hidden rounded-[20px] bg-zinc-100">
        <div className="h-full w-full bg-cover bg-center transition group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
      </div>
      <div className="min-w-0 py-1">
        <h4 className="truncate text-lg font-black">{item.name}</h4>
        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-zinc-500">{item.description}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-black text-zinc-500">
          <span>{item.calories} kcal</span>
          <span>·</span>
          <span>{item.prepTime}</span>
          <span>·</span>
          <span>{item.popularity}% populaire</span>
        </div>
        <p className="mt-2 text-base font-black text-[#008f35]">{formatPrice(item.price)}</p>
      </div>
    </button>
  );
}

function ProductSheet({
  draft,
  product,
  onAdd,
  onClose,
  onDraft,
}: {
  draft: {
    quantity: number;
    size: string;
    sauce: string;
    drink: string;
    extras: string[];
    note: string;
  };
  product: { restaurant: Restaurant; item: MenuItem };
  onAdd: () => void;
  onClose: () => void;
  onDraft: React.Dispatch<
    React.SetStateAction<{
      quantity: number;
      size: string;
      sauce: string;
      drink: string;
      extras: string[];
      note: string;
    }>
  >;
}) {
  const extrasTotal = product.item.extras
    .filter((extra) => draft.extras.includes(extra.name))
    .reduce((sum, extra) => sum + extra.price, 0);
  const unitTotal = product.item.price + extrasTotal;

  function toggleExtra(extra: string) {
    haptic();
    onDraft((current) => ({
      ...current,
      extras: current.extras.includes(extra)
        ? current.extras.filter((item) => item !== extra)
        : [...current.extras, extra],
    }));
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-end bg-black/45 backdrop-blur-sm sm:place-items-center sm:p-4">
      <div className="goo-sheet max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[32px] bg-white p-5 text-black shadow-2xl sm:rounded-[32px] sm:p-6">
        <div className="relative h-64 overflow-hidden rounded-[26px] bg-zinc-100">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.item.image})` }} />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[#008f35]">{product.restaurant.name}</p>
          <h3 className="mt-2 text-3xl font-black">{product.item.name}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">{product.item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-3 py-2">{product.item.calories} kcal</span>
            <span className="rounded-full bg-zinc-100 px-3 py-2">{product.item.prepTime}</span>
            <span className="rounded-full bg-zinc-100 px-3 py-2">{product.item.popularity}% populaire</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {product.item.options.map((option) => {
            const key = option.label === "Taille" ? "size" : option.label === "Sauce" ? "sauce" : "drink";
            const value = draft[key];
            return (
              <div key={option.label}>
                <p className="text-sm font-black">{option.label}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {option.values.map((optionValue) => (
                    <button
                      key={optionValue}
                      type="button"
                      onClick={() => onDraft((current) => ({ ...current, [key]: optionValue }))}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-black transition",
                        value === optionValue ? "bg-[#00B140] text-black" : "bg-zinc-100 text-black",
                      )}
                    >
                      {optionValue}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div>
            <p className="text-sm font-black">Suppléments</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {product.item.extras.map((extra) => (
                <button
                  key={extra.name}
                  type="button"
                  onClick={() => toggleExtra(extra.name)}
                  className={cn(
                    "rounded-[18px] px-4 py-3 text-left text-sm font-black transition",
                    draft.extras.includes(extra.name) ? "bg-[#00B140] text-black" : "bg-zinc-100 text-black",
                  )}
                >
                  {extra.name}
                  <span className="block text-xs font-bold opacity-60">+{formatPrice(extra.price)}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Instructions spéciales
            <textarea
              value={draft.note}
              onChange={(event) => onDraft((current) => ({ ...current, note: event.target.value }))}
              rows={3}
              placeholder="Exemple : peu de piment, sans oignon..."
              className="rounded-[20px] border border-zinc-200 px-4 py-3 font-semibold outline-none transition focus:border-[#00B140]"
            />
          </label>
        </div>

        <div className="sticky bottom-0 mt-6 flex items-center gap-3 bg-white pt-4">
          <div className="flex items-center rounded-full bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => onDraft((current) => ({ ...current, quantity: Math.max(1, current.quantity - 1) }))}
              className="grid h-11 w-11 place-items-center rounded-full bg-white"
            >
              <Icon name="minus" className="h-5 w-5" />
            </button>
            <span className="w-10 text-center text-sm font-black">{draft.quantity}</span>
            <button
              type="button"
              onClick={() => onDraft((current) => ({ ...current, quantity: current.quantity + 1 }))}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#00B140]"
            >
              <Icon name="plus" className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="flex flex-1 items-center justify-center rounded-full bg-black px-5 py-4 text-sm font-black text-white transition hover:bg-[#00B140] hover:text-black"
          >
            Ajouter au panier · {formatPrice(unitTotal * draft.quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  cartLines,
  cartRestaurant,
  coupon,
  deliveryFee,
  deliveryTime,
  discount,
  driverNote,
  location,
  paymentMethod,
  serviceFee,
  subtotal,
  taxes,
  tip,
  total,
  onClose,
  onCoupon,
  onDeliveryTime,
  onDriverNote,
  onPaymentMethod,
  onSubmit,
  onTip,
  onUpdateQuantity,
}: {
  cartLines: CartLine[];
  cartRestaurant: Restaurant | null;
  coupon: string;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
  driverNote: string;
  location: ClientLocation;
  paymentMethod: string;
  serviceFee: number;
  subtotal: number;
  taxes: number;
  tip: number;
  total: number;
  onClose: () => void;
  onCoupon: (value: string) => void;
  onDeliveryTime: (value: string) => void;
  onDriverNote: (value: string) => void;
  onPaymentMethod: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onTip: (value: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-[95] bg-black/45 backdrop-blur-sm">
      <form
        onSubmit={onSubmit}
        className="goo-sheet fixed bottom-0 right-0 top-0 flex w-full max-w-xl flex-col bg-white p-5 text-black shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#008f35]">Panier</p>
            <h2 className="mt-2 text-3xl font-black">{cartRestaurant?.name ?? "Votre commande"}</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-500">{location.label}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-zinc-100">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="goo-scrollbar mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
          {cartLines.length === 0 ? (
            <div className="rounded-[24px] bg-zinc-50 p-8 text-center">
              <Icon name="cart" className="mx-auto h-10 w-10 text-[#00B140]" />
              <p className="mt-3 text-lg font-black">Votre panier est vide</p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">Ajoutez un produit pour commencer.</p>
            </div>
          ) : null}

          {cartLines.map((line, index) => (
            <div key={`${line.item.id}-${index}`} className="rounded-[24px] bg-zinc-50 p-4">
              <div className="flex gap-3">
                <div className="h-20 w-20 shrink-0 rounded-[18px] bg-cover bg-center" style={{ backgroundImage: `url(${line.item.image})` }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-black">{line.item.name}</p>
                  <p className="mt-1 text-xs font-bold text-zinc-500">
                    {line.size} · {line.sauce} · {line.drink}
                  </p>
                  {line.extras.length ? (
                    <p className="mt-1 text-xs font-bold text-zinc-500">{line.extras.join(", ")}</p>
                  ) : null}
                  {line.note ? <p className="mt-1 text-xs font-bold text-zinc-400">{line.note}</p> : null}
                  <p className="mt-2 text-sm font-black text-[#008f35]">{formatPrice(line.item.price * line.quantity)}</p>
                </div>
                <div className="flex items-center gap-1 self-start rounded-full bg-white p-1">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(index, line.quantity - 1)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-zinc-100"
                  >
                    <Icon name="minus" className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-black">{line.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(index, line.quantity + 1)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-[#00B140]"
                  >
                    <Icon name="plus" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="grid gap-3 rounded-[24px] bg-zinc-50 p-4">
            <label className="grid gap-2 text-sm font-black">
              Code promo
              <input
                value={coupon}
                onChange={(event) => onCoupon(event.target.value)}
                placeholder="GOO20"
                className="rounded-[18px] border border-zinc-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#00B140]"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Instructions pour le livreur
              <textarea
                value={driverNote}
                onChange={(event) => onDriverNote(event.target.value)}
                placeholder="Appartement, repère, appel à l’arrivée..."
                rows={3}
                className="rounded-[18px] border border-zinc-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#00B140]"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black">
                Paiement
                <select
                  value={paymentMethod}
                  onChange={(event) => onPaymentMethod(event.target.value)}
                  className="rounded-[18px] border border-zinc-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#00B140]"
                >
                  {["Mobile Money", "Cash", "Carte Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "Portefeuille GOO"].map((method) => (
                    <option key={method}>{method}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black">
                Heure souhaitée
                <select
                  value={deliveryTime}
                  onChange={(event) => onDeliveryTime(event.target.value)}
                  className="rounded-[18px] border border-zinc-200 bg-white px-4 py-3 font-semibold outline-none transition focus:border-[#00B140]"
                >
                  {["Dès que possible", "Dans 30 minutes", "Dans 1 heure", "Ce soir"].map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <p className="text-sm font-black">Pourboire</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[0, 500, 1000, 1500].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onTip(value)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-black",
                      tip === value ? "bg-[#00B140] text-black" : "bg-white text-black",
                    )}
                  >
                    {value === 0 ? "Aucun" : formatPrice(value)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[24px] bg-black p-4 text-white">
          <PriceLine label="Sous-total" value={formatPrice(subtotal)} />
          <PriceLine label="Taxes" value={formatPrice(taxes)} />
          <PriceLine label="Service" value={formatPrice(serviceFee)} />
          <PriceLine label="Livraison" value={deliveryFee === 0 ? "Gratuite" : formatPrice(deliveryFee)} />
          <PriceLine label="Pourboire" value={formatPrice(tip)} />
          <PriceLine label="Réduction" value={`-${formatPrice(discount)}`} />
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-lg font-black">Total</span>
            <span className="text-2xl font-black text-[#00B140]">{formatPrice(total)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={cartLines.length === 0}
          className="mt-4 rounded-full bg-[#00B140] px-6 py-4 text-sm font-black text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
        >
          Commander
        </button>
      </form>
    </div>
  );
}

function OrdersScreen({ darkMode }: { darkMode: boolean }) {
  const steps = ["Commande reçue", "Restaurant prépare", "Livreur récupère", "En route", "Livré"];

  return (
    <div className="space-y-6">
      <SectionTitle title="Commandes" action="Suivi temps réel" />
      <section className={cn("rounded-[28px] p-5 shadow-sm", darkMode ? "bg-white/8" : "bg-white")}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#008f35]">En cours</p>
            <h2 className="mt-2 text-3xl font-black">Urban Shawarma arrive bientôt</h2>
            <p className="mt-2 text-sm font-semibold text-zinc-500">Temps restant estimé : 12 minutes.</p>
            <div className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className={cn("grid h-10 w-10 place-items-center rounded-full", index <= 3 ? "bg-[#00B140] text-black" : "bg-zinc-100 text-zinc-400")}>
                    <Icon name={index <= 3 ? "check" : "clock"} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black">{step}</p>
                    <p className="text-xs font-bold text-zinc-500">{index <= 3 ? "Terminé" : "En attente"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[360px] rounded-[26px] bg-[radial-gradient(circle_at_30%_32%,rgba(0,177,64,0.45),transparent_30%),linear-gradient(135deg,#111827,#050505)] p-5 text-white">
            <div className="relative h-full min-h-[320px]">
              <span className="absolute left-[18%] top-[60%] rounded-full bg-white px-4 py-2 text-xs font-black text-black">Client</span>
              <span className="absolute right-[18%] top-[18%] rounded-full bg-[#00B140] px-4 py-2 text-xs font-black text-black">Livreur</span>
              <div className="absolute left-[30%] top-[55%] h-1 w-[45%] rotate-[-34deg] rounded-full bg-[#00B140]" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[22px] bg-white p-4 text-black">
                <p className="font-black">Suivi live</p>
                <p className="mt-1 text-sm font-semibold text-zinc-500">Carte Google Maps prête à connecter côté backend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black">Historique</h3>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black">12 commandes</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Maison H", "Tchop & Yamo", "Asian Bowl"].map((name, index) => (
            <div key={name} className="rounded-[22px] bg-zinc-50 p-4">
              <p className="font-black">{name}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">Livré · {index + 1} jour(s)</p>
              <button type="button" className="mt-4 rounded-full bg-black px-4 py-2 text-xs font-black text-white">
                Recommander
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FavoritesScreen({
  favorites,
  restaurants,
  onOpenRestaurant,
  onToggleFavorite,
}: {
  favorites: string[];
  restaurants: Array<Restaurant & { liveDistanceKm: number; liveDeliveryFee: number }>;
  onOpenRestaurant: (restaurant: Restaurant) => void;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionTitle title="Favoris" action={`${favorites.length} enregistrés`} />
      <SectionRail
        favorites={favorites}
        restaurants={restaurants}
        title="Restaurants favoris"
        onOpenRestaurant={onOpenRestaurant}
        onToggleFavorite={onToggleFavorite}
      />
      <section className="rounded-[28px] bg-white p-5 shadow-sm">
        <h3 className="text-2xl font-black">Commandes fréquentes</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Burger américain", "Avocado toast", "Riz cantonais poulet"].map((item) => (
            <div key={item} className="rounded-[22px] bg-zinc-50 p-4">
              <p className="font-black">{item}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-500">Ajout rapide bientôt disponible</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProfileScreen({
  darkMode,
  location,
  onDarkMode,
  onDetectLocation,
}: {
  darkMode: boolean;
  location: ClientLocation;
  onDarkMode: () => void;
  onDetectLocation: () => void;
}) {
  const rows: Array<[IconName, string, string]> = [
    ["pin", "Adresses", location.label],
    ["wallet", "Paiements", "Mobile Money, Cash, Cartes, PayPal"],
    ["orders", "Commandes", "Historique et reçus"],
    ["heart", "Favoris", "Restaurants et produits"],
    ["coupon", "Coupons", "GOO20 disponible"],
    ["support", "Support", whatsappNumber],
    ["settings", "Paramètres", darkMode ? "Mode sombre actif" : "Mode clair actif"],
    ["logout", "Déconnexion", "Sécuriser la session"],
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Profil" action="Compte client" />
      <section className="rounded-[28px] bg-black p-5 text-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[24px] bg-[#00B140] text-3xl font-black text-black">
            G
          </div>
          <div>
            <h2 className="text-3xl font-black">Client GOO</h2>
            <p className="mt-1 text-sm font-semibold text-white/60">client@goo-delivery.cm · +237 6XX XXX XXX</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["Points", "1 240"],
            ["Coupons", "4"],
            ["Commandes", "12"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[22px] bg-white/10 p-4">
              <p className="text-2xl font-black">{value}</p>
              <p className="mt-1 text-xs font-bold text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {rows.map(([icon, title, value]) => (
          <button
            key={title}
            type="button"
            onClick={title === "Adresses" ? onDetectLocation : title === "Paramètres" ? onDarkMode : undefined}
            className="flex items-center gap-4 rounded-[24px] bg-white p-4 text-left shadow-sm transition hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00B140]/12 text-[#008f35]">
              <Icon name={icon} className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-black text-black">{title}</span>
              <span className="block truncate text-sm font-semibold text-zinc-500">{value}</span>
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}

function SectionTitle({ action, title }: { action?: string; title: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-2xl font-black tracking-tight text-current sm:text-3xl">{title}</h2>
      {action ? (
        <button type="button" className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-black text-black shadow-sm transition hover:text-[#008f35]">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="rounded-[24px] bg-zinc-50 p-4">
      <Icon name={icon} className="h-5 w-5 text-[#00B140]" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">{label}</p>
      <p className="mt-1 text-sm font-black text-black">{value}</p>
    </div>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1 text-sm font-semibold text-white/70">
      <span>{label}</span>
      <span className="font-black text-white">{value}</span>
    </div>
  );
}

function SkeletonRail() {
  return (
    <section className="space-y-4">
      <SectionTitle title="Chargement premium" action="Shimmer" />
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((item) => (
          <div key={item} className="w-[82vw] max-w-[360px] shrink-0 rounded-[26px] bg-white p-3 shadow-sm sm:w-[330px]">
            <div className="goo-shimmer h-52 rounded-[22px] bg-zinc-100" />
            <div className="mt-4 space-y-3">
              <div className="goo-shimmer h-5 w-2/3 rounded bg-zinc-100" />
              <div className="goo-shimmer h-4 w-full rounded bg-zinc-100" />
              <div className="goo-shimmer h-4 w-1/2 rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomNavigation({
  activeTab,
  cartCount,
  onTab,
}: {
  activeTab: AppTab;
  cartCount: number;
  onTab: (tab: AppTab) => void;
}) {
  const tabs: Array<[AppTab, IconName, string]> = [
    ["home", "home", "Accueil"],
    ["explore", "explore", "Explorer"],
    ["orders", "orders", "Commandes"],
    ["favorites", "heart", "Favoris"],
    ["profile", "profile", "Profil"],
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl px-3 pb-3">
      <div className="grid grid-cols-5 rounded-[28px] border border-black/5 bg-white/94 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
        {tabs.map(([tab, icon, label]) => {
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                haptic();
                onTab(tab);
              }}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-[22px] px-2 py-2 text-[11px] font-black transition",
                active ? "bg-[#00B140] text-black" : "text-zinc-500 hover:text-black",
              )}
            >
              <Icon name={icon} className="h-5 w-5" filled={active && icon === "heart"} />
              <span className="hidden sm:inline">{label}</span>
              {tab === "orders" && cartCount > 0 ? (
                <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-black" />
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function Icon({ className = "h-5 w-5", filled = false, name }: { className?: string; filled?: boolean; name: IconName }) {
  const fill = filled ? "currentColor" : "none";
  const strokeWidth = 2.3;

  if (name === "search") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "explore") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "orders" || name === "cart") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M5 6h2l2 10h8l2-7H8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 20h.01M17 20h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M20.8 5.8a5.3 5.3 0 0 0-7.5 0L12 7.1l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.7a5.3 5.3 0 0 0 0-7.5Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        <path d="M4 21a8 8 0 0 1 16 0" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" strokeLinejoin="round" />
        <path d="M10 21h4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M12 21s7-5.4 7-12A7 7 0 1 0 5 9c0 6.6 7 12 7 12Z" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    );
  }

  if (name === "chevron") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "share") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" strokeLinecap="round" />
        <path d="M12 15V3m0 0 4 4m-4-4L8 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 2 2.9 6 6.6 1-4.8 4.6 1.1 6.5L12 17l-5.8 3.1 1.1-6.5L2.5 9l6.6-1L12 2Z" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "route") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M8.4 14.4 15.6 9.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "plus" || name === "minus" || name === "close" || name === "check") {
    const path =
      name === "plus"
        ? "M12 5v14M5 12h14"
        : name === "minus"
          ? "M5 12h14"
          : name === "close"
            ? "m6 6 12 12M18 6 6 18"
            : "m5 12 4 4L19 6";
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const textMap: Partial<Record<IconName, string>> = {
    wallet: "₿",
    settings: "⚙",
    support: "☎",
    coupon: "%",
    logout: "↗",
    moon: "◐",
    spark: "✦",
  };

  return <span className={cn("grid place-items-center text-current", className)}>{textMap[name] ?? "•"}</span>;
}

function AppStyles() {
  return (
    <style>{`
      .material-symbols-rounded {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-weight: 900;
        letter-spacing: 0;
      }

      .goo-scrollbar {
        scrollbar-width: none;
      }

      .goo-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .goo-promo-track {
        animation: goo-slide 28s linear infinite;
      }

      .goo-progress {
        width: 72%;
        animation: goo-progress 2.4s ease-in-out infinite alternate;
      }

      .goo-sheet {
        animation: goo-sheet 220ms cubic-bezier(.2,.8,.2,1);
      }

      .goo-shimmer {
        position: relative;
        overflow: hidden;
      }

      .goo-shimmer::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent);
        animation: goo-shimmer 1.35s infinite;
      }

      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      @keyframes goo-slide {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes goo-progress {
        from { width: 45%; }
        to { width: 84%; }
      }

      @keyframes goo-sheet {
        from {
          opacity: 0;
          transform: translateY(24px) scale(.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes goo-shimmer {
        100% { transform: translateX(100%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .goo-promo-track,
        .goo-progress,
        .goo-sheet,
        .goo-shimmer::after {
          animation: none;
        }
      }
    `}</style>
  );
}
