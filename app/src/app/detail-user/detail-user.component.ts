import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  
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
              private authService : AuthService
              ){ } 


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
      this.commentFormGr.reset();
    })
    this.GetImageById();
  }

  goToUpdateImage(){
    this.router.navigate(["/update-image",this.image.userId,this.imageId]);
  }

  deleteImg(){
    this.serverHttp.deleteImage(this.image.userId, this.imageId).subscribe(data => {
      this.router.navigate(['/manage-image', this.user.userId]);
      // this.router.navigate(['/home']);

    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
