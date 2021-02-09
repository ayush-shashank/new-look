import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  invoiceNo: number = 0;
  inventory: any[] = [];
  name = '';
  curItem: any;
  quantity = '';
  items: any[] = [];
  totalPrice = 0;

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.ds.inventory.subscribe((res: any) => {
      this.inventory = res;
      console.log('res', res);
    });
    this.invoiceNo = this.ds.lastInvoice;
  }

  addItem(): void {
    console.log(this.quantity);
    this.curItem = this.inventory.filter((item) => item.name === this.name)[0];
    // console.log(this.curItem);
    if (!this.curItem) {
      let rate = prompt(
        'Item not present in inventory. Enter rate of the item to add it to the list:'
      );
      console.log(rate, +rate!);
      if (rate) {
        if (isNaN(+rate)) {
          alert('Invalid Input');
        } else {
          this.curItem = { name: this.name, rate: +rate };
        }
      }
    }
    if (this.curItem && +this.quantity > 0) {
      const item = {
        name: this.curItem.name,
        rate: this.curItem.rate,
        quantity: +this.quantity,
        price: this.curItem.rate * +this.quantity,
      };
      // console.log(item);
      this.totalPrice += +item.price;
      this.items.unshift(item);
    }
    this.resetForm();
  }

  removeItem(index: number): void {
    this.totalPrice -= this.items[index].price;
    this.items.splice(index, 1);
  }

  onPrint() {
    console.log(this.items);
    this.ds.generateBill(this.items, this.totalPrice);
    this.router.navigate(['bill']);
  }

  resetForm(): void {
    this.name = '';
    this.quantity = '';
    this.curItem = null;
  }

  onReset(): void {
    this.resetForm();
    this.items = [];
    this.totalPrice = 0;
  }
}
