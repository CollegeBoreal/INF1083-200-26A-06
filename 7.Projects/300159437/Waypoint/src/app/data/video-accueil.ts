/*
 * Vidéo affichée en haut de « Mon parcours ».
 * Par défaut : vidéo officielle d'IRCC (Gouvernement du Canada), en anglais.
 * Si la prochaine étape a une vidéo YouTube dans parcours-canada.ts, c'est elle qui s'affiche.
 * Pour changer la vidéo : remplace youtubeId par l'identifiant d'une autre vidéo
 * (la partie après "watch?v=" dans le lien YouTube).
 */
export const VIDEO_ACCUEIL = {
  titre: 'Your First Two Weeks in Canada',
  auteur: 'IRCC · Gouvernement du Canada',
  youtubeId: '7KBvKSoKBqg',
  duree: '9:33',
};

/** Extrait l'identifiant d'un lien YouTube (watch?v=, youtu.be/, shorts/). */
export function idYouTube(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}
