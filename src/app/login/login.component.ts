import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    nickname: ['', Validators.required],
    password: ['', Validators.required]
  })

  public get nickname() { return this.loginForm.value.nickname; }
  public get password() { return this.loginForm.value.password; }

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  onSubmit() {
    console.log('Submited');
    this.router.navigate(['home']);
  }

}
