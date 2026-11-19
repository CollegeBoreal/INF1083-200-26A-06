export type Statut = 'rp' | 'etudiant' | 'travailleur' | 'refugie' | 'famille';
export type Province = 'QC' | 'ON';

export type TypeDoc =
  | 'passeport'
  | 'immigration'
  | 'nas'
  | 'adresse'
  | 'permis'
  | 'sante'
  | 'diplome'
  | 'autre';

export const NOMS_DOCS: Record<TypeDoc, string> = {
  passeport: 'Passeport',
  immigration: "Document d'immigration (CoPR, permis)",
  nas: 'Confirmation du NAS',
  adresse: "Preuve d'adresse (bail, facture)",
  permis: 'Permis de conduire',
  sante: 'Carte santé',
  diplome: 'Diplôme',
  autre: 'Autre document',
};

export const NOMS_STATUTS: Record<Statut, string> = {
  rp: 'Résident permanent',
  etudiant: 'Étudiant',
  travailleur: 'Travailleur',
  refugie: 'Réfugié',
  famille: 'Famille',
};

export interface Profil {
  origine: string;
  province: Province;
  ville: string;
  statut: Statut;
  arrivee: string; // date ISO
}

export type Plateforme = 'tiktok' | 'youtube';

export interface Video {
  titre: string;
  auteur: string; // ex. "@compte"
  url: string; // lien de la vidéo TikTok ou YouTube
  plateforme: Plateforme;
}

export interface Etape {
  id: string;
  titre: string;
  pourquoi: string;
  duree: string; // estimation affichée
  documents: TypeDoc[];
  comment: string[];
  recherche: string; // ce qu'on cherche sur la carte, ex. "Service Canada"
  rechercheVideo: string; // requête de recherche TikTok et YouTube
  source: string; // site officiel
  statuts: Statut[] | 'tous';
  provinces?: Province[];
  videos: Video[]; // vidéos choisies et vérifiées par l'équipe
}

export interface DocumentCoffre {
  id: string;
  type: TypeDoc;
  nom: string;
  expiration?: string; // AAAA-MM-JJ
  image?: string; // chemin local
  ajoute: string;
}
