import { Provider } from '@angular/core';
import { COMMUNITY_BOARD_REPOSITORY } from './application/community-board.repository';
import { LocalCommunityBoardRepository } from './infrastructure/local-community-board.repository';

export const COMMUNITY_PROVIDERS: Provider[] = [
  {
    provide: COMMUNITY_BOARD_REPOSITORY,
    useExisting: LocalCommunityBoardRepository
  }
];
