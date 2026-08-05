import { Component } from '@angular/core';
import { LATEST_RELEASE } from '../../data/landing-content';

@Component({
  selector: 'app-release-section',
  templateUrl: './release-section.component.html',
  styleUrl: './release-section.component.css'
})
export class ReleaseSectionComponent {
  protected readonly release = LATEST_RELEASE;
}
