import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http' 

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { CommentComponent } from './comment/comment.component';
import { ValidatorDirective } from './directives/validator.directive';

const appRouts: Routes = [
  { path: '', component: PostsComponent, },
  { path: 'post/:id', component: PostComponent,},
  { path: 'new-post', component: NewPostComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsComponent,
    NewPostComponent,
    CommentComponent,
    ValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRouts),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
