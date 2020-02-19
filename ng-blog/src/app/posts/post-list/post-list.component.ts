import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;
  
  constructor(private postsService: PostService, public auth: AuthService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
  }
  

  delete(id: string)
  {
    this.postsService.delete(id);
  }
}
