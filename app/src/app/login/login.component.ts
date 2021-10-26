import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';
import { JwtHelperService } from '@auth0/angular-jwt';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    passWord: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              
              
              ) { }
  
  
  validUser = false;
  
  ngOnInit(): void {
  
  }

  
  // Password1000
  
  valid(): void {   
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.validUser = true;
        this.authService.saveToken(data);                
      });
  }

  login(){
    this.valid(); 
    this.validUser ? this.router.navigate(['/']) : window.alert("Tên tài khoản hoặc mật khẩu chưa chính xác !!!");
  }

  reloadPage(): void {
    window.location.reload();
  }

 
}
