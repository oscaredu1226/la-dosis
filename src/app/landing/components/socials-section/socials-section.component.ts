import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../data/landing-content';
import { SocialIconComponent } from '../../../shared/components/social-icon/social-icon.component';

@Component({
  selector: 'app-socials-section',
  imports: [SocialIconComponent],
  templateUrl: './socials-section.component.html',
  styleUrl: './socials-section.component.css'
})
export class SocialsSectionComponent {
  protected readonly socials = SOCIAL_LINKS;
}
