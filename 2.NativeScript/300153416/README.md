# NativeScript — B300153416 (Music Legends)

## Résumé des étapes et des commandes

### 1. Configuration de l'environnement Android (JDK 17)
Configurer les variables d'environnement JAVA_HOME et PATH pour utiliser JDK 17 dans PowerShell afin de permettre la compilation Android (javac) et l'exécution de l'application sur l'émulateur (emulator-5554 / Pixel_7).

$jdk = Get-ChildItem "C:\Program Files\Microsoft\jdk-17*" | Select-Object -First 1 -ExpandProperty FullName
$env:JAVA_HOME = $jdk
$env:Path = "$jdk\bin;$env:Path"

### 2. Mise à jour du composant src/app/app.component.ts (Music Legends)
Placer <ActionBar title="Music Legends"> et <ListView> à l'intérieur de <Frame><Page>...</Page></Frame> afin de corriger l'erreur No Page found in ActionBarComponent, puis afficher la liste des artistes avec le rechargement à chaud (HMR).

Set-Location "C:\Users\Sam\developer\INF1083-200-26A-06\2.NativeScript\B300153416"
@'
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

@Component({
  selector: 'ns-app',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <Frame>
      <Page>
        <ActionBar title="Music Legends"></ActionBar>
        <ListView [items]="singers">
          <ng-template let-singer="item">
            <Label [text]="singer" fontSize="18" padding="16"></Label>
          </ng-template>
        </ListView>
      </Page>
    </Frame>
  `,
})
export class AppComponent {
  singers = [
    'Michael Jackson',
    'Freddie Mercury',
    'Whitney Houston',
    'Bob Marley',
  ];
}
'@ | Set-Content -Path "src\app\app.component.ts" -Encoding UTF8

### 3. Exécution de l'application sur l'émulateur Android
Compiler, installer et lancer l'application sur l'émulateur Android avec HMR activé.

ns run android --emulator

### 4. Synchronisation et publication sur Git (origin/main)
Ajouter les fichiers modifiés, créer le commit, effectuer un rebase sur origin/main et pousser les modifications vers le dépôt distant.

Set-Location "C:\Users\Sam\developer\INF1083-200-26A-06"
git add "2.NativeScript/README.md"
git commit -m "Update 2.NativeScript README with commands and steps summary"
git pull --rebase origin main
git push origin main

## Points clés réalisés
- Configuration réussie de JDK 17 (JAVA_HOME et PATH) pour la compilation Android et l'émulateur.
- Correction de la structure UI en encapsulant <ActionBar> et <ListView> dans <Frame><Page> dans src/app/app.component.ts.
- Affichage et vérification de la liste Music Legends (Michael Jackson, Freddie Mercury, Whitney Houston, Bob Marley) sur l'émulateur Android avec HMR.
- Mise à jour du README.md, synchronisation (git pull --rebase origin main) et envoi (git push origin main) vers le dépôt distant.
<img width="2040" height="1536" alt="AAA" src="https://github.com/user-attachments/assets/c3888d53-9701-4bb1-b468-70b7ba8421ab" />
<img width="2040" height="1536" alt="AAAA" src="https://github.com/user-attachments/assets/5a6a9b4e-3c5b-4c94-ad99-7df86f84d0a3" />
<img width="2040" height="1536" alt="WhatsApp Image 2026-10-04 at 10 41 17" src="https://github.com/user-attachments/assets/75eb2ffe-943f-4f08-9633-ba0b31663398" />



