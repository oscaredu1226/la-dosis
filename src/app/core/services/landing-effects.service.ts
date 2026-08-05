import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingEffectsService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private initialized = false;

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.document.documentElement.classList.add('js');
    this.bindScrollTexture();
    this.observeRevealElements();
  }

  private bindScrollTexture(): void {
    const windowRef = this.document.defaultView;

    if (
      !windowRef ||
      windowRef.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let animationFrame = 0;
    let scrollTimer = 0;

    const updateScrollTexture = (): void => {
      animationFrame = 0;

      const drift = Math.round(windowRef.scrollY % 37);
      const driftSoft = Math.round(windowRef.scrollY % 23);

      this.document.documentElement.style.setProperty(
        '--scroll-drift',
        String(drift)
      );
      this.document.documentElement.style.setProperty(
        '--scroll-drift-soft',
        String(driftSoft)
      );

      this.document.body.classList.add('is-scrolling');
      windowRef.clearTimeout(scrollTimer);
      scrollTimer = windowRef.setTimeout(() => {
        this.document.body.classList.remove('is-scrolling');
      }, 160);
    };

    const onScroll = (): void => {
      if (animationFrame) {
        return;
      }

      animationFrame = windowRef.requestAnimationFrame(updateScrollTexture);
    };

    windowRef.addEventListener('scroll', onScroll, { passive: true });

    this.destroyRef.onDestroy(() => {
      windowRef.removeEventListener('scroll', onScroll);
      windowRef.cancelAnimationFrame(animationFrame);
      windowRef.clearTimeout(scrollTimer);
    });
  }

  private observeRevealElements(): void {
    const windowRef = this.document.defaultView;
    const revealElements = [
      ...this.document.querySelectorAll<HTMLElement>('.reveal')
    ];

    if (!windowRef || !('IntersectionObserver' in windowRef)) {
      revealElements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const revealObserver = new windowRef.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    this.destroyRef.onDestroy(() => {
      revealObserver.disconnect();
    });
  }
}
