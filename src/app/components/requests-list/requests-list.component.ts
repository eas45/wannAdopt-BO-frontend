import { Component, Input } from '@angular/core';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent {
  faCheck = faCheckCircle;
  faXMark = faXmarkCircle;

  @Input() requests: any[] = [];

  constructor(
    private animalService: AnimalService,
    private eventService: EventService
  ) { }

  reviewRequest(userId: any, animalId: any, status: any) {
    console.log('Aceptado al user: ' + userId + ' el animal ' + animalId);
    this.animalService.sendRequestReview(userId, animalId, status)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.eventService.publishReview();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
