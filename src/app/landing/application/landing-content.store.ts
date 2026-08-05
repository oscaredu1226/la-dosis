import { Injectable, signal } from '@angular/core';
import {
  DOWNLOAD_LINKS,
  GALLERY_IMAGES,
  LATEST_RELEASE,
  SHOW_EVENTS,
  VIDEOS
} from '../data/landing-content';
import { EditableLandingContent } from '../domain/landing.models';

const STORAGE_KEY = 'la-dosis-editable-content';

export const DEFAULT_EDITABLE_CONTENT: EditableLandingContent = {
  downloads: [...DOWNLOAD_LINKS],
  release: { ...LATEST_RELEASE },
  videos: [...VIDEOS],
  shows: [...SHOW_EVENTS],
  gallery: [...GALLERY_IMAGES]
};

@Injectable({
  providedIn: 'root'
})
export class LandingContentStore {
  private readonly contentState = signal<EditableLandingContent>(
    this.readStoredContent()
  );

  readonly content = this.contentState.asReadonly();

  updateContent(content: EditableLandingContent): void {
    this.contentState.set(content);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  resetContent(): void {
    this.updateContent(DEFAULT_EDITABLE_CONTENT);
  }

  private readStoredContent(): EditableLandingContent {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return DEFAULT_EDITABLE_CONTENT;
    }

    try {
      const content = {
        ...DEFAULT_EDITABLE_CONTENT,
        ...(JSON.parse(storedValue) as Partial<EditableLandingContent>)
      };

      if (
        content.release.stickerUrl ===
        'assets/images/ultimo_lanzamiento_img.png'
      ) {
        content.release = {
          ...content.release,
          stickerUrl: 'assets/images/ultimo_lanzamiento_img.webp'
        };
      }

      return content;
    } catch {
      return DEFAULT_EDITABLE_CONTENT;
    }
  }
}
