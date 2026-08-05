import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  COMMUNITY_BOARD_REPOSITORY,
  CommunityBoardRepository
} from '../../../community/application/community-board.repository';
import { CommunityComment } from '../../../community/domain/community-comment.models';
import {
  DEFAULT_EDITABLE_CONTENT,
  LandingContentStore
} from '../../../landing/application/landing-content.store';
import {
  DownloadLink,
  EditableLandingContent,
  GalleryImage,
  Release,
  ShowEvent,
  VideoItem
} from '../../../landing/domain/landing.models';

type AdminPanel =
  | 'overview'
  | 'release'
  | 'downloads'
  | 'videos'
  | 'shows'
  | 'gallery'
  | 'forum';

interface AdminNavItem {
  readonly id: AdminPanel;
  readonly label: string;
  readonly hint: string;
}

@Component({
  selector: 'app-admin-page',
  imports: [DatePipe, FormsModule],
  host: { class: 'admin-shell' },
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  private readonly contentStore = inject(LandingContentStore);
  private readonly communityRepository = inject<CommunityBoardRepository>(
    COMMUNITY_BOARD_REPOSITORY
  );
  private readonly authStorageKey = 'la-dosis-admin-session';

  protected draft = this.cloneContent(this.contentStore.content());
  protected readonly comments = signal<readonly CommunityComment[]>([]);
  protected readonly savedMessage = signal('');
  protected readonly loginError = signal('');
  protected readonly activePanel = signal<AdminPanel>('overview');
  protected readonly isAuthenticated = signal(
    localStorage.getItem(this.authStorageKey) === 'true'
  );
  protected username = '';
  protected password = '';
  protected replyDrafts: Record<string, string> = {};
  protected readonly adminUsername = 'admin';
  protected readonly adminPassword = 'LayerOch0';
  protected readonly navItems: readonly AdminNavItem[] = [
    { id: 'overview', label: 'Resumen', hint: 'Vista general' },
    { id: 'release', label: 'Lanzamiento', hint: 'Portada y texto' },
    { id: 'downloads', label: 'Albumes', hint: 'Links Samply' },
    { id: 'videos', label: 'Videos', hint: 'YouTube o archivo' },
    { id: 'shows', label: 'Proximo pogo', hint: 'Flyers y fechas' },
    { id: 'gallery', label: 'Galeria', hint: 'Fotos del sitio' },
    { id: 'forum', label: 'Foro', hint: 'Responder fans' }
  ];

  constructor() {
    this.loadComments();
  }

  protected login(): void {
    const username = this.username.trim().toLowerCase();

    if (username !== this.adminUsername || this.password !== this.adminPassword) {
      this.loginError.set('Usuario o contrasena incorrectos.');
      return;
    }

    localStorage.setItem(this.authStorageKey, 'true');
    this.isAuthenticated.set(true);
    this.loginError.set('');
    this.username = '';
    this.password = '';
  }

  protected logout(): void {
    localStorage.removeItem(this.authStorageKey);
    this.isAuthenticated.set(false);
    this.activePanel.set('overview');
  }

  protected selectPanel(panel: AdminPanel): void {
    this.activePanel.set(panel);
    this.savedMessage.set('');
  }

  protected activeTitle(): string {
    return (
      this.navItems.find((item) => item.id === this.activePanel())?.label ??
      'Dashboard'
    );
  }

  protected activeDescription(): string {
    const descriptions: Record<AdminPanel, string> = {
      overview: 'Revisa el estado general y accede rapidamente a cada modulo.',
      release: 'Actualiza la portada, descripcion y enlaces del lanzamiento destacado.',
      downloads: 'Gestiona los albumes disponibles para escuchar y descargar.',
      videos: 'Publica, ordena o retira el contenido audiovisual de la banda.',
      shows: 'Mantiene al dia los proximos shows, flyers y datos de cada fecha.',
      gallery: 'Administra el archivo fotografico visible para la comunidad.',
      forum: 'Responde los mensajes de la comunidad como La Dosis.'
    };

    return descriptions[this.activePanel()];
  }

  protected save(): void {
    this.contentStore.updateContent(this.cloneContent(this.draft));
    this.savedMessage.set('Cambios guardados en este navegador.');
  }

  protected reset(): void {
    this.draft = this.cloneContent(DEFAULT_EDITABLE_CONTENT);
    this.save();
  }

  protected addDownload(): void {
    this.draft.downloads = [
      ...this.draft.downloads,
      { title: 'Nuevo álbum', description: 'Descripción del álbum.', url: '' }
    ];
  }

  protected removeDownload(index: number): void {
    this.draft.downloads = this.removeAt(this.draft.downloads, index);
  }

  protected addVideo(): void {
    const id = crypto.randomUUID();
    this.draft.videos = [
      ...this.draft.videos,
      {
        id,
        label: 'Nuevo video',
        title: 'Nuevo video',
        thumbnailUrl: '',
        thumbnailAlt: 'Miniatura de nuevo video',
        embedUrl: '',
        youtubeUrl: '',
        mediaType: 'youtube'
      }
    ];
  }

  protected removeVideo(index: number): void {
    if (this.draft.videos.length <= 1) {
      return;
    }

    this.draft.videos = this.removeAt(this.draft.videos, index);
  }

  protected addShow(): void {
    this.draft.shows = [
      ...this.draft.shows,
      {
        title: 'Nueva fecha',
        status: 'Por anunciar',
        dateLabel: 'Fecha por anunciar',
        timeLabel: 'Hora por confirmar',
        venue: 'Lugar por confirmar',
        city: 'Lima, Perú',
        imageUrl: '',
        imageAlt: 'Flyer de nueva fecha',
        details: 'Detalles por anunciar.',
        url: ''
      }
    ];
  }

  protected removeShow(index: number): void {
    if (this.draft.shows.length <= 1) {
      return;
    }

    this.draft.shows = this.removeAt(this.draft.shows, index);
  }

  protected addGalleryImage(): void {
    this.draft.gallery = [
      ...this.draft.gallery,
      { fullUrl: '', alt: 'Nueva foto de La Dosis' }
    ];
  }

  protected removeGalleryImage(index: number): void {
    if (this.draft.gallery.length <= 1) {
      return;
    }

    this.draft.gallery = this.removeAt(this.draft.gallery, index);
  }

  protected async setImageFromFile(
    event: Event,
    target: Release | ShowEvent | GalleryImage,
    property: 'coverUrl' | 'stickerUrl' | 'imageUrl' | 'fullUrl'
  ): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    (target as unknown as Record<string, string>)[property] =
      await this.readFileAsDataUrl(file);
  }

  protected async setVideoFromFile(event: Event, video: VideoItem): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    video.mediaType = 'video';
    video.embedUrl = await this.readFileAsDataUrl(file);
  }

  protected async reply(commentId: string): Promise<void> {
    const message = this.replyDrafts[commentId]?.trim();

    if (!message) {
      return;
    }

    this.comments.set(
      await this.communityRepository.createReply({ commentId, message })
    );
    this.replyDrafts = { ...this.replyDrafts, [commentId]: '' };
  }

  private async loadComments(): Promise<void> {
    this.comments.set(await this.communityRepository.listComments());
  }

  private removeAt<T>(items: readonly T[], index: number): T[] {
    return items.filter((_, itemIndex) => itemIndex !== index);
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  private cloneContent(content: EditableLandingContent): EditableLandingContent {
    return structuredClone(content);
  }
}
