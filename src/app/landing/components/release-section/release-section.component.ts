import { Component, computed, inject } from '@angular/core';
import { LandingContentStore } from '../../application/landing-content.store';

@Component({
  selector: 'app-release-section',
  templateUrl: './release-section.component.html',
  styleUrl: './release-section.component.css'
})
export class ReleaseSectionComponent {
  private readonly contentStore = inject(LandingContentStore);
  protected readonly release = computed(() => this.contentStore.content().release);
}
