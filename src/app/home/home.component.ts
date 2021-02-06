import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  inventory: any[] = [];
  name = '';
  curItem: any;
  qty = '';
  items: any[] = [];
  totalPrice = 0;

  constructor(private ds: DataService, private router: Router) {}

  ngOnInit(): void {
    this.ds.inventory.subscribe((res) => {
      this.inventory = res;
      console.log('res', res);
    });
  }

  addItem(): void {
    this.curItem = this.inventory.filter((item) => item.name == this.name)[0];
    console.log(this.curItem);
    let rate;
    if (this.curItem == undefined) {
      this.curItem = { name: this.name };
      rate = prompt(
        'Item not present in inventory. Enter rate of the item to add it to the list:'
      );
      if (rate == undefined) this.curItem = undefined;
      else this.curItem.rate = +rate;
    }
    if (this.curItem != null && +this.qty > 0) {
      const item = {
        name: this.curItem.name,
        rate: +this.curItem.rate,
        qty: +this.qty,
        price: this.curItem.rate * +this.qty,
      };
      this.totalPrice += +item.price;
      this.items.unshift(item);
    }
    this.resetForm();
  }

  removeItem(index: number): void {
    this.totalPrice -= this.items[index].price;
    this.items.splice(index, 1);
  }

  onPrint(): void {
    console.log(this.items);
    this.ds.items = this.items;
    this.ds.totalAmount = this.totalPrice;
    this.router.navigate(['bill']);
  }

  resetForm() {
    this.name = '';
    this.qty = '';
    this.curItem = null;
  }

  onReset(): void {
    this.resetForm();
    this.items = [];
    this.totalPrice = 0;
  }
}
