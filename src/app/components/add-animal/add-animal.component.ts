import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent {
  animalForm = this.fb.group({
    name: ['', Validators.required],
    breed: ['', Validators.required],
    age: [0, Validators.required],
    sex: [false, Validators.required],
    energy: [''],
    size: [''],
    hair: ['']
  });
  submitted: boolean = false;
  energyList = ['Poca', 'Mucha'];
  sizeList = ['Pequeño', 'Mediano', 'Grande'];
  hairList = ['Corto', 'Largo'];

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService) { }

  get name(): any { return this.animalForm.get('name'); }
  get breed(): any { return this.animalForm.get('breed'); }
  get age(): any { return this.animalForm.get('age'); }
  get sex(): any { return this.animalForm.get('sex'); }
  get energy(): any { return this.animalForm.get('energy'); }
  get size(): any { return this.animalForm.get('size'); }
  get hair(): any { return this.animalForm.get('hair'); }

  saveAnimal(): void {
    const animal: Animal = {
      name: this.name.value,
      breed: this.breed.value,
      age: this.age.value,
      sex: this.sex.value == 'false' ? false : true,
      energy: this.energy.value,
      size: this.size.value,
      hair: this.hair.value,
    };

    console.log(animal);

    this.animalService.create(animal)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  newAnimal(): void {
    this.submitted = false;
    this.animalForm.reset();
  }

}
