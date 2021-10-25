import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model'
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  @ViewChild('cont') cont!: NgModel;
  statusMessage: string = "";
  contentErrorMessage: string = ""
  
  
  constructor(private postsService: PostsService ) { }

  ngOnInit(): void { 
    
  }

  displayMessage(event: Event) {
    if(this.cont.control.errors != null && this.cont.control.errors.forbiddenName != null)
      this.contentErrorMessage = this.cont.control.errors?.forbiddenName.value;
  }

  onSublimt(form: NgForm){
    if(!form.valid){
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
