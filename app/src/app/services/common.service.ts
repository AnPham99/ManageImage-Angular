import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor(private severHttp : HttpServerService) { }
}
