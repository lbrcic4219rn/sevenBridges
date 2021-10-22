import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() commentData: Comment =  {
    body: "",
    email: "",
    id: 0,
    name: "",
    postId: 0,
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
