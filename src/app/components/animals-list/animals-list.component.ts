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
  pageSizes = [3, 6, 9];

  animalSelected: boolean = false;
  requests = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.retrieveAnimals();
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAnimals(): void {
    const params = this.getRequestParams(this.page, this.pageSize);

    this.animalService.findAllByShelter(params)
      .subscribe({
        next: (response) => {
          const { animals, totalItems } = response;
          this.animals = animals;
          this.count = totalItems;
          console.log(animals);
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  resetList(): void {
    this.currentIndex = -1;
  }

  resetAll(): void {
    this.currentAnimal = {};
    this.currentIndex = -1;
    this.animalSelected = false;
  }

  refreshList(): void {
    this.retrieveAnimals();
    this.resetAll();
  }

  setActiveAnimal(animal: Animal, index: number): void {
    this.currentAnimal = animal;
    this.currentIndex = index;
    // Solicitar personas interesadas en él
    this.animalService.getResquests(animal?.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.animalSelected = true;
          this.retrieveAnimalRequests();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAnimals();
    this.resetList();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAnimals();
    this.resetAll();
  }

  retrieveAnimalRequests(): void {
    this.animalService.getResquests(this.currentAnimal.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.requests = res;
        },
        error: (err) => {
          console.log(err.error);
        }
      })
  }

}
