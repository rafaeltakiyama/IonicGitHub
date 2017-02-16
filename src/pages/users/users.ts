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

  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsers) {
    githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
      console.log(users);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
    // this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
    });
  }

  // onSearchInput(){
  //   this.searching = true;
  // }

  setFilteredItems() {

    if (this.searchTerm === '') {
      this.users = this.originalUsers;
       this.searching = false;
    } else {
      this.searching = true;
      this.githubUsers.searchUsers(this.searchTerm).subscribe(users => {
        this.users = users
        this.searching = false;
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
