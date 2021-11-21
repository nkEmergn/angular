import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contact} from './contact'
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  //retrieving ContactService
  getContacts()
  {
    return this.http.get('http://localhost:3000/api/contacts')
    .pipe(map((response : any) => response)); 
  }

  //add contact
  addContact(newContact: Contact)
  {
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/api/contact',newContact, {headers:headers})
      .pipe(map((response : any) => response));
  }

  //delete contact
  deleteContact(id: string)
  {
    return this.http.delete('http://localhost:3000/api/contact/'+id)
    .pipe(map((response : any) => response));
  }
}
