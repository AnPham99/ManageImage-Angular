import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  cates : any;

  constructor(private serverHttp : HttpServerService, private router : Router) { }

  ngOnInit(): void {
    this.serverHttp.getCategories().subscribe((data) => {
        this.cates = data;
        console.log(this.cates);
      });
  }
}
