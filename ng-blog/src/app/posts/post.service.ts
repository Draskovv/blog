import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Post } from './post';
import { map, filter} from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Injectable()
export class PostService {

    postsCollection: AngularFirestoreCollection<Post>;
    postDoc: AngularFirestoreDocument<Post>;

    constructor(private afs: AngularFirestore, private auth: AuthService) {
        this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('published', 'desc'));
    }

    getPosts() {
       
            return this.postsCollection.snapshotChanges().pipe(map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Post
                    const id = a.payload.doc.id
                    return { id, ...data }
                })
            }));
        
            
    }

    getFilteredPosts(type:string)
    {
        if(type !== 'all')
        {
            return this.postsCollection.snapshotChanges().pipe(map(actions => {
                return actions.filter(a => a.payload.doc.data().type == type).map(a => {
                    const data = a.payload.doc.data() as Post
                    const id = a.payload.doc.id
                    return { id, ...data }
                })
            }));
        }
        else
        {
            return this.postsCollection.snapshotChanges().pipe(map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Post
                    const id = a.payload.doc.id
                    return { id, ...data }
                })
            }));
        }
        
    }

    getMyPosts(){
        return this.postsCollection.snapshotChanges().pipe(map(actions => {
            return actions.filter(x=> x.payload.doc.data().authorId == this.auth.currentUserId).map(a => {
                const data = a.payload.doc.data() as Post
                const id = a.payload.doc.id
                return { id, ...data }
            })
        }));
    }

    getPostData(id: string) {
        this.postDoc = this.afs.doc<Post>(`posts/${id}`);
        return this.postDoc.valueChanges();
    }

    create(data: Post) {
        this.postsCollection.add(data)
    }

    getPost(id: string) {
        return this.afs.doc<Post>(`posts/${id}`);
    }

    delete(id: string) {
        return this.getPost(id).delete();
    }

    update(id: string, formData) {
        return this.getPost(id).update(formData);
    }

}