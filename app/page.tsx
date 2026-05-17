import Image from "next/image";

const logoSrc = "/logo.png";
const whatsappNumber = "+237 695 502 710";
const whatsappUrl =
  "https://wa.me/237695502710?text=Bonjour%20GOO%20Delivery%2C%20je%20souhaite%20faire%20une%20commande.";
const email = "goodeleveries237@gmail.com";

type IconProps = {
  className?: string;
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
  { value: "7j/7", label: "support WhatsApp" },
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

function DeliveryDashboard() {
  return (
    <div className="relative">
      <div className="absolute inset-x-8 top-6 h-32 bg-[#22c55e]/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-950 p-4 shadow-2xl shadow-black/50">
        <div className="rounded-lg bg-white p-4 text-black">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LogoImage size="sm" priority />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  GOO Delivery
                </p>
                <p className="text-lg font-black">Course active</p>
              </div>
            </div>
            <span className="rounded-full bg-[#22c55e] px-3 py-1 text-xs font-black">
              Live
            </span>
          </div>

          <div className="relative mt-5 min-h-[320px] overflow-hidden rounded-lg bg-zinc-100">
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(#d4d4d8_1px,transparent_1px),linear-gradient(90deg,#d4d4d8_1px,transparent_1px)] [background-size:38px_38px]" />
            <div className="absolute left-8 top-8 h-5 w-5 rounded-full border-4 border-white bg-[#22c55e] shadow-lg" />
            <div className="absolute bottom-12 right-9 h-5 w-5 rounded-full border-4 border-white bg-black shadow-lg" />
            <div className="absolute left-10 top-11 h-56 w-64 rounded-br-[5rem] border-b-4 border-r-4 border-dashed border-[#22c55e]" />
            <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-black text-[#22c55e] shadow-2xl">
              <BikeIcon className="h-10 w-10" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black p-4 text-white shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black">Livreur en approche</p>
                  <p className="mt-1 text-xs text-zinc-400">Repas + documents • Douala</p>
                </div>
                <span className="rounded-full bg-[#22c55e] px-3 py-2 text-sm font-black text-black">
                  12 min
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {deliveryModes.map((mode) => {
              const Icon = mode.Icon;

              return (
                <div key={mode.title} className="rounded-lg border border-zinc-200 p-4">
                  <Icon className="h-7 w-7 text-[#22c55e]" />
                  <p className="mt-3 text-sm font-black">{mode.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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

          <PrimaryButton href={whatsappUrl} dark>
            Commander
          </PrimaryButton>
        </div>
      </nav>

      <section className="overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#f4f4f5_45%,#0a0a0a_45%,#0a0a0a_100%)] px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <LogoImage size="lg" priority />
            <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Plus rapide. Plus simple. Toujours là.
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              La livraison moderne pour le Cameroun.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              GOO Delivery connecte clients, livreurs, restaurants, boutiques et
              entreprises avec un service rapide, fiable et professionnel.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href={whatsappUrl}>Commander sur WhatsApp</PrimaryButton>
              <SecondaryButton href="#services">Voir les services</SecondaryButton>
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

          <DeliveryDashboard />
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
