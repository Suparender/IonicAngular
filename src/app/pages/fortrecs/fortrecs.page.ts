import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';


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

  public photoURL: any;
  public photoFormat = '';
  public saved = false;
  public savedURL = '';

  private storage: Storage = inject(Storage);

  // Obtém uma foto da API da câmera.
  getPhoto() {
    this.saved = false;
    this.savedURL = '';
    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      // Retorna o arquivo da câmera no formato 'BASE64' (jpg).
      resultType: CameraResultType.DataUrl
    }).then((x) => {
      console.log('Foto escolhida: ', x);
      this.photoURL = x.dataUrl;
      this.photoFormat = x.format;
    })
  }

  // Prepara para nova foto.
  refresh(): void {
    this.photoURL = undefined;
  }

  // Salva a foto atual.
  savePhoto() {
    // Cria um nome aleatório para o novo arquivo.
    let storageRef = ref(this.storage, `${this.getRandomChars(10)}.${this.photoFormat}`);

    // Envia o arquivo para o servidor.
    uploadString(
      storageRef,
      // Extrai apenas o 'Base64' do arquivo.
      this.photoURL.split(',')[1],
      'base64',
      { contentType: `image/${this.photoFormat}` }
    ).then(() => {
      // Se salvou a imagem.
      // Obtém o URL da imagem salva.
      getDownloadURL(ref(storageRef))
        .then((response) => {
          alert('Imagem salva com sucesso!');
          this.savedURL = response;
          this.saved = true;
        })
    });
  }

  // Gera um nome aleatório.
  getRandomChars(n: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sequence = '';
    for (let i = 0; i < n; i++) {
      const rndi = Math.floor(Math.random() * chars.length);
      sequence += chars.charAt(rndi);
    }
    return sequence;
  }


}
