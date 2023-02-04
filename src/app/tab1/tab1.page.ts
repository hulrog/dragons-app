import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/data/firestore.service';
import { Dragon } from '../models/dragon.interface';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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
  
  
  
  
