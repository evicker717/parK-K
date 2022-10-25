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
  currentTags = undefined;
    lots = [
      {
        id: 1,
        name: 'Hicks',
        tags: ['Visitor', 'Employee', 'Student', 'Lot'],
      },
      {
        id: 2,
        name: 'FAB & Dow',
        tags: ['Permit', 'Employee', 'Lot'],
      },
      {
        id: 3,
        name: 'Tennis Courts',
        tags: ['Visitor', 'Employee', 'Student', 'Overnight', 'Lot'],
      },
      {
        id: 4,
        name: 'Academy Street',
        tags: ['Visitor', 'Employee', 'Student', 'Street'],
      },
      {
        id: 5,
        name: 'Anderson',
        tags: ['Employee', 'Lot'],
      },
      {
        id: 6,
        name: 'Trowbridge',
        tags: ['Employee', 'Student','Lot','Overnight Student'],
      },
      {
        id: 7,
        name: 'Severn',
        tags: ['Lot','Overnight Student'],
      },
      {
        id: 8,
        name: 'Fitness & Wellness Center',
        tags: ['Employee', 'Student','Lot','Visitor'],
      }
      
    ];
  
    compareWith(o1, o2) {
      if (!o1 || !o2) {
        return o1 === o2;
      }
  
      if (Array.isArray(o2)) {
        return o2.some((o) => o.id === o1.id);
      }
  
      return o1.id === o2.id;
    }
  
    handleChange(ev) {
      this.currentTags = ev.target.value;
    }

  ngOnInit() 
  {
    }
  
  }
