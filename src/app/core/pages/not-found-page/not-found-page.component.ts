import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css'
})
export class NotFoundPageComponent implements OnInit, OnDestroy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private previousTitle = '';
  private previousRobots = 'index, follow, max-image-preview:large';

  ngOnInit(): void {
    this.previousTitle = this.title.getTitle();
    this.previousRobots =
      this.meta.getTag('name="robots"')?.content ?? this.previousRobots;

    this.title.setTitle('404 | La Dosis');
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }

  ngOnDestroy(): void {
    this.title.setTitle(this.previousTitle);
    this.meta.updateTag({ name: 'robots', content: this.previousRobots });
  }
}
