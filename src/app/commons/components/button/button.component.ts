import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() texto!: string;
  @Input() color!: string;
  @Input() type!: string;
  @Input() disabled!: boolean;
  @Output() evento = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  action() {
    this.evento.emit('Button');
  }
}
