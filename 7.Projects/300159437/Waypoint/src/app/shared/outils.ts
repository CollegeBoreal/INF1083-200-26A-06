import { ImageSource, isAndroid, Utils, View } from '@nativescript/core';

/** Ouvre l'app de cartes du téléphone sur une recherche ("banque Montréal"). */
export function ouvrirCarte(recherche: string): void {
  const q = encodeURIComponent(recherche);
  Utils.openUrl(isAndroid ? `geo:0,0?q=${q}` : `https://maps.apple.com/?q=${q}`);
}

/** Ouvre une recherche TikTok (dans l'app TikTok si elle est installée). */
export function ouvrirRechercheTikTok(recherche: string): void {
  Utils.openUrl(`https://www.tiktok.com/search?q=${encodeURIComponent(recherche)}`);
}

/** Ouvre une recherche YouTube (dans l'app YouTube si elle est installée). */
export function ouvrirRechercheYouTube(recherche: string): void {
  Utils.openUrl(`https://www.youtube.com/results?search_query=${encodeURIComponent(recherche)}`);
}

/** Transforme une vue affichée à l'écran en image (pour le partage). */
export function captureVue(vue: View): ImageSource | null {
  if (isAndroid) {
    const nv = vue.nativeView as android.view.View;
    if (!nv || nv.getWidth() === 0) return null;
    const bmp = android.graphics.Bitmap.createBitmap(nv.getWidth(), nv.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
    const canvas = new android.graphics.Canvas(bmp);
    nv.draw(canvas);
    return new ImageSource(bmp);
  }
  const nv = vue.nativeView as UIView;
  if (!nv) return null;
  UIGraphicsBeginImageContextWithOptions(nv.bounds.size, false, 0);
  nv.drawViewHierarchyInRectAfterScreenUpdates(nv.bounds, true);
  const img = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return img ? new ImageSource(img) : null;
}
