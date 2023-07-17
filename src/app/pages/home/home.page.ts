import { Component, inject, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private firestore: Firestore = inject(Firestore)

  private fbCollection = collection(this.firestore, 'things')

  public things: Observable<any>

  env = environment

  constructor() {
    this.things = collectionData(this.fbCollection, { idField: 'id' }) as Observable<any>
   }

  ngOnInit() {
  }

}
