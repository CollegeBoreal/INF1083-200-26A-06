import {
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
  ChangeDetectorRef
} from '@angular/core';

import {
  NativeScriptCommonModule,
  RouterExtensions
} from '@nativescript/angular';

import { alert, confirm } from '@nativescript/core';

import {
  MessageService
} from '../../services/message.service';

import {
  MessageFirestoreService
} from '../../services/message-firestore.service';

import {
  ChurchService
} from '../../services/church.service';

import {
  ChurchFirestoreService
} from '../../services/church-firestore.service';

import { AuthService } from '../../services/auth.service';

import {
  ChurchImageService
} from '../../services/church-image.service';

interface ChurchOption {

  id: number | string;
  name: string;
  username: string;
  pastor: string;
  logo: string;
  online: boolean;
}

interface MessageView {

  id: number | string;
  key: string;

  churchId: number | string;

  title: string;
  verse: string;
  content: string;

  author: string;
  date: string;

  likes: number | null;
  commentsCount: number | null;

  online: boolean;
}

@Component({

  selector: 'ns-manage-messages',

  standalone: true,

  imports: [NativeScriptCommonModule],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './manage-messages.component.html',

  styleUrls: ['./manage-messages.component.css']

})
export class ManageMessagesComponent implements OnInit {

  churches: ChurchOption[] = [];

  allMessages: MessageView[] = [];

  selectedChurchId: number | string | null = null;

  editingId: string | null = null;

  title = '';
  verse = '';
  content = '';

  loading = false;
  saving = false;

  errorMessage = '';

  constructor(

    private router: RouterExtensions,

    private messageService: MessageService,

    private messageFirestoreService: MessageFirestoreService,

    private churchService: ChurchService,

    private churchFirestoreService: ChurchFirestoreService,

    private authService: AuthService,

    private imageService: ChurchImageService,

    private cdr: ChangeDetectorRef

  ) {}

  async ngOnInit() {

    await this.loadMessages();
  }

  // Convertir la date Firebase

  private formatDate(value: any): string {

    if (!value) {
      return 'Date indisponible';
    }

    try {

      const date = typeof value.toDate === 'function'

        ? value.toDate()

        : value instanceof Date

          ? value

          : typeof value.seconds === 'number'

            ? new Date(value.seconds * 1000)

            : new Date(value);

      if (isNaN(date.getTime())) {
        return 'Date indisponible';
      }

      return date.toLocaleDateString('fr-CA');

    } catch {

      return 'Date indisponible';
    }
  }

  // Charger les publications locales

  private loadLocalMessages(
    userId: number,
    churches: ChurchOption[]
  ): MessageView[] {

    const churchIds = churches
      .filter(church => !church.online)
      .map(church => church.id);

    return this.messageService
      .getPastorMessages(userId)
      .filter(message =>

        message.churchId !== undefined &&

        churchIds.includes(message.churchId)

      )
      .map(message => ({

        id: message.id,

        key: `local:${message.id}`,

        churchId: message.churchId!,

        title: message.title,

        verse: message.verse,

        content: message.content,

        author: message.author,

        date: message.date,

        likes: message.likes,

        commentsCount: message.comments.length,

        online: false

      }));
  }

  // Charger toutes les publications

  async loadMessages() {

    if (this.loading || this.saving) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {

      this.churches = [];

      this.allMessages = [];

      return;
    }

    this.loading = true;

    this.errorMessage = '';

    const localChurches: ChurchOption[] =
      this.churchService
        .getPastorChurches(user.id)
        .map(church => ({

          ...church,

          online: false

        }));

    const localMessages = this.loadLocalMessages(

      user.id,

      localChurches

    );

    this.churches = localChurches;

    this.allMessages = localMessages;

    this.cdr.markForCheck();

    try {

      const firebaseChurches =
        await this.churchFirestoreService
          .getPastorChurches();

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      const onlineChurches: ChurchOption[] =
        firebaseChurches.map(church => ({

          ...church,

          online: true

        }));

      const results = await Promise.allSettled(

        firebaseChurches.map(async church => {

          const messages =
            await this.messageFirestoreService
              .getChurchMessages(church.id);

          return messages.map(message => ({

            id: message.id,

            key: `firebase:${church.id}:${message.id}`,

            churchId: church.id,

            title: message.title,

            verse: message.verse,

            content: message.content,

            author: church.pastor,

            date: this.formatDate(message.createdAt),

            likes: null,

            commentsCount: null,

            online: true

          } as MessageView));

        })

      );

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      const onlineMessages: MessageView[] = [];

      for (const result of results) {

        if (result.status === 'fulfilled') {

          onlineMessages.push(...result.value);

        } else {

          console.error(
            'DAILY FAITH : Erreur chargement publication',
            result.reason
          );

          this.errorMessage =
            'Certaines publications en ligne sont indisponibles.';
        }
      }

      this.churches = [

        ...onlineChurches,

        ...localChurches

      ];

      this.allMessages = [

        ...onlineMessages,

        ...localMessages

      ];

      console.log(

        'DAILY FAITH : Publications Firebase chargées =',

        onlineMessages.length

      );

      console.log(

        'DAILY FAITH : Publications locales chargées =',

        localMessages.length

      );

    } catch (error) {

      console.error(

        'DAILY FAITH : Erreur chargement publications',

        error

      );

      this.errorMessage =
        'Impossible de charger les publications en ligne.';

    } finally {

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {

        this.churches = [];

        this.allMessages = [];

        this.selectedChurchId = null;

      } else if (

        this.selectedChurchId !== null &&

        !this.churches.some(
          church => church.id === this.selectedChurchId
        )

      ) {

        this.selectedChurchId = null;
      }

      this.loading = false;

      this.cdr.markForCheck();
    }
  }

  // Filtrer les publications

  get messages(): MessageView[] {

    if (this.selectedChurchId === null) {

      return this.allMessages;
    }

    return this.allMessages.filter(

      message => message.churchId === this.selectedChurchId

    );
  }

  // Statistiques

  get totalMessages(): number {

    return this.messages.length;
  }

  get totalLikes(): number | string {

    if (this.messages.some(message => message.online)) {

      return '—';
    }

    return this.messages.reduce(

      (total, message) => total + (message.likes ?? 0),

      0

    );
  }

  get totalComments(): number | string {

    if (this.messages.some(message => message.online)) {

      return '—';
    }

    return this.messages.reduce(

      (total, message) =>
        total + (message.commentsCount ?? 0),

      0

    );
  }

  get hasOnlineMessages(): boolean {

    return this.messages.some(message => message.online);
  }

  // Sélectionner une église

  selectChurch(churchId: number | string | null) {

    if (this.loading || this.saving) {
      return;
    }

    this.selectedChurchId = churchId;

    this.cancelEdit();
  }

  // Informations sur l'église

  getChurchName(message: MessageView): string {

    return this.churches.find(

      church => church.id === message.churchId

    )?.name || 'Église inconnue';
  }

  getChurchLogo(message: MessageView): string {

    const church = this.churches.find(

      item => item.id === message.churchId

    );

    if (!church?.logo) {
      return '';
    }

    return church.online

      ? church.logo

      : this.imageService.getImagePath(church.logo);
  }

  // Actualiser

  async refresh() {

    if (this.loading || this.saving) {
      return;
    }

    this.cancelEdit();

    await this.loadMessages();
  }

  // Modifier une publication

  editMessage(message: MessageView) {

    if (this.loading || this.saving) {
      return;
    }

    if (!this.authService.isAdmin()) {
      return;
    }

    if (
      !this.allMessages.some(item => item.key === message.key)
    ) {
      return;
    }

    this.editingId = message.key;

    this.title = message.title;

    this.verse = message.verse;

    this.content = message.content;
  }

  onTitleChange(args: any) {

    this.title = args.object.text || '';
  }

  onVerseChange(args: any) {

    this.verse = args.object.text || '';
  }

  onContentChange(args: any) {

    this.content = args.object.text || '';
  }

  // Enregistrer les modifications

  async saveMessage() {

    if (this.loading || this.saving) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return;
    }

    const input = {

      title: this.title.trim(),

      verse: this.verse.trim(),

      content: this.content.trim()

    };

    if (!input.title || !input.verse || !input.content) {

      await alert('Veuillez remplir tous les champs.');

      return;
    }

    const message = this.allMessages.find(

      item => item.key === this.editingId

    );

    if (!message) {

      await alert('Publication introuvable.');

      return;
    }

    this.saving = true;

    this.cdr.markForCheck();

    try {

      if (message.online) {

        // Modification Firebase

        await this.messageFirestoreService.updateMessage(

          String(message.churchId),

          String(message.id),

          input

        );

      } else if (typeof message.id === 'number') {

        // Modification locale

        this.messageService.updateMessage(

          message.id,

          input.title,

          input.verse,

          input.content

        );

        const updated = this.messageService
          .getPastorMessages(user.id)
          .find(item => item.id === message.id);

        if (

          !updated ||

          updated.title !== input.title ||

          updated.verse !== input.verse ||

          updated.content !== input.content

        ) {

          throw new Error('La modification locale a échoué.');
        }

      } else {

        throw new Error('Identifiant de publication invalide.');
      }

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      this.allMessages = this.allMessages.map(item =>

        item.key === message.key

          ? { ...item, ...input }

          : item

      );

      this.resetEditor();

      this.cdr.markForCheck();

      await alert({

        title: 'Modification réussie',

        message: message.online

          ? 'Votre publication a été mise à jour dans Firebase.'

          : 'Votre publication locale a été mise à jour.',

        okButtonText: 'OK'

      });

    } catch (error) {

      console.error(

        'DAILY FAITH : Erreur modification publication',

        error

      );

      await alert({

        title: 'Erreur',

        message: error instanceof Error

          ? error.message

          : 'Impossible de modifier cette publication.',

        okButtonText: 'OK'

      });

    } finally {

      this.saving = false;

      this.cdr.markForCheck();
    }
  }

  // Annuler la modification

  private resetEditor() {

    this.editingId = null;

    this.title = '';

    this.verse = '';

    this.content = '';
  }

  cancelEdit() {

    if (this.saving) {
      return;
    }

    this.resetEditor();
  }

  // Supprimer une publication

  async deleteMessage(message: MessageView) {

    if (this.loading || this.saving) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {
      return;
    }

    if (
      !this.allMessages.some(item => item.key === message.key)
    ) {
      return;
    }

    this.saving = true;

    this.cdr.markForCheck();

    try {

      const result = await confirm({

        title: 'Supprimer la publication',

        message:
          `Voulez-vous vraiment supprimer « ${message.title} » ? Cette action est définitive.`,

        okButtonText: 'Supprimer',

        cancelButtonText: 'Annuler'

      });

      if (!result) {
        return;
      }

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      if (message.online) {

        // Suppression Firebase

        await this.messageFirestoreService.deleteMessage(

          String(message.churchId),

          String(message.id)

        );

      } else if (typeof message.id === 'number') {

        // Suppression locale

        this.messageService.deleteMessage(message.id);

        const stillExists = this.messageService

          .getMessages()

          .some(item => item.id === message.id);

        if (stillExists) {

          throw new Error(
            'Impossible de supprimer cette publication locale.'
          );
        }

      } else {

        throw new Error('Identifiant de publication invalide.');
      }

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      this.allMessages = this.allMessages.filter(

        item => item.key !== message.key

      );

      if (this.editingId === message.key) {

        this.resetEditor();
      }

      this.cdr.markForCheck();

      await alert({

        title: 'Publication supprimée',

        message: message.online

          ? 'La publication a été supprimée de Firebase.'

          : 'La publication locale a été supprimée.',

        okButtonText: 'OK'

      });

    } catch (error) {

      console.error(

        'DAILY FAITH : Erreur suppression publication',

        error

      );

      await alert({

        title: 'Erreur',

        message: error instanceof Error

          ? error.message

          : 'Impossible de supprimer cette publication.',

        okButtonText: 'OK'

      });

    } finally {

      this.saving = false;

      this.cdr.markForCheck();
    }
  }

  // Nouvelle publication

  publishMessage() {

    if (this.saving || this.loading) {
      return;
    }

    this.router.navigate(['/publish-message']);
  }

  // Retour au tableau de bord

  goBack() {

    if (this.saving) {
      return;
    }

    this.router.navigate(['/admin'], {

      clearHistory: true

    });
  }
}