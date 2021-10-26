import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm! : string;
  images : any;

  constructor(private route: ActivatedRoute, private httpServer : HttpServerService, private router: Router)
  { 
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // this.getQueryParams();

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.searchTerm = params.searchTerm;
        console.log(this.searchTerm); // price
      }
    );

    this.getImageBySearch();
  }

  getQueryParams() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.searchTerm = params.searchTerm;
        console.log(this.searchTerm); // price
      }
    );
  }

  getImageBySearch() {
    this.httpServer.searchImage(this.searchTerm).subscribe(data => {
      this.images = data;
    })
  }

  viewDetail(imageId : number, data : any) {
    this.httpServer.IncreaseView(imageId, data).subscribe(data =>{});
    this.router.navigate(["/image-detail", imageId]);
  }
}
