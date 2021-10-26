import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-manage-image',
  templateUrl: './manage-image.component.html',
  styleUrls: ['./manage-image.component.css']
})
export class ManageImageComponent implements OnInit {

  images : any;
  userId : any;
  user : any;
  notImage! : boolean;
  constructor(private httpServer : HttpServerService,
              private route : ActivatedRoute,
              private router : Router,
              private authService : AuthService)
  {}

  ngOnInit(): void {   
    this.route.params.subscribe(params => {
      this.userId = params['userId'];

    this.getImageByUser();

    this.getUserByToken();
    });

    // this.logOut();
  }

  getUserByToken(){
    this.user = this.authService.getUserDecode();
    console.log(this.user);
  }

  getImageByUser(){
    this.httpServer.GetAllImageByUser(this.userId).subscribe(data =>{
      this.images = data;
          
    })
  }

  
  getImageDetailByUser(userId : string, imageId : number){
    this.router.navigate(["/image-detail-by-user/", userId, imageId]);
  }

  goToUpdateImage(userId : any, imageId : number){
    this.router.navigate(["/update-image",userId,imageId]);
  }

  deleteImage(userId : string, imageId : number){
    this.httpServer.deleteImage(userId, imageId).subscribe(data => {
      // this.router.navigate(["/"]);
      this.reloadPage();

    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}
