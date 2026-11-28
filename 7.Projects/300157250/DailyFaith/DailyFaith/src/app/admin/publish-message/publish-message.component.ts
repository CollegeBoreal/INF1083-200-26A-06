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

import { alert } from '@nativescript/core';

import { MessageService } from '../../services/message.service';

import {
  MessageFirestoreService
} from '../../services/message-firestore.service';

import {
  NotificationService
} from '../../services/notification.service';

import {
  Church,
  ChurchService
} from '../../services/church.service';

import {
  FirestoreChurch,
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
  logo: string;
  online: boolean;
}

@Component({

  selector: 'ns-publish-message',

  standalone: true,

  imports: [NativeScriptCommonModule],

  schemas: [NO_ERRORS_SCHEMA],

  templateUrl: './publish-message.component.html',

  styleUrls: ['./publish-message.component.css']

})
export class PublishMessageComponent implements OnInit {

  title = '';
  verse = '';
  content = '';

  loading = false;
  publishing = false;
  errorMessage = '';

  churches: ChurchOption[] = [];

  selectedChurchId: number | string | null = null;

  constructor(

    private router: RouterExtensions,

    private messageService: MessageService,

    private messageFirestoreService: MessageFirestoreService,

    private churchService: ChurchService,

    private churchFirestoreService: ChurchFirestoreService,

    private authService: AuthService,

    private imageService: ChurchImageService,

    private notificationService: NotificationService,

    private cdr: ChangeDetectorRef

  ) {}

  async ngOnInit() {

    await this.loadChurches();
  }

  // Charger les églises du pasteur

  async loadChurches() {

    if (this.loading || this.publishing) {
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user || !this.authService.isAdmin()) {

      this.churches = [];

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const localChurches: ChurchOption[] =
      this.churchService
        .getPastorChurches(user.id)
        .map((church: Church) => ({

          ...church,

          online: false

        }));

    this.churches = localChurches;

    this.cdr.markForCheck();

    try {

      const firebaseChurches =
        await this.churchFirestoreService.getPastorChurches();

      if (
        this.authService.getCurrentUser()?.uid !== user.uid
      ) {
        return;
      }

      const onlineChurches: ChurchOption[] =
        firebaseChurches.map((church: FirestoreChurch) => ({

          ...church,

          online: true

        }));

      this.churches = [

        ...onlineChurches,

        ...localChurches

      ];

      console.log(
        'DAILY FAITH : Églises disponibles pour publication =',
        this.churches.length
      );

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur chargement des églises',
        error
      );

      this.errorMessage =
        'Impossible de charger les églises en ligne.';

    } finally {

      if (
        this.authService.getCurrentUser()?.uid === user.uid
      ) {

        if (this.churches.length === 1) {

          this.selectedChurchId = this.churches[0].id;

        } else if (
          !this.churches.some(
            church => church.id === this.selectedChurchId
          )
        ) {

          this.selectedChurchId = null;

        }

      } else {

        this.churches = [];

        this.selectedChurchId = null;

      }

      this.loading = false;

      this.cdr.markForCheck();

    }
  }

  // Église sélectionnée

  get selectedChurch(): ChurchOption | undefined {

    return this.churches.find(
      church => church.id === this.selectedChurchId
    );
  }

  selectChurch(church: ChurchOption) {

    if (this.loading || this.publishing) {
      return;
    }

    this.selectedChurchId = church.id;
  }

  // Logo de l'église

  getLogoPath(church: ChurchOption): string {

    return church.online

      ? church.logo || ''

      : this.imageService.getImagePath(
          church.logo || ''
        );
  }

  // Champs du formulaire

  onTitleChange(args: any) {

    this.title = args.object.text || '';
  }

  onVerseChange(args: any) {

    this.verse = args.object.text || '';
  }

  onContentChange(args: any) {

    this.content = args.object.text || '';
  }

  // Publier le message

  async publish() {

    if (this.publishing || this.loading) {
      return;
    }

    const church = this.selectedChurch;

    if (!church) {

      await alert(
        'Veuillez sélectionner une église.'
      );

      return;
    }

    if (
      !this.title.trim() ||
      !this.verse.trim() ||
      !this.content.trim()
    ) {

      await alert(
        'Veuillez remplir tous les champs.'
      );

      return;
    }

    if (!this.authService.isAdmin()) {
      return;
    }

    this.publishing = true;

    this.cdr.markForCheck();

    const input = {

      title: this.title,

      verse: this.verse,

      content: this.content

    };

    try {

      if (church.online) {

        // Publication Firebase

        await this.messageFirestoreService.createMessage(

          String(church.id),

          input

        );

        await alert({

          title: 'Publication réussie',

          message:
            `Votre message a été publié en ligne sur la page de ${church.name}.`,

          okButtonText: 'OK'

        });

      } else if (typeof church.id === 'number') {

        // Ancienne publication locale

        const published =
          this.messageService.addMessage(

            input.title,

            input.verse,

            input.content,

            church.id

          );

        if (!published) {

          throw new Error(
            'Impossible de publier ce message.'
          );
        }

        let notified = false;

        try {

          notified =
            this.notificationService.addNotification(

              'Nouveau message biblique',

              `${input.title}\n${input.verse}`,

              church.id,

              'message'

            );

        } catch (error) {

          console.error(
            'DAILY FAITH : Erreur notification locale',
            error
          );

        }

        await alert({

          title: 'Publication réussie',

          message: notified

            ? `Votre message a été publié sur ${church.name}. Une notification interne a été créée.`

            : 'Votre message local a été publié sans notification.',

          okButtonText: 'OK'

        });

      }

      await this.router.navigate(['/admin'], {

        clearHistory: true

      });

    } catch (error) {

      console.error(
        'DAILY FAITH : Erreur publication',
        error
      );

      await alert({

        title: 'Erreur',

        message: error instanceof Error

          ? error.message

          : 'Impossible de publier le message.',

        okButtonText: 'OK'

      });

    } finally {

      this.publishing = false;

      this.cdr.markForCheck();

    }
  }

  createChurch() {

    if (this.publishing) {
      return;
    }

    this.router.navigate(['/create-church']);
  }

  cancel() {

    if (this.publishing) {
      return;
    }

    this.router.navigate(['/admin'], {

      clearHistory: true

    });
  }
}