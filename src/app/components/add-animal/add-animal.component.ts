import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';
import jwtDecode from 'jwt-decode';
import { StorageService } from 'src/app/services/storage/storage.service';

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
    sex: ['0', Validators.required],
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
    private animalService: AnimalService,
    private storageService: StorageService) { }

  get name(): any { return this.animalForm.get('name'); }
  get breed(): any { return this.animalForm.get('breed'); }
  get age(): any { return this.animalForm.get('age'); }
  get sex(): any { return this.animalForm.get('sex'); }
  get energy(): any { return this.animalForm.get('energy'); }
  get size(): any { return this.animalForm.get('size'); }
  get hair(): any { return this.animalForm.get('hair'); }

  async saveAnimal(): Promise<void> {
    const animal: Animal = {
      name: this.name.value,
      breed: this.breed.value,
      age: this.age.value,
      sex: this.sex.value == '0' ? false : true,
      energy: this.energy.value,
      size: this.size.value,
      hair: this.hair.value,
    };

    console.log(animal);

    const token = this.storageService.getToken();
    const decodedToken = jwtDecode(token);
    const { id }: any = decodedToken;

    this.animalService.create(animal, id)
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
