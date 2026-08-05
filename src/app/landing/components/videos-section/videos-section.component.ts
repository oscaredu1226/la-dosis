import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VIDEOS } from '../../data/landing-content';
import { VideoItem } from '../../domain/landing.models';

@Component({
  selector: 'app-videos-section',
  templateUrl: './videos-section.component.html',
  styleUrl: './videos-section.component.css'
})
export class VideosSectionComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly videos = VIDEOS;
  protected readonly selectedVideo = signal<VideoItem>(VIDEOS[0]);
  protected readonly selectedVideoUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      this.withYouTubeOrigin(this.selectedVideo().embedUrl)
    )
  );

  protected selectVideo(video: VideoItem): void {
    this.selectedVideo.set(video);
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
