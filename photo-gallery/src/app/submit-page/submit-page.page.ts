import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-page',
  templateUrl: './submit-page.page.html',
  styleUrls: ['./submit-page.page.scss'],
})
export class SubmitPagePage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute, private router: Router){}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank you for helping us provide accurate data!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
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

  ngOnInit() {
    this.myLot = this.activatedRoute.snapshot.paramMap.get('mylot');
    }

}
