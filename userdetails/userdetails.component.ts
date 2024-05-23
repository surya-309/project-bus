import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit {
  users: any;
  filteredUsers: any;
  searchTerm: string = '';

  constructor(private http : HttpClient) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get<any>('https://localhost:7248/api/User').subscribe((users) => {
      this.users = users;
      console.log(users)
      this.filteredUsers = users;
    });
  }

  searchUsers() {
    if (this.users) {
      this.filteredUsers = this.users.filter((user) =>
        user.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
