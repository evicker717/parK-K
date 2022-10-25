import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
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
  avg: number;
  p_bar_value: number;
  color: string;
  todays_entries: Array<Object>;
  lotData: Object
  cap: number
  tags: Array<string>
  lastUpdated: string
  constructor(private alertController: AlertController, private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}
  
  async getData(){
    const docRef = doc(db, "Lots", this.myLot);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.avg = docSnap.data().avg
      this.cap = docSnap.data().cap
      this.tags = docSnap.data().tags
      this.lastUpdated = docSnap.data().lastUpdated
      this.setPercentBar()
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      this.noDataHandler()
    }
  }
  async getDetailedReport(){
    const q = query(collection(db, "Submissions"), where("name", "==", this.myLot));
    const querySnapshot = await getDocs(q);
    var anArray = []

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      anArray.push(doc.data())
});
this.todays_entries = anArray 
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
    this.getDetailedReport()
  }
}
