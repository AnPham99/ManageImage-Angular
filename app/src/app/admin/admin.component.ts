import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  images : any;
  image : any;
  img : any;
  deny! : boolean;

  
  constructor(private severHttp : HttpServerService) { }

  ngOnInit(): void {
    this.getImageNotApproval();
  
  }

  getImageNotApproval(){
    this.severHttp.getImageNotApproval().subscribe(data => {
      this.images = data;
      console.log(this.images);
    })
  }

  denyRequest(imageId : number){
    this.severHttp.getImageById(imageId).subscribe(data => {
      this.severHttp.denyByAdminImage(imageId, data).subscribe(data =>{
        this.getImageNotApproval();
      })
    })
  }
 
  approval(imageId : number){
    this.severHttp.getImageById(imageId).subscribe(data => {   
      // data.isApproval = true;
      this.severHttp.approvalImageByAdmin(imageId, data).subscribe(data => {
        this.getImageNotApproval();
      });
    })
  }

  
}
