import { Component } from '@angular/core';
import { DOWNLOAD_LINKS } from '../../data/landing-content';

@Component({
  selector: 'app-downloads-section',
  templateUrl: './downloads-section.component.html',
  styleUrl: './downloads-section.component.css'
})
export class DownloadsSectionComponent {
  protected readonly downloads = DOWNLOAD_LINKS;
}
