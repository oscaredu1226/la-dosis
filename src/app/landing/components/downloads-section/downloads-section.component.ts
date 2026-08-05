import { Component, computed, inject } from '@angular/core';
import { LandingContentStore } from '../../application/landing-content.store';

@Component({
  selector: 'app-downloads-section',
  templateUrl: './downloads-section.component.html',
  styleUrl: './downloads-section.component.css'
})
export class DownloadsSectionComponent {
  private readonly contentStore = inject(LandingContentStore);
  protected readonly downloads = computed(() => this.contentStore.content().downloads);
}
