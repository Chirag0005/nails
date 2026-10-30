export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  includes: string[];
  recommendedStyle: string;
}

export interface NailArtItem {
  id: string;
  title: string;
  category: 'classics' | 'statement' | 'artistry' | 'bridal';
  categoryLabel: string;
  finish: string;
  shape: string;
  image: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  description: string;
  featured?: boolean;
  styleTags: string[];
  suggestedServiceId: string;
}

export interface StyleExplorerTag {
  id: string;
  label: string;
  iconName: string;
  headline: string;
  description: string;
  primaryItemId: string;
}

export interface BookingState {
  serviceId: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  preferredShape: string;
  selectedArtStyle: string;
  notes: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  title: string;
  publication: string;
  rating: number;
}
