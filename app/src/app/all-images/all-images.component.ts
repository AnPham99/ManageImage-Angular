import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})
export class AllImagesComponent implements OnInit {
 
  images : any;

  config: any;
  count! : string;

  constructor(private serverHttp : HttpServerService, private route : ActivatedRoute, private router : Router) 
  { 
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.count
    };
  } 

  ngOnInit(): void {
    this.getImageHasApproval2();
  }

  getImageHasApproval2(){
    this.serverHttp.getImageHasApproval().subscribe((data) => {
      this.images = data;
      this.count = data.length;
      console.log(this.images);
    });
  }

  viewDetail(imageId : number, data : any) {
    this.serverHttp.IncreaseView(imageId, data).subscribe(data =>{});
    this.router.navigate(["/image-detail", imageId]);
  }

  pageChanged(event : any){
    this.config.currentPage = event;
  }
}
