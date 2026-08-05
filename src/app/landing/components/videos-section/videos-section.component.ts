import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LandingContentStore } from '../../application/landing-content.store';
import { VideoItem } from '../../domain/landing.models';

@Component({
  selector: 'app-videos-section',
  templateUrl: './videos-section.component.html',
  styleUrl: './videos-section.component.css'
})
export class VideosSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly contentStore = inject(LandingContentStore);

  protected readonly videos = computed(() => this.contentStore.content().videos);
  protected readonly selectedVideoId = signal<string | null>(null);
  protected readonly selectedVideo = computed<VideoItem>(() => {
    const videos = this.videos();
    return (
      videos.find((video) => video.id === this.selectedVideoId()) ||
      videos[0]
    );
  });
  protected readonly selectedVideoUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      this.withYouTubeOrigin(this.toEmbedUrl(this.selectedVideo().embedUrl))
    )
  );

  protected selectVideo(video: VideoItem): void {
    this.selectedVideoId.set(video.id);
  }

  protected isVideoFile(video: VideoItem): boolean {
    return video.mediaType === 'video';
  }

  private toEmbedUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes('youtu.be')) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
      }

      const videoId = parsedUrl.searchParams.get('v');

      if (parsedUrl.hostname.includes('youtube.com') && videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {
      return url;
    }

    return url;
  }

  private withYouTubeOrigin(url: string): string {
    try {
      const embedUrl = new URL(url);

      if (
        window.location.protocol === 'http:' ||
        window.location.protocol === 'https:'
      ) {
        embedUrl.searchParams.set('origin', window.location.origin);
      }

      return embedUrl.toString();
    } catch {
      return url;
    }
  }
}
