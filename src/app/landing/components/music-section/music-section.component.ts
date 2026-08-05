import { Component } from '@angular/core';
import { MUSIC_PLATFORMS } from '../../data/landing-content';
import { SocialIconComponent } from '../../../shared/components/social-icon/social-icon.component';

@Component({
  selector: 'app-music-section',
  imports: [SocialIconComponent],
  templateUrl: './music-section.component.html',
  styleUrl: './music-section.component.css'
})
export class MusicSectionComponent {
  protected readonly platforms = MUSIC_PLATFORMS;
}
