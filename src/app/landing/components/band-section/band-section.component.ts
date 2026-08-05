import { Component, ElementRef, ViewChild } from '@angular/core';
import { BAND_MEMBERS } from '../../data/landing-content';
import { SocialIconComponent } from '../../../shared/components/social-icon/social-icon.component';

@Component({
  selector: 'app-band-section',
  imports: [SocialIconComponent],
  templateUrl: './band-section.component.html',
  styleUrl: './band-section.component.css'
})
export class BandSectionComponent {
  @ViewChild('membersTrack') private membersTrack?: ElementRef<HTMLElement>;

  protected readonly members = BAND_MEMBERS;

  protected scrollMembers(direction: 1 | -1): void {
    const track = this.membersTrack?.nativeElement;

    if (!track) {
      return;
    }

    const firstCard = track.querySelector<HTMLElement>('.member');
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 180;

    track.scrollBy({
      left: direction * (cardWidth + 22) * 2,
      behavior: this.prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
