import { Component, OnInit, inject } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, ref, uploadBytesResumable, uploadString } from '@angular/fire/storage';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  public photoURL: any;

  private storage: Storage = inject(Storage);

  getPhoto() {

    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    }).then((x) => {
      console.log('Foto escolhida: ', x);
      this.photoURL = x.dataUrl;
    })

  }

  ngOnInit() { }

  refresh(): void {
    this.photoURL = undefined;
  }

  savePhoto() {
    console.log(this.photoURL.split(',')[1]);
    const storageRef = ref(this.storage, 'minhafoto.jpg');
    // uploadBytesResumable(storageRef, this.photoURL.split(',')[1]);
    uploadString(storageRef, this.photoURL.split(',')[1], 'base64', { contentType: 'image/jpg' });
  }

}
