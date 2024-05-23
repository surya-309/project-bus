import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatebus',
  templateUrl: './updatebus.component.html',
  styleUrl: './updatebus.component.css'
})
export class UpdatebusComponent implements OnInit {
  baseUrl: string = 'https://localhost:7248/api/Bus';
  EditUrl: string = 'https://localhost:7248/api/Bus';
  EditForm: FormGroup;
  bus: any[];
  selectedBus: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.EditForm = this.formBuilder.group({
      Id: ['', Validators.required],
      busNumber: ['', Validators.required],
      driverId: ['', Validators.required],
      from: ['', Validators.required],
      noSeats: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBuses();
  }

  getBuses(): void {
    this.http.get(this.baseUrl).subscribe(
      (data) => {
        this.bus = data as any[];
      },
      (error) => {
        console.error('Error fetching buses:', error);
      }
    );
  }

  editBus(bus: any): void {
    this.selectedBus = { ...bus };
    this.EditForm.patchValue({
      Id: this.selectedBus.Id,
      busNumber: this.selectedBus.BusNumber,
      driverId: this.selectedBus.DriverId,
      from: this.selectedBus.From,
      noSeats: this.selectedBus.NoSeats,
      to: this.selectedBus.To,
      type: this.selectedBus.Type,
      price: this.selectedBus.price,
      time: this.selectedBus.time
    });
  }

  updateBus(): void {
    if (this.EditForm.valid) {
      const formData = {
        Id: this.EditForm.get('Id').value,
        BusNumber: this.EditForm.get('busNumber').value,
        DriverId: this.EditForm.get('driverId').value,
        From: this.EditForm.get('from').value,
        NoSeats: this.EditForm.get('noSeats').value,
        To: this.EditForm.get('to').value,
        Type: this.EditForm.get('type').value,
        price: this.EditForm.get('price').value,
        time: this.EditForm.get('time').value
      };
  
      this.http.put<any>(this.EditUrl, formData).subscribe({
        next: (res) => {
          alert('Bus updated successfully');
          this.getBuses();
          this.selectedBus= null;
        },
        error: (err) => {
          this.selectedBus= null;
          this.getBuses();
          alert('sucessfully updated')
        }
      });
    }
  }
  
}
