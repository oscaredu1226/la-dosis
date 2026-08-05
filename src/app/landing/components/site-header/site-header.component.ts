import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { BodyLockService } from '../../../core/services/body-lock.service';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../data/landing-content';
import { SocialIconComponent } from '../../../shared/components/social-icon/social-icon.component';

@Component({
  selector: 'app-site-header',
  imports: [SocialIconComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly bodyLock = inject(BodyLockService);
  private sectionObserver?: IntersectionObserver;

  protected readonly navItems = NAV_ITEMS;
  protected readonly socials = SOCIAL_LINKS;
  protected readonly menuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected readonly activeFragment = signal('inicio');

  constructor() {
    afterNextRender(() => {
      this.updateScrolledState();
      this.observeActiveSection();
    });
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.updateScrolledState();
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth > 920) {
      this.setMenuState(false);
    }
  }

  @HostListener('window:keydown.escape')
  protected onEscape(): void {
    this.setMenuState(false);
  }

  protected toggleMenu(): void {
    this.setMenuState(!this.menuOpen());
  }

  protected closeMenu(): void {
    this.setMenuState(false);
  }

  protected navigateTo(event: Event, fragment: string): void {
    event.preventDefault();
    this.setMenuState(false);

    this.document.getElementById(fragment)?.scrollIntoView({
      behavior: this.prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  private setMenuState(isOpen: boolean): void {
    this.menuOpen.set(isOpen);
    this.bodyLock.setLock('header-menu', isOpen);
  }

  private updateScrolledState(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  private observeActiveSection(): void {
    const windowRef = this.document.defaultView;

    if (!windowRef || !('IntersectionObserver' in windowRef)) {
      return;
    }

    const sections = [
      ...this.document.querySelectorAll<HTMLElement>('[data-section]')
    ];

    this.sectionObserver = new windowRef.IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio
          )[0];

        if (current?.target.id) {
          this.activeFragment.set(current.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.15, 0.35]
      }
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
