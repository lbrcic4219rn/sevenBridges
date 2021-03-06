import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
 

@Injectable({ providedIn: 'root'})

export class PostsService {

    posts: Post[]= [];
    postsFetched: boolean = false;

    constructor( private http: HttpClient ) { }

    fetchPosts() {
      return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    }
    
    fetchComments(id: number) {
      return this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    }

    postPost(post: Post) {
      post.id = this.posts.length + 1;
      post.userId = 1;  
      return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
    }

    setPosts(posts: Post[]){
      this.posts = posts;
    }
    
    getPosts(){
      return this.posts;
    }

    addPost(post: Post){
      this.posts.push(post);
    }
    
    getPostById(id: number){
      return this.posts[id-1];
    }
    
}