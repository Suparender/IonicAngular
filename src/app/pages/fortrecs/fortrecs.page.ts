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
  env = environment;
  public trecs = {
    name: '',
    description: '',
    location: '',
    date: new Date(),
    status: 'on',
    sended: false,
    savedURLP: ''
  };

  private firestore: Firestore = inject(Firestore);
  contactsCollection = collection(this.firestore, 'trecos');

  constructor() { }

  ngOnInit() { }

  sendForm() {
    if (
      this.trecs.name.length < 3 ||
      this.trecs.description.length < 20 ||
      this.trecs.location.length < 5
    ) {
      return false;
    }

    this.trecs.date = new Date();
    this.savePhoto()
      .then(() => {
        addDoc(this.contactsCollection, this.trecs)
          .then((data) => {
            console.log('Documento salvo com Id :' + data.id);
            this.trecs.sended = true;
            this.resetForm();
          })
          .catch((error) => {
            console.error('Erro ao salvar no Firestore:', error);
          });
      })
      .catch((error) => {
        console.error('Erro ao salvar a foto:', error);
      });

    return false;
  }

  public photoURL: string | undefined;
  public photoFormat = '';
  public saved = false;
  public savedURL = '';

  private storage: Storage = inject(Storage);

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
    });
  }

  // Prepara para nova foto.
  refresh(): void {
    this.photoURL = undefined;
  }

  async savePhoto() {
    if (!this.photoURL) {
      return Promise.reject(new Error('Nenhuma foto selecionada.'));
    }

    const photoFile = this.dataURLtoBlob(this.photoURL);
    if (!photoFile) {
      return Promise.reject(new Error('Erro ao converter a foto.'));
    }

    try {
      // Create a random name for the new file.
      const storageRef = ref(this.storage, `${this.getRandomChars(10)}.${photoFile.type.split('/')[1]}`);

      // Convert the photo data to a base64 string before uploading.
      const photoBase64 = await this.blobToBase64(photoFile);

      // Upload the base64 string to the server.
      await uploadString(
        storageRef,
        photoBase64,
        'data_url', // Use 'data_url' as the format
        { contentType: `image/${photoFile.type.split('/')[1]}` }
      );

      // Get the URL of the saved image.
      const response = await getDownloadURL(ref(storageRef));
      this.savedURL = response;
      this.saved = true;
      this.trecs.savedURLP = this.savedURL;
    } catch (error) {
      return Promise.reject(error);
    }

    // Add a default return value in case of success (optional)
    return null;
  }

  resetForm() {
    this.trecs.name = '';
    this.trecs.description = '';
    this.trecs.location = '';
    this.photoURL = undefined;
  }

  getRandomChars(n: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let sequence = '';
    for (let i = 0; i < n; i++) {
      const rndi = Math.floor(Math.random() * chars.length);
      sequence += chars.charAt(rndi);
    }
    return sequence;
  }

  dataURLtoBlob(dataURL: string) {
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);

    if (mimeMatch && mimeMatch.length >= 2) {
      const mime = mimeMatch[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], { type: mime });
    }

    return null;
  }

  // New method to convert Blob to base64 string
  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }
}
