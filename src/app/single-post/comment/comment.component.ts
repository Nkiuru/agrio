import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { MediaService } from 'src/app/media.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() commentData: Comment;

  constructor(private media: MediaService) {
  }

  ngOnInit() {
    this.media.getUserinfoForComment(this.commentData.user_id).subscribe(res => {
      const updatedCommentData = {
        ...this.commentData,
        fullname: res.full_name,
        username: res.username
      };

      this.commentData = updatedCommentData;
    });
  }

  getProfilePic(userid: number): string {
    return this.media.getProfilePicById(userid);
  }

}
