import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  userId : any;
  cates : any;
  cate = "";
  status : any;
  
  imageForm = new FormGroup({
    name: new FormControl('', Validators.maxLength(50)),
    url: new FormControl(''),
    imageStatus : new FormControl('true'),
    desciption: new FormControl('', Validators.maxLength(500)),
    categoryId: new FormControl(''),
  });
  
  constructor(private serverHttp : HttpServerService,
              private router : Router,
              private route : ActivatedRoute  
            ) { }

  ngOnInit(): void {
    this.getCates();
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  getCates(){
    this.serverHttp.getCategories().subscribe( data => {
      this.cates = data;  
    })
  }

  onSubmit(): void {
    console.log(this.imageForm.value);
    this.serverHttp.addImage(this.userId,this.imageForm.value).subscribe((data) => {
      // this.router.navigate(['/manage-image',this.userId]);
    });
  }

  ok(){
    this.router.navigate(['/manage-image',this.userId]);
  }

  selectCate(event:any){
    this.cate = event.target.value;
  }


  publicStatus(event:any){
    this.status = event.target.value;
  }

  privateStatus(event:any){
    this.status = event.target.value;
  }

  

}
