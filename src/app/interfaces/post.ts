import { Thumbnail } from './thumbnail';

import { Comment } from './comment';
import { Favourites } from './favourites';
import { Tag } from './tags';

export interface Post {
  tags?: Tag[];
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
  comments?: Comment[];
  thumbnails?: Thumbnail;
  favourites?: Favourites[];
}
