import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentAnimal: Animal = {
    name: '',
    breed: '',
    age: 0,
    sex: false,
    energy: '',
    size: '',
    hair: ''
  };
  message: string = '';

  constructor(
    private animalService: AnimalService,
    private router: Router) { }

  ngOnInit() { }

  find(id: string): void {
    this.animalService.find(id)
      .subscribe({
        next: (animal) => {
          this.currentAnimal = animal;
          this.viewMode = true;
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  update() {
    this.message = '';

    this.animalService.update(this.currentAnimal.id, this.currentAnimal)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Animal actualizado correctamente.';
        }
      });
  }

  delete(): void {
    this.animalService.delete(this.currentAnimal.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['animals']);
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

}
