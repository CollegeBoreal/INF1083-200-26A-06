import { Injectable, NgZone } from '@angular/core'
import { ApplicationSettings, Http } from '@nativescript/core'
import { Texte } from './langue.service'

// Liste publiée sur GitHub : la modifier met l'application à jour sans nouvelle version
const URL_TALENTS = 'https://raw.githubusercontent.com/kevinmayele/sankotalent-data/main/talents.json'
const CLE_CACHE = 'talents.cache'
const CLE_DATE = 'talents.date'

export interface DataItem {
  id: number
  name: string
  specialite: Texte
  ville: string
  experience: number
  email: string
  description: Texte
  categorie?: string
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Liste intégrée : utilisée au premier lancement et en secours sans connexion
  private readonly listeIntegree = new Array<DataItem>(
    {
      id: 1,
      name: 'Patrick Mbuyi',
      specialite: { fr: 'Administrateur réseau', en: 'Network administrator' },
      ville: 'Kinshasa, Gombe',
      experience: 6,
      email: 'patrick.mbuyi@example.com',
      description: {
        fr: 'Configuration de routeurs et commutateurs Cisco, VLAN, VPN site à site. Certifié CCNA.',
        en: 'Cisco router and switch configuration, VLANs, site-to-site VPN. CCNA certified.',
      },
    },
    {
      id: 2,
      name: 'Grâce Kalala',
      specialite: { fr: 'Analyste en cybersécurité', en: 'Cybersecurity analyst' },
      ville: 'Lubumbashi, Haut-Katanga',
      experience: 4,
      email: 'grace.kalala@example.com',
      description: {
        fr: 'Audit de sécurité, pare-feu, sensibilisation au hameçonnage. Préparation Security+.',
        en: 'Security audits, firewalls, phishing awareness. Preparing for Security+.',
      },
    },
    {
      id: 3,
      name: 'Jonathan Ilunga',
      specialite: { fr: 'Technicien support TI', en: 'IT support technician' },
      ville: 'Mbuji-Mayi, Kasaï-Oriental',
      experience: 3,
      email: 'jonathan.ilunga@example.com',
      description: {
        fr: 'Installation de postes Windows, Active Directory, dépannage matériel et imprimantes.',
        en: 'Windows workstation setup, Active Directory, hardware and printer troubleshooting.',
      },
    },
    {
      id: 4,
      name: 'Sarah Mukendi',
      specialite: { fr: 'Administratrice systèmes Linux', en: 'Linux systems administrator' },
      ville: 'Goma, Nord-Kivu',
      experience: 5,
      email: 'sarah.mukendi@example.com',
      description: {
        fr: 'Serveurs Ubuntu et Rocky Linux, scripts Bash, sauvegardes et supervision.',
        en: 'Ubuntu and Rocky Linux servers, Bash scripting, backups and monitoring.',
      },
    },
    {
      id: 5,
      name: 'David Tshibanda',
      specialite: { fr: 'Développeur mobile', en: 'Mobile developer' },
      ville: 'Kisangani, Tshopo',
      experience: 4,
      email: 'david.tshibanda@example.com',
      description: {
        fr: "Applications Angular et NativeScript, intégration d'API REST.",
        en: 'Angular and NativeScript apps, REST API integration.',
      },
    },
    {
      id: 6,
      name: 'Esther Nzuzi',
      specialite: { fr: 'Administratrice infonuagique', en: 'Cloud administrator' },
      ville: 'Matadi, Kongo-Central',
      experience: 2,
      email: 'esther.nzuzi@example.com',
      description: {
        fr: 'Microsoft Azure, machines virtuelles, gestion des identités. Préparation AZ-104.',
        en: 'Microsoft Azure, virtual machines, identity management. Preparing for AZ-104.',
      },
    }
  )

  private items: Array<DataItem>

  // Date de la dernière actualisation réussie (null = liste intégrée)
  derniereMiseAJour: number = null
  enCours = false
  horsLigne = false

  constructor(private zone: NgZone) {
    this.items = this.listeIntegree
    const cache = ApplicationSettings.getString(CLE_CACHE, '')
    if (cache) {
      try {
        const talents = JSON.parse(cache)
        if (this.estValide(talents)) {
          this.items = talents
          this.derniereMiseAJour = ApplicationSettings.getNumber(CLE_DATE, null)
        }
      } catch (erreur) {
        // Cache illisible : on garde la liste intégrée
      }
    }
  }

  getItems(): Array<DataItem> {
    return this.items
  }

  getItem(id: number): DataItem {
    return this.items.filter((item) => item.id === id)[0]
  }

  // Télécharge la liste en ligne ; en cas d'échec, la liste actuelle est conservée
  async actualiser(): Promise<boolean> {
    if (this.enCours) return false
    this.zone.run(() => (this.enCours = true))
    try {
      const donnees: any = await Http.getJSON(`${URL_TALENTS}?t=${Date.now()}`)
      const talents = donnees?.talents
      if (!this.estValide(talents)) throw new Error('Format de données invalide')
      const maintenant = Date.now()
      ApplicationSettings.setString(CLE_CACHE, JSON.stringify(talents))
      ApplicationSettings.setNumber(CLE_DATE, maintenant)
      this.zone.run(() => {
        this.items = talents
        this.derniereMiseAJour = maintenant
        this.horsLigne = false
        this.enCours = false
      })
      return true
    } catch (erreur) {
      this.zone.run(() => {
        this.horsLigne = true
        this.enCours = false
      })
      return false
    }
  }

  // Vérifie qu'une liste reçue a la forme attendue avant de l'utiliser
  private estValide(talents: any): boolean {
    return (
      Array.isArray(talents) &&
      talents.length > 0 &&
      talents.every((t) => typeof t.id === 'number' && t.name && t.specialite?.fr && t.specialite?.en && t.description?.fr)
    )
  }
}
