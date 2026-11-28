
import { Observable, ObservableArray } from '@nativescript/core'

const people = [
  {
    name: 'Emir Abdelkader',
    nationality: 'Algérienne',
    birth: '6 septembre 1808',
    profession: 'Chef militaire et homme d’État',
    information: 'Figure historique algérienne connue pour sa résistance contre la colonisation française.'
  },
  {
    name: "Lalla Fatma N'Soumer",
    nationality: 'Algérienne',
    birth: 'Vers 1830',
    profession: 'Résistante',
    information: 'Figure historique de la résistance algérienne en Kabylie.'
  },
  {
    name: 'Mustapha Ben Boulaïd',
    nationality: 'Algérienne',
    birth: '5 février 1917',
    profession: 'Militant indépendantiste',
    information: 'Un des principaux responsables du déclenchement de la guerre de libération algérienne.'
  },
  {
    name: 'Hassiba Ben Bouali',
    nationality: 'Algérienne',
    birth: '18 janvier 1938',
    profession: 'Militante indépendantiste',
    information: 'Figure de la bataille d’Alger pendant la guerre de libération.'
  },
  {
    name: 'Djamila Bouhired',
    nationality: 'Algérienne',
    birth: '1935',
    profession: 'Militante indépendantiste',
    information: 'Connue pour son engagement dans la lutte pour l’indépendance de l’Algérie.'
  },
  {
    name: 'Ahmed Zabana',
    nationality: 'Algérienne',
    birth: '1926',
    profession: 'Militant indépendantiste',
    information: 'Figure de la guerre de libération nationale algérienne.'
  },
  {
    name: 'Kateb Yacine',
    nationality: 'Algérienne',
    birth: '2 août 1929',
    profession: 'Écrivain et poète',
    information: 'Auteur du célèbre roman Nedjma.'
  },
  {
    name: 'Mouloud Feraoun',
    nationality: 'Algérienne',
    birth: '8 mars 1913',
    profession: 'Écrivain et enseignant',
    information: 'Auteur de Le Fils du pauvre.'
  },
  {
    name: 'Assia Djebar',
    nationality: 'Algérienne',
    birth: '30 juin 1936',
    profession: 'Écrivaine et réalisatrice',
    information: 'Écrivaine algérienne élue à l’Académie française.'
  },
  {
    name: 'Mohamed Dib',
    nationality: 'Algérienne',
    birth: '21 juillet 1920',
    profession: 'Écrivain',
    information: 'Auteur de la trilogie Algérie, composée notamment de La Grande Maison.'
  },
  {
    name: 'Yasmina Khadra',
    nationality: 'Algérienne',
    birth: '10 janvier 1955',
    profession: 'Écrivain',
    information: 'Auteur de nombreux romans traduits dans plusieurs langues.'
  },
  {
    name: 'Idir',
    nationality: 'Algérienne',
    birth: '25 octobre 1949',
    profession: 'Chanteur',
    information: 'Chanteur kabyle connu notamment pour la chanson A Vava Inouva.'
  },
  {
    name: 'Cheb Khaled',
    nationality: 'Algérienne',
    birth: '29 février 1960',
    profession: 'Chanteur',
    information: 'Chanteur de raï connu dans le monde entier.'
  },
  {
    name: 'Warda al-Jazairia',
    nationality: 'Algérienne',
    birth: '22 juillet 1939',
    profession: 'Chanteuse',
    information: 'Grande chanteuse algérienne de musique arabe.'
  },
  {
    name: 'Riyad Mahrez',
    nationality: 'Algérienne',
    birth: '21 février 1991',
    profession: 'Footballeur',
    information: 'Joueur international algérien et capitaine de la sélection nationale.'
  }
]

export function createViewModel() {
  const viewModel = new Observable()
  viewModel.people = new ObservableArray(people)
  return viewModel
}


