import { Component } from '@angular/core';
import { SOCIAL_LINKS } from '../../data/landing-content';
import { SocialIconComponent } from '../../../shared/components/social-icon/social-icon.component';

@Component({
  selector: 'app-site-footer',
  imports: [SocialIconComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.css'
})
export class SiteFooterComponent {
  protected readonly socials = SOCIAL_LINKS;
  protected readonly currentYear = new Date().getFullYear();
}
