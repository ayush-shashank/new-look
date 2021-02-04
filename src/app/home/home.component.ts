import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newItemForm: FormGroup;
  items: any[] = [];
  totalPrice = 0;

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private router: Router
  ) {
    this.newItemForm = fb.group({
      name: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this.ds.getEvents().then((events) => (this.items = events));
  }

  addItem(): void {
    if (this.newItemForm.valid) {
      console.log(this.newItemForm.value);
      const item = {
        name: this.newItemForm.value.name,
        rate: +this.newItemForm.value.rate,
        qty: +this.newItemForm.value.qty,
        price: this.newItemForm.value.rate * this.newItemForm.value.qty,
      };
      this.totalPrice += +item.price;
      this.items.unshift(item);
      this.newItemForm.reset();
    }
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

  onReset(): void {
    this.newItemForm.reset();
    this.totalPrice = 0;
    this.items = [];
  }
}
