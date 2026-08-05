import {
  BandMember,
  GalleryImage,
  NavItem,
  PlatformLink,
  Release,
  SocialLink,
  VideoItem
} from '../domain/landing.models';

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Inicio', fragment: 'inicio' },
  { label: 'Música', fragment: 'musica' },
  { label: 'La banda', fragment: 'banda' },
  { label: 'Videos', fragment: 'videos' },
  { label: 'Galería', fragment: 'galeria' }
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'Instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/ladosis_oficial/'
  },
  {
    label: 'YouTube',
    platform: 'youtube',
    url: 'https://www.youtube.com/@LADOSISPERU'
  },
  {
    label: 'Spotify',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/artist/26XGOxgf1xzkmfcqjEoZNh'
  },
  {
    label: 'Facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/ladosispunk'
  },
  {
    label: 'TikTok',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@ladosispunk'
  }
];

export const MUSIC_PLATFORMS: readonly PlatformLink[] = [
  {
    label: 'Spotify',
    platform: 'spotify',
    className: 'platform platform--spotify',
    url: 'https://open.spotify.com/intl-es/artist/26XGOxgf1xzkmfcqjEoZNh'
  },
  {
    label: 'YouTube',
    platform: 'youtube',
    className: 'platform platform--youtube',
    url: 'https://www.youtube.com/@LADOSISPERU'
  },
  {
    label: 'TikTok',
    platform: 'tiktok',
    className: 'platform platform--tiktok',
    url: 'https://www.tiktok.com/@ladosispunk'
  }
];

export const LATEST_RELEASE: Release = {
  title: 'RECUERDO@S',
  eyebrow: 'Último lanzamiento',
  description:
    'El lanzamiento más reciente de La Dosis. Punk melódico con memoria, ruido y corazón directo al pecho.',
  date: '1 abril 2026',
  duration: '4:04',
  coverUrl: 'https://i.scdn.co/image/ab67616d0000e1a3ad5c5cfbf5a305f31ae00527',
  coverAlt: 'Portada de RECUERDO@S de La Dosis',
  stickerUrl: 'assets/images/ultimo_lanzamiento_img.png',
  stickerAlt: 'Parche de La Dosis con calavera punk',
  spotifyUrl: 'https://open.spotify.com/intl-es/album/5kcvGdT6M9xSRTmZKOT0J6'
};

export const BAND_MEMBERS: readonly BandMember[] = [
  {
    name: 'Nombre',
    role: 'Voz',
    imageUrl: 'assets/images/integrante-01.jpg',
    imageAlt: 'Vocalista de La Dosis en vivo',
    instagramUrl: 'https://www.instagram.com/ladosis_oficial/',
    instagramLabel: 'Instagram del vocalista'
  },
  {
    name: 'Nombre',
    role: 'Guitarra',
    imageUrl: 'assets/images/integrante-02.jpg',
    imageAlt: 'Guitarrista de La Dosis en vivo',
    instagramUrl: 'https://www.instagram.com/ladosis_oficial/',
    instagramLabel: 'Instagram del guitarrista'
  },
  {
    name: 'Nombre',
    role: 'Bajo',
    imageUrl: 'assets/images/integrante-03.jpg',
    imageAlt: 'Bajista de La Dosis en vivo',
    instagramUrl: 'https://www.instagram.com/ladosis_oficial/',
    instagramLabel: 'Instagram del bajista'
  },
  {
    name: 'Nombre',
    role: 'Batería',
    imageUrl: 'assets/images/integrante-04.jpg',
    imageAlt: 'Baterista de La Dosis en vivo',
    instagramUrl: 'https://www.instagram.com/ladosis_oficial/',
    instagramLabel: 'Instagram del baterista'
  }
];

export const VIDEOS: readonly VideoItem[] = [
  {
    id: 'ZfoPIeDQFqM',
    label: 'Siendo Punk',
    title: 'SIENDO PUNK - DISCO NOESIGUAL - LA DOSIS',
    thumbnailUrl: 'https://img.youtube.com/vi/ZfoPIeDQFqM/hqdefault.jpg',
    thumbnailAlt: 'Miniatura de SIENDO PUNK - DISCO NOESIGUAL - LA DOSIS',
    embedUrl: 'https://www.youtube.com/embed/ZfoPIeDQFqM?si=xq20Qm0qbyNFGIgH',
    youtubeUrl: 'https://www.youtube.com/watch?v=ZfoPIeDQFqM'
  },
  {
    id: 'WcDGYULXAgY',
    label: 'No es igual',
    title: 'La Dosis no es igual Rock es cultura 1 enero 2025',
    thumbnailUrl: 'https://img.youtube.com/vi/WcDGYULXAgY/hqdefault.jpg',
    thumbnailAlt: 'Miniatura de La Dosis no es igual Rock es cultura',
    embedUrl: 'https://www.youtube.com/embed/WcDGYULXAgY?si=Hiws0pgeTQ5I1R7H',
    youtubeUrl: 'https://www.youtube.com/watch?v=WcDGYULXAgY'
  },
  {
    id: 'AkSEaxP15f8',
    label: 'Short',
    title: 'Short de La Dosis',
    thumbnailUrl: 'https://img.youtube.com/vi/AkSEaxP15f8/hqdefault.jpg',
    thumbnailAlt: 'Miniatura de short de La Dosis',
    embedUrl: 'https://www.youtube.com/embed/AkSEaxP15f8',
    youtubeUrl: 'https://youtube.com/shorts/AkSEaxP15f8'
  }
];

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    fullUrl: 'assets/images/galeria-01.jpg',
    alt: 'Baterista y guitarrista de La Dosis tocando en vivo'
  },
  {
    fullUrl: 'assets/images/galeria-02.jpg',
    alt: 'Público cantando junto a La Dosis'
  },
  {
    fullUrl: 'assets/images/galeria-03.jpg',
    alt: 'La Dosis tocando bajo luces azules'
  },
  {
    fullUrl: 'assets/images/galeria-04.jpg',
    alt: 'La Dosis tocando al aire libre'
  },
  {
    fullUrl: 'assets/images/galeria-05.jpg',
    alt: 'Público con una bandera de La Dosis'
  },
  {
    fullUrl: 'assets/images/galeria-06.jpg',
    alt: 'Integrantes de La Dosis saludando desde el escenario'
  }
];
