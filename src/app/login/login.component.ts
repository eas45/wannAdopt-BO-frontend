import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['',
      [Validators.required, Validators.email]
    ],
    password: ['', Validators.required]
  })

  get email(): any { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  onSubmit() {
    console.log('Submited');
    this.router.navigate(['home']);
  }

}
