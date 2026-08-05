import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  COMMUNITY_BOARD_REPOSITORY,
  CommunityBoardRepository
} from '../../../community/application/community-board.repository';
import { CommunityComment } from '../../../community/domain/community-comment.models';

@Component({
  selector: 'app-community-section',
  imports: [DatePipe, FormsModule],
  templateUrl: './community-section.component.html',
  styleUrl: './community-section.component.css'
})
export class CommunitySectionComponent {
  private readonly repository = inject<CommunityBoardRepository>(
    COMMUNITY_BOARD_REPOSITORY
  );

  protected readonly comments = signal<readonly CommunityComment[]>([]);
  protected readonly isAdminMode = signal(false);
  protected readonly isSubmitting = signal(false);
  protected authorName = '';
  protected message = '';
  protected replyDrafts: Record<string, string> = {};

  constructor() {
    this.loadComments();
    this.isAdminMode.set(new URLSearchParams(window.location.search).has('admin'));
  }

  protected async submitComment(): Promise<void> {
    if (!this.authorName.trim() || !this.message.trim() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.comments.set(
      await this.repository.createComment({
        authorName: this.authorName,
        message: this.message
      })
    );
    this.authorName = '';
    this.message = '';
    this.isSubmitting.set(false);
  }

  protected async submitReply(commentId: string): Promise<void> {
    const message = this.replyDrafts[commentId]?.trim();

    if (!message) {
      return;
    }

    this.comments.set(
      await this.repository.createReply({
        commentId,
        message
      })
    );
    this.replyDrafts = {
      ...this.replyDrafts,
      [commentId]: ''
    };
  }

  private async loadComments(): Promise<void> {
    this.comments.set(await this.repository.listComments());
  }
}
