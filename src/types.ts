export interface Attachments {
  media_keys: string[];
}

export interface Data {
  id: string;
  created_at: Date;
  author_id: string;
  text: string;
  attachments: Attachments;
  author: User;
  media: Medium[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  created_at: Date;
  profile_image_url: string;
}

export interface Medium {
  type: string;
  media_key: string;
  preview_image_url: string;
  url: string;
}

export interface Includes {
  users: User[];
  media: Medium[];
}

export interface Meta {
  newest_id: string;
  oldest_id: string;
  result_count: number;
  next_token: string;
}

export interface TwitterResponse {
  data: Data[];
  includes: Includes;
  meta: Meta;
}