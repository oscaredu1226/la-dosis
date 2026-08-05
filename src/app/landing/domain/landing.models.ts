export type SocialPlatform =
  | 'instagram'
  | 'youtube'
  | 'spotify'
  | 'facebook'
  | 'tiktok';

export interface NavItem {
  readonly label: string;
  readonly fragment: string;
}

export interface SocialLink {
  readonly label: string;
  readonly platform: SocialPlatform;
  readonly url: string;
}

export interface PlatformLink extends SocialLink {
  readonly className: string;
}

export interface Release {
  title: string;
  eyebrow: string;
  description: string;
  date: string;
  duration: string;
  coverUrl: string;
  coverAlt: string;
  stickerUrl: string;
  stickerAlt: string;
  spotifyUrl: string;
}

export interface DownloadLink {
  title: string;
  description: string;
  url: string;
}

export interface BandMember {
  readonly name: string;
  readonly role: string;
  readonly imageUrl: string;
  readonly imageAlt: string;
  readonly instagramUrl: string;
  readonly instagramLabel: string;
}

export interface VideoItem {
  id: string;
  label: string;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  embedUrl: string;
  youtubeUrl: string;
  mediaType?: 'youtube' | 'video';
}

export interface ShowEvent {
  title: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  city: string;
  status: string;
  imageUrl: string;
  imageAlt: string;
  details: string;
  url?: string;
}

export interface GalleryImage {
  fullUrl: string;
  alt: string;
}

export interface EditableLandingContent {
  downloads: DownloadLink[];
  release: Release;
  videos: VideoItem[];
  shows: ShowEvent[];
  gallery: GalleryImage[];
}
