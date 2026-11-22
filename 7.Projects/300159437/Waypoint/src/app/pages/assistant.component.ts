import { ChangeDetectorRef, Component, ElementRef, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule, RouterExtensions } from '@nativescript/angular';
import { Page, ScrollView, TextField } from '@nativescript/core';
import { AssistantService, MessageIA } from '../services/assistant.service';
import { AuthService } from '../services/auth.service';
import { LangueService } from '../services/langue.service';
import { arreterVoix } from '../shared/voix';
import { ParcoursService } from '../services/parcours.service';
import { BarreNavComponent } from '../shared/barre-nav.component';
import { preparerPage } from '../shared/ui';

@Component({
  selector: 'assistant',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule, BarreNavComponent],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <GridLayout rows="auto, *, auto, auto" class="fond">
      <!-- En-tête -->
      <GridLayout row="0" columns="auto, *, auto" class="chat-entete">
        <GridLayout col="0" class="chat-avatar">
          <Label class="ico chat-avatar-ico" text="&#xe39f;"></Label>
        </GridLayout>
        <StackLayout col="1" verticalAlignment="center">
          <Label class="chat-nom" text="Assistant Waypoint"></Label>
          <StackLayout orientation="horizontal">
            <StackLayout class="chat-point" verticalAlignment="center"></StackLayout>
            <Label class="petit" text="IA · vérifie toujours sur le site officiel"></Label>
          </StackLayout>
        </StackLayout>
        @if (messages.length) {
          <GridLayout col="2" class="rond-btn" (tap)="nouvelle()">
            <Label class="ico rond-ico" text="&#xe145;"></Label>
          </GridLayout>
        }
      </GridLayout>

      <!-- Conversation -->
      <ScrollView row="1" #defile>
        <StackLayout class="chat-fil">
          @if (!messages.length && !enCours) {
            <StackLayout class="entree">
              <Label class="titre-moyen" text="Une question sur ton installation ?" textWrap="true"></Label>
              <Label class="texte" marginTop="6" textWrap="true"
                     text="Je connais ton parcours. Demande-moi quoi faire, où aller ou quels documents apporter."></Label>
            </StackLayout>
            <Label class="etiquette entree-2" text="ESSAIE"></Label>
            <StackLayout class="entree-2">
              @for (s of suggestions; track s) {
                <GridLayout columns="*, auto" class="chat-suggestion" (tap)="envoyer(s)">
                  <Label col="0" class="ligne-txt" [text]="s" textWrap="true"></Label>
                  <Label col="1" class="ico chevron" text="&#xe5c8;"></Label>
                </GridLayout>
              }
            </StackLayout>
            <GridLayout columns="auto, *" class="carte-gris entree-3" marginTop="10">
              <Label col="0" class="ico" fontSize="18" color="#5F6368" marginRight="10" text="&#xe897;"></Label>
              <Label col="1" class="petit" textWrap="true"
                     text="Ne partage jamais ton NAS, ton numéro de passeport ou tes infos bancaires dans le chat."></Label>
            </GridLayout>
          }

          @for (m of messages; track $index) {
            @if (m.role === 'user') {
              <StackLayout class="bulle bulle-moi" horizontalAlignment="right">
                <Label class="bulle-txt bulle-txt-moi" [text]="m.texte" textWrap="true"></Label>
              </StackLayout>
            } @else {
              <StackLayout class="bulle bulle-ia" horizontalAlignment="left">
                <Label class="bulle-txt" [text]="m.texte" textWrap="true"></Label>
                <StackLayout orientation="horizontal" class="bulle-ecouter" (tap)="ecouter(m.texte)">
                  <Label class="ico bulle-ecouter-ico" text="&#xe050;"></Label>
                  <Label class="bulle-ecouter-txt" text="Écouter"></Label>
                </StackLayout>
              </StackLayout>
            }
          }

          @if (enCours) {
            <StackLayout class="bulle bulle-ia" horizontalAlignment="left">
              <Label class="bulle-txt bulle-attente" text="Waypoint réfléchit…"></Label>
            </StackLayout>
          }

          @if (erreur) {
            <GridLayout columns="auto, *" class="carte-alerte">
              <Label col="0" class="ico accent-texte" fontSize="20" marginRight="10" text="&#xe002;"></Label>
              <Label col="1" class="sb" fontSize="14" [text]="erreur" textWrap="true"></Label>
            </GridLayout>
          }
        </StackLayout>
      </ScrollView>

      <!-- Saisie -->
      @if (connecte) {
        <GridLayout row="2" columns="*, auto" class="chat-saisie">
          <TextField #champ col="0" class="chat-champ r" hint="Écris ta question…" returnKeyType="send"
                     maxLength="1000" [(ngModel)]="brouillon" (returnPress)="envoyer()"></TextField>
          <GridLayout col="1" class="chat-envoyer" [class.chat-envoyer-off]="!brouillon.trim() || enCours" (tap)="envoyer()">
            <Label class="ico rond-ico-blanc" fontSize="22" text="&#xe163;"></Label>
          </GridLayout>
        </GridLayout>
      } @else {
        <StackLayout row="2" class="pied">
          <Label class="petit centre" marginBottom="10" textWrap="true" text="L'assistant est réservé aux comptes Waypoint (c'est gratuit)."></Label>
          <FlexboxLayout class="btn btn-noir" justifyContent="center" alignItems="center" (tap)="seConnecter()">
            <Label class="btn-txt" text="Créer un compte ou me connecter"></Label>
          </FlexboxLayout>
        </StackLayout>
      }

      <StackLayout row="3"><barre-nav actif="assistant"></barre-nav></StackLayout>
    </GridLayout>
  `,
})
export class AssistantComponent {
  @ViewChild('defile') defile?: ElementRef<ScrollView>;
  @ViewChild('champ') champ?: ElementRef<TextField>;

  messages: MessageIA[] = [];
  brouillon = '';
  enCours = false;
  erreur = '';
  connecte = false;
  suggestions: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    page: Page,
    private assistant: AssistantService,
    private auth: AuthService,
    private parcours: ParcoursService,
    private langue: LangueService,
    private router: RouterExtensions
  ) {
    preparerPage(page);
    page.on('navigatingFrom', () => arreterVoix());
    page.on('navigatedTo', () => this.charger());
    this.charger();
  }

  charger(): void {
    this.connecte = this.auth.connecte;
    this.messages = this.assistant.historique();
    const prochaine = this.parcours.prochaine();
    this.suggestions = [
      prochaine ? `Comment faire « ${prochaine.titre} » ?` : 'Quelle est la prochaine chose à faire ?',
      'Quels documents dois-je toujours garder sur moi ?',
      'Comment trouver un logement sans historique de crédit ?',
    ];
    this.cdr.markForCheck();
    this.descendre(false);
  }

  async envoyer(texte?: string): Promise<void> {
    const question = (texte ?? this.brouillon).trim();
    if (!question || this.enCours) return;
    if (!this.connecte) return this.seConnecter();

    this.erreur = '';
    this.enCours = true;
    const avant = this.messages;
    this.messages = [...avant, { role: 'user', texte: question }];
    this.brouillon = '';
    this.champ?.nativeElement.dismissSoftInput();
    this.cdr.markForCheck();
    this.descendre();

    try {
      this.messages = await this.assistant.demander(question);
    } catch (e: any) {
      this.messages = avant; // la question revient dans le champ pour réessayer
      this.brouillon = question;
      this.erreur = e?.message ?? 'Une erreur est survenue.';
    } finally {
      this.enCours = false;
      this.cdr.markForCheck();
      this.descendre();
    }
  }

  /** Lit une réponse à voix haute, dans la langue choisie. */
  ecouter(texte: string): void {
    this.langue.dire(texte, true);
  }

  nouvelle(): void {
    this.assistant.effacer();
    this.messages = [];
    this.erreur = '';
    this.cdr.markForCheck();
  }

  seConnecter(): void {
    this.router.navigate(['/connexion'], { transition: { name: 'slideLeft', duration: 250 } });
  }

  /** Fait défiler jusqu'au dernier message. */
  private descendre(anime = true): void {
    setTimeout(() => {
      const sv = this.defile?.nativeElement;
      if (sv) sv.scrollToVerticalOffset(sv.scrollableHeight, anime);
    }, 80);
  }
}

