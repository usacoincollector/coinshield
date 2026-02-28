export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  positioning: string;
  specs: Array<{
    label: string;
    value: string;
  }>;
  features: string[];
  useCases: string[];
  packagingOptions: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "2x2-cardboard-coin-flip",
    name: "2x2 Cardboard Coin Flip",
    shortDescription:
      "Archival-quality cardboard holders with a clear viewing window for clean storage and presentation.",
    positioning:
      "Archival-quality 2x2 cardboard holders with a clear window for display and storage. Built for dependable presentation, labeling, and fit across common dealer storage setups.",
    specs: [
      { label: "Size", value: '2" x 2"' },
      { label: "Window", value: "Clear film window (Mylar)" },
      { label: "Material", value: "Cardboard + clear film" },
      { label: "Use", value: "Staple closed" },
      {
        label: "Compatibility",
        value: "Standard US coin sizes (varies by insert size)"
      }
    ],
    features: [
      "Clean, professional presentation for dealer stock and collector sets",
      "Protects coins from dust, fingerprints, and routine handling",
      "Simple front-facing labeling for inventory and identification",
      "Fits common storage boxes and album page formats",
      "Consistent cut quality and dependable window clarity",
      "Easy to integrate into high-volume sorting workflows"
    ],
    useCases: [
      "Dealer inventory organization and counter presentation",
      "Coin show transport and labeled tray preparation",
      "Collector storage for sorted denomination or date runs",
      "Marketplace order prep where presentation matters"
    ],
    packagingOptions: [
      "Standard wholesale carton packs",
      "Bulk quantity options for dealer inventory restocking",
      "Private packaging arrangements available on larger inquiries"
    ],
    featured: true
  },
  {
    slug: "2x2-double-pocket-plastic-coin-flip",
    name: "2x2 Double Pocket Plastic Coin Flip",
    shortDescription:
      "Flexible double-pocket flips for safe handling, quick sorting, and clean visibility.",
    positioning:
      "Flexible double-pocket flips for safe handling and organizing. A practical option for sorting, trading, and dealer workflows where quick insertion and clear visibility are important.",
    specs: [
      { label: "Size", value: '2" x 2"' },
      { label: "Pockets", value: "Double pocket" },
      { label: "Material", value: "Plastic (TPU, PVC-free)" }
    ],
    features: [
      "Quick insert and removal during sorting and trading",
      "Dual-pocket format helps separate coin and identification",
      "Clear visibility for faster visual review",
      "Lightweight, flexible, and durable for repeated handling",
      "Good fit for dealer back-stock and temporary organization",
      "Designed for efficient workflow at shows or in shipping prep"
    ],
    useCases: [
      "Temporary storage while grading or sorting inventory",
      "Coin show trading and quick buyer presentation",
      "Dealer bin organization with lightweight protection",
      "Short- to mid-term holding before final packaging"
    ],
    packagingOptions: [
      "Bulk wholesale pack counts",
      "Cartonized quantities for restocking programs",
      "Volume-based packaging discussion available through inquiry"
    ],
    featured: true
  },
  {
    slug: "modern-currency-toploader",
    name: "Modern Currency Toploader",
    shortDescription:
      "Rigid, crystal-clear toploaders sized for most modern US currency bills.",
    positioning:
      "Rigid toploaders designed for modern US currency bills. Built for clean display, protective handling, and storage-friendly material performance for collectors and dealers.",
    specs: [
      { label: "Exterior", value: '6 9/16" x 2 14/16" x ~3/32"' },
      { label: "Interior", value: '6 4/16" x 2 12/16" x ~2/32"' },
      {
        label: "Thickness",
        value: "12 mil, rigid, non-plasticized vinyl (no plasticizers/stearates)"
      },
      { label: "Fit", value: 'Most modern US bills (~6.14" x 2.61")' },
      { label: "Opening", value: "Long side" }
    ],
    features: [
      "Crystal clear display for modern US currency",
      "Long-term storage friendly material profile",
      "Protective film packaging helps reduce scratching before use",
      "Easy insertion and removal from the long-side opening",
      "Rigid support for shipping, filing, or display setups",
      "Useful for dealer inventory, collector storage, and presentation"
    ],
    useCases: [
      "Currency inventory protection for dealers and resellers",
      "Collector storage for modern note runs and sets",
      "Display preparation for shows, offices, or customer review",
      "Safer handling during shipping or marketplace fulfillment"
    ],
    packagingOptions: [
      "Bulk packs for dealer inventory",
      "Case quantities for repeat wholesale programs",
      "Protective film retained for cleaner shipment presentation"
    ],
    featured: true
  },
  {
    slug: "2x2x9-coin-storage-box",
    name: "2x2x9 Coin Storage Box",
    shortDescription:
      "Rigid red storage box for keeping 2x2 flips organized, upright, and easy to label.",
    positioning:
      "Sturdy storage box for organized 2x2 flips. Designed for straightforward inventory control, upright storage, and efficient handling in dealer and collector environments.",
    specs: [
      {
        label: "Capacity",
        value: "110 coin flips with coins or up to 32 plastic 2x2 Snaplock coin holders"
      },
      {
        label: "Fits",
        value: "Standard 2x2 cardboard holders or 2x2 Snaplock coin holders"
      },
      { label: "Construction", value: "Rigid cardboard" },
      { label: "Color", value: "Red" }
    ],
    features: [
      "Keeps flips upright and sorted for faster retrieval",
      "Exterior labeling supports shelf and inventory management",
      "Stackable format helps conserve storage space",
      "Strong fit for dealer stockrooms and fulfillment tables",
      "Simple, dependable organization for show prep and storage",
      "Supports mixed inventory across cardboard and snaplock holders"
    ],
    useCases: [
      "Back-stock storage for coin dealers",
      "Collector organization by denomination, series, or date",
      "Transport prep for shows and events",
      "Inventory separation for processed and unprocessed coins"
    ],
    packagingOptions: [
      "Flat-packed or bulk case discussion for larger runs",
      "Dealer restock quantities",
      "Volume planning available through wholesale inquiry"
    ],
    featured: true
  }
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
