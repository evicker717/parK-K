import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
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
export class LotsPage implements OnInit{
  myLot: string;
  dateTime = new Date().toDateString();
  ave: number;
  p_bar_value: number;
  roleMessage = '';
  // color = ;

  constructor(private alertController: AlertController, private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}

  async getData(){
    var total = 0;
    var querySnapshot = await getDocs(query(collection(db, this.myLot), where("date", "==", this.dateTime) ));
    querySnapshot.forEach((doc) => 
    {
    // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var obj = doc.data()
      var fill = obj['fill']
      console.log(typeof fill)
      console.log(typeof total)
      total = fill + total
    })
    if(querySnapshot.size == 0)
    {
      this.confirm()
    }
  
    this.ave = total/querySnapshot.size
    console.log(this.ave)
    this.setPercentBar()
    console.log(this.p_bar_value)
    return this.ave

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SubmitPagePage,
      componentProps: {
        "myLot": this.myLot,
      }
    });
    modal.present();

  }
  setPercentBar() {
      this.p_bar_value = this.ave/100;
      if(this.p_bar_value > .75) {
        // set color to red
      }
      else if(this.p_bar_value > .5) {
        // set color to orange
      }
      else if(this.p_bar_value > .25) {
        // set color to yellow
      }
      else {
        // set color to green
      }
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: "Looks like we don't have any up to date information on this location. Please help us fix this by telling us how full it is now",
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

    const { role } = await alert.onDidDismiss();

  }

  ngOnInit() {
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    console.log(this.myLot)
    console.log(this.dateTime)
    this.getData()

  }
}