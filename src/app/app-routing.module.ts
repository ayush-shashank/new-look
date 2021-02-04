import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bill', component: BillPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
