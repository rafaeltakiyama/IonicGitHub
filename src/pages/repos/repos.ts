import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Repository } from '../../models/repository'
import {  GithubUsers } from '../../providers/github-users';

/*
  Generated class for the Repos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-repos',
  templateUrl: 'repos.html'
})
export class ReposPage {

repositories: Repository[];

constructor(public navCtrl: NavController, public navParams: NavParams, private githubUsers: GithubUsers) {
    githubUsers.loadRepositories().subscribe(repositories => {
      this.repositories = repositories;
      console.log(repositories);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReposPage');
  }

  openURL(url:string) {
    console.log(url);
  }

}
