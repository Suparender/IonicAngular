import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public env = environment;

  public form = {
    name: '',
    email: '',
    subject: '',
    message: '',
    date: new Date(),
    status: 'received',
    sended: false
  }

  private firestore: Firestore = inject(Firestore);

  // Referência à coleção "contacts" no Firestore.
  // Se a coleção não existe, será criada.
  contactsCollection = collection(this.firestore, 'contacts');

  constructor() { }

  ngOnInit() { }

  sendForm() {

    if (
      this.form.name.length < 3 ||
      this.form.email.indexOf('@') < 1 ||
      this.form.subject.length < 3 ||
      this.form.message.length < 5
    ) return false;

    this.form.date = new Date();

    addDoc(this.contactsCollection, this.form)
      .then((data) => {
        console.log('Documento salvo com Id :' + data.id)
        this.form.sended = true;
      })

    return false;
  }

}
