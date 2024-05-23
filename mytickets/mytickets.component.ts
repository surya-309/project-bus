import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mytickets',
  templateUrl: './mytickets.component.html',
  styleUrl: './mytickets.component.css'
})
export class MyticketsComponent implements OnInit {
  readonly baseUrl = 'https://localhost:7248/api/User/Getmytickets';
  readonly cancelUrl = 'https://localhost:7248/api/User/';

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

  showCancelConfirmation(ticket: any, index: number) {
    this.selectedTicket = ticket;
    this.selectedIndex = index;
    this.displayModal = 'block';
  }

  hideModal() {
    this.displayModal = 'none';
  }

  confirmCancelTicket(ticket: any, index: number) {
    this.http.delete<void>(`${this.cancelUrl}${ticket.Name}`,{responseType:'text' as 'json'}).subscribe(
      () => {
       
        this.tickets.splice(index, 1);
        this.hideModal();
        this.getmytickets(); 
      },
      (error) => {
        if (error.error && typeof error.error === 'string' && error.error.trim() === 'Canceled') {
          
          this.hideModal();
          this.getmytickets(); 
        } else {
          
          console.error('Error cancelling ticket:', error);
        }
      }
    );
  }
  
}
