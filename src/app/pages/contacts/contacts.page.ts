import { Component, OnInit, inject } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
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

  constructor(private auth: Auth = inject(Auth)) { }

  // Prepara a autenticação do usuário.
  authState = authState(this.auth);
  authStateSubscription = new Subscription;

  ngOnInit() {
    // Observer que obtém status de usuário logado.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {

        // Se tem alguém logado.
        if (userData) {

          // Preenche os campos 'nome' e 'email'.
          this.form.name = userData.displayName + '';
          this.form.email = userData.email + '';
        }
      }
    );

  }

  ngOnDestroy() {

    // Remove o observer ao concluir o componente.
    this.authStateSubscription.unsubscribe();
  }

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
