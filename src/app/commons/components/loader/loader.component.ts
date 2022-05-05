import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './commons/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  private loaderSubscriptionRef = new Subscription();
  textLoader: string;
  showLoader = false;

  constructor(private loaderService: LoaderService) {
    this.textLoader = '...Cargando';
  }

  ngOnInit(): void {
    this.loaderSubscription();
  }

  ngOnDestroy(): void {
    this.loaderSubscriptionRef.unsubscribe();
  }

  private loaderSubscription() {
    this.loaderSubscriptionRef = this.loaderService.loader$.subscribe(
      (state) => {
        this.showLoader = state;
      }
    );
  }
}
