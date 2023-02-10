import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {

  loggedInUser: User;
  constructor(private router: Router) {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')  || '{}') as User;
  }

  logOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

}