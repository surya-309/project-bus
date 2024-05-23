import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-ticketbookingform',
  templateUrl: './ticketbookingform.component.html',
  styleUrl: './ticketbookingform.component.css'
})
export class TicketbookingformComponent implements OnInit {
  bookingForm: FormGroup;
  bookings: any[] = [];
  from:string;
  to:string;
  price:number;
  private baseUrl : string = 'https://localhost:7248/api/booking';

  constructor(private fb: FormBuilder, private route: ActivatedRoute,private  http:HttpClient,private datePipe: DatePipe) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.price = params['price']
      this.bookingForm = this.fb.group({
        name: ['', Validators.required],
        from: [this.from, Validators.required],
        to: [this.to, Validators.required],
        noOfTickets: [1, Validators.required],
        date: [new Date().toISOString().split('T')[0], Validators.required],
        totalPrice: [this.price, Validators.required]
      });
    });
  }
  bookTicket(bookings: any[]) {
    return this.http.post<any>(this.baseUrl , bookings);
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addBooking() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;
      const bookingData = {
        name: formValue.name,
        from: formValue.from,
        to: formValue.to,
        userid: 0,
        date:   this.formatDate(new Date(formValue.date)),
        noOfTickets: formValue.noOfTickets,
        totalPrice: formValue.totalPrice
      };
  
      this.bookings.push(bookingData);
      this.bookingForm.reset({
        from: this.from,
        to: this.to,
        noOfTickets: 1,
        date: new Date(),
        totalPrice: this.price
      });
      console.log((formValue.date));
    }
  }

  removeBooking(index: number) {
    this.bookings.splice(index, 1);
  }
 

  onBooking() {
    // Handle booking submission
      if (this.bookings.length > 0) {
        this.bookTicket(this.bookings).subscribe({
          next: (res) => {
            if (res.message) {
              alert(res.message);
            } else {
              console.log(res);
              alert('Booking successful');
            }
          },
          error: (err) => {
            alert(err.error.text);
            console.log(err)
          }
        });
        this.bookings = []; 
      }
      
    }
  
    

}
