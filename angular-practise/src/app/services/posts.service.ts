import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from '../models/post.model'
 

@Injectable({ providedIn: 'root'})

export class PostsService {

    posts: Post[]= [];

    constructor( private http: HttpClient) { }

    fetchPosts() {
      console.log("pozvan fetch");
      return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    }

    getPosts() {
      return this.posts;
    }

    setPosts(posts: Post[]){
      this.posts = posts;
    }
    
    getPostById(id: number){
      return this.posts[id-1];
    }
    
}