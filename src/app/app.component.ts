import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  joke: any;
  networkStatus: any;
  networkStatus$: Subscription = Subscription.EMPTY;

  refresh() {
    this.http
      .get('https://api.chucknorris.io/jokes/random')
      .subscribe((res) => {
        this.joke = res;
      });
  }

  ngOnInit() {
    // this.refresh();
    this.checkNetworkStatus();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
        this.refresh()
      });
  }
}
