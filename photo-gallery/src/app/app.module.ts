import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB37r3KlFR3iax1Z-AowIt03Tw8q_5BGMk",
  authDomain: "kalamazoo-college-parking-lot.firebaseapp.com",
  projectId: "kalamazoo-college-parking-lot",
  storageBucket: "kalamazoo-college-parking-lot.appspot.com",
  messagingSenderId: "293103094034",
  appId: "1:293103094034:web:568958febc46aa9507cbcb",
  measurementId: "G-8C43XVMTEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
async function getAverages(db) {
  const averagesCol = collection(db, 'lotAverages');
  const aveSnapshot = await getDocs(averagesCol);
  const lotList = aveSnapshot.docs.map(doc => doc.data());
  return lotList;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
