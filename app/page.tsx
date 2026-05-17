"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const logoSrc = "/logo.png";
const whatsappNumber = "+237 695 502 710";
const whatsappUrl =
  "https://wa.me/237695502710?text=Bonjour%20GOO%20Delivery%2C%20je%20souhaite%20faire%20une%20commande.";
const email = "goodeleveries237@gmail.com";

type IconProps = {
  className?: string;
};

type AuthMode = "signup" | "login";
type AuthMethod = "email" | "phone";
type AuthStep = "details" | "verify" | "success";

type AccountForm = {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  identifier: string;
  paymentMethod: string;
};

type RestaurantCategory = "Tous" | "Fast-food" | "Restaurants" | "Chinois" | "Camerounais" | "Cafés" | "Pizza";

type MenuItem = {
  name: string;
  price: number;
};

type Restaurant = {
  name: string;
  category: Exclude<RestaurantCategory, "Tous">;
  area: string;
  address: string;
  rating: number;
  deliveryTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
  imageUrl: string;
  menu: MenuItem[];
};

type ClientLocation = {
  lat: number;
  lng: number;
};

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Comment ça marche", href: "#fonctionnement" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "6", label: "services clés" },
  { value: "3", label: "moyens de livraison" },
  { value: "Compte", label: "client sécurisé" },
];

const services = [
  {
    Icon: FoodIcon,
    title: "Livraison de repas",
    description: "Plats de restaurants, snacks et commandes urgentes livrés rapidement.",
  },
  {
    Icon: CartIcon,
    title: "Livraison de courses",
    description: "Achats du quotidien, retrait en boutique et dépôt à domicile.",
  },
  {
    Icon: BoxIcon,
    title: "Livraison de colis",
    description: "Colis personnels ou professionnels avec prise en charge sécurisée.",
  },
  {
    Icon: DocumentIcon,
    title: "Livraison de documents",
    description: "Dossiers, contrats et documents sensibles livrés avec soin.",
  },
  {
    Icon: PharmacyIcon,
    title: "Livraison pharmacie",
    description: "Produits de pharmacie et besoins urgents acheminés simplement.",
  },
  {
    Icon: BuildingIcon,
    title: "Livraison entreprise",
    description: "Solutions régulières pour restaurants, boutiques et sociétés.",
  },
];

const steps = [
  {
    title: "Le client commande",
    description: "Envoyez votre demande sur WhatsApp avec le point de retrait et la destination.",
  },
  {
    title: "GOO récupère",
    description: "Notre équipe confirme la course et assigne le livreur le plus adapté.",
  },
  {
    title: "Le livreur dépose",
    description: "La livraison est suivie jusqu'à l'arrivée, avec un contact simple et direct.",
  },
];

const deliveryModes = [
  {
    Icon: BikeIcon,
    title: "Motos",
    subtitle: "Livraison rapide",
    description: "Idéal pour repas, documents et petites courses en ville.",
  },
  {
    Icon: CarIcon,
    title: "Voitures",
    subtitle: "Colis importants",
    description: "Pour les commandes plus sensibles, plus grandes ou à forte valeur.",
  },
  {
    Icon: VanIcon,
    title: "Vans / fourgonnettes",
    subtitle: "Volumes et entreprises",
    description: "Pour les livraisons volumineuses, tournées et besoins professionnels.",
  },
];

const partners = [
  "Restaurants",
  "Boutiques",
  "Pharmacies",
  "Supermarchés",
  "Entreprises",
];

const advantages = [
  {
    Icon: SpeedIcon,
    title: "Rapide",
    description: "Des courses fluides et une prise en charge pensée pour gagner du temps.",
  },
  {
    Icon: ShieldIcon,
    title: "Fiable",
    description: "Un service sérieux, clair et constant pour chaque type de livraison.",
  },
  {
    Icon: LockIcon,
    title: "Sécurisé",
    description: "Colis, repas et documents manipulés avec attention jusqu'au dépôt.",
  },
  {
    Icon: WhatsAppIcon,
    title: "Support WhatsApp",
    description: "Un canal direct pour commander, confirmer et suivre la course.",
  },
  {
    Icon: PinIcon,
    title: "Suivi en temps réel",
    description: "Une communication simple pour savoir où en est votre livraison.",
  },
  {
    Icon: BriefcaseIcon,
    title: "Service professionnel",
    description: "Une image premium adaptée aux particuliers, partenaires et entreprises.",
  },
];

const paymentMethods = ["Orange Money", "MTN Mobile Money", "Espèces à la livraison"];
const demoOtp = "248619";

const defaultForm: AccountForm = {
  firstName: "",
  lastName: "",
  birthDate: "",
  city: "",
  identifier: "",
  paymentMethod: "Orange Money",
};

const restaurantCategories: RestaurantCategory[] = [
  "Tous",
  "Fast-food",
  "Restaurants",
  "Chinois",
  "Camerounais",
  "Cafés",
  "Pizza",
];

const restaurants: Restaurant[] = [
  {
    name: "Gosto Resto-Café",
    category: "Fast-food",
    area: "Bonamousadi",
    address: "Rond Point Maetur, Station Ola",
    rating: 4.7,
    deliveryTime: "25-40 min",
    coordinates: { lat: 4.0908, lng: 9.7437 },
    tags: ["Burgers", "Shawarma", "Milk-shakes"],
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Burger américain viande", price: 3500 },
      { name: "Shawarma poulet", price: 2500 },
      { name: "Pizza familiale", price: 10000 },
      { name: "Milk-shake vanille", price: 2500 },
    ],
  },
  {
    name: "Restaurant Bantou",
    category: "Camerounais",
    area: "Makepe",
    address: "Makepe DHL",
    rating: 4.6,
    deliveryTime: "30-45 min",
    coordinates: { lat: 4.0835, lng: 9.7425 },
    tags: ["Terroir", "Grillades", "Fast-food"],
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Poulet braisé", price: 3500 },
      { name: "Ndolé plantain", price: 4500 },
      { name: "Poisson braisé", price: 6500 },
      { name: "Frites de plantain", price: 1500 },
    ],
  },
  {
    name: "Le Paradise",
    category: "Restaurants",
    area: "Bonapriso",
    address: "Rue Tokoto",
    rating: 4.4,
    deliveryTime: "30-50 min",
    coordinates: { lat: 4.0268, lng: 9.7047 },
    tags: ["Pizza", "Poisson", "Terrasse"],
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Pizza reine", price: 7000 },
      { name: "Crevettes grillées", price: 9000 },
      { name: "Filet de poisson", price: 8500 },
      { name: "Salade maison", price: 3500 },
    ],
  },
  {
    name: "Shania Café Resto",
    category: "Cafés",
    area: "Bonabéri",
    address: "Marché Tanko",
    rating: 4.5,
    deliveryTime: "35-55 min",
    coordinates: { lat: 4.0859, lng: 9.6684 },
    tags: ["Petit déjeuner", "Café", "Cuisine locale"],
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Omelette", price: 500 },
      { name: "Thé", price: 500 },
      { name: "Salade végétale", price: 2500 },
      { name: "Riz sauce tomate", price: 3000 },
    ],
  },
  {
    name: "GTF Resto",
    category: "Restaurants",
    area: "Borne 10",
    address: "Face Hôtel Porte Maillot",
    rating: 4.3,
    deliveryTime: "35-55 min",
    coordinates: { lat: 4.0612, lng: 9.7835 },
    tags: ["Cuisine variée", "Lunch", "Famille"],
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Riz sauté poulet", price: 3500 },
      { name: "Poulet DG", price: 5000 },
      { name: "Poisson sauce", price: 6000 },
      { name: "Jus naturel", price: 1500 },
    ],
  },
  {
    name: "Tom Burger",
    category: "Fast-food",
    area: "Douala",
    address: "Snack bar restaurant",
    rating: 4.2,
    deliveryTime: "25-40 min",
    coordinates: { lat: 4.0471, lng: 9.7064 },
    tags: ["Burgers", "Poulet", "Frites"],
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Burger classique", price: 3000 },
      { name: "Burger double", price: 4500 },
      { name: "Poulet frites", price: 4000 },
      { name: "Glace", price: 1500 },
    ],
  },
  {
    name: "Asian Bowl Douala",
    category: "Chinois",
    area: "Bonapriso",
    address: "Zone Akwa Palace - Bonapriso",
    rating: 4.5,
    deliveryTime: "30-45 min",
    coordinates: { lat: 4.0309, lng: 9.6999 },
    tags: ["Nouilles", "Riz cantonais", "Poulet"],
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Riz cantonais poulet", price: 4500 },
      { name: "Nouilles sautées bœuf", price: 5000 },
      { name: "Poulet aigre-doux", price: 5500 },
      { name: "Nems légumes", price: 2500 },
    ],
  },
  {
    name: "Pizza Loving Hut",
    category: "Pizza",
    area: "Douala",
    address: "Centre-ville",
    rating: 4.6,
    deliveryTime: "30-50 min",
    coordinates: { lat: 4.0511, lng: 9.7679 },
    tags: ["Pizza", "Vegan", "International"],
    imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Pizza végétarienne", price: 6500 },
      { name: "Pizza fromage", price: 6000 },
      { name: "Pizza champignons", price: 7000 },
      { name: "Jus frais", price: 1500 },
    ],
  },
  {
    name: "Tchop & Yamo Bonamoussadi",
    category: "Fast-food",
    area: "Bonamoussadi",
    address: "Bonamoussadi avant JC",
    rating: 4.4,
    deliveryTime: "20-35 min",
    coordinates: { lat: 4.0937, lng: 9.7429 },
    tags: ["Afro fast-food", "Beignets", "Jus naturel"],
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Beignets haricots bouillie", price: 1500 },
      { name: "Ndogmangolo soya poulet", price: 2000 },
      { name: "Salade Bitchakala", price: 2500 },
      { name: "Jus Yamo ananas", price: 1500 },
    ],
  },
  {
    name: "Les Cèdres Bonamoussadi",
    category: "Pizza",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    rating: 4.5,
    deliveryTime: "25-45 min",
    coordinates: { lat: 4.0897, lng: 9.7445 },
    tags: ["Pizza", "Smoothies", "Jus"],
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Pizza margherita", price: 5500 },
      { name: "Pizza poulet", price: 7000 },
      { name: "Smoothie fruits", price: 2500 },
      { name: "Jus de fruits", price: 1500 },
    ],
  },
  {
    name: "Le Glacier Moderne",
    category: "Cafés",
    area: "Bonamoussadi",
    address: "3PQP+373, Bonamoussadi",
    rating: 4.1,
    deliveryTime: "20-35 min",
    coordinates: { lat: 4.0884, lng: 9.7356 },
    tags: ["Glaces", "Jus", "Desserts"],
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Glace 2 boules", price: 2000 },
      { name: "Milk-shake", price: 2500 },
      { name: "Jus de carotte", price: 1500 },
      { name: "Gaufre chocolat", price: 3000 },
    ],
  },
  {
    name: "White House Restaurant",
    category: "Restaurants",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    rating: 4.3,
    deliveryTime: "30-50 min",
    coordinates: { lat: 4.0918, lng: 9.7466 },
    tags: ["Grillades", "Cuisine variée", "Afterwork"],
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Brochettes de bœuf", price: 3500 },
      { name: "Poulet braisé", price: 4500 },
      { name: "Riz sauté", price: 3000 },
      { name: "Poisson grillé", price: 7000 },
    ],
  },
  {
    name: "African Food by Emy",
    category: "Camerounais",
    area: "Bonamoussadi",
    address: "Bonamoussadi, Douala",
    rating: 4.6,
    deliveryTime: "30-50 min",
    coordinates: { lat: 4.0958, lng: 9.7421 },
    tags: ["Cuisine africaine", "Sauces", "Livraison"],
    imageUrl: "https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Eru water fufu", price: 4500 },
      { name: "Okok sucré", price: 3500 },
      { name: "Ndolé viande", price: 5000 },
      { name: "Koki plantain", price: 3000 },
    ],
  },
  {
    name: "Restaurant À La Porte Jaune",
    category: "Camerounais",
    area: "Bonamoussadi",
    address: "Bloc Sonel, face Yoro Joss",
    rating: 4.5,
    deliveryTime: "35-55 min",
    coordinates: { lat: 4.0891, lng: 9.7527 },
    tags: ["Traditionnel", "Salle banquet", "Grillades"],
    imageUrl: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Mbongo tchobi", price: 6000 },
      { name: "Achu yellow soup", price: 4500 },
      { name: "Sauce gombo", price: 3500 },
      { name: "Plantain mûr", price: 1500 },
    ],
  },
  {
    name: "Friends Food Bonamoussadi",
    category: "Fast-food",
    area: "Bonamoussadi",
    address: "Rue école publique",
    rating: 4.2,
    deliveryTime: "25-40 min",
    coordinates: { lat: 4.0922, lng: 9.7388 },
    tags: ["Portions généreuses", "Poulet", "Frites"],
    imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Poulet pané frites", price: 3500 },
      { name: "Burger maison", price: 3000 },
      { name: "Shawarma mixte", price: 2500 },
      { name: "Jus naturel", price: 1200 },
    ],
  },
  {
    name: "O'SAN",
    category: "Restaurants",
    area: "Bonamoussadi",
    address: "5.n137 Bonamoussadi",
    rating: 4.4,
    deliveryTime: "35-55 min",
    coordinates: { lat: 4.0949, lng: 9.7495 },
    tags: ["Wine bar", "Restaurant", "Premium"],
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    menu: [
      { name: "Assiette tapas", price: 6500 },
      { name: "Pâtes crème poulet", price: 7000 },
      { name: "Filet de bœuf", price: 12000 },
      { name: "Mocktail maison", price: 3000 },
    ],
  },
];

function LogoImage({
  size = "md",
  priority = false,
  surface = "light",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
  surface?: "light" | "dark";
}) {
  const sizes = {
    sm: "h-10 w-28",
    md: "h-12 w-36 sm:w-44",
    lg: "h-24 w-72 sm:h-28 sm:w-80",
    xl: "h-28 w-80 sm:h-36 sm:w-[28rem] lg:h-40 lg:w-[32rem]",
  };

  const scales = {
    sm: "scale-[1.85]",
    md: "scale-[1.75]",
    lg: "scale-[1.5]",
    xl: "scale-[1.42]",
  };

  return (
    <div
      className={`relative overflow-hidden ${sizes[size]} ${
        surface === "dark"
          ? "rounded-lg bg-white/95 shadow-2xl shadow-black/30 ring-1 ring-white/10"
          : ""
      }`}
    >
      <Image
        src={logoSrc}
        alt="Logo officiel GOO Delivery"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 512px, 320px"
        className={`object-contain mix-blend-multiply ${scales[size]}`}
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-4xl font-black tracking-tight sm:text-5xl ${
          inverted ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-lg leading-8 ${
            inverted ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PrimaryButton({
  children,
  href,
  dark = false,
}: {
  children: React.ReactNode;
  href: string;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-black transition hover:-translate-y-0.5 ${
        dark
          ? "bg-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)] hover:bg-zinc-900"
          : "bg-[#22c55e] text-black shadow-[0_18px_45px_rgba(34,197,94,0.26)] hover:bg-green-400"
      }`}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-7 py-4 text-base font-black text-black transition hover:border-[#22c55e] hover:text-[#22c55e]"
    >
      {children}
    </a>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-CM").format(price) + " FCFA";
}

function getDistanceKm(origin: ClientLocation, destination: Restaurant["coordinates"]) {
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

function RestaurantMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<RestaurantCategory>("Tous");
  const [clientLocation, setClientLocation] = useState<ClientLocation | null>(null);
  const [locationMessage, setLocationMessage] = useState(
    "Activez votre localisation pour voir les restaurants les plus proches.",
  );

  const filteredRestaurants = restaurants
    .filter((restaurant) => selectedCategory === "Tous" || restaurant.category === selectedCategory)
    .map((restaurant) => ({
      ...restaurant,
      distance: clientLocation ? getDistanceKm(clientLocation, restaurant.coordinates) : null,
    }))
    .sort((first, second) => {
      if (first.distance === null || second.distance === null) return 0;
      return first.distance - second.distance;
    });

  function detectClientLocation() {
    if (!("geolocation" in navigator)) {
      setLocationMessage("La localisation n’est pas disponible sur ce navigateur.");
      return;
    }

    setLocationMessage("Recherche de votre position...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setClientLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationMessage("Distance estimée depuis votre position actuelle.");
      },
      () => {
        setLocationMessage("Localisation refusée. Les quartiers restent visibles.");
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-2xl shadow-zinc-200">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
            Restaurants à Douala
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Menus disponibles maintenant.
          </h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-zinc-600">
            Explorez les restaurants, fast-foods, cafés et cuisines chinoises. Les distances
            s’ajustent si vous autorisez la localisation.
          </p>
        </div>

        <button
          type="button"
          onClick={detectClientLocation}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[#22c55e] hover:text-black"
        >
          <PinIcon className="h-4 w-4" />
          Utiliser ma position
        </button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {restaurantCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
              selectedCategory === category
                ? "bg-[#22c55e] text-black"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mt-2 text-xs font-semibold text-zinc-500">{locationMessage}</p>

      <div className="mt-6 grid max-h-[660px] gap-4 overflow-y-auto pr-1">
        {filteredRestaurants.map((restaurant) => (
          <article
            key={restaurant.name}
            className="rounded-lg border border-zinc-200 p-4 transition hover:border-[#22c55e] hover:shadow-lg"
          >
            <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-zinc-100">
              <div
                aria-label={`Photo de ${restaurant.name}`}
                className="absolute inset-0 bg-cover bg-center transition duration-500 hover:scale-105"
                style={{ backgroundImage: `url(${restaurant.imageUrl})` }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm font-black text-white">{restaurant.tags[0]}</p>
                <p className="mt-1 text-xs font-semibold text-white/75">Photo illustrative du menu</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-black">{restaurant.name}</h3>
                  <span className="rounded-full bg-[#22c55e]/15 px-3 py-1 text-xs font-black text-[#15803d]">
                    {restaurant.category}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-zinc-600">
                  {restaurant.area} • {restaurant.address}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurant.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-black px-4 py-3 text-white sm:text-right">
                <p className="text-sm font-black text-[#22c55e]">★ {restaurant.rating}</p>
                <p className="mt-1 text-sm font-bold">{restaurant.deliveryTime}</p>
                <p className="mt-1 text-sm font-bold">
                  {restaurant.distance === null ? restaurant.area : `${restaurant.distance.toFixed(1)} km`}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {restaurant.menu.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg bg-zinc-50 px-4 py-3">
                  <p className="text-sm font-black">{item.name}</p>
                  <p className="shrink-0 text-sm font-black text-[#16a34a]">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>

            <a
              href={`${whatsappUrl}%20Restaurant%20:%20${encodeURIComponent(restaurant.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#22c55e] px-5 py-3 text-sm font-black text-black transition hover:bg-green-400"
            >
              Commander chez {restaurant.name}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

function AccountAccess({ compact = false }: { compact?: boolean }) {
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [authMethod, setAuthMethod] = useState<AuthMethod>("phone");
  const [authStep, setAuthStep] = useState<AuthStep>("details");
  const [form, setForm] = useState<AccountForm>(defaultForm);
  const [otp, setOtp] = useState("");
  const [locationStatus, setLocationStatus] = useState(
    "Ville détectée automatiquement si vous l’autorisez.",
  );
  const [formMessage, setFormMessage] = useState("");

  const isSignup = authMode === "signup";
  const identifierLabel = authMethod === "phone" ? "Numéro de téléphone" : "Adresse email";
  const identifierPlaceholder = authMethod === "phone" ? "+237 6XX XXX XXX" : "exemple@email.com";

  function updateField(field: keyof AccountForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function switchMode(mode: AuthMode) {
    setAuthMode(mode);
    setAuthStep("details");
    setOtp("");
    setFormMessage("");
  }

  function switchMethod(method: AuthMethod) {
    setAuthMethod(method);
    setOtp("");
    setFormMessage("");
  }

  async function detectLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("La géolocalisation n’est pas disponible sur ce navigateur.");
      return;
    }

    setLocationStatus("Détection de votre position en cours...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );
          const data = (await response.json()) as {
            address?: {
              city?: string;
              town?: string;
              village?: string;
              state?: string;
              country?: string;
            };
          };
          const city =
            data.address?.city ??
            data.address?.town ??
            data.address?.village ??
            data.address?.state ??
            "Position détectée";
          const country = data.address?.country ? `, ${data.address.country}` : "";

          updateField("city", `${city}${country}`);
          setLocationStatus("Ville détectée. Vous pouvez la modifier si besoin.");
        } catch {
          updateField("city", `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocationStatus("Position détectée, mais la ville n’a pas pu être convertie automatiquement.");
        }
      },
      () => {
        setLocationStatus("Autorisez la localisation ou renseignez votre ville manuellement.");
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  }

  function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage("");

    if (!form.identifier.trim()) {
      setFormMessage(`Entrez votre ${identifierLabel.toLowerCase()} pour continuer.`);
      return;
    }

    if (authMethod === "phone" && !/^((\+237|237)?\s?6|6)\d[\d\s]{7,}$/.test(form.identifier.trim())) {
      setFormMessage("Entrez un numéro de téléphone valide, par exemple +237 695 502 710.");
      return;
    }

    if (isSignup && (!form.firstName || !form.lastName || !form.birthDate || !form.city)) {
      setFormMessage("Complétez votre nom, prénom, date de naissance et ville avant la vérification.");
      return;
    }

    setAuthStep("verify");
    setFormMessage(
      authMethod === "phone"
        ? `Code envoyé au ${form.identifier}. Code démo : ${demoOtp}`
        : `Code envoyé à ${form.identifier}. Code démo : ${demoOtp}`,
    );
  }

  function verifyAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.trim() !== demoOtp) {
      setFormMessage(`Code incorrect pour la démo. Utilisez ${demoOtp}.`);
      return;
    }

    setAuthStep("success");
    setFormMessage(
      isSignup
        ? "Compte GOO Delivery créé. Vous pouvez maintenant commander plus rapidement."
        : "Connexion réussie. Vous pouvez continuer votre commande.",
    );
  }

  return (
    <div className={`rounded-lg border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-200 ${compact ? "w-full" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#22c55e]">
            Compte client
          </p>
          <h3 className="mt-2 text-2xl font-black">{isSignup ? "Créer un compte" : "Se connecter"}</h3>
        </div>
        <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">Client</span>
      </div>

      <div className="mt-5 grid grid-cols-2 rounded-full bg-zinc-100 p-1 text-sm font-black">
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`rounded-full px-4 py-2 transition ${isSignup ? "bg-black text-white" : "text-zinc-600"}`}
        >
          Inscription
        </button>
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={`rounded-full px-4 py-2 transition ${!isSignup ? "bg-black text-white" : "text-zinc-600"}`}
        >
          Connexion
        </button>
      </div>

      {authStep === "details" ? (
        <form onSubmit={submitDetails} className="mt-5 grid gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg border border-zinc-200 p-1 text-sm font-black">
            <button
              type="button"
              onClick={() => switchMethod("phone")}
              className={`rounded-md px-3 py-2 transition ${authMethod === "phone" ? "bg-[#22c55e] text-black" : "text-zinc-600"}`}
            >
              Téléphone
            </button>
            <button
              type="button"
              onClick={() => switchMethod("email")}
              className={`rounded-md px-3 py-2 transition ${authMethod === "email" ? "bg-[#22c55e] text-black" : "text-zinc-600"}`}
            >
              Email
            </button>
          </div>

          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            {identifierLabel}
            <input
              value={form.identifier}
              onChange={(event) => updateField("identifier", event.target.value)}
              type={authMethod === "email" ? "email" : "tel"}
              placeholder={identifierPlaceholder}
              className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
            />
          </label>

          {isSignup ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-zinc-700">
                  Prénom
                  <input
                    value={form.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                    className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
                    placeholder="Votre prénom"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-zinc-700">
                  Nom
                  <input
                    value={form.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                    className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
                    placeholder="Votre nom"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-zinc-700">
                Date de naissance
                <input
                  value={form.birthDate}
                  onChange={(event) => updateField("birthDate", event.target.value)}
                  type="date"
                  className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
                />
              </label>

              <div className="grid gap-2">
                <label className="grid gap-2 text-sm font-bold text-zinc-700">
                  Ville / localisation
                  <input
                    value={form.city}
                    onChange={(event) => updateField("city", event.target.value)}
                    className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
                    placeholder="Douala, Yaoundé, Bafoussam..."
                  />
                </label>
                <button
                  type="button"
                  onClick={detectLocation}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-sm font-black transition hover:border-[#22c55e] hover:text-[#22c55e]"
                >
                  <PinIcon className="h-4 w-4" />
                  Détecter ma ville automatiquement
                </button>
                <p className="text-xs font-medium text-zinc-500">{locationStatus}</p>
              </div>

              <label className="grid gap-2 text-sm font-bold text-zinc-700">
                Moyen de paiement préféré
                <select
                  value={form.paymentMethod}
                  onChange={(event) => updateField("paymentMethod", event.target.value)}
                  className="rounded-lg border border-zinc-200 px-4 py-3 outline-none transition focus:border-[#22c55e]"
                >
                  {paymentMethods.map((method) => (
                    <option key={method}>{method}</option>
                  ))}
                </select>
              </label>
            </>
          ) : null}

          {formMessage ? <p className="rounded-lg bg-zinc-100 p-3 text-sm font-semibold text-zinc-700">{formMessage}</p> : null}

          <button
            type="submit"
            className="rounded-full bg-[#22c55e] px-6 py-4 font-black text-black transition hover:-translate-y-0.5 hover:bg-green-400"
          >
            {isSignup ? "S’inscrire" : "Se connecter"}
          </button>
        </form>
      ) : null}

      {authStep === "verify" ? (
        <form onSubmit={verifyAccount} className="mt-5 grid gap-4">
          <div className="rounded-lg bg-black p-4 text-white">
            <p className="text-sm font-black text-[#22c55e]">Vérification</p>
            <p className="mt-2 text-sm text-zinc-300">
              Entrez le code à 6 chiffres reçu par {authMethod === "phone" ? "SMS" : "email"}. Démo : {demoOtp}
            </p>
          </div>
          <input
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            className="rounded-lg border border-zinc-200 px-4 py-4 text-center text-2xl font-black tracking-[0.35em] outline-none transition focus:border-[#22c55e]"
          />
          {formMessage ? <p className="rounded-lg bg-zinc-100 p-3 text-sm font-semibold text-zinc-700">{formMessage}</p> : null}
          <button
            type="submit"
            className="rounded-full bg-black px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-zinc-900"
          >
            Vérifier et continuer
          </button>
          <button
            type="button"
            onClick={() => setAuthStep("details")}
            className="text-sm font-black text-zinc-500 transition hover:text-[#22c55e]"
          >
            Modifier mes informations
          </button>
        </form>
      ) : null}

      {authStep === "success" ? (
        <div className="mt-5 rounded-lg bg-[#22c55e] p-5 text-black">
          <CheckIcon className="h-8 w-8" />
          <h4 className="mt-4 text-2xl font-black">Accès sécurisé</h4>
          <p className="mt-2 font-semibold">{formMessage}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-full bg-black px-5 py-3 text-sm font-black text-white"
          >
            Commander maintenant
          </a>
        </div>
      ) : null}
    </div>
  );
}

function CampaignPanel() {
  return (
    <section id="campagne" className="bg-black px-5 py-20 text-white sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <LogoImage size="lg" priority surface="dark" />
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
            Campagne GOO Delivery
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Une présence premium pour une livraison plus crédible.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Le site reprend l&apos;énergie des affiches GOO Delivery : vitesse, confiance,
            service professionnel et codes visuels noir, blanc et vert lime.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white p-6 text-black shadow-2xl shadow-black/40">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#22c55e]" />
          <div className="relative grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-center">
            <div>
              <LogoImage size="lg" />
              <h3 className="mt-8 text-4xl font-black leading-tight">
                Plus rapide.
                <span className="block text-[#22c55e]">Plus simple.</span>
                Toujours là.
              </h3>
            </div>
            <div className="relative min-h-72">
              <div className="absolute bottom-0 right-0 h-72 w-72">
                <RiderIllustration />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RiderIllustration() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 320 430" fill="none">
      <path d="M145 78c30-17 74-8 96 20 28 36 32 97 10 135-20 34-60 44-96 30-32-13-57-44-63-81-7-42 17-84 53-104Z" fill="#111" />
      <path d="M111 142c24-44 74-62 119-44 25 10 44 31 57 61 10 25 13 52 11 82l-60 4c-1-49-19-83-54-102-23-12-48-11-73-1Z" fill="#22c55e" />
      <path d="M176 52c22-4 41 7 45 25 4 19-11 36-34 40-22 4-42-7-45-25-4-18 11-36 34-40Z" fill="#050505" />
      <path d="M63 267c23-32 71-45 119-35 47 9 88 39 103 75H63v-40Z" fill="#0a0a0a" />
      <path d="M72 291h196c20 0 37 16 37 37v11H42v-18c0-17 13-30 30-30Z" fill="#111827" />
      <path d="M78 364a44 44 0 1 0 0-88 44 44 0 0 0 0 88Z" fill="#050505" />
      <path d="M78 343a23 23 0 1 0 0-46 23 23 0 0 0 0 46Z" fill="#f8fafc" />
      <path d="M256 364a44 44 0 1 0 0-88 44 44 0 0 0 0 88Z" fill="#050505" />
      <path d="M256 343a23 23 0 1 0 0-46 23 23 0 0 0 0 46Z" fill="#f8fafc" />
      <path d="M117 252h105c12 0 23 8 27 19l8 20H83l15-25c4-9 11-14 19-14Z" fill="#1f2937" />
      <path d="M210 194h69c8 0 15 7 15 15v50h-99v-50c0-8 7-15 15-15Z" fill="#111" />
      <path d="M210 208h68" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
      <path d="M135 138c-9 31-3 61 18 88" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
      <path d="M188 153c3 32-6 62-27 91" stroke="#050505" strokeWidth="19" strokeLinecap="round" />
      <path d="M171 247c20 8 38 20 54 36" stroke="#050505" strokeWidth="18" strokeLinecap="round" />
      <path d="M122 254c-13 21-23 44-30 70" stroke="#050505" strokeWidth="18" strokeLinecap="round" />
      <text x="212" y="242" fill="white" fontSize="28" fontWeight="900">
        GOO
      </text>
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

function FoodIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 11a6 6 0 0 1 12 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15h14l-1 4H6l-1-4Z" />
    </svg>
  );
}

function CartIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h2l2.5 10h9L20 8H8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h.01M18 20h.01" />
    </svg>
  );
}

function BoxIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7.5 8 4.5 8-4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v9" />
    </svg>
  );
}

function DocumentIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l3 3v15H7V3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4h4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M9 16h6" />
    </svg>
  );
}

function PharmacyIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4Z" />
    </svg>
  );
}

function BuildingIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V5l7-3 7 3v16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h6" />
    </svg>
  );
}

function BikeIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h4l2-5h-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14 9 2 5h3" />
    </svg>
  );
}

function CarIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 17v-5l2-5h8l2 5v5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
    </svg>
  );
}

function VanIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18V8a3 3 0 0 0-3-3H3v12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8h3l3 4v5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

function SpeedIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13a8 8 0 0 1 15.5-2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 13 5-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14" />
    </svg>
  );
}

function ShieldIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v6c0 4.4 2.8 7.4 7 9 4.2-1.6 7-4.6 7-9V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-5" />
    </svg>
  );
}

function LockIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 0 1 10 0v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10h12v10H6V10Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a8 8 0 0 0-6.8 12.2L4 20l3.9-1A8 8 0 1 0 12 4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9c.5 3 2.5 5 6 6" />
    </svg>
  );
}

function PinIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5h.01" />
    </svg>
  );
}

function BriefcaseIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5h6v2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16v12H4V7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
    </svg>
  );
}

export default function Home() {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <main id="accueil" className="min-h-screen bg-white text-black">
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#accueil" className="flex items-center gap-3" aria-label="GOO Delivery">
            <LogoImage size="sm" priority />
            <span className="hidden text-lg font-black tracking-tight sm:inline">
              GOO <span className="text-[#22c55e]">Delivery</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-zinc-700 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} className="transition hover:text-[#22c55e]" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-black transition hover:border-[#22c55e] hover:text-[#22c55e]"
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              className="rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[#22c55e] hover:text-black"
            >
              Créer un compte
            </button>
          </div>

          <button
            type="button"
            onClick={() => setAccountOpen(true)}
            className="rounded-full bg-black px-4 py-3 text-sm font-black text-white transition hover:bg-[#22c55e] hover:text-black md:hidden"
          >
            Compte
          </button>
        </div>
      </nav>

      {accountOpen ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 px-4 py-8 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setAccountOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black px-4 py-2 text-sm font-black text-white transition hover:bg-[#22c55e] hover:text-black"
            >
              Fermer
            </button>
            <AccountAccess compact />
          </div>
        </div>
      ) : null}

      <section className="overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f4f5_45%,#0a0a0a_45%,#0a0a0a_100%)] px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <LogoImage size="lg" priority />
            <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Plus rapide. Plus simple. Toujours là.
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Restaurants de Douala livrés rapidement.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Choisissez un restaurant, consultez les menus en FCFA, estimez la distance
              depuis votre position et commandez avec GOO Delivery.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href={whatsappUrl}>Commander sur WhatsApp</PrimaryButton>
              <SecondaryButton href="#restaurants">Voir les restaurants</SecondaryButton>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l border-zinc-300 pl-4">
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="restaurants" className="grid gap-5">
            <RestaurantMarketplace />
          </div>
        </div>
      </section>
      <section id="services" className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Services"
            title="Toutes vos livraisons, dans une seule expérience."
            description="GOO Delivery couvre les besoins du quotidien et les opérations professionnelles avec un service clair, rapide et premium."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.Icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-lg border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#22c55e] hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-black text-[#22c55e] transition group-hover:bg-[#22c55e] group-hover:text-black">
                    <Icon />
                  </div>
                  <h3 className="mt-7 text-2xl font-black">{service.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="fonctionnement" className="bg-black px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Comment ça marche"
            title="Trois étapes simples, une livraison maîtrisée."
            description="Le parcours reste direct pour le client et professionnel côté opération."
            inverted
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#22c55e] text-xl font-black text-black">
                  {index + 1}
                </span>
                <h3 className="mt-7 text-2xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-zinc-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Moyens de livraison"
            title="Le bon véhicule pour la bonne mission."
            description="Motos, voitures et vans permettent à GOO Delivery de répondre aux livraisons rapides comme aux besoins volumineux."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {deliveryModes.map((mode) => {
              const Icon = mode.Icon;

              return (
                <article key={mode.title} className="rounded-lg bg-zinc-950 p-7 text-white shadow-xl shadow-zinc-200 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#22c55e] text-black">
                      <Icon />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#22c55e]">
                      {mode.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-8 text-3xl font-black">{mode.title}</h3>
                  <p className="mt-4 leading-7 text-zinc-300">{mode.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CampaignPanel />

      <section id="partenaires" className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Partenaires
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Donnez plus de vitesse à votre activité.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              Restaurants, boutiques, pharmacies, supermarchés et entreprises peuvent
              s&apos;appuyer sur GOO Delivery pour livrer plus vite et mieux servir leurs clients.
            </p>
            <div className="mt-9">
              <PrimaryButton href={whatsappUrl}>Devenir partenaire</PrimaryButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {partners.map((partner) => (
              <div key={partner} className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#22c55e] hover:shadow-lg">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#22c55e] text-black">
                  <CheckIcon />
                </span>
                <p className="text-xl font-black">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Avantages"
            title="Une expérience pensée pour la confiance."
            description="GOO Delivery combine rapidité, suivi, communication et standards professionnels."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage) => {
              const Icon = advantage.Icon;

              return (
                <article key={advantage.title} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-black text-[#22c55e]">
                    <Icon />
                  </div>
                  <h3 className="mt-6 text-2xl font-black">{advantage.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{advantage.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-[linear-gradient(135deg,#22c55e_0%,#22c55e_48%,#050505_48%,#050505_100%)] p-8 text-black sm:p-12 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <LogoImage size="lg" />
              <h2 className="mt-8 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Prêt à commander ?
              </h2>
              <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-black/75">
                Lancez votre course maintenant et recevez une réponse rapide sur WhatsApp.
              </p>
            </div>
            <div className="lg:text-right">
              <PrimaryButton href={whatsappUrl} dark>
                Commander sur WhatsApp
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Contact
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Une demande, une réponse, une livraison.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Contactez GOO Delivery pour une course immédiate, un besoin régulier ou
              une collaboration professionnelle.
            </p>
          </div>

          <div className="grid gap-4">
            <a className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#22c55e]" href="tel:+237695502710">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#22c55e]">WhatsApp</p>
              <p className="mt-3 text-2xl font-black">{whatsappNumber}</p>
            </a>
            <a className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#22c55e]" href={`mailto:${email}`}>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#22c55e]">Email</p>
              <p className="mt-3 text-2xl font-black">{email}</p>
            </a>
            <PrimaryButton href={whatsappUrl}>Lien direct WhatsApp</PrimaryButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <LogoImage size="sm" />
            <div>
              <p className="font-black text-black">GOO Delivery</p>
              <p>© 2026 GOO Delivery. Tous droits réservés.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            {navLinks.map((link) => (
              <a key={link.href} className="transition hover:text-[#22c55e]" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
