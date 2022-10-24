import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ModalController, AlertController } from '@ionic/angular';
import { SubmitPagePage } from '../submit-page/submit-page.page';
import { DatePipe } from '@angular/common';

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
  date = new Date().toDateString();
  time = new Date().getHours();
  ave: number;
  p_bar_value: number;
  color: string;
  todays_entries: Array<String>;

  constructor(private alertController: AlertController, private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}
  
  async getData(){
    var total = 0;
    var anArray = []
    var querySnapshot = await getDocs(query(collection(db, this.myLot), where("date", "==", this.date) && where("time", "==", this.time) ));
    querySnapshot.forEach((doc) => 
    {
      console.log(doc.id, " => ", doc.data());
      var obj = doc.data()
      var fill = obj['fill']
      anArray.push(obj)
      this.todays_entries = anArray
      total = fill + total
    })
    if(querySnapshot.size == 0)
    {
      console.log("no time data, using date")
      var querySnapshot = await getDocs(query(collection(db, this.myLot), where("date", "==", this.date)));
      querySnapshot.forEach((doc) => 
      {
        console.log(doc.id, " => ", doc.data());
        var obj = doc.data()
        var fill = obj['fill']
        anArray.push(obj)
        this.todays_entries = anArray
        total = fill + total
        })
        if(querySnapshot.size == 0)
        {
          console.log("no data")
          this.noDataHandler()
        }
      
    }

    this.ave = total/querySnapshot.size
    console.log(this.ave)
    this.setPercentBar()
    console.log(this.p_bar_value)
    console.log(this.todays_entries)
    return this.ave
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
      this.p_bar_value = this.ave/100;
      if(this.p_bar_value > .75) {
        this.color = "firebrick";
      }
      else if(this.p_bar_value > .5) {
        this.color = "warning";
      }
      else if(this.p_bar_value > .25) {
        this.color = "yellow";
      }
      else {
        this.color = "success";
      }
  }
  async noDataHandler() {//If there is no up-to-date data, displays a popup warning the user, than redirects them to the submision page on confirm
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
  }

  ngOnInit() {//these functions activate as soon as a lot is clicked on from the main page
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    this.getData()
  }
}