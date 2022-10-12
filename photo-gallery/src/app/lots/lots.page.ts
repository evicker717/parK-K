import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ModalController } from '@ionic/angular';
import { SubmitPagePage } from '../submit-page/submit-page.page';
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
  selector: 'app-lots',
  templateUrl: 'lots.page.html',
})
export class LotsPage implements OnInit{
  message = 'This modal example uses the modalController to present and dismiss modals.';
  myLot: string;
  dateTime = new Date().toDateString();
  ave: number;
  constructor(private modalCtrl: ModalController,private activatedRoute: ActivatedRoute) {}
async getData(){
  var total = 0;
  var querySnapshot = await getDocs(query(collection(db, this.myLot), where("date", "==", this.dateTime) ));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  var obj = doc.data()
  var fill = obj['fill']
  console.log(typeof fill)
  console.log(typeof total)
  total = fill + total
})
console.log(querySnapshot.size)
this.ave = total/querySnapshot.size
console.log(this.ave)
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
  ngOnInit() {
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    console.log(this.myLot)
    console.log(this.dateTime)
    this.getData()

}
}