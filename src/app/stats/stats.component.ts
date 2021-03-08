import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Order } from '../order';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  startDate: any;
  endDate: any;
  orders: any[] = [];
  total = 0;
  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.orders = this.ds.orders;
  }
  getStats(): void {
    console.log('btn>clicked');
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);
    console.log('SD', this.startDate);
    console.log('ED', this.endDate);
    this.ds.getOrders(this.startDate, this.endDate).subscribe((res) => {
      const data = res.docs.map((order: any) => order.data());
      console.log('data', data);
      this.orders = data;
      this.orders.forEach((order: any) => {
        order.date = order.date.toDate();
        this.total += order.total;
      });
    });
  }
  onPrint(): void {
    window.print();
  }
}
