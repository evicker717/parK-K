import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { IonModal } from '@ionic/angular';
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDoc, doc, getDocs , orderBy, updateDoc} from "firebase/firestore";
import { ModalController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';

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
const lotRef = (db);

//declare component parts
@Component({
  selector: 'app-lots',
  templateUrl: 'lots.page.html',
  styleUrls: ['lots.page.scss']

})
//declare class that runs ngOnInit on activation
export class LotsPage implements OnInit{
    @ViewChild(IonModal) modal: IonModal;
    message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  myLot: string;
  avg: number;
  p_bar_value: number;
  color: string;
  todays_entries: Array<Object>;
  lotData: Object
  cap: number
  tags: Array<string>
  lastTimestamp: string
  timeStamp = new Date().getTime();
  lastEmittedValue: RangeValue; 
  constructor(private alertController: AlertController, private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}
  selectedValues = [];
  roleMessage = '';


  handleChange(e) {
    this.selectedValues = e.target.value;
    console.log(this.selectedValues)
    this.getData()
    
  }
  async getAvg(){
    const q = query(collection(db, "Submissions"), where("name", "==", this.myLot));
    var total = 0
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    var temp = doc.data().fill
    console.log(temp)
    total = temp + total
    console.log(total)
});
  this.avg = total/querySnapshot.size
  console.log(this.avg) 
  const lotRef = doc(db, "Lots", this.myLot)
  await updateDoc(lotRef, {
    avg: this.avg,
    lastTimestamp: this.timeStamp
  });
  }
  async writeData() { 
    try {
      await addDoc(collection(lotRef, "Submissions"), {
        fill: this.lastEmittedValue,
        name: this.myLot,
        timestamp: this.timeStamp
      });
      console.log("Document written with ID: ", this.myLot);
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
            this.getAvg()
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
  async getData(){
    const docRef = doc(db, "Lots", this.myLot);
    const docSnap = await getDoc(docRef);
      console.log("Document data:", docSnap.data());
      this.avg = docSnap.data().avg
      this.cap = docSnap.data().cap
      this.tags = docSnap.data().tags
      this.lastTimestamp = docSnap.data().lastTimestamp
      this.setPercentBar()
      if(this.avg == null){
        console.log("No up to date submissions!");
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
anArray.sort((a, b) => b.timestamp - a.timestamp);
this.todays_entries = anArray 
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  setPercentBar() {
      this.p_bar_value = this.avg/this.cap;
      if(this.p_bar_value > .80) {
        this.color = "danger";
      }
      else if(this.p_bar_value > .50) {
        this.color = "warning";
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
