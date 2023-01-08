import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private loginSubject = new Subject<any>();
  private reviewSubject = new Subject<any>();

  constructor() { }

  /* LOGIN */
  publishLogin(): void {    
    this.loginSubject.next(true);
  }
  
  publishLogout(): void {    
    this.loginSubject.next(false);
  }

  getLoginObservable(): Subject<any> {
    return this.loginSubject;
  }

  /* REVIEW */
  publishReview(): void {
    this.reviewSubject.next(null);
  }

  getReviewObservable(): Subject<any> {
    return this.reviewSubject;
  }

}
