import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  loginForm! : FormGroup;
  
  constructor(private fb : FormBuilder,private auth:AuthService, private router:Router){


  }
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        Email: ['',Validators.required],
        Password: ['',Validators.required]
      })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.get('Email').value,
        password: this.loginForm.get('Password').value
      };
  
      this.auth.login(formData).subscribe({
        next: (res) => {
          if(res== 'invalid' || res == 'Invalid'){
            alert('invalid credentials')
          }
          else{
            alert('user logged in');
            localStorage.setItem("token",res);
            this.router.navigateByUrl('/adminhome');
            
          }
         
        },
        error: (err) => {
          alert(err.message);
        }
      });
    } else {
      console.log("not correct");
      alert("your form is invalid");
      this.validateAllFormFields(this.loginForm);
    }
  }
  
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  

}
