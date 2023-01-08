import { Component, Input } from '@angular/core';
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent {
  @Input() requests: any[] = [];
  faCheck = faCheckCircle;
  faXMark = faXmarkCircle;
}
