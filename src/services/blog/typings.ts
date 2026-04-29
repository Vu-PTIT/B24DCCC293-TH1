export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverUrl: string;
  tags: string[];
  status: PostStatus;
  author: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  postCount: number;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  socialLinks: {
    platform: string;
    url: string;
    icon?: string;
  }[];
}

export enum DeveloperRole {
  P1_UI_FEED = 'PERSON_1_UI_FEED',
  P2_UI_DETAIL = 'PERSON_2_UI_DETAIL',
  P3_ADMIN_POST = 'PERSON_3_ADMIN_POST',
  P4_ADMIN_TAG = 'PERSON_4_ADMIN_TAG',
}

export enum PostColumnKey {
  TITLE = 'title',
  STATUS = 'status',
  TAGS = 'tags',
  VIEW_COUNT = 'viewCount',
  CREATED_AT = 'createdAt',
  ACTION = 'action',
}

export enum TagColumnKey {
  NAME = 'name',
  POST_COUNT = 'postCount',
  ACTION = 'action',
}
