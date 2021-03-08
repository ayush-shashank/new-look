import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from './order';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  inventory: any;
  store = { gstin: '', address: '', name: '' };
  lastInvoice = -1;
  newOrder: Order = {
    invoiceNo: -1,
    customer: '',
    date: new Date(),
    items: [],
    total: 0,
  };
  orders: any;
  inventoryCollection = this.db.collection('items');
  ordersCollection = this.db.collection('orders');
  globalCollection = this.db.collection('global');

  constructor(private db: AngularFirestore) {
    this.inventory = this.setInventory();
    this.getLastInvoice();
    this.getStore();
  }

  setInventory(): any {
    return this.inventoryCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getLastInvoice(): Subscription {
    return this.globalCollection
      .doc('invoice')
      .valueChanges()
      .subscribe((data: any) => {
        console.log('d', data);
        this.lastInvoice = data.lastInvoice;
      });
  }

  getStore(): void {
    this.globalCollection
      .doc('store')
      .get()
      .subscribe((doc) => {
        const data: any = doc.data();
        this.store.gstin = data.gstin;
        this.store.address = data.address;
        this.store.name = data.name;
      });
  }

  getOrders(startDate: Date, endDate: Date) {
    const ordersCollection = this.db.collection('orders', (ref) =>
      ref
        .where('date', '>=', new Date(startDate))
        .where('date', '<=', new Date(endDate))
        .orderBy('date')
    );
    return ordersCollection.get();
  }

  generateBill(customerName: string, items: any[], totalAmount: number): void {
    // let global = await this.globalCollection.valueChanges().toPromise();
    console.log('li', this.lastInvoice);
    this.newOrder = {
      invoiceNo: ++this.lastInvoice,
      customer: customerName,
      date: new Date(),
      items: items.reverse(),
      total: totalAmount,
    };
    this.globalCollection
      .doc('invoice')
      .update({ lastInvoice: this.newOrder.invoiceNo });
    this.ordersCollection.add(this.newOrder);
  }
}
