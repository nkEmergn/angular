import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import {Contact} from '../contact';
import contactDataFile from '../dataFile.json';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  contacts!: Contact[];
  contact!: Contact;
  first_name!: string;
  last_name!: string;
  phone!: string;

  constructor(private contactService: ContactService) { }

  addContact(contact : any)
  {
    var newContact={
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    if(contact!=null)
    {
      newContact = contact as Contact;
    }
    console.log(newContact);

    //this.contactService.addContact(newContact);
      //.subscribe(contact => {
         // this.contacts.push(contact)
      //});

      //this.contactService.getContacts()
    //.subscribe(contacts => this.contacts = contacts);
  }

  loadFromFile()
  {
    var tmp = 'test \'lumSum\'';
    this.contacts = contactDataFile as Contact[];
  }

  loadFromDb()
  {
    this.contactService.getContacts()
    .subscribe(contacts => this.contacts = contacts);
  }
  
  saveToFile()
  {
     var datafromFile = contactDataFile as Contact[];
     var datafromDb = this.contacts;
     //var result = datafromDb.filter(function (o1) {
      //return datafromFile.some(function (o2) {
          //return o1.first_name != o2.first_name && 
          //o1.last_name != o2.last_name; // return the ones with equal id
     //});
    //});

    let result = datafromDb.filter(o1 => !datafromFile.some(o2 => 
      o1.first_name === o2.first_name && 
      o1.last_name === o2.last_name));

    //var fs = require('fs');
    //fs.writeFile ("../dataFile.json", JSON.stringify(result), function(err: any) {
      //if (err) throw err;
      //console.log('complete');
      //}
    //);
    this.saveText(JSON.stringify(result),"../dataFile.json");
    console.log(result);
  }

  saveText(text: any, filename: any){
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
  }
  
  deleteContact(id:any)
  {
    var contacts = this.contacts;
    this.contactService.deleteContact(id)
      .subscribe(data =>{
        if(data.n ==1)
        {
           for(var i=0;i<contacts.length; i++) 
           {
             if(contacts[i]._id ==id)
             {
               contacts.splice(i,1);
             }
           }
        }
        else
        {
          console.log('Record do not exists')
        }
      });
  }

  ngOnInit(): void {
    console.log('Contact component ngOnInit')
    //this.contactService.getContacts()
    //.subscribe(contacts => this.contacts = contacts);
    //this.contacts = contactDataFile as Contact[];
  }

}
