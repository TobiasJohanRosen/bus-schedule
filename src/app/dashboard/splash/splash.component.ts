import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iw-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public loading: boolean = false;

  constructor() {
    setTimeout(() => {
      this.loading = true;
    }, 2000);
  }

  ngOnInit() {}
}
