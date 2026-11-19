import { isAndroid, Page } from '@nativescript/core';

/** Fond de page + barre d'état assortie, sans barre d'action. */
export function preparerPage(page: Page, fond = '#F4F4F2'): void {
  page.actionBarHidden = true;
  page.backgroundColor = fond;
  page.statusBarStyle = 'dark';
  if (isAndroid) page.androidStatusBarBackground = fond;
}

/** Segments de la barre de progression (comme sur la carte de partage). */
export function segments(faites: number, total: number): { plein: boolean }[] {
  return Array.from({ length: total }, (_, i) => ({ plein: i < faites }));
}
