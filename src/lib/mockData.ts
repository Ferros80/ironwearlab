export const HAT_BASES = [
  "59FIFTY",
  "9FORTY",
  "Trucker",
  "Beanie",
] as const;

export const GALLERY_CATEGORIES = ["cappelli", "giubbotti", "scarpe"] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export type HatBase = (typeof HAT_BASES)[number];

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  mediaType: "image" | "video";
  src: string;
  description?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Cappello Strass Blu",
    category: "cappelli",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "59FIFTY personalizzato con strass blu",
  },
  {
    id: "2",
    title: "Cappello Patch Logo",
    category: "cappelli",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "9FORTY con patch ricamata",
  },
  {
    id: "3",
    title: "Trucker Custom",
    category: "cappelli",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "Trucker mesh con mix strass e ricamo",
  },
  {
    id: "4",
    title: "Beanie Ricamata",
    category: "cappelli",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "Beanie New Era con ricamo personalizzato",
  },
  {
    id: "5",
    title: "Giubbotto Strass",
    category: "giubbotti",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "Giubbotto bomber custom",
  },
  {
    id: "6",
    title: "Giubbotto Patch",
    category: "giubbotti",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "Denim jacket con patch art",
  },
  {
    id: "7",
    title: "Sneaker Custom",
    category: "scarpe",
    mediaType: "image",
    src: "/placeholder.svg",
    description: "Sneakers con strass e ricamo",
  },
  {
    id: "8",
    title: "Workout Custom",
    category: "scarpe",
    mediaType: "video",
    src: "/placeholder.svg",
    description: "Video showcase",
  },
];

export interface GiftedArtist {
  id: string;
  name: string;
  imageSrc: string;
  caption: string;
}

export const GIFTED_ARTISTS: GiftedArtist[] = [
  { id: "1", name: "Artista 1", imageSrc: "/placeholder.svg", caption: "Cappello 59FIFTY personalizzato" },
  { id: "2", name: "Artista 2", imageSrc: "/placeholder.svg", caption: "Beanie custom strass" },
  { id: "3", name: "Artista 3", imageSrc: "/placeholder.svg", caption: "Trucker patch exclusive" },
];
