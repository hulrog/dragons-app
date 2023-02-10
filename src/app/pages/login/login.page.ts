import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  userList: User[] = [];

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

      
    });
    
  }

  ngOnInit() {
    this.firestoreService.getUserList().subscribe(users => {
      this.userList = users;
      console.log(this.userList);
    });
  }

  logIn() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    for (const user of this.userList) {
      if (user.username === username && user.password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['']);
        console.log("success");
        return;
      }
    }
    this.showLoginFailAlert();
    console.log("fail");
  }

  async showLoginFailAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login Failed',
      message: 'The username or password is incorrect.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  

}

