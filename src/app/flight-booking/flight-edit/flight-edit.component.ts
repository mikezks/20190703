import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { validateCity } from '../../shared/validators/rx-city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit {

  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      id: [1],
      from: ['', validateCity(['Wien', 'Berlin'])],
      to: [],
      date: []
    });

    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('touched', this.editForm.touched);
    console.log('dirty', this.editForm.dirty);

    this.editForm.valueChanges
      .subscribe(console.log);
  }

  save(): void {
    console.log('Formular wurde wurde protokolliert', this.editForm.value);
  }

}
