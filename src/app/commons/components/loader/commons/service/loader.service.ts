import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject(false);
  loader$ = this.loaderSubject.asObservable();

  showLoader() {    
    if (this.loaderSubject.getValue()) {
      return;
    }
    this.loaderSubject.next(true);
  }
  closeLoader() {
    this.loaderSubject.next(false);
  }
}
