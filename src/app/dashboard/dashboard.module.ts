import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { StopComponent } from "./stop/stop.component";
import { SharedModule } from "../shared/shared.module";
import { SplashComponent } from './splash/splash.component';
import { LogoComponent } from './logo/logo.component';
import { FatalComponent } from './fatal/fatal.component';
import { UpdateSplashComponent } from './update-splash/update-splash.component';

@NgModule({
  declarations: [DashboardComponent, StopComponent, SplashComponent, LogoComponent, FatalComponent, UpdateSplashComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
