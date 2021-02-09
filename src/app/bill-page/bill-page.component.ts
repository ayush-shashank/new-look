import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../order';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css'],
})
export class BillPageComponent implements OnInit {
  order: Order;
  gstin = '';
  constructor(private ds: DataService) {
    this.order = ds.newOrder;
    this.gstin = ds.gstin;
  }

  ngOnInit(): void {
    // window.print();
  }
}
