import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {TripsPage} from "../trips/trips";

// import {SearchCarsPage} from "../search-cars/search-cars";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  public places = {
    nearby: [
      {
        id: 1,
        name: "DU6762"
      },
      {
        id: 2,
        name: "GMLS23"
      },
      {
        id: 3,
        name: "LPRO12"
      },
      {
        id: 4,
        name: "PRTY14"
      },
      {
        id: 5,
        name: "OIOP28"
      },
      {
        id: 6,
        name: "PERW22"
      }
    ],
    recent: [
      {
        id: 1,
        name: "DU6762"
      }
    ]
  };

  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
    this.nav.push(TripsPage);
    //this.nav.pop();
  }
}
