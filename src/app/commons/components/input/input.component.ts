import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() rows!: string;
  @Input() value?: any;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() readonly!: boolean;
  @Input() name!: string;
  @Input() formControlName!: string;
  @Input() required!: boolean;
  @Input() formParent!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.formParent.addControl(
      this.name,
      new FormControl(
        this.value === '' ? '' : this.value,
        this.required ? Validators.required : null
      )
    );
  }
}
