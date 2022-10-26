import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { getFirestore, collection, query, where, getDoc, doc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  myLot: string;
  avg: number;
  p_bar_value: number;
  color: string;
  lotData: Array<object>
  cap: number
  tags: Array<string>
  lastUpdated: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
    selectedTags = [];

  handleChange(e) {
    this.selectedTags = e.target.value;
  }
  async getData(){
    const q = query(collection(db, "Lots"));
    var anArray = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      anArray.push(doc.data())
      console.log(doc.id, " => ", doc.data());
    });
    this.lotData = anArray
    console.log(this.lotData)
    }
      


  ngOnInit() 
  {
    this.getData()
  }
  
  }
