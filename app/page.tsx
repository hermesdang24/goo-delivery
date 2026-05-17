const whatsappUrl =
  "https://wa.me/237695502710?text=Bonjour%20GOO%20Delivery%2C%20je%20souhaite%20faire%20une%20commande.";

type IconProps = {
  className?: string;
};

const brandGreen = "#22c55e";

const features = [
  {
    Icon: ClockIcon,
    title: "Livraison rapide",
    description: "Une prise en charge simple, claire et efficace.",
  },
  {
    Icon: ShieldIcon,
    title: "Service fiable",
    description: "Vos commandes sont traitées avec sérieux.",
  },
  {
    Icon: PinIcon,
    title: "Suivi en temps réel",
    description: "Un contact direct pendant la course.",
  },
  {
    Icon: BoxIcon,
    title: "Vos colis en sécurité",
    description: "Repas, colis, courses et documents protégés.",
  },
];

const services = [
  {
    Icon: BikeIcon,
    title: "Motos express",
    description: "Pour les repas, documents et petites courses urgentes.",
  },
  {
    Icon: CarIcon,
    title: "Voitures",
    description: "Pour les colis sensibles et les commandes plus importantes.",
  },
  {
    Icon: StoreIcon,
    title: "Restaurants & boutiques",
    description: "Pour vendre, préparer et expédier plus facilement.",
  },
  {
    Icon: BoxIcon,
    title: "Business",
    description: "Pour les entreprises qui ont besoin de livraisons régulières.",
  },
];

const steps = [
  "Envoyez votre demande sur WhatsApp",
  "GOO confirme le tarif et le livreur",
  "Votre livraison arrive à destination",
];

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
function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex items-center gap-2" : "w-full max-w-xl"}>
      <div className={compact ? "flex items-center gap-2" : "flex items-end gap-2"}>
        <SpeedMark className={compact ? "h-8 w-12" : "h-16 w-24 sm:h-20 sm:w-32"} />
        <div className={compact ? "text-3xl font-black leading-none" : "text-7xl font-black leading-none tracking-tight sm:text-8xl lg:text-9xl"}>
          <span className="text-black">G</span>
          <span className="relative inline-block text-[#22c55e]">
            O
            <span className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
              <ScooterIcon className={compact ? "h-5 w-8" : "h-12 w-20"} />
            </span>
          </span>
          <span className="text-[#22c55e]">O</span>
        </div>
      </div>

      {!compact && (
        <>
          <div className="mt-4 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#22c55e]" />
            <p className="text-3xl font-black italic tracking-[0.45em] text-black sm:text-4xl">
              DELIVERY
            </p>
            <span className="h-px flex-1 bg-[#22c55e]" />
          </div>
          <p className="mt-3 text-center text-sm font-black uppercase tracking-[0.32em] text-black sm:text-base">
            Plus rapide. Plus simple. <span className="text-[#22c55e]">Toujours là.</span>
          </p>
        </>
      )}
    </div>
  );
}

function PosterPreview() {
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-zinc-200">
      <div className="px-8 pt-8">
        <BrandLogo />
      </div>

      <div className="relative mt-8 min-h-[560px] overflow-hidden px-8 pb-8">
        <CityBackdrop />
        <GreenMotionRoad />

        <div className="relative z-10 max-w-[13rem]">
          <h2 className="text-5xl font-black leading-[0.95] tracking-tight">
            Livraison
            <span className="block text-[#22c55e]">rapide,</span>
            en toute
            <span className="block text-[#22c55e]">confiance.</span>
          </h2>
          <span className="mt-6 block h-1 w-16 bg-[#22c55e]" />
          <p className="mt-6 text-base leading-7 text-zinc-700">
            GOO Delivery, votre solution de livraison fiable et efficace, à portée de main.
          </p>
        </div>

        <div className="absolute bottom-16 right-3 z-20 h-[390px] w-[260px]">
          <RiderIllustration />
        </div>

        <div className="relative z-30 mt-12 grid max-w-[13rem] gap-3">
          {features.map((feature) => {
            const Icon = feature.Icon;

            return (
              <div key={feature.title} className="flex items-center gap-3 border-b border-[#22c55e]/40 pb-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#22c55e] text-[#22c55e]">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-sm font-black leading-5">
                  {feature.title.split(" ").slice(0, -1).join(" ")}
                  <span className="block text-[#22c55e]">{feature.title.split(" ").slice(-1)}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative bg-[#22c55e] px-6 py-5 text-black">
        <div className="grid gap-4 text-sm font-bold sm:grid-cols-3">
          <p>WhatsApp<br /><span className="text-lg font-black">+237 695 502 710</span></p>
          <p>Email<br /><span className="text-xs">goodeleveries237@gmail.com</span></p>
          <p>Web<br /><span className="text-sm">www.goo-delivery.cm</span></p>
        </div>
      </div>
    </div>
  );
}

function WideCampaign() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl shadow-zinc-200">
      <CityBackdrop wide />
      <div className="relative z-10 grid min-h-[470px] gap-8 px-7 py-8 sm:px-10 lg:grid-cols-[0.8fr_1fr_0.9fr] lg:items-center">
        <div>
          <BrandLogo />
        </div>

        <div>
          <h2 className="max-w-2xl text-5xl font-black leading-tight tracking-tight lg:text-6xl">
            Livraison rapide,
            <span className="block text-[#22c55e]">en toute confiance.</span>
          </h2>
          <span className="mt-6 block h-1 w-20 bg-[#22c55e]" />
          <p className="mt-6 max-w-lg text-xl leading-8 text-zinc-700">
            GOO Delivery, votre solution de livraison fiable et efficace, à portée de main.
          </p>
        </div>

        <div className="relative min-h-[320px]">
          <GreenMotionRoad />
          <div className="absolute bottom-0 right-0 h-[340px] w-[290px]">
            <RiderIllustration />
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-[#22c55e] px-7 py-5 text-white sm:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.Icon;

            return (
              <div key={feature.title} className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#22c55e]">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="text-lg font-black leading-6">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CityBackdrop({ wide = false }: { wide?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-0 z-0 w-full text-[#22c55e] opacity-15 ${wide ? "h-full" : "h-[440px]"}`}
      viewBox="0 0 900 520"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <rect x="80" y="260" width="58" height="250" />
      <rect x="170" y="190" width="72" height="320" />
      <rect x="280" y="250" width="64" height="260" />
      <rect x="410" y="150" width="82" height="360" />
      <rect x="540" y="230" width="70" height="280" />
      <rect x="675" y="110" width="90" height="400" />
      <rect x="790" y="280" width="58" height="230" />
      <path d="M206 190 206 142 242 190Z" />
      <path d="M446 150 446 84 492 150Z" />
      <path d="M720 110 720 58 765 110Z" />
    </svg>
  );
}

function GreenMotionRoad() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 h-[52%] overflow-hidden">
      <div className="absolute -right-20 bottom-0 h-full w-[78%] skew-x-[-18deg] bg-[#22c55e]" />
      <div className="absolute -right-10 bottom-16 h-3 w-[78%] skew-x-[-18deg] bg-white/60" />
      <div className="absolute -right-14 bottom-28 h-2 w-[68%] skew-x-[-18deg] bg-white/35" />
      <div className="absolute -right-10 bottom-40 h-1.5 w-[58%] skew-x-[-18deg] bg-white/25" />
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

function RiderIllustration() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 320 430" fill="none">
      <path d="M145 78c30-17 74-8 96 20 28 36 32 97 10 135-20 34-60 44-96 30-32-13-57-44-63-81-7-42 17-84 53-104Z" fill="#111" />
      <path d="M111 142c24-44 74-62 119-44 25 10 44 31 57 61 10 25 13 52 11 82l-60 4c-1-49-19-83-54-102-23-12-48-11-73-1Z" fill={brandGreen} />
      <path d="M176 52c22-4 41 7 45 25 4 19-11 36-34 40-22 4-42-7-45-25-4-18 11-36 34-40Z" fill="#050505" />
      <path d="M164 62c14-11 35-10 49 2 6 5 9 12 10 20-25-6-50-5-75 4 1-10 6-19 16-26Z" fill="#1f2937" />
      <path d="M63 267c23-32 71-45 119-35 47 9 88 39 103 75H63v-40Z" fill="#0a0a0a" />
      <path d="M72 291h196c20 0 37 16 37 37v11H42v-18c0-17 13-30 30-30Z" fill="#111827" />
      <path d="M78 364a44 44 0 1 0 0-88 44 44 0 0 0 0 88Z" fill="#050505" />
      <path d="M78 343a23 23 0 1 0 0-46 23 23 0 0 0 0 46Z" fill="#f8fafc" />
      <path d="M78 331a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z" fill="#111" />
      <path d="M256 364a44 44 0 1 0 0-88 44 44 0 0 0 0 88Z" fill="#050505" />
      <path d="M256 343a23 23 0 1 0 0-46 23 23 0 0 0 0 46Z" fill="#f8fafc" />
      <path d="M256 331a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z" fill="#111" />
      <path d="M117 252h105c12 0 23 8 27 19l8 20H83l15-25c4-9 11-14 19-14Z" fill="#1f2937" />
      <path d="M29 271h57c7 0 13 6 13 13v7H17v-8c0-7 5-12 12-12Z" fill="#111" />
      <path d="M210 194h69c8 0 15 7 15 15v50h-99v-50c0-8 7-15 15-15Z" fill="#111" />
      <path d="M210 208h68" stroke={brandGreen} strokeWidth="6" strokeLinecap="round" />
      <path d="M218 226h52" stroke="white" strokeOpacity=".8" strokeWidth="4" strokeLinecap="round" />
      <path d="M135 138c-9 31-3 61 18 88" stroke="#050505" strokeWidth="20" strokeLinecap="round" />
      <path d="M188 153c3 32-6 62-27 91" stroke="#050505" strokeWidth="19" strokeLinecap="round" />
      <path d="M171 247c20 8 38 20 54 36" stroke="#050505" strokeWidth="18" strokeLinecap="round" />
      <path d="M122 254c-13 21-23 44-30 70" stroke="#050505" strokeWidth="18" strokeLinecap="round" />
      <path d="M66 200h83" stroke="#111" strokeWidth="14" strokeLinecap="round" />
      <path d="M42 188h54" stroke={brandGreen} strokeWidth="6" strokeLinecap="round" />
      <path d="M32 206h54" stroke={brandGreen} strokeWidth="6" strokeLinecap="round" />
      <path d="M24 224h54" stroke={brandGreen} strokeWidth="6" strokeLinecap="round" />
      <text x="212" y="242" fill="white" fontSize="28" fontWeight="900">
        GOO
      </text>
      <text x="226" y="259" fill={brandGreen} fontSize="9" fontWeight="900" letterSpacing="3">
        DELIVERY
      </text>
    </svg>
  );
}

function SpeedMark({ className = "h-10 w-16" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 130 85" fill="none">
      <path d="M42 10h78" stroke={brandGreen} strokeWidth="13" strokeLinecap="round" />
      <path d="M26 30h94" stroke={brandGreen} strokeWidth="13" strokeLinecap="round" />
      <path d="M10 50h90" stroke={brandGreen} strokeWidth="13" strokeLinecap="round" />
      <path d="M30 70h70" stroke={brandGreen} strokeWidth="13" strokeLinecap="round" />
      <circle cx="12" cy="10" r="8" fill={brandGreen} />
      <circle cx="22" cy="70" r="8" fill={brandGreen} />
    </svg>
  );
}

function ScooterIcon({ className = "h-10 w-16" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 130 76" fill="none">
      <path d="M46 28h38c12 0 23 9 25 21H61c-4-12-13-19-28-21l8-20h25" fill="#080808" />
      <path d="M39 65a16 16 0 1 0 0-32 16 16 0 0 0 0 32Z" fill="#080808" />
      <path d="M39 55a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="white" />
      <path d="M101 65a16 16 0 1 0 0-32 16 16 0 0 0 0 32Z" fill="#080808" />
      <path d="M101 55a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" fill="white" />
      <path d="M59 3a11 11 0 1 1-1 22 11 11 0 0 1 1-22Z" fill="#080808" />
      <path d="M58 23c-11 3-16 14-20 28" stroke="#080808" strokeWidth="10" strokeLinecap="round" />
      <path d="M68 29h30" stroke="#080808" strokeWidth="8" strokeLinecap="round" />
      <path d="M6 31h20M1 43h24" stroke={brandGreen} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v5l3 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-3.2-6.9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 4v5h-5" />
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

function PinIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5h.01" />
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
function BikeIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h4l2-5h-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14 9 2 5h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h4" />
    </svg>
  );
}

function CarIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 17v-5l2-5h8l2 5v5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17v1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 17v1.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
    </svg>
  );
}

function StoreIcon({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16l-1.5-5h-13L4 10Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v9h12v-9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-5h6v5" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="GOO Delivery">
            <BrandLogo compact />
            <span className="hidden text-lg font-black tracking-tight sm:inline">
              <span className="text-black">DELIVERY</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-bold text-zinc-700 md:flex">
            <a className="transition hover:text-[#22c55e]" href="#services">
              Services
            </a>
            <a className="transition hover:text-[#22c55e]" href="#process">
              Fonctionnement
            </a>
            <a className="transition hover:text-[#22c55e]" href="#campagne">
              Campagne
            </a>
            <a className="transition hover:text-[#22c55e]" href="#contact">
              Contact
            </a>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black px-5 py-3 text-sm font-black text-white transition hover:bg-[#22c55e] hover:text-black"
          >
            Commander
          </a>
        </div>
      </nav>

      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-16">
          <div>
            <BrandLogo />
            <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Livraison premium au Cameroun
            </p>
            <h1 className="mt-4 max-w-2xl text-5xl font-black leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Livraison rapide,
              <span className="block text-[#22c55e]">en toute confiance.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              GOO Delivery simplifie vos livraisons : repas, colis, courses, documents
              et solutions professionnelles pour restaurants, boutiques et entreprises.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22c55e] px-7 py-4 text-base font-black text-black shadow-[0_18px_45px_rgba(34,197,94,0.22)] transition hover:-translate-y-0.5 hover:bg-green-400"
              >
                Commander sur WhatsApp
                <ArrowIcon />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-4 text-base font-black text-black transition hover:border-[#22c55e] hover:text-[#22c55e]"
              >
                Découvrir les services
              </a>
            </div>
          </div>

          <WideCampaign />
        </div>

        <div className="bg-[#22c55e] px-5 py-6 text-black sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.Icon;

              return (
                <div key={feature.title} className="flex items-center gap-4 lg:border-r lg:border-black/15 lg:pr-6 last:border-r-0">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-[#22c55e]">
                    <Icon />
                  </span>
                  <div>
                    <h2 className="text-lg font-black">{feature.title}</h2>
                    <p className="mt-1 text-sm font-medium text-black/70">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
                Services
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
                Une solution pour chaque livraison.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-zinc-600">
              Du repas urgent au colis d&apos;entreprise, GOO Delivery garde le service simple,
              rapide et professionnel.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.Icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#22c55e] hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-lg bg-black text-[#22c55e] transition group-hover:bg-[#22c55e] group-hover:text-black">
                    <Icon />
                  </div>
                  <h3 className="mt-6 text-2xl font-black">{service.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="bg-black px-5 py-20 text-white sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Fonctionnement
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Commandez en quelques secondes.
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              Tout commence sur WhatsApp : une demande, une confirmation, puis une
              livraison suivie jusqu&apos;à destination.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#22c55e] text-lg font-black text-black">
                  {index + 1}
                </span>
                <p className="text-lg font-bold text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="campagne" className="bg-zinc-50 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <PosterPreview />

          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              Campagne GOO
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              L&apos;esprit de tes affiches, recréé directement dans le code.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Le site reprend la même promesse, le même contraste blanc/noir/vert, la
              moto, la vitesse, la ville et les arguments principaux, sans charger de
              fichier image externe.
            </p>

            <div className="mt-8 grid gap-3">
              {features.map((item) => (
                <div key={item.title} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#22c55e] text-black">
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <p className="font-black">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#22c55e]">
              À propos
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Une marque locale, une ambition premium.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-zinc-700">
            <p>
              GOO Delivery simplifie les livraisons au Cameroun avec une expérience
              moderne inspirée des meilleurs services de delivery.
            </p>
            <p>
              Notre mission est de rendre les commandes plus rapides, les retraits plus
              simples et les livraisons professionnelles accessibles aux particuliers,
              restaurants, boutiques et entreprises.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#22c55e] px-5 py-20 text-black sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-black/60">
              Contact
            </p>
            <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
              Prêt à lancer votre livraison ?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-black/70">
              Envoyez votre demande et recevez une réponse rapide pour organiser votre
              course, votre colis ou votre livraison business.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-base font-black text-white transition hover:-translate-y-0.5 hover:bg-zinc-900"
            >
              Commander sur WhatsApp
              <ArrowIcon />
            </a>
          </div>

          <div className="grid gap-3 text-lg font-black">
            <a
              className="rounded-lg border border-black/15 bg-black/5 p-5 transition hover:bg-black hover:text-white"
              href="tel:+237695502710"
            >
              WhatsApp : +237 695 502 710
            </a>
            <a
              className="rounded-lg border border-black/15 bg-black/5 p-5 transition hover:bg-black hover:text-white"
              href="mailto:goodeleveries237@gmail.com"
            >
              Email : goodeleveries237@gmail.com
            </a>
            <div className="rounded-lg border border-black/15 bg-black/5 p-5">
              Web : www.goo-delivery.cm
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo compact />
            <p>© 2026 GOO Delivery. Tous droits réservés.</p>
          </div>
          <div className="flex gap-5">
            <a className="transition hover:text-[#22c55e]" href="#services">
              Services
            </a>
            <a className="transition hover:text-[#22c55e]" href="#contact">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}