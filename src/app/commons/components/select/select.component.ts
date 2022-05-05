import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() formParent!: FormGroup;
  @Input() label!: string;
  @Input() value!: string;
  @Input() name!: string;
  @Input() formControlName!: string;
  @Input() required!: boolean;
  @Input() options!: Array<string>;

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
