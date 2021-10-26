import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  role ="Admin";
  err : any;
  isDone = true;
  isChangeEmail : any;
  isChangeUser : any;
  isChangeConfirm : any;

  registerForm = new FormGroup({
    firstName: new FormControl('',Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ])),
    lastName: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30)
    ])),
    email : new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    phoneNumber : new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    roles : new FormControl([this.role])
  });
  
  constructor(private router: Router,private authService: AuthService) {}


  ngOnInit(): void {
  
  }
  

  register(){
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(this.registerForm.value);
      this.router.navigate(['/login']);
    }, 
    err => {
      this.isDone = false;
      this.isChangeEmail = false;
      this.isChangeUser = false;
      this.isChangeConfirm = false;
      if (err.status == 400) {
        this.err = err.error;
      }
      console.log(this.err);
    });  
  }

  changeConfirm()
  {
    this.isChangeConfirm = true;
  }

  changeEmail(){
    this.isChangeEmail = true;
  }

  changeUser() {
    this.isChangeUser = true;
  }

}

