import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { MediaService } from 'src/app/media.service';
import { User } from 'src/app/interfaces/user';
import { API_UPLOADS } from '../../app-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-item-card',
  templateUrl: './media-item-card.component.html',
  styleUrls: ['./media-item-card.component.scss']
})
export class MediaItemCardComponent implements OnInit {
  @Input() postData: Post;

  uploadsUrl = API_UPLOADS;
  postImageUrl: string;
  postLiked = false;

  constructor(private media: MediaService, private router: Router) {
  }

  ngOnInit() {
    // Build the url to use in CSS attribute.
    this.postImageUrl = `url(${this.uploadsUrl}${this.postData.filename})`;

    // Fetch user details for this post from server and append them to postData
    // object.
    this.media.getUserDetails(this.postData.user_id).subscribe((res: User) => {
      console.log(res);
      const updatedPostData = {
        ...this.postData,
        ...res
      };
      this.postData = updatedPostData;
    });

    let profilePicFilename = this.media.getProfilePic(this.postData.user_id);
    if (profilePicFilename) {
      profilePicFilename = this.uploadsUrl + profilePicFilename;
      const postDataWithProfilePic = {
        ...this.postData,
        profile_pic_url: profilePicFilename
      };
      this.postData = postDataWithProfilePic;
    }
  }

  onLike() {
    console.log('like clicked');
    this.postLiked = !this.postLiked;
  }

  openProfile(userid: number) {
    this.router.navigate(['user/' + userid]).catch((err) => console.log(err));
  }

  getProfilePic(userid: number) {
    const url = this.uploadsUrl + this.media.getProfilePic(userid);
    console.log('profile pic url: ', url);
    return url;
  }
}
