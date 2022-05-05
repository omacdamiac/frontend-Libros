import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UTILS } from '../../utils/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() rolUser: string;
  @Input() name: string;
  items = ['username', 'name', 'logueo', 'rol']; // items de sessionStorage

  constructor(private router: Router) {}

  ngOnInit(): void {}
  logout() {
    UTILS.logout();
    this.router.navigate(['/']);
  }
}
