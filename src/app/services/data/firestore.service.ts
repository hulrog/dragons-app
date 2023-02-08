import { Injectable } from '@angular/core';
import { Dragon } from '../../models/dragon.interface';
import { User } from '../../models/user.interface';
import { Firestore, collectionData, docData, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private dragonRef;
  private userRef;

  constructor(private readonly firestore: Firestore) {
    this.dragonRef = collection(this.firestore, 'dragonList');
    this.userRef = collection(this.firestore, 'userList');
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

  updateDragon(id: string, dragon: Dragon): Promise<void> {
    const dragonRef = doc(this.firestore, `dragonList/${id}`);
    return updateDoc(dragonRef, {...dragon});
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

  getUserList() {
    return collectionData(this.userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUser(id: string): Observable<User> {
    return docData(doc(this.userRef, id)) as Observable<User>;
  }

  deleteUser(id: string): Promise<void> {
    const userRef = doc(this.firestore, `userList/${id}`);
    return deleteDoc(userRef);
  }

  updateUser(id: string, user: User): Promise<void> {
    const userRef = doc(this.firestore, `userList/${id}`);
    return updateDoc(userRef, {...user});
  }

  createUser(username: string, email: string, password: string): Promise<void> {
    return addDoc(collection(this.firestore, "userList"), {
      username,
      email,
      password
    }).then(() => {});
  }
}
