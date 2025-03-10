import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {NgForOf} from '@angular/common';
import {DefaultLayoutAlignDirective} from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-apropos',
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    NgForOf,
    DefaultLayoutAlignDirective
  ],
  templateUrl: './apropos.component.html',
  standalone: true,
  styleUrl: './apropos.component.css'
})
export class AproposComponent {

  title = 'À propos de LOCAL Service';
  content = [
    {
      heading: 'Notre Mission',
      text: 'Fournir des solutions de sécurité automobile de haute ' +
        'qualité pour protéger votre véhicule et assurer votre tranquillité ' +
        'd’esprit.'
    },
    {
      heading: 'Notre Histoire',
      text: 'Fondée en 2020, notre entreprise a été créée par des passionnés de ' +
        'l’automobile qui souhaitent améliorer la sécurité des véhicules sur la route.'
    },
    {
      heading: 'Nos Services',
      text: 'Nous proposons une gamme complète de services, y compris l’installation ' +
        'de systèmes d’alarme, le suivi GPS, et des conseils en sécurité.'
    },
    {
      heading: 'Engagement envers nos clients',
      text: 'Nous nous engageons à offrir un service client exceptionnel et à travailler ' +
        'en étroite collaboration avec nos clients pour répondre à leurs besoins spécifiques.'
    }
  ];

  constructor(public dialogRef: MatDialogRef<AproposComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
