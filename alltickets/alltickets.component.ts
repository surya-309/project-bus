import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-alltickets',
  templateUrl: './alltickets.component.html',
  styleUrl: './alltickets.component.css'
})
export class AllticketsComponent {
  readonly baseUrl = 'https://localhost:7248/api/User/Getalltickets';
  
  tickets: any[] = [];
  displayModal = 'none';
  selectedTicket: any;
  selectedIndex: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getmytickets();
  }

  getmytickets() {
    this.http.get<any>(this.baseUrl).subscribe(data => {
      this.tickets = data;
      console.log(this.tickets);
    });
  }

  

  

  

}
