import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})
export class AnimalsListComponent implements OnInit {
  animals?: Animal[];
  currentAnimal: Animal = {};
  currentIndex: number = -1;
  title: string = '';

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.retrieveAnimals();
  }

  retrieveAnimals(): void {
    this.animalService.findAll()
      .subscribe({
        next: (animals) => {
          this.animals = animals;
          console.log(animals);
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
