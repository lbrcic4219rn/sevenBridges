import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isPage: boolean = false;

  constructor( private postsService: PostsService, private router: Router, private route: ActivatedRoute) { }

  onPostClick(){
    if(!this.isPage)
      this.router.navigate(['post', this.postData.id])
  }

  onSubmit(form: NgForm){
    const comment: Comment = {
      postId: this.postData.id,
      name: "",
      email: "",
      id: this.postData.comments.length + 1,
      body: form.form.value.content,
    }
    this.postData.comments.unshift(comment);
    console.log(form);
    
  }

  ngOnInit(): void {
    if(Object.keys(this.route.snapshot.params).length === 0){
      this.isPage = false;
      return;
    }else {
      this.isPage = true;
    }
    this.route.params.subscribe(
      (vall) => {
        this.postId = vall.id;
        this.postData = this.postsService.getPostById(vall.id)
      },
      error => console.log(error)      
    )
    if(!this.postData.comments){
      this.postsService.fetchComments(this.postId).subscribe(
        (vall) => {
          this.postData.comments = vall;
          console.log("comments: ", vall);
        },
        error => console.log(error)
      )
    }
  }
}
