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
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly date: string;
  readonly duration: string;
  readonly coverUrl: string;
  readonly coverAlt: string;
  readonly stickerUrl: string;
  readonly stickerAlt: string;
  readonly spotifyUrl: string;
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
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly thumbnailUrl: string;
  readonly thumbnailAlt: string;
  readonly embedUrl: string;
  readonly youtubeUrl: string;
}

export interface GalleryImage {
  readonly fullUrl: string;
  readonly alt: string;
}
