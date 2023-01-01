import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: ['',
      [Validators.required, Validators.email]
    ],
    password: ['', Validators.required]
  })

  get email(): any { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  onSubmit() {
    console.log('Submited');
    this.router.navigate(['login']);
  }

}
