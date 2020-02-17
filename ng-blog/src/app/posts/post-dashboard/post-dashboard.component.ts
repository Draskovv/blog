import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  title: string;
  image: string = null;
  content: string;

  buttonText: string = "Create Post";

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private auth: AuthService, private postService: PostService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.buttonText = "Post Created!";
    setTimeout(() => this.buttonText = "Create Post", 3000);
  }

  uploadImage(event) {

    const file = event.target.files[0];
    const filePath = `posts/${file.name}`;

    if (file.type.split('/')[0] !== "image")
      return alert("Only image files");
    else {
      const task = this.storage.upload(filePath, file).then(() => {
        const ref = this.storage.ref(filePath);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url; // for ts
          this.image = url; // with this you can use it in the html
        })
      });
    }
  }

}
