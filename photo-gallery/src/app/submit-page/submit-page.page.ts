import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
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
@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.page.html',
  styleUrls: ['./submit-page.page.scss'],
})

export class SubmitPagePage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  lastEmittedValue: RangeValue;
  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute, private router: Router){}

  async writeData() { 
    try {
      const docRef = await addDoc(collection(db, "lots"), {
        name: "hicks",
        fill: 90,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank you for helping us provide accurate data!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.writeData()
            this.router.navigate(['/tabs/tab1'])
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  myLot: string;
  onIonChange(ev: Event) {
    this.lastEmittedValue = (ev as RangeCustomEvent).detail.value;
  }
  ngOnInit() {
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    }


}
