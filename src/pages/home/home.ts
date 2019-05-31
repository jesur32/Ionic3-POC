import {Component, OnInit} from "@angular/core";
import {NavController, ActionSheetController, LoadingController} from "ionic-angular";
import {SettingsPage} from "../settings/settings";
import { Camera, PictureSourceType } from '@ionic-native/camera';
import {TripsPage} from "../trips/trips";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  };
  selectedImage: string;
  loading: any;

  constructor(public nav: NavController,private actionSheetCtrl: ActionSheetController,private camera: Camera,public loadingCtrl: LoadingController) {
  }

  ngOnInit(): void {
    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Por favor espere...'
    });

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);


  }


  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  selectSource() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.loading.present();
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: false,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      //this.selectedImage = `data:image/jpeg;base64,${imageData}`;
      this.doSearch();
      this.loading.dismiss();
    }

    );
  }

  private doSearch() : void {
    this.nav.push(TripsPage);
  }

  /*
  recognizeImage() {
    Tesseract.recognize(this.selectedImage)
      .progress(message => {
        if (message.status === 'recognizing text')
          this.progress.set(message.progress);
      })
      .catch(err => console.error(err))
      .then(result => {
        this.imageText = result.text;
      })
      .finally(resultOrError => {
        this.progress.complete();
      });
  }
*/
}

//
