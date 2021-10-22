import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model'
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  statusMessage: string = "";


  constructor(private postsService: PostsService ) { }

  ngOnInit(): void { 
  }

  onSublimt(form: NgForm){
    if(!form.valid){
      console.log("nije validno bajo moj");
      this.statusMessage = "Title and content are required fields";
      return; 
    }
    const formValues = form.form.value;
    const post: Post = {
      id: 0,
      userId: 0,
      comments: [],
      ...formValues,
    }
    this.postsService.postPost(post).subscribe(
      val  => {
        this.postsService.addPost(val);
        this.statusMessage = "Succesfuly uploaded your Post" 
      },
      err => console.log(err),
    )  
  }

}
