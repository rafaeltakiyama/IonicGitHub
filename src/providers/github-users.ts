import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Repository } from '../models/repository';
import { Organization } from '../models/organization';



/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsers {

  githubApiUrl = 'https://api.github.com';


  constructor(public http: Http) {
    console.log('Hello GithubUsers Provider');
  }

    // Load all github users
  load(): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <User[]>res.json());
  }

  // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }
  
  // Search for github users  
  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items))
  }

  // Load all github Repository
  loadRepositories(): Observable<Repository[]> {
    return this.http.get(`${this.githubApiUrl}/repositories`)
      .map(res => <Repository[]>res.json());
  }

  // Load all github organizations
  loadOrganizations(): Observable<Organization[]> {
    return this.http.get(`${this.githubApiUrl}/organizations`)
      .map(res => <Organization[]>res.json());
  }
}
