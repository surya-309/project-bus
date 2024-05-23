import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}
  logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');
 
    // Navigate to the login page or any other desired page
    this.router.navigateByUrl('');
  }

}
