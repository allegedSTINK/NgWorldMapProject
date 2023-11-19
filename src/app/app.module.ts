import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldViewComponent } from './world-view/world-view.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SharedDataService } from './shared-data.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';

const routes: Routes = [
  { path: '', component: WorldViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WorldViewComponent,
    TopBarComponent,
    SideBarComponent,
    BottomBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
