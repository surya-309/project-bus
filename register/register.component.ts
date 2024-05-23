

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*')]],
      password2: ['', [Validators.required]],
      termsAndConditions: [false, Validators.requiredTrue]
    }, {
      validator: this.matchPasswords('password1', 'password2')
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const formData = {
        name: this.signupForm.get('Name')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password1')?.value,
        PhnNo: this.signupForm.get('phNo')?.value,
        role: 'User'
      };
      this.auth.signUp(formData).subscribe({
        next: (res) => {
          alert('user registered');
          console.log(formData);
        },
        error: (err) => {
          alert(err.message);
        }
      });
    } else {
      this.validateAllFormFields(this.signupForm);
    }
  }

  private matchPasswords(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password1);
      const pass2Control = formGroup.get(password2);

      if (pass1Control?.value !== pass2Control?.value) {
        pass2Control?.setErrors({ mismatch: true });
      } else {
        pass2Control?.setErrors(null);
      }
    };
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
