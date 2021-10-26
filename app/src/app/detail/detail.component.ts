
import { HttpServerService } from '../services/http-server.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  commentFormGr = new FormGroup({
    content : new FormControl('')
  });

  imageId! : number;
  image : any;
  user : any;
  isLike : any;
  comments : any;
  
  hasLike = {color : 'red'}
  noLike = {color : '#ccc'}

  constructor(private serverHttp : HttpServerService,
              private route: ActivatedRoute,
              private router : Router,
              private authService : AuthService,          
              )
              {} 


  ngOnInit(): void {
    this.user = this.authService.getUserDecode();

    this.GetImageIdParams();
    
    this.GetImageById();

    this.getIsLike();
    
    this.getComment();
    
  }

  GetImageIdParams(){
    this.route.params.subscribe(params => {
      this.imageId = +params['imageId'];
    });
  }

  GetImageById(){
    if(this.imageId > 0) {
      this.serverHttp.getImageById(this.imageId).subscribe((data) => {
        this.image = data;
        // console.log(this.image);
        // console.log(this.user);
      });
    }
  }

  getIsLike(){
    this.serverHttp.getLike(this.user.userId, this.imageId).subscribe(data => {
      this.isLike = data.isLike;
      console.log(this.isLike);
    })
  }

  like() {
    this.serverHttp.LikeByUser(this.user.userId, this.image.id, this.image).subscribe(data => {
      this.GetImageById();
      this.getIsLike();
    })
    
  }

  getComment() {
    this.serverHttp.getComment(this.imageId).subscribe(data => {
      this.comments = data;
    })
  }

  sendComment() {
    this.serverHttp.postComment(this.user.userId, this.imageId, this.commentFormGr.value).subscribe(data => {
      this.serverHttp.IncreaseComment(this.imageId,this.image).subscribe(data => {})
      this.getComment();
      this.GetImageById();
      this.commentFormGr.reset();
    })
  }
     
}
