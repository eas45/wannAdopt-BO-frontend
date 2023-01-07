import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {
  animals: Animal[] = [];
  currentAnimal: Animal = {};
  currentIndex: number = -1;

  page = 1;
  count = 0;
  pageSize = 3;
  pagesSizes = [3, 6, 9];

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.retrieveAnimals();
  }

  retrieveAnimals(): void {
    this.animalService.findAllByShelter()
      .subscribe({
        next: (response) => {
          this.animals = response.animals;
          console.log(response.animals);
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  refreshList(): void {
    this.retrieveAnimals();
    this.currentAnimal = {};
    this.currentIndex = -1;
  }

  setActiveAnimal(animal: Animal, index: number): void {
    this.currentAnimal = animal;
    this.currentIndex = index;
  }

}
