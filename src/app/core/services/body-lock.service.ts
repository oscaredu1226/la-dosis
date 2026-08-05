import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyLockService {
  private readonly document = inject(DOCUMENT);
  private readonly locks = new Set<string>();

  setLock(source: string, isLocked: boolean): void {
    if (isLocked) {
      this.locks.add(source);
    } else {
      this.locks.delete(source);
    }

    this.document.body.classList.toggle('menu-open', this.locks.size > 0);
  }
}
