import { Component, EventEmitter, Output, computed, input } from '@angular/core';
import { GalleryImage } from '../../domain/landing.models';

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrl: './gallery-lightbox.component.css'
})
export class GalleryLightboxComponent {
  readonly images = input.required<readonly GalleryImage[]>();
  readonly activeIndex = input<number | null>(null);

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly activeIndexChange = new EventEmitter<number>();

  protected readonly activeImage = computed(() => {
    const index = this.activeIndex();
    return index === null ? null : this.images()[index];
  });

  protected close(): void {
    this.closed.emit();
  }

  protected showImage(direction: 1 | -1): void {
    const index = this.activeIndex();

    if (index === null) {
      return;
    }

    const nextIndex = (index + direction + this.images().length) % this.images().length;
    this.activeIndexChange.emit(nextIndex);
  }
}
