import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userDecode : any;
  userInfo : any;
  userInfo2 : any;


  constructor(private httpSever : HttpServerService, private authService : AuthService) { }

  ngOnInit(): void {
    
    this.getUserDecode();
    this. getUserInfo();
  }

  getUserDecode() {
    this.userDecode= this.authService.getUserDecode();
      console.log(this.userDecode);
    }
  

  getUserInfo() {
    this.httpSever.getUSerInfo(this.userDecode.userId).subscribe(data => {
      this.userInfo = data;
      console.log(this.userInfo);
    })
  }
}
