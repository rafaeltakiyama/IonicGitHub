import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

import {  GithubUsers } from '../../providers/github-users';
import { UserDetailsPage } from '../user-details/user-details';

import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  
  users: User[];
  originalUsers: User[];
  searchControl: FormControl;
  searchTerm: string = '';


  constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsers) {
    githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
      console.log(users);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
    this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
            this.setFilteredItems();
 
        });
  }

  setFilteredItems() {

    if (this.searchTerm === '') {
      this.users = this.originalUsers;
    } else {
      this.githubUsers.searchUsers(this.searchTerm).subscribe(users => {
            this.users = users
      });
    }
  }

  goToDetails(login: string) {
    console.log({login});
    this.navCtrl.push(UserDetailsPage, {login});
  }

  // search(searchEvent) {
  //   let term = searchEvent.target.value
  //   console.log(term);
  //   // We will only perform the search if we have 3 or more characters
  //   if (term.trim() === '' || term.trim().length < 3) {
  //     // Load cached users
  //     this.users = this.originalUsers;
  //   } else {
  //     // Get the searched users from github
  //     this.githubUsers.searchUsers(term).subscribe(users => {
  //       this.users = users
  //     });
  //   }
  // }

}
