import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
    selectedTags = [];
  handleChange(e) {
    this.selectedTags = e.target.value;
  }

      


  ngOnInit() 
  {

  }
  
  }
