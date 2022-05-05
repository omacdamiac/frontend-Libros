import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONST_STORAGE } from '../commons/const/constStorage';
import { DataPresenterService } from './modules/commons/services/data-presenter.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  sidebar!: any[];
  titleModulo: string;
  rolUser: string;
  name: string;
  constructor(
    private dataPresenterService: DataPresenterService,
    private router: Router
  ) {
    this.titleModulo = this.dataPresenterService.title;
    this.name = this.setUserData(CONST_STORAGE.NAME);
    this.rolUser = this.setUserData(CONST_STORAGE.ROL);
  }
  ngOnInit(): void {
    this.getSidebar();
  }
  getSidebar() {
    this.sidebar = this.dataPresenterService.main;
  }
  setUserData(dato: string) {
    return sessionStorage.getItem(dato);
  }
}
