import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDoc, doc } from "firebase/firestore";
import { ModalController, AlertController } from '@ionic/angular';
import { SubmitPagePage } from '../submit-page/submit-page.page';

//Declare firestore config constants

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
//declare component parts
@Component({
  selector: 'app-lots',
  templateUrl: 'lots.page.html',
})
//declare class that runs ngOnInit on activation
export class LotsPage implements OnInit{
  //declares global variables 
  myLot: string;
  date= new Date().toDateString();
  time = new Date().getHours();
  avg: number;
  p_bar_value: number;
  todays_entries: Array<String>;
  lotData: Object
  constructor(private alertController: AlertController, private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}
  
  async getData(){
    const ref = doc(db, "Lots", this.myLot);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.lotData = docSnap.data()
      this.avg = this.lotData['avg']      
      this.setPercentBar()
    } else
      console.log("No such document!");
    }
  

  async openModal() {//opens up the fillable submition form 
    const modal = await this.modalCtrl.create({
      component: SubmitPagePage,
      componentProps: {
        "myLot": this.myLot,
      }
    });
    modal.present();
  }
  setPercentBar() {
      this.p_bar_value = this.avg/100;
  }
  async noDataHandler() {//If there is no up-to-date data, displays a popup warning the user, than redirects them to the submision page on confirm
    const alert = await this.alertController.create({
      header: "looks like we don't have any up to date information on this location, please help us fix this by telling us how full it is now",
      buttons: [
        {
          text: "OK",
          role: 'confirm',
          handler: () => {
            this.openModal()  
          },
        },

      ],
    });
    await alert.present();
  }

  ngOnInit() {//these functions activate as soon as a lot is clicked on from the main page
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    this.getData()
  }
}