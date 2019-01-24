import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'iw-update-splash',
  templateUrl: './update-splash.component.html',
  styleUrls: ['./update-splash.component.scss']
})
export class UpdateSplashComponent implements OnInit {
  public loading: boolean = false;

  constructor() {
    setTimeout(() => {
      this.loading = true;
    }, 2000);
  }

  ngOnInit() {}
}
