import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';


import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private postsService: PostService, public auth: AuthService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getMyPosts();
  }

  delete(id: string)
  {
    this.postsService.delete(id);
  }

}
