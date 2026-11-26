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
  'onglet.formations': { fr: 'Formations', en: 'Training' },
  'onglet.profil': { fr: 'Mon profil', en: 'My profile' },

  'accueil.titre': { fr: 'Accueil', en: 'Home' },
  'hero.titre': { fr: 'Les talents TI de la RD Congo, à portée de main.', en: "DR Congo's IT talent, at your fingertips." },
  'hero.texte': {
    fr: 'Réseau, cybersécurité, support, systèmes, développement et infonuagique.',
    en: 'Networking, cybersecurity, support, systems, development and cloud.',
  },
  'hero.chiffre': { fr: 'professionnels TI disponibles', en: 'IT professionals available' },
  'accueil.categories': { fr: '// CATÉGORIES', en: '// CATEGORIES' },
  'accueil.talent': { fr: 'talent', en: 'professional' },
  'accueil.talents': { fr: 'talents', en: 'professionals' },
  'accueil.etapes': { fr: '// COMMENT ÇA MARCHE', en: '// HOW IT WORKS' },
  'etape1.titre': { fr: 'Parcourez les talents', en: 'Browse the talent' },
  'etape1.texte': { fr: 'Kinshasa, Lubumbashi, Goma, Kisangani et plus.', en: 'Kinshasa, Lubumbashi, Goma, Kisangani and more.' },
  'etape2.titre': { fr: 'Contactez en un geste', en: 'Get in touch in one tap' },
  'etape2.texte': { fr: 'Ouvrez une fiche et touchez Contacter.', en: 'Open a profile and tap Contact.' },
  'etape3.titre': { fr: 'Créez votre profil', en: 'Create your profile' },
  'etape4.titre': { fr: 'Formez-vous', en: 'Get trained' },
  'etape4.texte': { fr: 'CCNA, Security+, Linux, Azure… inscrivez-vous en ligne.', en: 'CCNA, Security+, Linux, Azure… sign up online.' },
  'hero.invite': { fr: '> sankotalent --pays RDC', en: '> sankotalent --country DRC' },
  'etape3.texte': { fr: 'Vous êtes professionnel ? Rendez-vous dans Mon profil.', en: 'Are you an IT professional? Go to My profile.' },

  'talents.titre': { fr: 'Talents TI', en: 'IT talent' },
  'talents.dispo': { fr: 'professionnels disponibles en RD Congo', en: 'professionals available in DR Congo' },
  'talents.dispo1': { fr: 'professionnel disponible en RD Congo', en: 'professional available in DR Congo' },
  'talents.maj': { fr: 'Mis à jour', en: 'Updated' },
  'talents.filtre': { fr: 'Catégorie', en: 'Category' },
  'talents.tous': { fr: 'Voir tous les talents', en: 'Show all talent' },
  'talents.aucun': { fr: 'Aucun professionnel dans cette catégorie pour le moment.', en: 'No professionals in this category yet.' },
  'talents.integree': { fr: 'Liste intégrée à l’application', en: 'Built-in list' },
  'talents.horsLigne': { fr: 'Hors connexion : dernière liste enregistrée', en: 'Offline: last saved list' },
  'talents.actualise': { fr: 'Liste actualisée', en: 'List updated' },
  'temps.instant': { fr: 'à l’instant', en: 'just now' },
  'temps.minutes': { fr: 'il y a {n} min', en: '{n} min ago' },
  'temps.heures': { fr: 'il y a {n} h', en: '{n} h ago' },
  'temps.jours': { fr: 'il y a {n} j', en: '{n} d ago' },

  'fiche.titre': { fr: 'Profil', en: 'Profile' },
  'fiche.infos': { fr: '// INFORMATIONS', en: '// INFORMATION' },
  'fiche.competences': { fr: '// COMPÉTENCES', en: '// SKILLS' },
  'fiche.ans': { fr: 'ans d’expérience', en: 'years of experience' },
  'fiche.contacter': { fr: 'Contacter', en: 'Contact' },
  'fiche.carte': { fr: 'Voir sur la carte', en: 'View on map' },
  'pays': { fr: 'République démocratique du Congo', en: 'Democratic Republic of the Congo' },
  'profil.maPosition': { fr: 'Ma position', en: 'My location' },
  'courriel.titre': { fr: 'Courriel', en: 'Email' },
  'courriel.absent': {
    fr: "Aucun compte de courriel n'est configuré sur cet appareil. Adresse du professionnel :",
    en: "No email account is set up on this device. Professional's address:",
  },
  'courriel.sujet': { fr: 'Demande de service', en: 'Service request' },

  'profil.titre': { fr: 'Mon profil', en: 'My profile' },
  'profil.camera': { fr: 'Caméra', en: 'Camera' },
  'profil.galerie': { fr: 'Galerie', en: 'Gallery' },
  'profil.infos': { fr: '// INFORMATIONS', en: '// INFORMATION' },
  'profil.nom': { fr: 'Nom complet', en: 'Full name' },
  'profil.nom.ex': { fr: 'Ex. Kevin Mayele', en: 'e.g. Kevin Mayele' },
  'profil.specialite': { fr: 'Spécialité', en: 'Specialty' },
  'profil.specialite.ex': { fr: 'Ex. Administrateur réseau', en: 'e.g. Network administrator' },
  'profil.experience': { fr: 'Années d’expérience', en: 'Years of experience' },
  'profil.experience.ex': { fr: 'Ex. 3', en: 'e.g. 3' },
  'profil.position': { fr: '// POSITION', en: '// LOCATION' },
  'profil.nonDetectee': { fr: 'Position non détectée', en: 'Location not detected' },
  'profil.erreurPosition': { fr: 'Impossible de détecter la position', en: 'Unable to detect location' },
  'profil.detecter': { fr: 'Détecter ma position', en: 'Detect my location' },
  'profil.enregistrer': { fr: 'Enregistrer le profil', en: 'Save profile' },
  'profil.dialogue': { fr: 'Profil', en: 'Profile' },
  'profil.enregistre': { fr: 'Votre profil a été enregistré.', en: 'Your profile has been saved.' },

  'formations.titre': { fr: 'Formations', en: 'Training' },
  'formations.sous': { fr: 'Formez-vous aux métiers des TI avec des formateurs de la RD Congo.', en: 'Train for IT careers with instructors from DR Congo.' },
  'formations.toutes': { fr: 'Toutes', en: 'All' },
  'formations.catalogue': { fr: '// CATALOGUE', en: '// CATALOG' },
  'formations.mes': { fr: '// MES INSCRIPTIONS', en: '// MY ENROLLMENTS' },
  'formations.semaines': { fr: 'sem.', en: 'wks' },
  'formations.inscrit': { fr: '✓ Inscrit', en: '✓ Enrolled' },
  'formations.aucune': { fr: 'Aucune formation dans ce domaine pour le moment.', en: 'No training in this field yet.' },
  'niveau.debutant': { fr: 'Débutant', en: 'Beginner' },
  'niveau.intermediaire': { fr: 'Intermédiaire', en: 'Intermediate' },
  'niveau.avance': { fr: 'Avancé', en: 'Advanced' },

  'formateur.titre': { fr: 'Devenez formateur', en: 'Become an instructor' },
  'formateur.texte': {
    fr: 'Vous maîtrisez un domaine des TI ? Transmettez votre savoir et formez la prochaine génération.',
    en: 'Expert in an IT field? Share your knowledge and train the next generation.',
  },
  'formateur.bouton': { fr: 'Proposer ma candidature', en: 'Apply now' },
  'formateur.envoyee': { fr: '✓ Candidature envoyée', en: '✓ Application sent' },
  'formateur.page': { fr: 'Formateur', en: 'Instructor' },
  'formateur.domaine': { fr: 'Domaine enseigné', en: 'Field you teach' },
  'formateur.certifs': { fr: 'Certifications', en: 'Certifications' },
  'formateur.certifs.ex': { fr: 'Ex. CCNA, Security+', en: 'e.g. CCNA, Security+' },
  'formateur.dispo': { fr: 'Disponibilité', en: 'Availability' },
  'dispo.soirs': { fr: 'Soirs', en: 'Evenings' },
  'dispo.weekend': { fr: 'Fins de semaine', en: 'Weekends' },
  'dispo.plein': { fr: 'Temps plein', en: 'Full time' },
  'formateur.message': { fr: 'Votre expérience en quelques lignes', en: 'Your experience in a few lines' },
  'formateur.envoyer': { fr: 'Envoyer ma candidature', en: 'Send my application' },
  'formateur.sujet': { fr: 'Candidature formateur', en: 'Instructor application' },
  'formateur.merci': {
    fr: 'Merci ! Votre candidature est enregistrée. L’équipe SANKOVEYA vous contactera.',
    en: 'Thank you! Your application is saved. The SANKOVEYA team will contact you.',
  },

  'inscription.titre': { fr: 'Formation', en: 'Training' },
  'inscription.programme': { fr: '// PROGRAMME', en: '// CURRICULUM' },
  'inscription.formulaire': { fr: '// INSCRIPTION', en: '// ENROLLMENT' },
  'inscription.duree': { fr: 'Durée', en: 'Duration' },
  'inscription.niveau': { fr: 'Niveau', en: 'Level' },
  'inscription.format': { fr: 'Format', en: 'Format' },
  'inscription.monNiveau': { fr: 'Mon niveau actuel', en: 'My current level' },
  'inscription.courriel': { fr: 'Courriel', en: 'Email' },
  'inscription.courriel.ex': { fr: 'Ex. nom@exemple.com', en: 'e.g. name@example.com' },
  'inscription.telephone': { fr: 'Téléphone (WhatsApp)', en: 'Phone (WhatsApp)' },
  'inscription.telephone.ex': { fr: 'Ex. +243 81 234 5678', en: 'e.g. +243 81 234 5678' },
  'inscription.ville': { fr: 'Ville', en: 'City' },
  'inscription.ville.ex': { fr: 'Ex. Kinshasa', en: 'e.g. Kinshasa' },
  'inscription.bouton': { fr: 'Je m’inscris', en: 'Enroll me' },
  'inscription.deja': { fr: 'Mettre à jour mon inscription', en: 'Update my enrollment' },
  'inscription.sujet': { fr: 'Inscription à la formation', en: 'Training enrollment' },
  'inscription.merci': {
    fr: 'Inscription enregistrée. Vous recevrez les dates et le lieu par courriel ou WhatsApp.',
    en: 'Enrollment saved. You will receive the dates and location by email or WhatsApp.',
  },
  'inscription.sansCourriel': {
    fr: 'Aucun compte de courriel sur cet appareil. Votre demande est gardée dans l’application ; écrivez aussi à',
    en: 'No email account on this device. Your request is saved in the app; please also write to',
  },
  'erreur.champs': { fr: 'Remplissez le nom, un courriel valide et le téléphone.', en: 'Please fill in your name, a valid email and your phone.' },

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

  // Durée écoulée depuis une date, par exemple « il y a 5 min » ou « 5 min ago »
  ilYa(horodatage: number): string {
    const minutes = Math.floor((Date.now() - horodatage) / 60000)
    if (minutes < 1) return this.t('temps.instant')
    if (minutes < 60) return this.t('temps.minutes').replace('{n}', String(minutes))
    const heures = Math.floor(minutes / 60)
    if (heures < 24) return this.t('temps.heures').replace('{n}', String(heures))
    return this.t('temps.jours').replace('{n}', String(Math.floor(heures / 24)))
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
