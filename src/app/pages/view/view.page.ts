import { Component, inject, OnInit } from '@angular/core';
import { DocumentSnapshot, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { getDoc, doc } from '@firebase/firestore';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute)
  private firestore = inject(Firestore)

  private docId: string = ''

  private docSnap!: DocumentSnapshot

  constructor() { }

  public thing:any

  async ngOnInit() {
    this.docId = this.activatedRoute.snapshot.paramMap.get('id') as string

    this.docSnap = await getDoc(doc(this.firestore, 'things', this.docId))

    this.thing = this.docSnap.data()

  }



}
