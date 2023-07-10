import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fortrecs',
  templateUrl: './fortrecs.page.html',
  styleUrls: ['./fortrecs.page.scss'],
})
export class FortrecsPage implements OnInit {

  env = environment

  public trecs = {
    name: '',
    description: '',
    location: '',
    date: new Date(),
    status: 'on',
    sended: false
  }

  private firestore: Firestore = inject(Firestore);

  
  contactsCollection = collection(this.firestore, 'trecos');

  constructor() { }

  ngOnInit() { }

  sendForm() {

    if (
      this.trecs.name.length < 3 ||      
      this.trecs.description.length < 20 ||
      this.trecs.location.length < 5
    ) return false;

    this.trecs.date = new Date();

    addDoc(this.contactsCollection, this.trecs)
      .then((data) => {
        console.log('Documento salvo com Id :' + data.id)
        this.trecs.sended = true;
      })

    return false;
  }
}
