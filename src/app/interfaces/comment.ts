export interface Comment {
  comment: string;
  file_id: string;
  user_id: number;
  comment_id: number;
  time_added: string;
  fullname?: string;
  username?: string;
}
