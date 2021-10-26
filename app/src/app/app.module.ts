import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DetailComponent } from './detail/detail.component';
import { AllImagesComponent } from './all-images/all-images.component';
import { CategoryComponent } from './category/category.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ImageInCateComponent } from './image-in-cate/image-in-cate.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { HotImageComponent } from './hot-image/hot-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './share/authconfig.interceptor';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AdminComponent } from './admin/admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import { UserinfoComponent } from './userinfo/userinfo.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent,
    AllImagesComponent,
    CategoryComponent,
    AddImageComponent,
    ImageInCateComponent,
    ManageImageComponent,
    HotImageComponent,
    UpdateImageComponent,
    LoginComponent,
    RegisterComponent,
    DetailUserComponent,
    AdminComponent,
    SearchComponent,
    UserinfoComponent,
    

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
