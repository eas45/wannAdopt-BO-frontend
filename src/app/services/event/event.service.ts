import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private loginSubject = new Subject<any>();

  constructor() { }

  publishLogin(): void {    
    this.loginSubject.next(true);
  }
  
  publishLogout(): void {    
    this.loginSubject.next(false);
  }

  getLoginObservable(): Subject<any> {
    return this.loginSubject;
  }

}
