import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  items: any[] = [];
  totalAmount = 0;

  constructor(private db: AngularFirestore) {
    console.log(db.collection('items'));
  }
}

