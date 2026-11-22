import { ApplicationSettings } from '@nativescript/core';

/*
 * Traduction de l'app.
 * Les textes sont écrits en français dans le code : tr('Mon parcours').
 * Pour une autre langue, la traduction (faite une fois par l'IA, en ligne)
 * est gardée sur le téléphone et utilisée partout.
 */

let codeActif = 'fr';
let dico: Record<string, string> = {};

function cle(code: string): string {
  return 'waypoint.trad.' + code;
}

/** Active une langue (charge ses traductions déjà reçues). */
export function activerLangue(code: string): void {
  codeActif = code;
  dico = code === 'fr' ? {} : JSON.parse(ApplicationSettings.getString(cle(code), '{}'));
}

export function langueActive(): string {
  return codeActif;
}

export function traductions(code: string): Record<string, string> {
  return code === codeActif ? dico : JSON.parse(ApplicationSettings.getString(cle(code), '{}'));
}

export function enregistrerTraductions(code: string, d: Record<string, string>): void {
  ApplicationSettings.setString(cle(code), JSON.stringify(d));
  if (code === codeActif) dico = d;
}

/**
 * Texte dans la langue choisie. Exemple : tr('Il te reste {n} étapes', { n: 4 }).
 * Si la traduction manque, le texte français est affiché.
 */
export function tr(fr: string, valeurs?: Record<string, string | number>): string {
  if (fr == null) return '';
  let s = (codeActif !== 'fr' && dico[fr]) || fr;
  if (valeurs) for (const k of Object.keys(valeurs)) s = s.split('{' + k + '}').join(String(valeurs[k]));
  return s;
}
