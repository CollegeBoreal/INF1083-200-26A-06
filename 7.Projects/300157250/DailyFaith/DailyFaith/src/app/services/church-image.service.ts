import { Injectable } from '@angular/core';

import {
  ImageSource,
  knownFolders,
  path,
  alert
} from '@nativescript/core';

import * as imagePicker from '@nativescript/imagepicker';

@Injectable({
  providedIn: 'root'
})
export class ChurchImageService {

  async selectImage(
    churchId: number,
    type: 'logo' | 'cover'
  ): Promise<string | null> {

    try {

      const picker = imagePicker.create({
        mode: 'single',
        mediaType: imagePicker.ImagePickerMediaType.Image,
        resolveWhenDismissed: true
      });

      // Demander l'autorisation
      const authorization = await picker.authorize();

      if (!authorization.authorized) {

        await alert({
          title: 'Autorisation nécessaire',
          message: 'Veuillez autoriser l’accès à vos photos.',
          okButtonText: 'OK'
        });

        return null;
      }

      // Ouvrir la galerie
      const selection = await picker.present();

      if (!selection.length) {
        return null;
      }

      const selected = selection[0];

      // Convertir la photo sélectionnée
      const image = await ImageSource.fromAsset(
        selected.asset
      );

      // Créer le dossier de stockage
      const folder = knownFolders.documents()
        .getFolder('church-images');

      // Générer un nom unique
      const fileName =
        `church-${churchId}-${type}-${Date.now()}.jpg`;

      const filePath = path.join(
        folder.path,
        fileName
      );

      // Sauvegarder la photo
      const saved = image.saveToFile(
        filePath,
        'jpg',
        85
      );

      if (!saved) {
        throw new Error('Impossible de sauvegarder la photo.');
      }

      return fileName;

    } catch (error) {

      console.error('Erreur de sélection de photo', error);

      await alert({
        title: 'Erreur',
        message: 'Impossible de sélectionner cette image.',
        okButtonText: 'OK'
      });

      return null;
    }
  }

  // Récupérer le chemin d'une image sauvegardée
  getImagePath(fileName: string): string {

    if (!fileName) {
      return '';
    }

    return path.join(
      knownFolders.documents().path,
      'church-images',
      fileName
    );
  }
}