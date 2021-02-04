import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css'],
})
export class BillPageComponent implements OnInit {
  items: any[];
  totalAmount = 0;
  today: string;
  constructor(private ds: DataService) {
    this.items = ds.items.reverse();
    this.totalAmount = ds.totalAmount;
    const d = new Date();
    const date = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    this.today = `${date}/${month}/${year}`;
  }

  ngOnInit(): void {
    // window.print();
  }
}
