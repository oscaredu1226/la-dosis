import {
  Component,
  OnDestroy,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LoadingScreenComponent } from './core/components/loading-screen/loading-screen.component';

type LoadingState = 'visible' | 'leaving' | 'hidden';

@Component({
  selector: 'app-root',
  imports: [LoadingScreenComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  private readonly router = inject(Router);
  private hideTimer?: ReturnType<typeof setTimeout>;
  protected readonly loadingState = signal<LoadingState>('visible');

  constructor() {
    afterNextRender(() => {
      void this.completeInitialLoad();
    });
  }

  ngOnDestroy(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }

  private async completeInitialLoad(): Promise<void> {
    await Promise.all([
      this.delay(420),
      this.waitForInitialNavigation(),
      this.waitForFonts()
    ]);

    this.loadingState.set('leaving');
    this.hideTimer = setTimeout(() => this.loadingState.set('hidden'), 300);
  }

  private async waitForInitialNavigation(): Promise<void> {
    if (this.router.navigated) {
      return;
    }

    await Promise.race([
      firstValueFrom(
        this.router.events.pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd),
          take(1)
        )
      ),
      this.delay(1800)
    ]);
  }

  private async waitForFonts(): Promise<void> {
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    await Promise.race([fontsReady, this.delay(1400)]);
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
