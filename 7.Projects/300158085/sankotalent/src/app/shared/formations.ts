import { Texte } from './langue.service'

export interface Formation {
  id: number
  code: string // sigle court affiché dans la pastille (ex. CCNA)
  titre: Texte
  categorie: string // clé d'une catégorie (reseau, securite, support, systemes, developpement, cloud)
  niveau: 'debutant' | 'intermediaire' | 'avance'
  semaines: number
  format: Texte
  description: Texte
  modules: Texte[]
}

// Couleur d'accent de chaque domaine : l'application n'est plus seulement bleue
export const COULEURS: Record<string, string> = {
  reseau: '#22D3EE',
  securite: '#22E39A',
  support: '#FBBF24',
  systemes: '#A78BFA',
  developpement: '#F472B6',
  cloud: '#60A5FA',
}

// Catalogue intégré à l'application. Il est remplacé par formations.json
// (dépôt sankotalent-data) dès qu'une version en ligne valide est disponible.
export const FORMATIONS_INTEGREES: Formation[] = [
  {
    id: 1,
    code: 'CCNA',
    titre: { fr: 'Réseaux Cisco – préparation CCNA', en: 'Cisco networking – CCNA prep' },
    categorie: 'reseau',
    niveau: 'intermediaire',
    semaines: 10,
    format: { fr: 'En ligne + labo à Kinshasa', en: 'Online + lab in Kinshasa' },
    description: {
      fr: 'Concevoir, configurer et dépanner un réseau d’entreprise avec des routeurs et des commutateurs Cisco, jusqu’à l’examen CCNA 200-301.',
      en: 'Design, configure and troubleshoot an enterprise network with Cisco routers and switches, up to the CCNA 200-301 exam.',
    },
    modules: [
      { fr: 'Modèle OSI, TCP/IP et adressage IPv4/IPv6', en: 'OSI model, TCP/IP and IPv4/IPv6 addressing' },
      { fr: 'VLAN, trunking et Spanning Tree', en: 'VLANs, trunking and Spanning Tree' },
      { fr: 'Routage statique et OSPF', en: 'Static routing and OSPF' },
      { fr: 'Wi-Fi, ACL, NAT et sécurité de base', en: 'Wi-Fi, ACLs, NAT and basic security' },
      { fr: 'Automatisation et examen blanc', en: 'Automation and practice exam' },
    ],
  },
  {
    id: 2,
    code: 'SEC+',
    titre: { fr: 'Cybersécurité – CompTIA Security+', en: 'Cybersecurity – CompTIA Security+' },
    categorie: 'securite',
    niveau: 'intermediaire',
    semaines: 8,
    format: { fr: 'En ligne, soirs et fins de semaine', en: 'Online, evenings and weekends' },
    description: {
      fr: 'Comprendre les menaces, protéger les systèmes et réagir aux incidents, avec la certification Security+ SY0-701 comme objectif.',
      en: 'Understand threats, protect systems and respond to incidents, aiming for the Security+ SY0-701 certification.',
    },
    modules: [
      { fr: 'Menaces, attaques et vulnérabilités', en: 'Threats, attacks and vulnerabilities' },
      { fr: 'Cryptographie et gestion des identités', en: 'Cryptography and identity management' },
      { fr: 'Sécurité des réseaux et du cloud', en: 'Network and cloud security' },
      { fr: 'Réponse aux incidents et conformité', en: 'Incident response and compliance' },
    ],
  },
  {
    id: 3,
    code: 'LNX',
    titre: { fr: 'Linux et bash pour administrateurs', en: 'Linux and bash for administrators' },
    categorie: 'systemes',
    niveau: 'debutant',
    semaines: 6,
    format: { fr: 'En ligne avec machines virtuelles', en: 'Online with virtual machines' },
    description: {
      fr: 'Prendre en main la ligne de commande, gérer les utilisateurs et les services, et automatiser les tâches avec des scripts bash.',
      en: 'Master the command line, manage users and services, and automate tasks with bash scripts.',
    },
    modules: [
      { fr: 'Terminal, fichiers et permissions', en: 'Terminal, files and permissions' },
      { fr: 'Utilisateurs, paquets et services systemd', en: 'Users, packages and systemd services' },
      { fr: 'Réseau sous Linux et SSH', en: 'Linux networking and SSH' },
      { fr: 'Scripts bash et tâches planifiées', en: 'Bash scripts and scheduled jobs' },
    ],
  },
  {
    id: 4,
    code: 'WIN',
    titre: { fr: 'Windows Server et Active Directory', en: 'Windows Server and Active Directory' },
    categorie: 'systemes',
    niveau: 'intermediaire',
    semaines: 6,
    format: { fr: 'Hybride : en ligne + Lubumbashi', en: 'Hybrid: online + Lubumbashi' },
    description: {
      fr: 'Déployer un domaine d’entreprise : Active Directory, DNS, DHCP, stratégies de groupe et partages de fichiers.',
      en: 'Deploy an enterprise domain: Active Directory, DNS, DHCP, Group Policy and file shares.',
    },
    modules: [
      { fr: 'Installation de Windows Server', en: 'Installing Windows Server' },
      { fr: 'Active Directory, DNS et DHCP', en: 'Active Directory, DNS and DHCP' },
      { fr: 'Stratégies de groupe (GPO)', en: 'Group Policy (GPO)' },
      { fr: 'PowerShell pour l’administration', en: 'PowerShell for administration' },
    ],
  },
  {
    id: 5,
    code: 'A+',
    titre: { fr: 'Support technique – CompTIA A+', en: 'Technical support – CompTIA A+' },
    categorie: 'support',
    niveau: 'debutant',
    semaines: 5,
    format: { fr: 'En présentiel à Kinshasa', en: 'In person in Kinshasa' },
    description: {
      fr: 'Diagnostiquer et réparer les ordinateurs, installer les systèmes et accompagner les utilisateurs au service d’assistance.',
      en: 'Diagnose and repair computers, install operating systems and support users at the help desk.',
    },
    modules: [
      { fr: 'Matériel : assemblage et diagnostic', en: 'Hardware: assembly and diagnostics' },
      { fr: 'Installation de Windows et des pilotes', en: 'Installing Windows and drivers' },
      { fr: 'Imprimantes, réseau local et Wi-Fi', en: 'Printers, local network and Wi-Fi' },
      { fr: 'Service à la clientèle et billets d’incident', en: 'Customer service and incident tickets' },
    ],
  },
  {
    id: 6,
    code: 'NS',
    titre: { fr: 'Applications mobiles NativeScript et Angular', en: 'Mobile apps with NativeScript and Angular' },
    categorie: 'developpement',
    niveau: 'intermediaire',
    semaines: 8,
    format: { fr: 'En ligne, projet guidé', en: 'Online, guided project' },
    description: {
      fr: 'Créer une application iPhone et Android de bout en bout, comme SankoTalent : onglets, données en ligne, caméra et carte.',
      en: 'Build an iPhone and Android app end to end, like SankoTalent: tabs, online data, camera and maps.',
    },
    modules: [
      { fr: 'TypeScript et Angular', en: 'TypeScript and Angular' },
      { fr: 'Navigation, onglets et mises en page', en: 'Navigation, tabs and layouts' },
      { fr: 'Plugins : caméra, position, courriel', en: 'Plugins: camera, location, email' },
      { fr: 'Publication et GitHub', en: 'Publishing and GitHub' },
    ],
  },
  {
    id: 7,
    code: 'PY',
    titre: { fr: 'Python pour l’automatisation TI', en: 'Python for IT automation' },
    categorie: 'developpement',
    niveau: 'debutant',
    semaines: 5,
    format: { fr: 'En ligne, à votre rythme', en: 'Online, self-paced' },
    description: {
      fr: 'Écrire des scripts utiles au quotidien : inventaire, sauvegardes, rapports et interrogation d’équipements réseau.',
      en: 'Write everyday scripts: inventory, backups, reports and querying network devices.',
    },
    modules: [
      { fr: 'Bases du langage Python', en: 'Python fundamentals' },
      { fr: 'Fichiers, CSV et JSON', en: 'Files, CSV and JSON' },
      { fr: 'API web et requêtes HTTP', en: 'Web APIs and HTTP requests' },
      { fr: 'Automatiser des équipements réseau', en: 'Automating network devices' },
    ],
  },
  {
    id: 8,
    code: 'AZ',
    titre: { fr: 'Microsoft Azure – administrateur AZ-104', en: 'Microsoft Azure – AZ-104 administrator' },
    categorie: 'cloud',
    niveau: 'avance',
    semaines: 8,
    format: { fr: 'En ligne avec abonnement d’essai', en: 'Online with trial subscription' },
    description: {
      fr: 'Administrer un environnement Azure : identités, stockage, machines virtuelles, réseaux virtuels et surveillance.',
      en: 'Administer an Azure environment: identities, storage, virtual machines, virtual networks and monitoring.',
    },
    modules: [
      { fr: 'Microsoft Entra ID et contrôle d’accès', en: 'Microsoft Entra ID and access control' },
      { fr: 'Stockage et sauvegardes', en: 'Storage and backups' },
      { fr: 'Machines virtuelles et réseaux virtuels', en: 'Virtual machines and virtual networks' },
      { fr: 'Surveillance et gestion des coûts', en: 'Monitoring and cost management' },
    ],
  },
]
