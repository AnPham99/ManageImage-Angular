import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-image-in-cate',
  templateUrl: './image-in-cate.component.html',
  styleUrls: ['./image-in-cate.component.css']
})
export class ImageInCateComponent implements OnInit {
  
  cateId! : number;
  userId! : string;
  images : any;
  cate : any;
  newImage : any;
  constructor(private serverHttp : HttpServerService, private route : ActivatedRoute, private router : Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cateId = +params['cateId'];
    });
    
    this.serverHttp.getCateById(this.cateId).subscribe(data => {
      this.cate = data;
      console.log(this.cate);
    })

    this.getImageInCategory();

    this.getNewImageInCate();
  }
  
  getImageInCategory() {
    this.serverHttp.getImageInCate(this.cateId).subscribe(data => {
      this.images = data;
    },
    error => {
      console.log(error);
    })
  }

  getNewImageInCate() {
    this.serverHttp.getNewImageInCate(this.cateId).subscribe(data => {
      this.newImage = data;
    })
  }

  getImageById(imageId : number) {
    this.router.navigate(["/image-detail", imageId]);
  }

}
