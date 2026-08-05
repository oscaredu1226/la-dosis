import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  computed,
  inject
} from '@angular/core';
import { LandingContentStore } from '../../application/landing-content.store';

@Component({
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.css'
})
export class GallerySectionComponent implements AfterViewInit, OnDestroy {
  @Output() readonly imageSelected = new EventEmitter<number>();
  @ViewChild('galleryTrack') private galleryTrack?: ElementRef<HTMLElement>;

  private readonly contentStore = inject(LandingContentStore);
  protected readonly images = computed(() => this.contentStore.content().gallery);
  private galleryAutoTimer = 0;

  ngAfterViewInit(): void {
    this.startGalleryAuto();
  }

  ngOnDestroy(): void {
    this.stopGalleryAuto();
  }

  protected openImage(index: number): void {
    this.stopGalleryAuto();
    this.imageSelected.emit(index);
  }

  protected scrollGallery(direction: 1 | -1): void {
    const track = this.galleryTrack?.nativeElement;

    if (!track) {
      return;
    }

    const firstItem = track.querySelector<HTMLElement>('.gallery-item');
    const itemWidth = firstItem?.getBoundingClientRect().width ?? 220;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const behavior = this.prefersReducedMotion() ? 'auto' : 'smooth';

    this.stopGalleryAuto();

    if (direction > 0 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior });
      return;
    }

    if (direction < 0 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior });
      return;
    }

    track.scrollBy({
      left: direction * (itemWidth + 16) * 2,
      behavior
    });
  }

  protected stopGalleryAuto(): void {
    if (!this.galleryAutoTimer) {
      return;
    }

    window.clearInterval(this.galleryAutoTimer);
    this.galleryAutoTimer = 0;
  }

  private startGalleryAuto(): void {
    if (this.prefersReducedMotion() || this.galleryAutoTimer) {
      return;
    }

    this.galleryAutoTimer = window.setInterval(() => {
      this.scrollGalleryWithoutStopping(1);
    }, 3600);
  }

  private scrollGalleryWithoutStopping(direction: 1 | -1): void {
    const track = this.galleryTrack?.nativeElement;

    if (!track) {
      return;
    }

    const firstItem = track.querySelector<HTMLElement>('.gallery-item');
    const itemWidth = firstItem?.getBoundingClientRect().width ?? 220;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction > 0 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({
      left: direction * (itemWidth + 16) * 2,
      behavior: 'smooth'
    });
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
