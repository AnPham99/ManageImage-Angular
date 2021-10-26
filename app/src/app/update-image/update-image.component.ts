import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {
  imageId! : number;
  userId: any;
  cates : any;
  cate = "";
  image : any;
  status : any;
  
  imageForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    imageStatus : new FormControl(''),
    desciption: new FormControl(''),
    categoryId: new FormControl(''),
  });
  
  constructor(private serverHttp : HttpServerService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.serverHttp.getCategories().subscribe( data => {
      this.cates = data;  
    })

    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    
    this.route.params.subscribe(params => {
      this.imageId = +params['imageId'];
    });

    
    if(this.imageId > 0){
      this.loadData();
    }
  }

  private loadData() : any {
    
    this.serverHttp.GetImageByIdForUser(this.userId, this.imageId).subscribe(data => {
      this.image = data;
      // for (const controlName in this.imageForm.controls) {
      //   if (controlName) {
      //     this.imageForm.controls[controlName].setValue(data[controlName]);
      //   }
      // }
      this.imageForm.controls['name'].setValue(data.name);
      this.imageForm.controls['url'].setValue(data.url);
      this.imageForm.controls['imageStatus'].setValue(data.imageStatus);
      this.imageForm.controls['desciption'].setValue(data.desciption);
      this.imageForm.controls['categoryId'].setValue(data.categoryId);
      
      this.status = this.imageForm.controls['imageStatus'].value;
      console.log(this.imageForm.value);
      console.log(this.status + "aaa");

    });
  }



  onSubmit(): void {
    console.log(this.imageForm.value);
    this.serverHttp.updateImageByUser(this.userId,this.imageId,this.imageForm.value).subscribe((data) => {
      // this.router.navigate(['manage-image', this.userId]);
    });
  }

  updateOk(){
    this.router.navigate(['manage-image', this.userId]);
  }
  
  selectCate(event:any){
    this.cate = event.target.value;
  }


  changeStatus(event:any){
    this.imageForm.controls['imageStatus'].setValue(event.target.value);

    console.log(event.target.value);
  }
}
