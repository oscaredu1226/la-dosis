import { InjectionToken } from '@angular/core';
import {
  CommunityComment,
  CreateCommunityComment,
  CreateCommunityReply
} from '../domain/community-comment.models';

export interface CommunityBoardRepository {
  listComments(): Promise<readonly CommunityComment[]>;
  createComment(comment: CreateCommunityComment): Promise<readonly CommunityComment[]>;
  createReply(reply: CreateCommunityReply): Promise<readonly CommunityComment[]>;
}

export const COMMUNITY_BOARD_REPOSITORY =
  new InjectionToken<CommunityBoardRepository>('COMMUNITY_BOARD_REPOSITORY');
