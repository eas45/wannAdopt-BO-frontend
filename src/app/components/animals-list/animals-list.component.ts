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

  refreshList(): void {
    this.retrieveAnimals();
    this.currentAnimal = {};
    this.currentIndex = -1;
  }

  setActiveAnimal(animal: Animal, index: number): void {
    this.currentAnimal = animal;
    this.currentIndex = index;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAnimals();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAnimals();
  }

}
