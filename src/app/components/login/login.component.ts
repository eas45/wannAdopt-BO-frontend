import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  get password(): any { return this.loginForm.get('password'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    // console.log(this.email.value);
    // console.log(this.password.value);

    this.authService.login(this.email.value, this.password.value)
      .subscribe({
        next: (res) => {
          console.log('Respuesta recibida');

          console.log(res);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log(`Error con estado ${err.status}:\n${err.error.message}`);
        }
      });
  }

}
