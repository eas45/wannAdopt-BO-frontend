import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  get password(): any { return this.registerForm.get('password'); }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    console.log('Submited');
    this.authService.register(this.email?.value, this.password?.value)
      .subscribe(res => {
        console.log('Respuesta:');
        console.log(res);
      });
    this.router.navigate(['login']);
  }

}
