import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bill', component: BillPageComponent },
  { path: 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
