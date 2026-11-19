import { Injectable } from '@angular/core';
import { ApplicationSettings, File, ImageSource, knownFolders, path } from '@nativescript/core';
import { requestPermissions, takePicture } from '@nativescript/camera';
import { DocumentCoffre, NOMS_DOCS, TypeDoc } from '../models';

const CLE = 'etape.coffre';
const JOURS_ALERTE = 180; // prévenir 6 mois avant l'expiration

@Injectable({ providedIn: 'root' })
export class CoffreService {
  liste(): DocumentCoffre[] {
    return JSON.parse(ApplicationSettings.getString(CLE, '[]'));
  }

  private sauver(docs: DocumentCoffre[]): void {
    ApplicationSettings.setString(CLE, JSON.stringify(docs));
  }

  possede(type: TypeDoc): boolean {
    return this.liste().some((d) => d.type === type);
  }

  /** Prend une photo du document et la garde dans le dossier privé de l'app. */
  async scanner(type: TypeDoc, expiration?: string): Promise<DocumentCoffre> {
    await requestPermissions();
    const asset = await takePicture({ width: 1600, height: 1600, keepAspectRatio: true, saveToGallery: false });
    const image = await ImageSource.fromAsset(asset);

    const dossier = knownFolders.documents().getFolder('coffre');
    const id = Date.now().toString();
    const chemin = path.join(dossier.path, `${id}.jpg`);
    image.saveToFile(chemin, 'jpg', 85);

    const doc: DocumentCoffre = {
      id,
      type,
      nom: NOMS_DOCS[type],
      expiration: expiration || undefined,
      image: chemin,
      ajoute: new Date().toISOString(),
    };
    this.sauver([...this.liste(), doc]);
    return doc;
  }

  supprimer(id: string): void {
    const docs = this.liste();
    const doc = docs.find((d) => d.id === id);
    if (doc?.image && File.exists(doc.image)) {
      File.fromPath(doc.image).removeSync();
    }
    this.sauver(docs.filter((d) => d.id !== id));
  }

  joursRestants(doc: DocumentCoffre): number | null {
    if (!doc.expiration) return null;
    const ms = new Date(doc.expiration).getTime() - Date.now();
    return Math.ceil(ms / 86400000);
  }

  /** Documents qui expirent bientôt (ou déjà expirés). */
  alertes(): { doc: DocumentCoffre; jours: number }[] {
    return this.liste()
      .map((doc) => ({ doc, jours: this.joursRestants(doc) }))
      .filter((a): a is { doc: DocumentCoffre; jours: number } => a.jours !== null && a.jours <= JOURS_ALERTE)
      .sort((a, b) => a.jours - b.jours);
  }
}
