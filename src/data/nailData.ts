import type { ServiceItem, NailArtItem, StyleExplorerTag, TestimonialItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'signature-manicure',
    number: '01',
    name: 'SIGNATURE MANICURE',
    tagline: 'Refined precision tailored to your silhouette.',
    description: 'A beautifully refined manicure designed around your personal style. Includes cuticle curation, custom almond or squoval shaping, diamond buffing, and high-shine organic lacquer.',
    price: '$85',
    duration: '50 mins',
    image: '/images/services/signature-manicure.jpg',
    includes: [
      'Micro-cuticle exfoliation & nourishment',
      'Anatomical nail shaping & edge sealing',
      'Japanese silk protein base coat',
      'Choice of 120+ bespoke curated shades'
    ],
    recommendedStyle: 'Classic Nude / French Accent'
  },
  {
    id: 'gel-extensions',
    number: '02',
    name: 'LUXURY GEL EXTENSIONS',
    tagline: 'Sculptural length, architectural strength.',
    description: 'Elegant length, precise shaping, and a flawless finish. Using feather-light European builder gel sculptured on forms without damaging nail glues for 4+ weeks of resilient beauty.',
    price: '$145',
    duration: '90 mins',
    image: '/images/services/gel-extensions.jpg',
    includes: [
      'Custom form sculpting (No plastic tips)',
      'Apex reinforcement for natural balance',
      'Precision e-file cuticle detailing',
      'High-gloss glass top coat sealant'
    ],
    recommendedStyle: 'Almond Stiletto / Sculptural French'
  },
  {
    id: 'bespoke-nail-art',
    number: '03',
    name: 'BESPOKE NAIL ART',
    tagline: 'Couture hand-painted artistry on fingertips.',
    description: 'Custom designs created to express your individuality. From delicate 24k gold leaf filigree to fine-line architectural geometry and custom pigment blending.',
    price: '$120',
    duration: '75 mins',
    image: '/images/services/bespoke-art.jpg',
    includes: [
      'Personal creative consultation with master artist',
      'Hand-painted fine brush detailing',
      '24k genuine gold leaf & leaf foil',
      'Individual nail customization'
    ],
    recommendedStyle: '3D Floral / Abstract Line Art'
  },
  {
    id: 'chrome-glazed',
    number: '04',
    name: 'CHROME & GLAZED FINISHES',
    tagline: 'Luminous light-catching futuristic gloss.',
    description: 'Luminous finishes with a contemporary edge. Micro-ground titanium chrome powders hand-rubbed over sheer milky bases to reflect multi-dimensional liquid light.',
    price: '$95',
    duration: '60 mins',
    image: '/images/services/chrome-glazed.jpg',
    includes: [
      'Double-cured velvet base formulation',
      'Choice of Champagne Gold, Rose Opal, or Liquid Silver',
      'Mirror burnishing technique',
      'Chip-resistant UV mirror shield'
    ],
    recommendedStyle: 'Champagne Liquid Chrome'
  },
  {
    id: 'bridal-experience',
    number: '05',
    name: 'THE BRIDAL EXPERIENCE',
    tagline: 'Unforgettable grace for your memorable day.',
    description: 'Thoughtfully designed nails for unforgettable occasions. An intimate atelier session with French champagne, personalized lace or pearl accents, and hand smoothing mask.',
    price: '$175',
    duration: '105 mins',
    image: '/images/services/bridal-service.jpg',
    includes: [
      'Preliminary trial session & shade matching',
      'Freshwater micro-pearl application',
      'Warm botanical hand exfoliation ritual',
      'Complimentary touch-up emergency kit'
    ],
    recommendedStyle: 'Ethereal Baby Boomer & Pearls'
  },
  {
    id: 'spa-manicure',
    number: '06',
    name: 'SPA MANICURE',
    tagline: 'Deep restoration, botanical tranquility.',
    description: 'A restorative treatment focused on comfort and care. Immerses hands in warm rose-water infusion, wild botanicals, acupressure massage, and deep hydrating paraffin alternative.',
    price: '$110',
    duration: '65 mins',
    image: '/images/services/spa-manicure.jpg',
    includes: [
      'Rose & citrus petal ceramic soak',
      'Crushed apricot seed gentle peel',
      '15-minute tension release hand massage',
      'Cashmere warmed towel compress'
    ],
    recommendedStyle: 'Milky Glaze / Sheer Rosewater'
  }
];

export const GALLERY_ITEMS: NailArtItem[] = [
  {
    id: 'art-01',
    title: 'The Glazed Nude Atelier',
    category: 'classics',
    categoryLabel: 'The Classics',
    finish: 'Pearlescent Glaze',
    shape: 'Soft Almond',
    image: '/images/nail-art/milky-nude.jpg',
    aspectRatio: 'landscape',
    featured: true,
    description: 'Effortless minimalism featuring high-sheen pearlescent powder buffed over a semi-sheer alabaster foundation. Worn here with delicate 18k yellow gold stacking bands.',
    styleTags: ['Minimal', 'Classic', 'Romantic'],
    suggestedServiceId: 'signature-manicure'
  },
  {
    id: 'art-02',
    title: 'Velvet Noir & Deep Cherry',
    category: 'statement',
    categoryLabel: 'The Statement',
    finish: 'Mirror Lacquer',
    shape: 'Oval Stiletto',
    image: '/images/nail-art/cherry-red.jpg',
    aspectRatio: 'square',
    description: 'A rich, dramatic burgundy and black-cherry glaze evoking vintage cinema and high fashion editorials. Flawless mirror surface that captures ambient lighting.',
    styleTags: ['Bold', 'Romantic'],
    suggestedServiceId: 'gel-extensions'
  },
  {
    id: 'art-03',
    title: 'Modern French Micro-Gold',
    category: 'classics',
    categoryLabel: 'The Classics',
    finish: '24k Gold Accented',
    shape: 'Medium Almond',
    image: '/images/nail-art/french-gold.jpg',
    aspectRatio: 'portrait',
    description: 'A contemporary reimagining of the Parisian French tip. A razor-sharp crisp chalk tip underlined by an ultra-fine 24k gold leaf filament.',
    styleTags: ['Classic', 'Minimal'],
    suggestedServiceId: 'bespoke-nail-art'
  },
  {
    id: 'art-04',
    title: 'Sculptured Rose Petals & Pearls',
    category: 'artistry',
    categoryLabel: 'The Artistry',
    finish: '3D Jelly Relief',
    shape: 'Soft Oval',
    image: '/images/nail-art/3d-floral.jpg',
    aspectRatio: 'square',
    featured: true,
    description: 'Hand-sculpted translucent 3D botanical petals layered over rose-quartz jelly gel, delicately adorned with micro seed pearls and Swarovski crystals.',
    styleTags: ['Artistic', 'Romantic', 'Bridal'],
    suggestedServiceId: 'bespoke-nail-art'
  },
  {
    id: 'art-05',
    title: 'Ethereal Bridal Ombré',
    category: 'bridal',
    categoryLabel: 'The Bridal Edit',
    finish: 'Satin Pearl Gradient',
    shape: 'Elongated Almond',
    image: '/images/nail-art/bridal-pearl.jpg',
    aspectRatio: 'portrait',
    description: 'A seamless transition from translucent blush to crisp ivory silk, completed with an arc of micro freshwater pearls mirroring a bridal lace gown.',
    styleTags: ['Bridal', 'Romantic', 'Classic'],
    suggestedServiceId: 'bridal-experience'
  },
  {
    id: 'art-06',
    title: 'Amber Tortoiseshell & Liquid Glass',
    category: 'statement',
    categoryLabel: 'The Statement',
    finish: 'Amber Glass Glaze',
    shape: 'Square Oval',
    image: '/images/nail-art/champagne-chrome.jpg',
    aspectRatio: 'landscape',
    description: 'Multi-layered translucent amber tortoiseshell with high-gloss mirror-black lacquer and woven 18k gold jewelry. Captures ambient reflections with extraordinary depth.',
    styleTags: ['Chrome', 'Bold'],
    suggestedServiceId: 'chrome-glazed'
  }
];

export const STYLE_EXPLORER_TAGS: StyleExplorerTag[] = [
  {
    id: 'Minimal',
    label: 'Minimalist & Bare',
    iconName: 'Sparkles',
    headline: 'Whisper-Quiet Sophistication',
    description: 'Understated sheer nudes, clean cuticles, and subtle glassy lusters designed for modern understated luxury.',
    primaryItemId: 'art-01'
  },
  {
    id: 'Classic',
    label: 'Timeless Classics',
    iconName: 'Crown',
    headline: 'The Parisian Heritage',
    description: 'Micro-French contours, soft blush bases, and balanced proportions that never fade from the editorial spotlight.',
    primaryItemId: 'art-03'
  },
  {
    id: 'Romantic',
    label: 'Poetic & Romantic',
    iconName: 'Heart',
    headline: 'Ethereal Rose Whispers',
    description: 'Soft rosewater glazes, floating pearl accents, and sweet botanical elements curated for heartfelt moments.',
    primaryItemId: 'art-04'
  },
  {
    id: 'Bold',
    label: 'Dramatic & Bold',
    iconName: 'Flame',
    headline: 'Unapologetic Allure',
    description: 'Deep burgundy lacquers, vampy cherry undertones, and sculptural stiletto forms commanding every room.',
    primaryItemId: 'art-02'
  },
  {
    id: 'Chrome',
    label: 'Mirror & Chrome',
    iconName: 'Zap',
    headline: 'High-Luminosity Metal',
    description: 'Future-forward liquid champagne chrome, glazed donut sheens, and pearlescent titanium sheens.',
    primaryItemId: 'art-06'
  },
  {
    id: 'Bridal',
    label: 'The Bridal Suite',
    iconName: 'Gem',
    headline: 'Forever in White Silk',
    description: 'Luminous baby boomer gradients, delicate pearl rings, and lace-inspired finishes for your wedding celebration.',
    primaryItemId: 'art-05'
  },
  {
    id: 'Artistic',
    label: 'Sculptural Artistry',
    iconName: 'Palette',
    headline: 'Wearable Sculpture',
    description: 'Dimensional 3D gel florals, bespoke gold leaf brushwork, and tactile stones crafted by master ateliers.',
    primaryItemId: 'art-04'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Maison Nails transformed how I view nail appointments. It is not maintenance; it is an hour of pure sensory quiet and haute couture design.",
    author: "Éléonore de Saint-Germain",
    title: "Senior Fashion Editor",
    publication: "PARIS EDITORIAL (Demo)",
    rating: 5
  },
  {
    quote: "The anatomical precision and builder gel craftsmanship lasted four weeks through international fashion month without a single flaw.",
    author: "Camille Laurent",
    title: "Artistic Director",
    publication: "ATELIER COUTURE (Demo)",
    rating: 5
  },
  {
    quote: "My bridal nails were an absolute dream. The micro-pearl gradient caught the sunlight during the vows in the most magical way.",
    author: "Sophia Vance-Montgomery",
    title: "Private Client",
    publication: "GENEVA & NEW YORK (Demo)",
    rating: 5
  }
];

export const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM'
];

export const NAIL_SHAPES = [
  'Almond (Signature)',
  'Coffin / Ballerina',
  'Soft Squoval',
  'Round Classic',
  'Stiletto Modern'
];
