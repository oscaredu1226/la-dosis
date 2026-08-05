import { Component, input } from '@angular/core';
import { SocialPlatform } from '../../../landing/domain/landing.models';

@Component({
  selector: 'app-social-icon',
  templateUrl: './social-icon.component.html',
  styleUrl: './social-icon.component.css'
})
export class SocialIconComponent {
  readonly name = input.required<SocialPlatform>();
}
