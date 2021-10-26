import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.logOut();
    this.getUser();
  }

  logOut(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
  
  getUser(){
    this.user = this.authService.getUserDecode();
  }
}
