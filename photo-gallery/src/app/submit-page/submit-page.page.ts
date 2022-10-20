import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, doc } from "firebase/firestore"; 
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';

import { ModalController, NavParams } from '@ionic/angular';
// Get a document, forcing the SDK to fetch from the offline cache.
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



// Initialize Cloud Firestore and get a reference to the service
const firebaseConfig = {
  apiKey: "AIzaSyB37r3KlFR3iax1Z-AowIt03Tw8q_5BGMk",
  authDomain: "kalamazoo-college-parking-lot.firebaseapp.com",
  projectId: "kalamazoo-college-parking-lot",
  storageBucket: "kalamazoo-college-parking-lot.appspot.com",
  messagingSenderId: "293103094034",
  appId: "1:293103094034:web:568958febc46aa9507cbcb",
  measurementId: "G-8C43XVMTEE"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const lotRef = (db);

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.page.html',
  styleUrls: ['./submit-page.page.scss'],
})

export class SubmitPagePage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  date = new Date().toDateString();
  time = new Date().getHours();
  datetime = new Date().toString();
  lastEmittedValue: RangeValue; 
  myLot: string;

  constructor(private navParams: NavParams, private modalCtrl: ModalController, private alertController: AlertController,private activatedRoute: ActivatedRoute, private router: Router){}
  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async writeData() { 
    try {
      await addDoc(collection(lotRef, this.myLot), {
        fill: this.lastEmittedValue,
        datetime: this.datetime,
        date: this.date,
        time: this.time
      });
      console.log("Document written with ID: ", lotRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Thank you for helping us provide accurate data!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.writeData()  
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }

  ngOnInit() {
    this.navParams.data.myLot
    console.log(this.myLot, this.date)

    }


}
