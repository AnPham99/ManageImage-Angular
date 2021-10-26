import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-hot-image',
  templateUrl: './hot-image.component.html',
  styleUrls: ['./hot-image.component.css']
})
export class HotImageComponent implements OnInit {

  images : any;
  topLike : any;
  topCmt : any;
  topView : any;

  constructor(private httpSever : HttpServerService) { }

  ngOnInit(): void {
    this.getTopLike();
    this.getTopCmt();
    this.getTopView();
  }

  getTopLike(){
    this.httpSever.getTopLike().subscribe( data => {
      this.topLike = data;
    })
  }

  getTopCmt(){
    this.httpSever.getTopCmt().subscribe( data => {
      this.topCmt = data;
    })
  }

  getTopView(){
    this.httpSever.getTopView().subscribe( data => {
      this.topView = data;
    })
  }
}
