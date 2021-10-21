import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts : Post[] = []
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    if(!this.postsService.postsFetched){
      this.postsService.fetchPosts().subscribe(
        val => {
          this.postsService.postsFetched = true;
          this.posts = val;
          this.postsService.setPosts(val);
          console.log("skinuto sa servera");
        },
        err => {
          console.log("error: ", err);
        }
      );
    } else {
      this.posts = this.postsService.getPosts();
    }
  }
}
