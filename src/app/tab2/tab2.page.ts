import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/data/firestore.service';
import { Dragon } from '../models/dragon.interface';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dragons: Dragon[];
  
  constructor(private firestoreService: FirestoreService) {
  this.dragons = [];
  }
  
  ngOnInit() {
    this.firestoreService.getDragonList().subscribe(dragons => {
      this.dragons = dragons;
      console.log(this.dragons);
    });
  }
}