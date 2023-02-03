import { Injectable } from '@angular/core';
import { Dragon } from '../../models/dragon.interface';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dragonRef;

  constructor(private readonly firestore: Firestore) {
    this.dragonRef = collection(this.firestore, 'dragonList');
  }
  getDragonList() {
    //console.log(collectionData(this.dragonRef, { idField: 'id' }));
    return collectionData(this.dragonRef, { idField: 'id' }) as Observable<Dragon[]>;
  }
  createDragon(
    name: string,
    rider: string,
    color: string,
    description: string,
    size: number
  ): Promise<void> {
    return addDoc(collection(this.firestore, "dragonList"), {
      name,
      rider,
      color,
      description,
      size
    }).then(() => {});
  }

}
