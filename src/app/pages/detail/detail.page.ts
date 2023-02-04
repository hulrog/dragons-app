import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dragon } from '../../models/dragon.interface';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  dragon: Dragon = {
    id: 'Unknown',
    name: 'Unknown',
    rider: 'Unknown',
    color: '#ffffff',
    description: 'Unknown',
    size: 50
  } as Dragon; 
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
    
  ) { }

  ngOnInit() {
    //vadi iz url rute parametar id
    const dragonId: string = this.route.snapshot.paramMap.get('id') || '';
    this.firestoreService.getDragon(dragonId).subscribe(
      dragon => {this.dragon = dragon;}
    );
  }

  async deleteDragon(id: string): Promise<void> {
    const dragonId: string = this.route.snapshot.paramMap.get('id') || '';
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${this.dragon.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log(dragonId);
            this.firestoreService.deleteDragon(dragonId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
}


