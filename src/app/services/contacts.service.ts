import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { map } from 'rxjs/operators';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient, private serachService: SearchService) { }

  
  filter():Observable<Contact[]> {
    return combineLatest([this.serachService.query, this._fetchContacts()])
    .pipe(map(([query, contacts]) => contacts.filter(contact => this._contactIncludes(query, contact))));
  }
  
  private _fetchContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('https://candidate-test.herokuapp.com/contacts');
  }

  private _contactIncludes(query: string, contact: Contact): Boolean {
    query = query.toLowerCase();
    return contact.name.toLowerCase().includes(query);
    // ||
    // contact.job.toLowerCase().includes(query) ||
    // contact.company_name.toLowerCase().includes(query) ||
    // contact.phone.toLowerCase().includes(query) ||
    // contact.email.toLowerCase().includes(query);
  }
}

