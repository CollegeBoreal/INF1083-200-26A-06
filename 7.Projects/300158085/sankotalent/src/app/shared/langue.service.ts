import { Injectable } from '@angular/core'
import { ApplicationSettings } from '@nativescript/core'

export type Langue = 'fr' | 'en'

export interface Texte {
  fr: string
  en: string
}

// Dictionnaire de toutes les phrases de l'application, en français et en anglais
const TEXTES: Record<string, Texte> = {
  'onglet.accueil': { fr: 'Accueil', en: 'Home' },
  'onglet.talents': { fr: 'Talents', en: 'Talent' },
  'onglet.profil': { fr: 'Mon profil', en: 'My profile' },

  'accueil.titre': { fr: 'Accueil', en: 'Home' },
  'hero.titre': { fr: 'Les talents TI de la RD Congo, à portée de main.', en: "DR Congo's IT talent, at your fingertips." },
  'hero.texte': {
    fr: 'Réseau, cybersécurité, support, systèmes, développement et infonuagique.',
    en: 'Networking, cybersecurity, support, systems, development and cloud.',
  },
  'hero.chiffre': { fr: 'professionnels TI disponibles', en: 'IT professionals available' },
  'accueil.etapes': { fr: 'COMMENT ÇA MARCHE', en: 'HOW IT WORKS' },
  'etape1.titre': { fr: 'Parcourez les talents', en: 'Browse the talent' },
  'etape1.texte': { fr: 'Kinshasa, Lubumbashi, Goma, Kisangani et plus.', en: 'Kinshasa, Lubumbashi, Goma, Kisangani and more.' },
  'etape2.titre': { fr: 'Contactez en un geste', en: 'Get in touch in one tap' },
  'etape2.texte': { fr: 'Ouvrez une fiche et touchez Contacter.', en: 'Open a profile and tap Contact.' },
  'etape3.titre': { fr: 'Créez votre profil', en: 'Create your profile' },
  'etape3.texte': { fr: 'Vous êtes professionnel ? Rendez-vous dans Mon profil.', en: 'Are you an IT professional? Go to My profile.' },

  'talents.titre': { fr: 'Talents TI', en: 'IT talent' },
  'talents.dispo': { fr: 'professionnels disponibles en RD Congo', en: 'professionals available in DR Congo' },

  'fiche.titre': { fr: 'Profil', en: 'Profile' },
  'fiche.infos': { fr: 'INFORMATIONS', en: 'INFORMATION' },
  'fiche.competences': { fr: 'COMPÉTENCES', en: 'SKILLS' },
  'fiche.ans': { fr: 'ans d’expérience', en: 'years of experience' },
  'fiche.contacter': { fr: 'Contacter', en: 'Contact' },
  'courriel.titre': { fr: 'Courriel', en: 'Email' },
  'courriel.absent': {
    fr: "Aucun compte de courriel n'est configuré sur cet appareil. Adresse du professionnel :",
    en: "No email account is set up on this device. Professional's address:",
  },
  'courriel.sujet': { fr: 'Demande de service', en: 'Service request' },

  'profil.titre': { fr: 'Mon profil', en: 'My profile' },
  'profil.camera': { fr: 'Caméra', en: 'Camera' },
  'profil.galerie': { fr: 'Galerie', en: 'Gallery' },
  'profil.infos': { fr: 'INFORMATIONS', en: 'INFORMATION' },
  'profil.nom': { fr: 'Nom complet', en: 'Full name' },
  'profil.nom.ex': { fr: 'Ex. Kevin Mayele', en: 'e.g. Kevin Mayele' },
  'profil.specialite': { fr: 'Spécialité', en: 'Specialty' },
  'profil.specialite.ex': { fr: 'Ex. Administrateur réseau', en: 'e.g. Network administrator' },
  'profil.experience': { fr: 'Années d’expérience', en: 'Years of experience' },
  'profil.experience.ex': { fr: 'Ex. 3', en: 'e.g. 3' },
  'profil.position': { fr: 'POSITION', en: 'LOCATION' },
  'profil.nonDetectee': { fr: 'Position non détectée', en: 'Location not detected' },
  'profil.erreurPosition': { fr: 'Impossible de détecter la position', en: 'Unable to detect location' },
  'profil.detecter': { fr: 'Détecter ma position', en: 'Detect my location' },
  'profil.enregistrer': { fr: 'Enregistrer le profil', en: 'Save profile' },
  'profil.dialogue': { fr: 'Profil', en: 'Profile' },
  'profil.enregistre': { fr: 'Votre profil a été enregistré.', en: 'Your profile has been saved.' },
  'camera.titre': { fr: 'Caméra', en: 'Camera' },
  'camera.absente': {
    fr: 'Pas de caméra sur le simulateur. Utilisez « Galerie », ou testez la caméra sur un vrai iPhone.',
    en: 'No camera on the simulator. Use "Gallery", or test the camera on a real iPhone.',
  },
}

@Injectable({
  providedIn: 'root',
})
export class LangueService {
  langue: Langue = ApplicationSettings.getString('langue', 'fr') === 'en' ? 'en' : 'fr'

  // Phrase de l'interface dans la langue choisie
  t(cle: string): string {
    const texte = TEXTES[cle]
    return texte ? texte[this.langue] : cle
  }

  // Donnée bilingue (spécialité, description) dans la langue choisie
  tr(texte: Texte): string {
    return texte[this.langue]
  }

  // Libellé du bouton : la langue vers laquelle on peut basculer
  get autre(): string {
    return this.langue === 'fr' ? 'EN' : 'FR'
  }

  basculer(): void {
    this.langue = this.langue === 'fr' ? 'en' : 'fr'
    ApplicationSettings.setString('langue', this.langue)
  }
}
