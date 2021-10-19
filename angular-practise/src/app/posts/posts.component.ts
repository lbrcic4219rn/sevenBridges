import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts : Post[] = []
  subscriptuion = new Subscription();
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    console.log(this.postsService.getPosts());
    
    this.postsService.fetchPosts().subscribe(
      val => {
        if(!this.postsService.postsFetched){
          this.postsService.postsFetched = true;
          this.posts = val;
          this.postsService.setPosts(val);
          console.log("skinuto sa servera");
        } else {
          this.posts = this.postsService.getPosts();
        }
      },
      err => {
        console.log("error: ", err);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptuion.unsubscribe();
  }

}
