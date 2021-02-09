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
  gstin = '';
  lastInvoice = -1;
  newOrder: Order = { invoiceNo: -1, date: new Date(), items: [], total: 0 };
  inventoryCollection = this.db.collection('items');
  ordersCollection = this.db.collection('orders');
  globalCollection = this.db.collection('global');

  constructor(private db: AngularFirestore) {
    this.inventory = this.setInventory();
    this.getLastInvoice();
    this.getGSTIN();
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

  getLastInvoice() {
    return this.globalCollection
      .doc('invoice')
      .valueChanges()
      .subscribe((data: any) => {
        console.log('d', data);
        this.lastInvoice = data.lastInvoice;
      });
  }

  getGSTIN() {
    this.globalCollection
      .doc('gstin')
      .get()
      .subscribe((doc) => {
        let data: any = doc.data();
        this.gstin = data.gstin;
      });
  }

  generateBill(items: any[], totalAmount: number) {
    // let global = await this.globalCollection.valueChanges().toPromise();
    console.log('li', this.lastInvoice);
    this.newOrder = {
      invoiceNo: ++this.lastInvoice,
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
