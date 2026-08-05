import { Component, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { BodyLockService } from '../../../core/services/body-lock.service';
import { LandingEffectsService } from '../../../core/services/landing-effects.service';
import { GALLERY_IMAGES } from '../../data/landing-content';
import { BandSectionComponent } from '../../components/band-section/band-section.component';
import { CommunitySectionComponent } from '../../components/community-section/community-section.component';
import { DownloadsSectionComponent } from '../../components/downloads-section/downloads-section.component';
import { GalleryLightboxComponent } from '../../components/gallery-lightbox/gallery-lightbox.component';
import { GallerySectionComponent } from '../../components/gallery-section/gallery-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { MusicSectionComponent } from '../../components/music-section/music-section.component';
import { ReleaseSectionComponent } from '../../components/release-section/release-section.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { SocialsSectionComponent } from '../../components/socials-section/socials-section.component';
import { VideosSectionComponent } from '../../components/videos-section/videos-section.component';
import { WhatsappFloatComponent } from '../../components/whatsapp-float/whatsapp-float.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    BandSectionComponent,
    CommunitySectionComponent,
    DownloadsSectionComponent,
    GalleryLightboxComponent,
    GallerySectionComponent,
    HeroSectionComponent,
    MusicSectionComponent,
    ReleaseSectionComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SocialsSectionComponent,
    VideosSectionComponent,
    WhatsappFloatComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private readonly effects = inject(LandingEffectsService);
  private readonly bodyLock = inject(BodyLockService);

  protected readonly galleryImages = GALLERY_IMAGES;
  protected readonly activeLightboxIndex = signal<number | null>(null);

  constructor() {
    afterNextRender(() => {
      this.effects.initialize();
    });
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.activeLightboxIndex() === null) {
      return;
    }

    if (event.key === 'Escape') {
      this.closeLightbox();
    }

    if (event.key === 'ArrowLeft') {
      this.setLightboxIndex(-1);
    }

    if (event.key === 'ArrowRight') {
      this.setLightboxIndex(1);
    }
  }

  protected openLightbox(index: number): void {
    this.activeLightboxIndex.set(index);
    this.bodyLock.setLock('gallery-lightbox', true);
  }

  protected closeLightbox(): void {
    this.activeLightboxIndex.set(null);
    this.bodyLock.setLock('gallery-lightbox', false);
  }

  protected changeLightboxIndex(index: number): void {
    this.activeLightboxIndex.set(index);
  }

  private setLightboxIndex(direction: 1 | -1): void {
    const activeIndex = this.activeLightboxIndex();

    if (activeIndex === null) {
      return;
    }

    this.activeLightboxIndex.set(
      (activeIndex + direction + this.galleryImages.length) % this.galleryImages.length
    );
  }
}
