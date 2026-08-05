export interface CommunityReply {
  readonly id: string;
  readonly authorName: string;
  readonly message: string;
  readonly createdAt: string;
}

export interface CommunityComment {
  readonly id: string;
  readonly authorName: string;
  readonly message: string;
  readonly createdAt: string;
  readonly replies: readonly CommunityReply[];
}

export interface CreateCommunityComment {
  readonly authorName: string;
  readonly message: string;
}

export interface CreateCommunityReply {
  readonly commentId: string;
  readonly message: string;
}
