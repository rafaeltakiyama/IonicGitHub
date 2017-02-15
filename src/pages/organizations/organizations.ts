import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  GithubUsers } from '../../providers/github-users';
import { Organization } from '../../models/organization';

/*
  Generated class for the Organizations page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html'
})
export class OrganizationsPage {

  organizations : Organization[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsers) {
    githubUsers.loadOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');
  }

}
