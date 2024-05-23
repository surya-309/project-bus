import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyticketsComponent } from './mytickets/mytickets.component';
import { TicketbookingformComponent } from './ticketbookingform/ticketbookingform.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthInterceptorProvider } from './services/auth.interceptor';
import { DatePipe } from '@angular/common';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { BusdetailsComponent } from './busdetails/busdetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AllticketsComponent } from './alltickets/alltickets.component';
import { UpdatebusComponent } from './updatebus/updatebus.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { adminGuard } from './guard/admin.guard';
import { userGuard } from './guard/user.guard';





const routes: Routes = [ { path :'register' ,component: RegisterComponent}, 
{ path :'' ,component: LoginComponent},
{ path :'Home' ,component: HomeComponent, canActivate:[userGuard]},
{ path :'mytickets' ,component: MyticketsComponent, canActivate:[userGuard]},
{ path :'booking' ,component: TicketbookingformComponent, canActivate:[userGuard]},
{ path :'addbus' ,component: BusdetailsComponent,canActivate:[adminGuard]},
{ path :'userdetails' ,component: UserdetailsComponent,canActivate:[adminGuard]},
{ path :'alltickets' ,component: AllticketsComponent,canActivate:[adminGuard]},
{ path :'updatebus' ,component: UpdatebusComponent,canActivate:[adminGuard]},
{ path :'adminlogin' ,component: AdminloginComponent},
{ path :'adminhome' ,component: AdminHomeComponent, canActivate:[adminGuard]}


]

@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    MyticketsComponent,
    TicketbookingformComponent,
    AdminheaderComponent,
    BusdetailsComponent,
    UserdetailsComponent,
    AllticketsComponent,
    UpdatebusComponent,
    AdminHomeComponent,
    AdminloginComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    

  

    RouterModule.forRoot(routes),
    FormsModule,
    
   
  ],
  providers: [ AuthInterceptorProvider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
