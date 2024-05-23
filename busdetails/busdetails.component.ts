import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-busdetails',
  templateUrl: './busdetails.component.html',
  styleUrl: './busdetails.component.css'
})
export class BusdetailsComponent implements OnInit {
  driverForm: FormGroup;
  busForm: FormGroup;
  driverUrl: any = 'https://localhost:7248/api/Driver';
  busUrl: any = 'https://localhost:7248/api/Bus';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required]
    });
    this.busForm = this.fb.group({
      busNumber: ['', Validators.required],
      noSeats: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      DriverId: ['', Validators.required],
      availableSeats: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      const formData = {
        driverName: this.driverForm.get('name').value,
        contact: this.driverForm.get('contact').value
      };
      this.http.post<any>(this.driverUrl, formData).subscribe({
        next: (res) => {
          alert('Added Driver');
        },
        error: (err) => {
          alert(err.message);
        }
      });
      this.driverForm.reset();
    }
  }

  onBusSubmit() {
    if (this.busForm.valid) {
      const fdata = {
        busNumber: this.busForm.get('busNumber').value,
        noSeats: this.busForm.get('noSeats').value,
        type: this.busForm.get('type').value,
        price: this.busForm.get('price').value,
        from: this.busForm.get('from').value,
        to: this.busForm.get('to').value,
        DriverId: this.busForm.get('DriverId').value,
        availableSeats: this.busForm.get('availableSeats').value,
        time: this.busForm.get('time').value
      };
      console.log(fdata);

      this.http.post<any>(this.busUrl, fdata).subscribe({
        next: (res) => {
          alert('Bus Added');
        },
        error: (err) => {
          alert(err.message);
        }
      });
      this.busForm.reset();
    }
  }
}
