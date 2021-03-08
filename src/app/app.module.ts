import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BillPageComponent } from './bill-page/bill-page.component';
import { ShowPricePipe } from './show-price.pipe';
import { DatePipe } from './date.pipe';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, BillPageComponent, ShowPricePipe, DatePipe, StatsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
