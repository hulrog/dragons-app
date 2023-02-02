import { Injectable } from '@angular/core';
import { Dragon } from '../../models/dragon.interface';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private readonly firestore: Firestore) {}

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
