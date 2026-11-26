import { Injectable } from '@angular/core'
import { Texte } from './langue.service'

export interface DataItem {
  id: number
  name: string
  specialite: Texte
  ville: string
  experience: number
  email: string
  description: Texte
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Profils fictifs de démonstration, répartis dans plusieurs provinces de la RD Congo
  private items = new Array<DataItem>(
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

  getItems(): Array<DataItem> {
    return this.items
  }

  getItem(id: number): DataItem {
    return this.items.filter((item) => item.id === id)[0]
  }
}
