import { Texte } from './langue.service'

// Vraies photos du métier, publiées dans le dépôt sankotalent-data (dossier photos/)
const URL_PHOTOS = 'https://raw.githubusercontent.com/kevinmayele/sankotalent-data/main/photos/'

export interface Categorie {
  cle: string
  nom: Texte
  image: string
  photo: string
  motsCles: string[]
}

// Six domaines des TI, chacun avec son illustration 3D (src/assets/categories)
export const CATEGORIES: Categorie[] = [
  { cle: 'reseau', nom: { fr: 'Réseau', en: 'Networking' }, image: '~/assets/categories/reseau.png', photo: URL_PHOTOS + 'reseau.jpg', motsCles: ['réseau', 'network'] },
  { cle: 'securite', nom: { fr: 'Cybersécurité', en: 'Cybersecurity' }, image: '~/assets/categories/securite.png', photo: URL_PHOTOS + 'securite.jpg', motsCles: ['sécurité', 'security'] },
  { cle: 'support', nom: { fr: 'Support TI', en: 'IT support' }, image: '~/assets/categories/support.png', photo: URL_PHOTOS + 'support.jpg', motsCles: ['support'] },
  { cle: 'systemes', nom: { fr: 'Systèmes', en: 'Systems' }, image: '~/assets/categories/systemes.png', photo: URL_PHOTOS + 'systemes.jpg', motsCles: ['système', 'systems'] },
  { cle: 'developpement', nom: { fr: 'Développement', en: 'Development' }, image: '~/assets/categories/developpement.png', photo: URL_PHOTOS + 'developpement.jpg', motsCles: ['développeu', 'developer'] },
  { cle: 'cloud', nom: { fr: 'Infonuagique', en: 'Cloud' }, image: '~/assets/categories/cloud.png', photo: URL_PHOTOS + 'cloud.jpg', motsCles: ['infonuagique', 'cloud'] },
]

// Catégorie d'un talent : le champ "categorie" s'il existe,
// sinon déduite de sa spécialité (utile pour les profils ajoutés sur GitHub)
export function categorieDe(talent: { categorie?: string; specialite: Texte }): string {
  if (talent.categorie) return talent.categorie
  const texte = `${talent.specialite.fr} ${talent.specialite.en}`.toLowerCase()
  const trouvee = CATEGORIES.find((c) => c.motsCles.some((mot) => texte.includes(mot)))
  return trouvee ? trouvee.cle : ''
}

export function categorieParCle(cle: string): Categorie {
  return CATEGORIES.find((c) => c.cle === cle)
}
