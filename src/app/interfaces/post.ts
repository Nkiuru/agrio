import { Thumbnail } from './thumbnail';

export interface Post {
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: {
    postType: string,
    coordinates?: {
      long: string,
      lat: string,
    },
    content: {
      realDescription: string,
      ingredients?: [
        {
          amount: number,
          unit: string,
          ingredient: string
        }],
      steps?: string[],
    }
  };
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
  username?: string;
  full_name?: string;
  profile_pic_url?: string;
}
