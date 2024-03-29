import { Component } from '@angular/core';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { EventService } from './services/event/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wannAdopt-BO-frontend';
  isLoggedIn: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private event: EventService) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.event.getLoginObservable().subscribe((isLoggedIn) => {
      console.log('Usuario logueado : ' + isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });

    const token = this.storageService.getToken();
    console.log(token);
    
    this.isLoggedIn = token ? true : false;

    console.log('El estado del login es: ' + this.isLoggedIn);
    
  }
  
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.event.publishLogout();
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
