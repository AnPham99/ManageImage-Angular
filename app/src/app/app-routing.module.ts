import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllImagesComponent } from './all-images/all-images.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './share/auth.guard';
import { AddImageComponent } from './add-image/add-image.component';
import { DetailComponent } from './detail/detail.component';
import { ImageInCateComponent } from './image-in-cate/image-in-cate.component';
import { ManageImageComponent } from './manage-image/manage-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AdminComponent } from './admin/admin.component';
import { ApprovalGuard } from './share/approval.guard';
import { SearchComponent } from './search/search.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

// import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent, children:[
    { path: '', component: AllImagesComponent, canActivate: [AuthGuard]},
    { path: 'search', component:SearchComponent, canActivate: [AuthGuard]},
    { path: 'admin', component: AdminComponent, canActivate: [ApprovalGuard,AuthGuard], data: {expectedRole: 'Admin'}},
    {path : 'userinfo', component : UserinfoComponent, canActivate: [AuthGuard]},
    { path: ':page', component: AllImagesComponent, canActivate: [AuthGuard]},
    { path: 'image-in-cate/:cateId', component: ImageInCateComponent, canActivate: [AuthGuard]},
    { path: 'image-detail/:imageId', component: DetailComponent, canActivate: [AuthGuard]},
    { path: 'update-image/:userId/:imageId', component: UpdateImageComponent, canActivate: [AuthGuard]},
    { path: 'add-image/:userId', component: AddImageComponent, canActivate: [AuthGuard]},
    { path: 'manage-image/:userId', component: ManageImageComponent, canActivate: [AuthGuard]},
    { path: 'image-detail-by-user/:userId/:imageId', component: DetailUserComponent, canActivate: [AuthGuard]},
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
