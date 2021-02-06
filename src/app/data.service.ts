import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  items: any[] = [];
  totalAmount = 0;

  constructor(private db: AngularFirestore) {}
  inventoryCollection = this.db.collection('items');
  inventory = this.inventoryCollection.snapshotChanges().pipe(
    map((actions) =>
      actions.map((a) => {
        const data: any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    )
  );
  // initInventory() {
  //   return this.db
  //     .collection('items')
  //     .snapshotChanges()
  //     .subscribe((res) => {
  //       return res.map((elm) => elm.payload.doc.data());
  //       // console.log(res[0].payload.doc.data());
  //       // console.log(this.inventory);
  //     });
  // }
}
