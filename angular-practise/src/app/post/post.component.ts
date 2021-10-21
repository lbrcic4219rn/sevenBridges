import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData: Post = {
    userId: 0,
    id: 0,
    title: "",
    body: "",
    comments: [],
  };
  
  postId: number = 0;
  comments: Comment[] = [];  

  constructor( private postsService: PostsService, private router: Router, private route: ActivatedRoute) { }

  onPostClick(){
    this.router.navigate(['post', this.postData.id])
  }

  ngOnInit(): void {
    if(Object.keys(this.route.snapshot.params).length === 0){
      return;
    }
    this.route.params.subscribe(
      (vall) => {
        this.postId = vall.id;
        this.postData = this.postsService.getPostById(vall.id)
      },
      error => console.log(error)      
    )
    this.postsService.fetchComments(this.postId).subscribe(
      (vall) => {
        this.comments = vall;
        console.log("comments: ", vall);
      },
      error => console.log(error)
    )
  }
}
