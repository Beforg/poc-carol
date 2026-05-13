import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'poc-favorites';
  private readonly favoriteReferences = signal<string[]>(this.loadFromStorage());

  public readonly references = computed(() => this.favoriteReferences());

  public isFavorite(reference: string): boolean {
    return this.favoriteReferences().includes(reference);
  }

  public toggleReference(reference: string): void {
    const normalizedReference = reference.trim();

    if (!normalizedReference) {
      return;
    }

    this.favoriteReferences.update((references) => {
      const isSaved = references.includes(normalizedReference);
      const nextReferences = isSaved
        ? references.filter((item) => item !== normalizedReference)
        : [...references, normalizedReference];

      this.persist(nextReferences);

      return nextReferences;
    });
  }

  private loadFromStorage(): string[] {
    const stored = this.document.defaultView?.localStorage.getItem(this.storageKey);

    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter((item) => typeof item === 'string');
    } catch {
      return [];
    }
  }

  private persist(references: string[]): void {
    this.document.defaultView?.localStorage.setItem(this.storageKey, JSON.stringify(references));
  }
}
