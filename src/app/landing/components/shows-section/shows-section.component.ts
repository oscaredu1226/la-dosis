import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { LandingContentStore } from '../../application/landing-content.store';
import { ShowEvent } from '../../domain/landing.models';

@Component({
  selector: 'app-shows-section',
  templateUrl: './shows-section.component.html',
  styleUrl: './shows-section.component.css'
})
export class ShowsSectionComponent {
  @ViewChild('showsTrack') private showsTrack?: ElementRef<HTMLElement>;

  private readonly contentStore = inject(LandingContentStore);
  protected readonly shows = computed(() => this.contentStore.content().shows);
  protected readonly activeFlyer = signal<ShowEvent | null>(null);

  protected scrollShows(direction: 1 | -1): void {
    const track = this.showsTrack?.nativeElement;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: this.prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  protected openFlyer(show: ShowEvent): void {
    this.activeFlyer.set(show);
  }

  protected closeFlyer(): void {
    this.activeFlyer.set(null);
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
