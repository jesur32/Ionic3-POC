import {Component, ViewChild} from "@angular/core";
import {Content, Nav, Platform} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {HistorialPage} from "../pages/historial/historial";
import {SearchLocationPage} from "../pages/search-location/search-location";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  @ViewChild(Content) private content: Content;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Inicio', component: HomePage, icon: 'home'},
      {title: 'Historial', component: SearchLocationPage, icon: 'clock'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.hide();
      this.setDisableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot(LoginPage);
  }

  private setDisableScroll(disable: boolean): void {

    let scroll = this.content.getScrollElement();
    scroll.style.overflowY = disable ? 'hidden' : 'scroll';
  }

}
