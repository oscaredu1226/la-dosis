import { Injectable } from '@angular/core';
import { CommunityBoardRepository } from '../application/community-board.repository';
import {
  CommunityComment,
  CreateCommunityComment,
  CreateCommunityReply
} from '../domain/community-comment.models';

const STORAGE_KEY = 'la-dosis-community-comments';

@Injectable({
  providedIn: 'root'
})
export class LocalCommunityBoardRepository implements CommunityBoardRepository {
  async listComments(): Promise<readonly CommunityComment[]> {
    return this.readComments();
  }

  async createComment(
    comment: CreateCommunityComment
  ): Promise<readonly CommunityComment[]> {
    const comments = [
      {
        id: this.createId(),
        authorName: comment.authorName.trim(),
        message: comment.message.trim(),
        createdAt: new Date().toISOString(),
        replies: []
      },
      ...this.readComments()
    ];

    this.writeComments(comments);
    return comments;
  }

  async createReply(reply: CreateCommunityReply): Promise<readonly CommunityComment[]> {
    const comments = this.readComments().map((comment) => {
      if (comment.id !== reply.commentId) {
        return comment;
      }

      return {
        ...comment,
        replies: [
          ...comment.replies,
          {
            id: this.createId(),
            authorName: 'La Dosis',
            message: reply.message.trim(),
            createdAt: new Date().toISOString()
          }
        ]
      };
    });

    this.writeComments(comments);
    return comments;
  }

  private readComments(): CommunityComment[] {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    try {
      const parsedValue = JSON.parse(storedValue) as CommunityComment[];
      return Array.isArray(parsedValue) ? parsedValue : [];
    } catch {
      return [];
    }
  }

  private writeComments(comments: readonly CommunityComment[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }

  private createId(): string {
    return crypto.randomUUID();
  }
}
