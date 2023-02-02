import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  createDragonForm: FormGroup;
  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createDragonForm = formBuilder.group({
      name: ['', Validators.required],
      rider: ['', Validators.required],
      color: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async createDragon() {
    const loading = await this.loadingCtrl.create();

    const name = this.createDragonForm.value.name;
    const rider = this.createDragonForm.value.rider;
    const color = this.createDragonForm.value.color;
    const description = this.createDragonForm.value.description;

    this.firestoreService
      .createDragon(name, rider, color, description)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );

    return await loading.present();
  }
  

}

