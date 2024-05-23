import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrl: './adminheader.component.css'
})
export class AdminheaderComponent {
  constructor(private router : Router){}

  logout() {
 
    localStorage.removeItem('admin-token');
 
 
    this.router.navigateByUrl('adminlogin');
  }


}
