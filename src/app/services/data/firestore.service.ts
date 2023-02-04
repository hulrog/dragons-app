import { Injectable } from '@angular/core';
import { Dragon } from '../../models/dragon.interface';
import { Firestore, collectionData, docData, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dragonRef;

  constructor(private readonly firestore: Firestore) {
    this.dragonRef = collection(this.firestore, 'dragonList');
  }
  getDragonList() {
    return collectionData(this.dragonRef, { idField: 'id' }) as Observable<Dragon[]>;
  }

  getDragon(id: string): Observable<Dragon> {
    console.log(id);
    return docData(doc(this.dragonRef, id)) as Observable<Dragon>;
  }

  deleteDragon(id: string): Promise<void> {
    const dragonRef = doc(this.firestore, `dragonList/${id}`);
    return deleteDoc(dragonRef);
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
