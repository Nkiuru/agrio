import { Thumbnail } from './thumbnail';
import { Favorites } from './favorites';
import { Comments } from './comments';

export interface Post {
  email: string;
  title: string;
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  username?: string;
  mime_type: string;
  full_name?: string;
  time_added: string;
  media_type: string;
  description: string;
  screenshot?: string;
  profile_pic?: string;
  comments?: Comments;
  favorites?: Favorites;
  thumbnails?: Thumbnail;
}
